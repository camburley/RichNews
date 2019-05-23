class VideoResponse < ActiveRecord::Base
    belongs_to :voiceable
    belongs_to :user
    
    has_many :up_votes, as: :voteable
    has_many :down_votes, as: :voteable
    has_many :neutral_votes, as: :voteable
end
