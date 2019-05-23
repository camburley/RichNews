class CreateNeutralVotes < ActiveRecord::Migration
  def change
    create_table :neutral_votes do |t|
      
      t.belongs_to :user
      t.references :voteable, polymorphic: true, index: true
      
      t.timestamps null: false
    end
  end
end
