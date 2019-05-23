class SettingController < ApplicationController
    before_filter :authenticate_user!
    before_action :correct_user?
    helper_method :current_user 
    layout "dash_publisher"
    
        require 'net/http'
        require 'uri'
        require 'json'
        
          # Page selection and update process
          def page_setting
              if !params[:id].nil? && request.post?
                  page_id = params[:id]
                  page_name = params[:name]
                  req = Koala::Facebook::API.new(current_user.fb_token)
                
                  page_token = req.get_page_access_token(page_id)
                  
                  if !page_token.nil? && !Page.exists?(:page_id => page_id)
                    Page.create(:page_id => page_id, :page_token => page_token, :page_name => page_name)
                      
                    page = Page.find_by(:page_id => page_id)
                    current_user.add_role(:publisher, page)
                    
                    current_user.update_attribute(:selected_page, page_id)
                    
                    # Subscribe app after adding Acces Token
                    sub_uri = URI.parse("https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=#{page_token}")
                      request = Net::HTTP::Post.new(sub_uri)
                      Net::HTTP.start(sub_uri.hostname, sub_uri.port, use_ssl: sub_uri.scheme == "https") do |http|
                        http.request(request)
                      end
                  else
                    current_user.update_attribute(:selected_page, page_id)
                  end
              else
                req = Koala::Facebook::API.new(current_user.fb_token)
                @pages = req.get_connections("me", "accounts", :fields => "picture,name,id,access_token")
              end
              #Set the menu for the page
              menu = {
                       "setting_type" => "call_to_actions",
                       "thread_state" => "existing_thread",
                       "call_to_actions" => [
                         {
                           "type" => "postback",
                           "title" => "Subscribe",
                           "payload" => "SUBSCRIBE_PAYLOAD"
                          },
                          {
                            "type" => "postback",
                            "title" => "Unsubscribe",
                            "payload" => "UNSUBSCRIBE_PAYLOAD"
                          },
                          {
                            "type" => "postback",
                            "title" => "Feedback",
                            "payload" => "FEEDBACK"
                          },
                          {
                            "type" => "postback",
                            "title" => "Alert Settings",
                            "payload" => "SETTINGS"
                          }
                        ]
                      }
              uri = URI.parse("https://graph.facebook.com/v2.6/me/thread_settings?access_token=#{page_token}")
              request = Net::HTTP::Post.new(uri)
              request.content_type = "application/json"
              request.body = JSON.dump(menu)
              Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") do |http|
                http.request(request)
              end
          end
          
          # Welcome message page controller
          def update_welcome_message
              unless current_user.selected_page.empty?
                user_page = current_user.selected_page
                current_page = Page.find_by(:page_id => user_page)
                
                uri = URI.parse("https://graph.facebook.com/v2.6/me/thread_settings?access_token=#{current_page.page_token}")
                  request = Net::HTTP::Post.new(uri)
                  request.content_type = "application/json"
                  request.body = JSON.dump({
                    "setting_type" => "call_to_actions",
                    "thread_state" => "new_thread",
                    "call_to_actions" => [
                      {
                        "payload":"WELCOME_MESSAGE_PAYLOAD"
                      }
                    ]
                  })
                    
                Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") do |http|
                  http.request(request)
                end
              else
                redirect_to setting_page_path
              end
          end
end