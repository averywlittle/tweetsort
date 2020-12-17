
const Twitter = require('twitter')

const client = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_KEY_SECRET,
    access_token_key: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    bearer_token: process.env.BEARER_TOKEN
})

const getTweets = async (queryParams) => {

    let allTweets = []
    let newTweets = await client.get('statuses/user_timeline', queryParams)
        .then(tweets => {
            if (tweets !== undefined) {
                return tweets
            }
        })
        .catch(error => {
            return Promise.reject(error)
        })

    allTweets = allTweets.concat(newTweets)
    console.log(`first tweets length ${allTweets.length}`)

    let oldestTweetID = allTweets[allTweets.length-1].id

    const user = allTweets[0].user

    while (newTweets.length > 0) {
        console.log(`getting tweets before ${oldestTweetID}`)

        // The next request is aligned using the previous request's oldest tweet id
        newTweets = await client.get('statuses/user_timeline', { ...queryParams, max_id: oldestTweetID, trim_user: true })
            .then(tweets => {
                console.log('new tweets length', tweets.length)
                return tweets
            })
            .catch(error => {
                return Promise.reject(error)
            })

        if (newTweets.length <= 1) {
            break
        } else {
            // If duplicate tweet by id, slice the duplicated tweet out
            if (allTweets[allTweets.length-1].id === newTweets[0].id) {
                
                newTweets = newTweets.slice(1)
            }

            allTweets = allTweets.concat(newTweets)
            
            // Adjust lowest ID to new lowest id in newTweets if available
            // No initial value because we assume the newTweets
            oldestTweetID = newTweets.reduce((oldestID, currentTweet) => currentTweet.id < oldestID ? currentTweet.id : oldestID.id)

            console.log(`${allTweets.length} tweets downloaded so far`)
        }
    }

    console.log('all tweets length =', allTweets.length)
    return { allTweets, user }
}

exports.getTweets = getTweets