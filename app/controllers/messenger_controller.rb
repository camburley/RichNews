require 'rest-client'

class MessengerController < ActionController::Base
  protect_from_forgery with: :null_session
  before_action :set_resource, only: [:destroy, :show, :update]
  respond_to :json
  class Handler  
   
    def send_message(data, token)
      url = URI.parse("https://graph.facebook.com/v2.6/me/messages?access_token=#{token}")

      http = Net::HTTP.new(url.host, 443)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE #only for development.
      begin
        request = Net::HTTP::Post.new(url.request_uri)
        request["Content-Type"] = "application/json"
        request.body = data.to_json
        response = http.request(request)
        body = JSON(response.body)
        return { ret: body["error"].nil?, body: body }
      rescue => e
        raise e
      end
    end

    def send_text_message(sender, text, token)
      data = {
        recipient: { id: sender },
        message: { text: text }
      }
      send_message(data, token)
    end
    
    def send_generic_message(sender, mes, token)
      header = {
      recipient: {
        id: sender
        }
      }
      message = JSON.parse(mes)
      data = header.merge(message)
      send_message(data, token)
    end
    
  # PAYLOAD FOR MENU (PAYLOAD CHANGES BELOW -> STATIC)
    def send_menu_message(sender, token)
      data = {
        recipient: { id: sender},
        message: {
          attachment: {
            "type": "template",
            payload: {
              "template_type": "generic",
              elements: [
                {
                  "title": "Would you like to add your name?",
                  "subtitle": "So whatu think?",
                  buttons: [
                   "type": "postback",
                   "title": "Add my name",
                   "payload": "ADD_MY_NAME_PAYLOAD"
                  ]
                },
                {
                  "title": "Would you like to add your ZipCode?",
                  "subtitle": "So whatu think?",
                  buttons: [
                   "type": "postback",
                   "title": "Add my ZipCode",
                   "payload": "ADD_MY_ZIP_PAYLOAD"
                  ]
                },
                {
                  "title": "Would you like to know more about us?",
                  "subtitle": "So whatu think?",
                  buttons: [
                   "type": "postback",
                   "title": "How it works",
                   "payload": "HOW_IT_WORKS_PAYLOAD"
                  ]
                },
                {
                  "title": "Would you like to change Alert Frequency?",
                  "subtitle": "So whatu think?",
                  buttons: [
                   "type": "postback",
                   "title": "Alert Frequency",
                   "payload": "ALERT_FREQ_PAYLOAD"
                  ]
                },
                {
                  "title": "Would you like to leave Feedback?",
                  "subtitle": "So whatu think?",
                  buttons: [
                   "type": "postback",
                   "title": "Leave Feedback",
                   "payload": "LEAVE_FEEDBACK_PAYLOAD"
                  ]
                }
              ]
            }
          }
        }
      }
      send_message(data, token)
    end
    
    def send_welcome_message(sender, token)
      data = {
        recipient: { id: sender},
        message: {
          attachment: {
            "type": "template",
            payload: {
              "template_type": "button",
              text: Rumoji.decode("We can send you Notifications. They're fun, customizable & won't even buzz your phone many times."),
                  buttons: [
                    {
                      "type":"postback",
                      "title": Rumoji.decode("Cool. Sounds Good :thumbsup:"),
                      "payload":"SUBSCRIBE_PAYLOAD"
                    },
                    {
                      "type":"postback",
                      "title":"No Thanks",
                      "payload":"DEVELOPER_DEFINED_PAYLOAD"
                }
              ]
            }
          }
        }
      }
      send_message(data, token)
    end
    
    
    def send_welcoming_message(sender, token)
      data = {
        recipient: { id: sender},
        message: {
          attachment: {
            "type": "template",
            payload: {
              "template_type": "button",
              text: Rumoji.decode("I send you messages & you can respond below :point_down: by tapping the buttons."),
              buttons:[
                  {
                    "type":"postback",
                    "title":"Like this?",
                    "payload":"PAYLOAD_WELCOME_CONTINUE"
                  },
                ]
              }
            }
          }
      }
      send_message(data, token)
    end
  
    
    def send_related_video(sender, video_url, token)
      data = {
        recipient: { id: sender},
        message: {
          attachment: {
            type: "video",
            payload: {
              url: video_url
            }
          }
        }
      }
        send_message(data, token)
    end
    
    def send_done_message(sender, token)
      data = {
        recipient: { id: sender},
        message: {
          text: Rumoji.decode("That's all we've got :wave: -- check back later for more stories.")
        }
      }
      send_message(data, token)
    end
    
    def send_alert_settings(sender,token)
      data = {
        recipient: { id: sender},
        message: {
          text: "Choose one:",
          quick_replies: [
            {
              content_type: "text",
              title: "Once a day",
              payload: "FREQUENCY_1"
            },
            {
              content_type: "text",
              title: "Twice a day",
              payload: "FREQUENCY_2"
            },
            {
              content_type: "text",
              title: "Three times a day",  
              payload: "FREQUENCY_3"
            }
          ]
        }
      }
      send_message(data, token)
    end
  end
  
  def callback
    messaging_event = JSON.parse(request.body.read)
    #BEGIN Parsing JSON entry
    messaging_event["entry"].first["messaging"].each do |msg|
      #BEGIN Handle video attachments
      if msg["message"] && msg["message"]["attachments"] && msg["message"]["attachments"].first["type"]
        if msg["message"]["attachments"].first["type"] == 'video'
          page_id = msg["recipient"]["id"]
          sender_id = msg["sender"]["id"]
          token = Page.find_by(:page_id => page_id).page_token
          user_id = User.find_by(:sender_id => sender_id).id
          video_url = msg["message"]["attachments"].first["payload"]["url"]
          vid = VideoResponse.where(:user_id => user_id).order("created_at").last
        
          vid.update_attributes(:url => video_url)
          
          render :json => Handler.new.send_text_message(sender_id, "Thanks, we'll share that with our other subscribers!", token), :status => 200
          return
        end
      #END Handle video attachments
      #BEGIN Handle postbacks
      elsif msg["postback"] && msg["postback"]["payload"]
        # Get payload
        page_id = msg["recipient"]["id"]
        payload = msg["postback"]["payload"]
        sender_id = msg["sender"]["id"]
        #Get page_token that corresponds with incoming message
        token = Page.find_by(:page_id => page_id).page_token
        # Get current user ID
        user = User.find_by(:sender_id => sender_id)
        header = {
          "recipient" => {
            "id" => "#{sender_id}"
          }
        }
        
        if payload == 'WELCOME_MESSAGE_PAYLOAD'
          Handler.new.send_text_message(sender_id, Rumoji.decode("Hey there"), token)
          Handler.new.send_text_message(sender_id, "Thanx for trying our New bot. It's a conversation about the news - kinda like texting.", token)
          Handler.new.send_welcoming_message(sender_id, token)
        end
        
        if payload == 'PAYLOAD_WELCOME_CONTINUE'
          Handler.new.send_text_message(sender_id, Rumoji.decode("Yep, like that, Nice :thumbsup:"), token)
          Handler.new.send_welcome_message(sender_id, token)
        end
        
        
        if payload == 'SUBSCRIBE_PAYLOAD'
          if !user || User.find_by(:sender_id => sender_id).has_role?(:hater, Page.find_by(:page_id => page_id))
                uri = URI.parse("https://graph.facebook.com/v2.6/#{sender_id}?fields=first_name,last_name,profile_pic,locale,gender&access_token=#{token}")
                response = Net::HTTP.get_response(uri)
                  
                data = JSON.parse(response.body)
                unless user
                  User.create(sender_id: sender_id, first_name: data["first_name"], last_name: data["last_name"], gender: data["gender"], location: data["locale"], profile_pic: data["profile_pic"])
                end  
                user_role = User.find_by(:sender_id => sender_id)
                page = Page.find_by(:page_id => page_id)
                user_role.add_role(:subscriber, page)
                if user_role.has_role?(:hater, page) 
                  user_role.remove_role(:hater, page)
                end
                render :json => Handler.new.send_text_message(sender_id, Rumoji.decode("Thank you #{data["first_name"]} for subscribing :thumbsup:"), token), :status => 200
            return
          else
            render :json => Handler.new.send_text_message(sender_id, "No worries, you've already Subscribed!", token), :status => 200
            return
          end
        end
        
        if payload == 'UNSUBSCRIBE_PAYLOAD'
          if user && User.find_by(:sender_id => sender_id).has_role?(:subscriber, Page.find_by(:page_id => page_id))
                uri = URI.parse("https://graph.facebook.com/v2.6/#{sender_id}?fields=first_name,last_name,profile_pic,locale,gender&access_token=#{token}")
                response = Net::HTTP.get_response(uri)
                  
                data = JSON.parse(response.body)
                  
                user = User.find_by(:sender_id => sender_id)
                page = Page.find_by(:page_id => page_id)
                user.remove_role(:subscriber, page)
                user.add_role(:hater, page)
                  
                render :json => Handler.new.send_text_message(sender_id, Rumoji.decode("Sorry to see you go :worried:"), token), :status => 200
            return
          else
            render :json => Handler.new.send_text_message(sender_id, "You're not a subscriber.", token), :status => 200
            return
          end
        end
        
        if payload == 'FEEDBACK'
          Handler.new.send_text_message(sender_id, "Please leave your feedback now by starting with \'Feedback:\' so that I can understand.", token)
          Handler.new.send_text_message(sender_id, "Eg. Feedback: I don't like the way this feedback button works.", token)
        end
        
        if payload == 'SETTINGS'
          Handler.new.send_alert_settings(sender_id, token)
        end
          
        if payload =~ /GO_TO_SECTION_TWO/
          Click.create(
                  :clickable_type => "story",
                  :clickable_id => payload[/\d+/],
                  :user_id => user.id
                )
          Handler.new.send_generic_message(
            sender_id, 
            JSON.dump(Story.find_by_id(payload[/\d+/]).second_section["first_payload"]), 
            token
          )
            
          Handler.new.send_generic_message(
            sender_id, 
            JSON.dump(Story.find_by_id(payload[/\d+/]).second_section["second_payload"]), 
            token
          )
            
          Handler.new.send_generic_message(
            sender_id, 
            JSON.dump(Story.find_by_id(payload[/\d+/]).second_section["third_payload"]), 
            token
          )
        end
          
        if payload =~ /GO_TO_SECTION_THREE/
          Click.create(
                  :clickable_type => "story",
                  :clickable_id => payload[/\d+/],
                  :user_id => user.id
                )
          #Send quick replies
          Handler.new.send_generic_message(
            sender_id, 
            JSON.dump(Story.find_by_id(payload[/\d+/]).third_section["first_payload"]), 
            token
          )
        end
      #END Handle postbacks   
      #BEGIN Handle Quick Replies
      elsif msg["message"] && msg["message"]["quick_reply"] 
          page_id = msg["recipient"]["id"]
          sender_id = msg["sender"]["id"]
          quick_reply = msg["message"]["quick_reply"]["payload"]
          token = Page.find_by(:page_id => page_id).page_token
          if quick_reply == 'FREQUENCY_1'
            User.find_by(:sender_id => sender_id.to_i).update_attributes(:frequency => 1)
          end
          if quick_reply == 'FREQUENCY_2'
            User.find_by(:sender_id => sender_id.to_i).update_attributes(:frequency => 2)
          end
          if quick_reply == 'FREQUENCY_3'
            User.find_by(:sender_id => sender_id.to_i).update_attributes(:frequency => 3)
          end
          #BEGIN Handle Votes
          if quick_reply =~ /VOTE_/
            story_id = quick_reply[/\d+/].to_i
            newsletter_id = Story.find_by_id(story_id).newsletter_id
            user = User.find_by(:sender_id => sender_id.to_i)
            if UpVote.find_by(:user_id => user.id, :voteable_id => story_id) || DownVote.find_by(:user_id => user.id, :voteable_id => story_id) || NeutralVote.find_by(:user_id => user.id, :voteable_id => story_id)
              Handler.new.send_text_message(sender_id, "You've already voted, Thanks!", token)
            else
              if quick_reply =~ /VOTE_UP_STORY/
                #Create an up vote
                UpVote.create(
                  :voteable_type => "story",
                  :voteable_id => story_id,
                  :user_id => user.id
                )
              end
              if quick_reply =~ /VOTE_NEUTRAL_STORY/
                #Create a neutral vote
                NeutralVote.create(
                  :voteable_type => "story",
                  :voteable_id => story_id,
                  :user_id => user.id
                )
              end
              if quick_reply =~ /VOTE_DOWN_STORY/
                #Create a down vote
                DownVote.create(
                  :voteable_type => "story",
                  :voteable_id => story_id,
                  :user_id => user.id
                )
              end
            end
            
            #Send the next story
            if Story.find_by(:id => story_id + 1, :newsletter_id => newsletter_id)
              if Story.find_by_id(story_id + 1).first_section
                Handler.new.send_generic_message(
                  sender_id, 
                  JSON.dump(Story.find_by_id(story_id + 1).first_section["first_payload"]), 
                  token
                )
                
                Handler.new.send_generic_message(
                  sender_id, 
                  JSON.dump(Story.find_by_id(story_id + 1).first_section["second_payload"]), 
                  token
                )
                
                Handler.new.send_generic_message(
                  sender_id, 
                  JSON.dump(Story.find_by_id(story_id + 1).first_section["third_payload"]), 
                  token
                ) 
              end
            # else
            #   #If there are related videos send latest
            #   if VideoResponse.where(:voiceable_type => "newsletter", :voiceable_id => newsletter_id)
            #     videos = VideoResponse.where(:voiceable_type => "newsletter", :voiceable_id => newsletter_id)
            #     latest_video = videos.where("url <> ''").order("created_at").last
            #     if latest_video.nil?
            #       Handler.new.send_text_message(sender_id, Rumoji.decode("That's all we've got :wave: -- check back later for more stories."), token)
            #       Handler.new.send_text_message(sender_id, "If you would like to add a video response, feel free to send us a short video now!", token)
            #     else
            #       video_sender = User.find_by_id(latest_video.user_id)
            #       Handler.new.send_text_message(sender_id, "Check out the latest video response, courtesy of #{video_sender.first_name} #{video_sender.last_name}!", token)
            #       Handler.new.send_related_video(sender_id, latest_video.url, token)
            #       Handler.new.send_text_message(sender_id, "If you would like to add your own response, please send us a video now!", token)
            #     end
            #   end
            else
              Handler.new.send_text_message(sender_id, Rumoji.decode("That's all we've got :wave: -- check back later for more stories."), token)
            end
            
            # VideoResponse.create(
            #   :user_id => user.id,
            #   :voiceable_type => "newsletter",
            #   :voiceable_id => newsletter_id
            # )
            #END Handle Votes
          end
      #END Handle Quick Replies
      #BEGIN Handle text messages
      elsif msg["message"] && msg["message"]["text"] && !msg["message"]["quick_reply"]
          #Get page_id from incoming message
          page_id = msg["recipient"]["id"]
          sender_id = msg["sender"]["id"]
          text = msg["message"]["text"]
          token = Page.find_by(:page_id => page_id).page_token
          user = User.find_by(:sender_id => sender_id)
        
          if text.match(/^((H|h)(E|e|A|a)(Y|y)|(H|h)(E|e)(L|l)(L|l)(O|o))/)
            Handler.new.send_text_message(sender_id, "Don't 'Hey' me, hay a horse.", token)
          elsif text.match (/^(S|s)(O|o)(M|m)(E|e)(T|t)(H|h)(I|i)(N|n)(G|g)/)
            Handler.new.send_text_message(sender_id, "Something back.", token)
          elsif text.match (/^(F|f)eedback:/)
            feedback_text = text.sub!(/^(F|f)eedback:\s*/, '')
            Handler.new.send_text_message(sender_id, "Your feedback was: #{feedback_text}", token)
            Handler.new.send_text_message(sender_id, "Thank you for that feedback.", token)
          else
            Handler.new.send_text_message(sender_id, "Sorry, I don't understand.", token)
          end
      else
        render :nothing => true, :status => 200
        return
      end
      #END Handle text messages
      render :nothing => true, :status => 200
      return
    end
    #END Parsing JSON entry
  end
    
  def verify_callback
    challenge = params["hub.challenge"]
    verify_token = params["hub.verify_token"]
      
    if verify_token == "voicesai_confirmation"
      render :text => challenge
    else
      render :nothing => true
    end
  end
    
  private
    # Returns the resource from the created instance variable
    # @return [Object]
    def get_resource
      instance_variable_get("@#{resource_name}")
    end
    # Returns the allowed parameters for searching
    # Override this method in each API controller
    # to permit additional parameters to search on
    # @return [Hash]
    def query_params
      {}
    end
    # Returns the allowed parameters for pagination
    # @return [Hash]
    def page_params
      params.permit(:page, :page_size)
    end
    # The resource class based on the controller
    # @return [Class]
    def resource_class
      @resource_class ||= resource_name.classify.constantize
    end
    # The singular name for the resource class based on the controller
    # @return [String]
    def resource_name
      @resource_name ||= self.controller_name.singularize
    end
    # Only allow a trusted parameter "white list" through.
    # If a single resource is loaded for #create or #update,
    # then the controller for the resource must implement
    # the method "#{resource_name}_params" to limit permitted
    # parameters for the individual model.
    def resource_params
      @resource_params ||= self.send("#{resource_name}_params")
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_resource(resource = nil)
      resource ||= resource_class.find(params[:id])
      instance_variable_set("@#{resource_name}", resource)
    end
end