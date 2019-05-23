class CreatePublishers < ActiveRecord::Migration
  def change
    create_table :publishers do |t|
      
      t.belongs_to :brand
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :profile_pic
      t.string :last_login
      t.string :fb_id
      t.string :page_id
      t.string :fb_url
      t.string :access_token

      t.timestamps null: false
    end
  end
end
