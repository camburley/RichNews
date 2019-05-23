class Subscription < ActiveRecord::Base
    belongs_to :publisher
    belongs_to :user
end
