class Click < ActiveRecord::Base
    belongs_to :clickable
    belongs_to :user
end