require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Twitter = require('twitter')
const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

const client = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_KEY_SECRET,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret,
    bearer_token: process.env.BEARER_TOKEN
})

let user_name = 'averywlittle'

let params = {
    user_id: user_name,
    screen_name: user_name,
    include_entities: false,
    include_rts: false,
    count: 200
}

const getTweets = async (queryParams) => {
    return await client.get('statuses/user_timeline', queryParams)

}


let allTweets = []

let newTweets = getTweets(params)
    .then(tweets => {
        console.log('first get', tweets.length)
        return tweets
    })
    .catch(error => {
        console.log('ERROR', error)
    })

allTweets = allTweets.concat(newTweets)

console.log('first batch of tweets', newTweets.length)

// let oldestTweetID = allTweets[allTweets.length-1].id - 1

// while (newTweets.length > 0) {
//     console.log(`getting tweets before ${oldestTweetID}`)

//     // The next request is aligned using the previous request's oldest tweet id
//     newTweets = client.get('statuses/user_timeline', { ...params, max_id: oldestTweetID })
//         .then(tweets => {
//             return tweets
//         })
//         .catch(error => {
//             console.log('ERROR', error)
//         })
    
//     // , function(error, tweets, response) {
//     //                 console.log('hit b')
//     //                 if(!error) {
//     //                     console.log('tweets length', tweets.length)
//     //                     return tweets
//     //                 }
//     //             })

//     allTweets = allTweets.concat(newTweets)

//     oldestTweetID = allTweets[allTweets.length-1].id - 1

//     console.log(`${allTweets.length} tweets downloaded so far`)
// }

// console.log('all tweets length =', allTweets.length)





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