class CreateSummaries < ActiveRecord::Migration
  def change
    create_table :summaries do |t|

      t.belongs_to :user
      t.belongs_to :story
      t.jsonb :content
      
      t.timestamps null: false
    end
  end
end
