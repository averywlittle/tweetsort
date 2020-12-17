import React from 'react'
import { Tweet } from 'react-twitter-widgets'

const ListTweets = (props) => {

    const tweets = props.tweets
    if(tweets.length === 0) return null

    // If page 1 => tweets 0 to 10
    // If page 10 => tweets 100 to 110

    const maxTweetIndex = props.page * 10

    const renderedTweets = tweets.slice(maxTweetIndex - 10, maxTweetIndex)

    const content = renderedTweets.map(tweet => 
        <div key={tweet.id}>
            <Tweet tweetId={tweet.id_str}/>
            <br></br>
        </div>
        )
    return content
}

export default ListTweets