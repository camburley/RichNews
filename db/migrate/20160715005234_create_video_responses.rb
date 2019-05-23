class CreateVideoResponses < ActiveRecord::Migration
  def change
    create_table :video_responses do |t|

      t.belongs_to :user
      t.references :voiceable, polymorphic: true, index: true
      t.string :url
      
      t.timestamps null: false
    end
  end
end
