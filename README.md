# TweetSort
A tool to sort through a user's tweets.

The reason I wish this existed is because I love lurking through the top of all time on Reddit. I want to provide that experience on Twitter.
There are so many talented and experienced people on the site sharing their expertise, insight, or humor. Twitter's ephemeral nature prevents us from seeing a user's
valuable input from the past. Search is great if you know the syntax for commands, but is also dependent on you as a user knowing what content you're looking for.

I've found that users that thread a lot will resurface their own valuable tweets. What about users that don't do that? This tool seeks to enable people to seek out valuable past
tweets from people they want to learn more from.

This is available at https://www.tweetsort.io/.

Challenges:
Getting a user's tweets (API only returns ~200 at a time)
Avoiding being rate limited
  -[ ] I could easily just make a simple mongo collection to track request data, and check if I'm at my limit for a specified time period.
Protecting API keys (used environment variables for the first time)
Storing data in cache to reduce calls to API
  -[ ] I could only return just the tweet id since that's all that's needed to embed a tweet. Would reduce the amount of data sent
  -[ ] I could only return the id, str_id, created_on, favorite_count, and retweet_count variables for reduced data, but would also have enough to sort tweets on the front end without making more requests (as long as they are for the same account/username)
  
I could pay for more access to the twitter api and could possibly get tons more tweets. But frankly, it's expensive. This is not going to make money, so that's not going to happen. 

Another approach I could take is to build a web scraper utility (probably in python) and use it to get all a user's tweets. While that would accomplish the goal, it would take me some time to build. Also, for an account with a lot of tweets, idk how long a scraper would have to run to get all the data needed. I'm not storing any tweets.

Overall this was a great project to practice the React fundamentals I'm learning through the full stack open course (https://fullstackopen.com/en/about).
I made a node and express backend, and while I'm not storing any data I did use a merge sort to transform the data dynamically. There are no tests for this, and probably won't be. Although, that is what I'm learning about currently. This was also my first time deploying an app that wasn't a static website. So that was fun. I learned how to use environment variables. Heroku makes it easy.

Can't wait for the next project. I'm going to tweet about this tomorrow and I hope the twitter api doesn't get salty about the number of requests.

That's another thing I learned, that I think going forward I should be picky about what I build on top of.
