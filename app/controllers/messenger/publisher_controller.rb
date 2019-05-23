module Messenger  
  class PublisherController < Messenger::BaseController
    
    
    private
      def publisher_params
        params.require(:publisher).permit(:access_token)
      end
      
      def query_params
        params.permit(:access_token, :fb_id, :page_id)
      end
  end
end
