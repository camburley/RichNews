class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      
      t.belongs_to :brand
      
      t.string :page_name
      t.string :page_id
      t.string :page_token
      t.string :page_url
      
      t.jsonb  :welcome_message
      
      t.timestamps null: false
    end
  end
end
