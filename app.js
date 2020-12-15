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
let sort_dir = 'descending'
let sort_focus = 'favs'

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

const mergeSort = (unsortedArray) => {
    // No need to sort the array if the array only has one element or empty
    if (unsortedArray.length <= 1) {
        return unsortedArray
    }
    // In order to divide the array in half, we need to figure out the middle
    const middle = Math.floor(unsortedArray.length / 2)

    // This is where we will be dividing the array into left and right
    const left = unsortedArray.slice(0, middle)
    const right = unsortedArray.slice(middle)

    // Using recursion to combine the left and right
    return merge(
        mergeSort(left), mergeSort(right)
    )
}

const merge = (left, right) => {
    let resultArray = [], leftIndex = 0, rightIndex = 0

    // Concatenate values to result array in order
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex].favorite_count > right[rightIndex].favorite_count) {
            // [ ] Check for duplicates, retweets without text here
            resultArray.push(left[leftIndex]);
            leftIndex++; // move left array cursor
          } else {
            // [ ] Check for duplicates, retweets without text here
            resultArray.push(right[rightIndex]);
            rightIndex++; // move right array cursor
          }
    }

    // Capture possible leftover elements
    return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex))
}


getTweets(params)
    .then(tweets => {
        console.log(`fetch success from user ${user_name}, number of tweets: ${tweets.length}`)
        let sortedArray = mergeSort(tweets)
        console.log('First:', sortedArray[0])
        console.log('Second:', sortedArray[1])
        console.log('Third:', sortedArray[2])
    })
    .catch(error => console.log(error))



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