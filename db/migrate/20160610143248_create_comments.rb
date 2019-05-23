class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      
      t.belongs_to :summary
      t.belongs_to :user
      t.jsonb :content
      
      t.timestamps null: false
    end
  end
end
