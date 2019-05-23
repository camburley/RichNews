![LOGO](app/assets/images/logo.png)
## RICHNEWS
Rich Media Messenger Newsletter
Built and Released as a Messenger Bot on Facebook Messenger



## Changelog
###### 6/9/2016
```
- Installed: RVM, Rails, Ruby (prepare for app)
- Created: `voicesbot` rails app
- Created: Postgresql database
- Created: User for postgres + schema
- Updated: README
- Added: Gems Admin, Devise, Omni, Draper, Cancan, Messenger
- Added: Force redirect to HTTPS
- Added: Certs, VERIFY_NONE for certs
```
###### 6/10/2016
```
- Created: Models (Publisher, Brand, Subscription, User, RssFeed, Comment, Story, Newsletter)
- Added: Relations for models
- Added: Messenger Bot
- Connected: Messenger Bot with Facebook + responding messages
```

###### 6/13/2016
```
- Added: Function to save Publisher into DB
- Updated: Migration fields to more readable format
```

###### 6/14/2016
```
- Recreated: Messenger bot for rails
- Added: Variables for bot
- Added: New routes for bot
```

###### 6/15/2016
```
- Added: Auth for publisher_path(just for auth publishers)
- Added: Function to include first_name, last_name, gender to DB
- Added: Function to read Publisher Pages from facebook
- Added: Current_Publisher function by fb_id
- Added: Function to get long live token for publishers
```
