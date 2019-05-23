class NewsletterSender < ActiveJob::Base
  #include Sidekiq::Worker
  queue_as :default
  
  def perform(first_section, newsletter_id, page_id, page_token, sub_ids)
    logger.warn "Section is a #{JSON.parse(first_section).class}"
    first_payload = JSON.parse(first_section)["first_payload"]
    second_payload = JSON.parse(first_section)["second_payload"]
    third_payload = JSON.parse(first_section)["third_payload"]
    sub_ids.each do |u|
      if Newsletter.where(:page_id => Page.find_by(:page_id => page_id).id, :created_at => 24.hours.ago..Time.now).count <= User.find_by(:sender_id => u).frequency || User.find_by(:sender_id => u).frequency.nil?
        header = {
        "recipient" => {
          "id" => "#{u}"
          }
        }
  
        uri = URI.parse("https://graph.facebook.com/v2.6/#{page_id}/messages?access_token=#{page_token}")
      
        unless first_payload.nil?
          payload_one = Net::HTTP::Post.new(uri)
          payload_one.content_type = "application/json"
          payload_one.body = JSON.dump(header.merge(first_payload))
        end
        
        unless second_payload.nil?              
          payload_two = Net::HTTP::Post.new(uri)
          payload_two.content_type = "application/json"
          payload_two.body = JSON.dump(header.merge(second_payload))
        end
        
        unless third_payload.nil?
          payload_three = Net::HTTP::Post.new(uri)
          payload_three.content_type = "application/json"
          payload_three.body = JSON.dump(header.merge(third_payload))
        end
        Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") do |http|
          http.request(payload_one)
          http.request(payload_two)
          http.request(payload_three)
        end
      end
    end
  end
end