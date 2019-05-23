class DownVote < ActiveRecord::Base
    belongs_to :voteable
    belongs_to :user
end
