class SessionsController < ApplicationController
  
  def create
    publisher = User.where(:fb_id => auth['uid']).first || User.create_with_omniauth(auth)

    session[:fb_id] = publisher.fb_id
    publisher.update_attribute(:last_activity, Time.now)
    redirect_to dashboard_path
  end

  def new
    redirect_to '/auth/facebook'
  end
  
  def destroy
    reset_session
    redirect_to root_url, notice => 'Signed out'
  end
  
  protected
      def auth
        request.env['omniauth.auth']
      end
end