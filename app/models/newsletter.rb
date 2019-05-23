class Newsletter < ActiveRecord::Base
    belongs_to :page
    has_many :stories
    
    has_many :up_votes, as: :voteable
    has_many :down_votes, as: :voteable
    has_many :neutral_votes, as: :voteable
    
    has_many :video_responses, as: :voiceable
end
