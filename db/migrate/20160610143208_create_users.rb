class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :profile_pic
      t.string :sender_id
      
      t.string :fb_token
      t.string :fb_id
      t.string :fb_url
      t.string :selected_page
      
      t.string :selected_newsletter
      
      t.string :account_status
      t.integer :summary_count
      t.integer :summary_used
      t.datetime :last_activity
      
      t.string :gender
      t.integer :age
      t.string :location
      t.integer :frequency
      t.string :sessions
      t.string :category

      t.timestamps null: false
    end
  end
end
