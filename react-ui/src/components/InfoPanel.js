import React from 'react'

const ListTweets = (props) => {

    // Error message can show here
    if(props.tweetsLength === 0)
    {
        return (
        <div>
            <h3>Welcome to this sorting tool!</h3>
            <p>Type in a twitter username (the one with the '@' before it) to get up to 3,200 of an account's most recent tweets. You can sort their tweets by Date, Likes, or Retweets, and choose either ascending or descending order.</p>
            <p>A loading symbol will show while the tweets are being fetched. If this area is empty (not even this welcome message) it means the tweets are being rendered :)</p>
            <p>If you enjoy this little tool, follow me <a href="https://twitter.com/averywlittle" target="_blank">@averywlittle</a>.</p>
            <p>The code is available <a href="https://github.com/averywlittle/tweetsort" target="_blank">here</a>.</p>
        </div>
        )
    } else {
        return (
            <div>
                <p>{props.tweetsLength} tweets loaded! Showing page {props.page} of {props.maxPage}.</p>
            </div>
        )
    }
}

export default ListTweets