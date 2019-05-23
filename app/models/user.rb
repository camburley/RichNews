class User < ActiveRecord::Base
  has_many :stories
  has_many :summaries, through: :stories
  has_many :comments, through: :summaries
  
  has_many :up_votes, as: :voteable
  has_many :down_votes, as: :voteable
  has_many :neutral_votes, as: :voteable
  
  has_many :clicks, as: :clickable
  
  has_many :video_responses, as: :voiceable

  rolify
    def self.create_with_omniauth(auth)
      info = auth.info
      raw_info = auth.extra.raw_info
      
      oauth = Koala::Facebook::OAuth.new(ENV["FACEBOOK_APP_ID"], ENV["FACEBOOK_SECRET"])
      new_access_info = oauth.exchange_access_token_info auth.credentials.token
      
      new_access_token = new_access_info["access_token"]
        
        create! do |user|
          user.fb_id = auth.uid
          
          user.email = info.email
          user.fb_url = 'https://www.facebook.com/' + auth.uid
          user.profile_pic = info.image
          
          user.first_name = raw_info.first_name
          user.last_name = raw_info.last_name
          
          user.fb_token = new_access_token
        end
    end
end
