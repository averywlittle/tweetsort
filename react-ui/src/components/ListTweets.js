import React from 'react'
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed'

const ListTweets = (props) => {

    let tweets = props.tweets
    if(tweets.length === 0) console.log('empty tweets')
    if(tweets.length === 0) return null

    let content = tweets.map(tweet => 
        <div key={tweet.id}>
            <TwitterTweetEmbed tweetId={tweet.id} crossorigin="anonymous" />
            {tweet.text}
            <p>Likes: {tweet.favorite_count}</p>
            <p>Retweets: {tweet.retweet_count}</p>
            <br></br>
        </div>
        )
    return content
}

export default ListTweets