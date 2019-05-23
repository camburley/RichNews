class Publisher < ActiveRecord::Base
    belongs_to :brand
    
    def self.create_with_omniauth(auth)
    info = auth.info
    raw_info = auth.extra.raw_info
        
      create! do |publisher|
        publisher.fb_id = auth.uid
        
        publisher.email = info.email
        publisher.fb_url = 'https://www.facebook.com/' + auth.uid
        publisher.profile_pic = info.image
        
        publisher.first_name = raw_info.first_name
        publisher.last_name = raw_info.last_name
      end
    end
end
