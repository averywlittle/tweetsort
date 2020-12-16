import React from 'react'

const ListTweets = (props) => {

    let tweets = props.tweets

    if(tweets.length === 0) return null

    let content = tweets.map(tweet => 
        <div key={tweet.id}>
            {tweet.text}
            <p>Likes: {tweet.favorite_count}</p>
            <p>Retweets: {tweet.retweet_count}</p>
            <br></br>
        </div>
        )
    return content
}

export default ListTweets