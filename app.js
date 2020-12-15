require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Twitter = require('twitter')
const { response } = require('express')
const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

const client = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_KEY_SECRET,
    access_token_key: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    bearer_token: process.env.BEARER_TOKEN
})

let user_name = 'averywlittle'

let params = {
    user_id: user_name,
    screen_name: user_name,
    include_entities: false,
    count: 200
}

const getTweets = async (queryParams) => {

    let allTweets = []
    let newTweets = await client.get('statuses/user_timeline', queryParams)
        .then(tweets => {
            if (tweets !== undefined) {
                return tweets
            }
        })
        .catch(error => {
            console.log('ERROR', error)
        })

    allTweets = allTweets.concat(newTweets)
    console.log(`first tweets length ${allTweets.length}`)

    let oldestTweetID = allTweets[allTweets.length-1].id

    while (newTweets.length > 0) {
        console.log(`getting tweets before ${oldestTweetID}`)

        // The next request is aligned using the previous request's oldest tweet id
        newTweets = await client.get('statuses/user_timeline', { ...params, max_id: oldestTweetID })
            .then(tweets => {
                console.log('new tweets length', tweets.length)
                let tweetTexts = tweets.map(tweet => tweet.text)
                console.log('looped tweets: ', tweetTexts)
                return tweets
            })
            .catch(error => {
                console.log('ERROR', error)
            })

        if (newTweets.length <= 1) {
            break
        }

        allTweets = allTweets.concat(newTweets)
        
        // Adjust lowest ID to new lowest id in newTweets if available
        // No initial value because we assume the newTweets
        oldestTweetID = newTweets.reduce((oldestID, currentTweet) => currentTweet.id < oldestID ? currentTweet.id : oldestID.id)

        console.log(`${allTweets.length} tweets downloaded so far`)
    }

    console.log('all tweets length =', allTweets.length)
    return allTweets
}

getTweets(params)
    .then(tweets => console.log(`fetch success from user ${user_name}, number of tweets: ${tweets.length}`))
    .catch(error => console.log(error))

const mergeSort = (unsortedArray) => {

}



//////////



app.get('/', (request, response) => {
    response.send(`Hello world`)
})

app.get('/api/query', (request, response) => {
    getTweets(request.body.queryParams)
        .then(result => {

        })
        .catch(error => {
            console.log('error fetching user data', error)
        })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})