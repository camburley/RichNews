class Page < ActiveRecord::Base
    belongs_to :brand
    
    has_many :newsletters
    has_many :rss_feeds
    resourcify
end
