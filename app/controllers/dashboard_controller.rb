class DashboardController < ApplicationController
  before_filter :authenticate_user!
  before_action :correct_user?
  helper_method :current_user 
  layout "dash_publisher"
  
  require 'net/http'
  require 'uri'
  require 'json'
  require 'rumoji'

    def dashboard
      current_page = Page.find_by_page_id(current_user.selected_page)
      @total_subscribers = User.with_role(:subscriber, Page.find_by(:page_id => current_page.page_id))
      @total_stories = Story.where(:page_id => current_user.id).count
      @total_haters = User.with_role(:hater, Page.find_by(:page_id => current_page.page_id))
      @new_subscribers = @total_subscribers.where(:created_at => 4.hours.ago..Time.now)
      @total_clicks = Click.where(:clickable_id => Story.where(:page_id => current_page.id)).count
    end
    
    def send_message
      unless current_user.selected_page.empty?
      
        user_page = current_user.selected_page
        current_page = Page.find_by_page_id(user_page)
        
        if current_user.selected_newsletter.nil?
          newsletter = Newsletter.create(page_id: current_page.id)
          current_user.update_attributes(selected_newsletter: newsletter.id)
        end
        
        if request.post?
        
          user_page = current_user.selected_page
          current_page = Page.find_by_page_id(user_page)
          current_newsletter = Newsletter.find_by_id(current_user.selected_newsletter)
          
          if params[:next_story] == 'create'
            story = Story.create(:page_id => current_page.id, :newsletter_id => current_newsletter.id)
                
                first_section_json = JSON.generate(
                {
                  :first_payload => {
                    :message => {
                      :text => params[:s1_headline]
                    }
                  },
                  :second_payload => {
                    :notification_type => "NO_PUSH",
                    :message => {
                      :attachment => {
                        :type => "template",
                        :payload => {
                          :template_type => "generic",
                          :elements => [
                            {
                              :title => params[:s1_title],
                              :image_url => params[:s1_image]
                            }
                          ]
                        }
                      }
                    }
                  },
                  :third_payload => {
                    :notification_type => "NO_PUSH",
                    :message => {
                      :attachment => {
                        :type => "template",
                        :payload => {
                          :template_type => "button",
                          :text => params[:s1_bubble],
                          :buttons => [
                            {
                              :type => "postback",
                              :title => params[:s1_bubblebtn],
                              :payload => "GO_TO_SECTION_TWO_#{story.id}"
                            },
                            {
                              :type => "postback",
                              :title => "Next Story",
                              :payload => "NEXT_STORY_#{story.id}"
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              )
              second_section_json = JSON.generate(
                 {
                  :first_payload => {
                    :message => {
                      :text => params[:s2_bubble]
                    }
                  },
                  :second_payload => {
                    :message => {
                      :attachment => {
                        :type => "image",
                        :payload => {
                          :url => params[:s2_image]
                        }
                      }
                    }
                  },
                  :third_payload => {
                    :message => {
                      :attachment => {
                        :type => "template",
                        :payload => {
                          :template_type => "button",
                          :text => params[:s2_bubble_two],
                          :buttons => [
                            {
                              :type => "postback",
                              :title => params[:s2_bubble_two_btn],
                              :payload => "GO_TO_SECTION_THREE_#{story.id}"
                            },
                            {
                              :type => "postback",
                              :title => "Next Story",
                              :payload => "NEXT_STORY_#{story.id}"
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              )
              third_section_json = JSON.generate(
                {
                  :first_payload => {
                    :message => {
                      :text => params[:s3_bubblebtn],
                      :quick_replies => [
                        {
                          :content_type => "text",
                          :title => Rumoji.decode(":thumbsup:"),
                          :payload => "VOTE_UP_STORY_#{story.id}"
                        },
                        {
                          :content_type => "text",
                          :title => Rumoji.decode("¯\\_(ツ)_/¯"),
                          :payload => "VOTE_NEUTRAL_STORY_#{story.id}"
                        },
                        {
                          :content_type => "text",
                          :title => Rumoji.decode(":thumbsdown:"),  
                          :payload => "VOTE_DOWN_STORY_#{story.id}"
                        }
                      ]
                    }
                  }
                }
              )
              
              story.update_attributes(
                :first_section => first_section_json, 
                :second_section => second_section_json,
                :third_section => third_section_json
              )
          end
          
          if params[:add_queue] == 'schedule'
            
              story = Story.create(:page_id => current_page.id, :newsletter_id => current_newsletter.id)
                
                first_section_json = JSON.generate(
                {
                  :first_payload => {
                    :message => {
                      :text => params[:s1_headline]
                    }
                  },
                  :second_payload => {
                    :notification_type => "NO_PUSH",
                    :message => {
                      :attachment => {
                        :type => "template",
                        :payload => {
                          :template_type => "generic",
                          :elements => [
                            {
                              :title => params[:s1_title],
                              :image_url => params[:s1_image]
                            }
                          ]
                        }
                      }
                    }
                  },
                  :third_payload => {
                    :notification_type => "NO_PUSH",
                    :message => {
                      :attachment => {
                        :type => "template",
                        :payload => {
                          :template_type => "button",
                          :text => params[:s1_bubble],
                          :buttons => [
                            {
                              :type => "postback",
                              :title => params[:s1_bubblebtn],
                              :payload => "GO_TO_SECTION_TWO_#{story.id}"
                            },
                            {
                              :type => "postback",
                              :title => "Next Story",
                              :payload => "NEXT_STORY_#{story.id}"
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              )
              second_section_json = JSON.generate(
                 {
                  :first_payload => {
                    :message => {
                      :text => params[:s2_bubble]
                    }
                  },
                  :second_payload => {
                    :message => {
                      :attachment => {
                        :type => "image",
                        :payload => {
                          :url => params[:s2_image]
                        }
                      }
                    }
                  },
                  :third_payload => {
                    :message => {
                      :attachment => {
                        :type => "template",
                        :payload => {
                          :template_type => "button",
                          :text => params[:s2_bubble_two],
                          :buttons => [
                            {
                              :type => "postback",
                              :title => params[:s2_bubble_two_btn],
                              :payload => "GO_TO_SECTION_THREE_#{story.id}"
                            },
                            {
                              :type => "postback",
                              :title => "Next Story",
                              :payload => "NEXT_STORY_#{story.id}"
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              )
              third_section_json = JSON.generate(
                {
                  :first_payload => {
                    :message => {
                      :text => params[:s3_bubblebtn],
                      :quick_replies => [
                        {
                          :content_type => "text",
                          :title => Rumoji.decode(":thumbsup:"),
                          :payload => "VOTE_UP_STORY_#{story.id}"
                        },
                        {
                          :content_type => "text",
                          :title => Rumoji.decode("¯\\_(ツ)_/¯"),
                          :payload => "VOTE_NEUTRAL_STORY_#{story.id}"
                        },
                        {
                          :content_type => "text",
                          :title => Rumoji.decode(":thumbsdown:"),  
                          :payload => "VOTE_DOWN_STORY_#{story.id}"
                        }
                      ]
                    }
                  }
                }
              )
              
              story.update_attributes(
                :first_section => first_section_json, 
                :second_section => second_section_json,
                :third_section => third_section_json
              )
              
              unless story.first_section.empty?
                date = params[:date]
                hours = params[:hours]
                minutes = params[:minutes]
                time_dayNight = params[:time_dayNight]
                zone = params[:timezone]
                
                date_time = date + " " + hours + ":" + minutes + "" + time_dayNight
                
                stories_sorted = Newsletter.find(current_newsletter.id).stories.order("created_at").first
                converted_time = ActiveSupport::TimeZone[zone].parse(date_time).utc
                current_newsletter.update_attributes(:subscriber_send => converted_time)
                
                NewsletterSender.set(wait_until: converted_time).perform_later(
                  stories_sorted.first_section.to_json,
                  current_newsletter.id,
                  current_page.page_id,
                  current_page.page_token,
                  User.with_role(:subscriber, current_page).pluck(:sender_id)
                )
                
                current_user.update_attributes(:selected_newsletter => nil)
              end
          end
        end
      else
        redirect_to setting_page_path
      end
    end
    
    def scheduled
      require 'sidekiq/api'
      
      unless current_user.selected_page.empty?
        user_page = current_user.selected_page
        current_page = Page.find_by_page_id(user_page)
        @newsletters = Newsletter.where(:page_id => current_page).order('created_at DESC').limit(20)
        
        if request.post?
          if params[:story] == 'update'
            
            newsletter_id = params[:newsletterid]
            
            queue = Sidekiq::ScheduledSet.new
            queue.each do |q|
              q.delete if q.args[0]["arguments"][1].to_s == newsletter_id
            end
            
            current_story = Story.find_by_id(params[:storyid])
            
              first_section_json = JSON.generate(
                {
                  :first_payload => {
                    :message => {
                      :text => params[:s1_headline]
                    }
                  },
                  :second_payload => {
                    :notification_type => "NO_PUSH",
                    :message => {
                      :attachment => {
                        :type => "template",
                        :payload => {
                          :template_type => "generic",
                          :elements => [
                            {
                              :title => params[:s1_title],
                              :image_url => params[:s1_image]
                            }
                          ]
                        }
                      }
                    }
                  },
                  :third_payload => {
                    :notification_type => "NO_PUSH",
                    :message => {
                      :attachment => {
                        :type => "template",
                        :payload => {
                          :template_type => "button",
                          :text => params[:s1_bubble],
                          :buttons => [
                            {
                              :type => "postback",
                              :title => params[:s1_bubblebtn],
                              :payload => "GO_TO_SECTION_TWO_#{current_story.id}"
                            },
                            {
                              :type => "postback",
                              :title => "Next Story",
                              :payload => "NEXT_STORY_#{current_story.id}"
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              )
              second_section_json = JSON.generate(
                 {
                  :first_payload => {
                    :message => {
                      :text => params[:s2_bubble]
                    }
                  },
                  :second_payload => {
                    :message => {
                      :attachment => {
                        :type => "image",
                        :payload => {
                          :url => params[:s2_image]
                        }
                      }
                    }
                  },
                  :third_payload => {
                    :message => {
                      :attachment => {
                        :type => "template",
                        :payload => {
                          :template_type => "button",
                          :text => params[:s2_bubble_two],
                          :buttons => [
                            {
                              :type => "postback",
                              :title => params[:s2_bubble_two_btn],
                              :payload => "GO_TO_SECTION_THREE_#{current_story.id}"
                            },
                            {
                              :type => "postback",
                              :title => "Next Story",
                              :payload => "NEXT_STORY_#{current_story.id}"
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              )
              third_section_json = JSON.generate(
                {
                  :first_payload => {
                    :message => {
                      :text => params[:s3_bubblebtn],
                      :quick_replies => [
                        {
                          :content_type => "text",
                          :title => Rumoji.decode(":thumbsup:"),
                          :payload => "VOTE_UP_STORY_#{current_story.id}"
                        },
                        {
                          :content_type => "text",
                          :title => Rumoji.decode("¯\\_(ツ)_/¯"),
                          :payload => "VOTE_NEUTRAL_STORY_#{current_story.id}"
                        },
                        {
                          :content_type => "text",
                          :title => Rumoji.decode(":thumbsdown:"),  
                          :payload => "VOTE_DOWN_STORY_#{current_story.id}"
                        }
                      ]
                    }
                  }
                }
              )
              
              current_story.update_attributes(
                :first_section => first_section_json, 
                :second_section => second_section_json,
                :third_section => third_section_json
              )
              
                current_newsletter = Newsletter.find_by_id(newsletter_id)
                stories_sorted = Newsletter.find(newsletter_id).stories.order("created_at").first
                
                NewsletterSender.set(wait_until: current_newsletter.subscriber_send).perform_later(
                  stories_sorted.first_section.to_json,
                  current_newsletter.id,
                  current_page.page_id,
                  current_page.page_token,
                  User.with_role(:subscriber, current_page).pluck(:sender_id)
                )
          end
          
          if params[:story] == "delete"
            
            current_story = Story.delete(params[:storyid])
            
            newsletter_id = params[:newsletterid]
            
            queue = Sidekiq::ScheduledSet.new
            queue.each do |q|
              q.delete if q.args[0]["arguments"][1].to_s == newsletter_id
            end
            
            newsletter_id = params[:newsletterid]
            current_newsletter = Newsletter.find_by_id(newsletter_id)
            stories_sorted = Newsletter.find(newsletter_id).stories.order("created_at").first
                
            NewsletterSender.set(wait_until: current_newsletter.subscriber_send).perform_later(
              stories_sorted.first_section.to_json,
              current_newsletter.id,
              current_page.page_id,
              current_page.page_token,
              User.with_role(:subscriber, current_page).pluck(:sender_id)
            )
          end
          
          if params[:newsletter] == "delete"
            newsletter_id = params[:newsletterid]
            
            Newsletter.delete(newsletter_id)
            
            queue = Sidekiq::ScheduledSet.new
            queue.each do |q|
              q.delete if q.args[0]["arguments"][1].to_s == newsletter_id
            end
          end
        end
      else
        redirect_to setting_page_path
      end
    end
    
    def growth_tool
      
    end
end
