class Story < ActiveRecord::Base
    belongs_to :page
    
    has_many :summaries
    
    has_many :up_votes, as: :voteable
    has_many :down_votes, as: :voteable
    has_many :neutral_votes, as: :voteable
    
    has_many :clicks, as: :clickable
end
