require 'rest-client'

module Messenger  
  class BaseController < ApplicationController
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
        send_message(data)
      end
    
      def send_generic_message(sender, mes, token)
        data = {
          recipient: { id: sender },
          message: mes
        }
        send_message(data)
      end 
    end
    
    def callback
      messaging_event = JSON.parse(request.body.read)
      messaging_event["entry"].first["messaging"].each do |msg|
        if msg["message"] && msg["message"]["text"]
          page_id = msg["recipient"]["id"]
          sender_id = msg["sender"]["id"]
          text = msg["message"]["text"]
          token = Publisher.find_by_id(page_id).page_token
          if text.match(/^(H|h)(E|e|A|a)(Y|y)/)
            res = Handler.new.send_text_message(sender, "Don't 'Hey' me, hay a horse.", token)
          end
        end
        200
      end
    end
    
    def varify_callback
      challange = params["hub.challenge"]
      verify_token = params["hub.verify_token"]
      
      if verify_token == "voicesai_confirmation"
        challange
      else
        puts "Error, wrong validation token"
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
end
