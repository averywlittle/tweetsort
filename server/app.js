require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Twitter = require('twitter')
const app = express()

app.use(cors())
// Serves static pages from React build
app.use(express.static('build'))
app.use(express.json())


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
            console.log('ERROR', error)
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
                let tweetTexts = tweets.map(tweet => tweet.text)
                console.log('looped tweets: ', tweetTexts)
                return tweets
            })
            .catch(error => {
                console.log('ERROR', error)
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

const favoriteComparator = (left, right) => {
    if (left.favorite_count > right.favorite_count) return true
    else if (left.favorite_count <= right.favorite_count) return false
}

const dateComparator = (left, right) => {
    // Convert to dates to enable comparisons
    const leftDate = new Date(left.created_at)
    const rightDate = new Date(right.created_at)

    if (leftDate > rightDate) return true
    else if (leftDate <= rightDate) return false
}

const reachComparator = (left, right) => {
    if (left.retweet_count > right.retweet_count) return true
    else if (left.retweet_count <= right.retweet_count) return false
}

const mergeSort = (unsortedArray, mergeParams) => {
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
        mergeSort(left, mergeParams), mergeSort(right, mergeParams), mergeParams
    )
}

const merge = (left, right, mergeParams) => {
    let resultArray = [], leftIndex = 0, rightIndex = 0

    // Concatenate values to result array in order
    while (leftIndex < left.length && rightIndex < right.length) {

        let comparison = mergeParams.comparator(left[leftIndex], right[rightIndex])

        // Already returned in descending order, so just flip if ascending was sent
        if (mergeParams.order === "asc") {
            comparison = !comparison
        }

        if (comparison) {
            resultArray.push(left[leftIndex]);
            leftIndex++; // move left array cursor
          } else {
            resultArray.push(right[rightIndex]);
            rightIndex++; // move right array cursor
          }
    }

    // Capture possible leftover elements
    return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex))
}



//////////

app.post('/api/query/', (request, response) => {

    console.log('body', request.body)
    
    let params = {
        user_id: request.body.query,
        screen_name: request.body.query,
        include_entities: false,
        count: 200
    }

    const mergeParams = {
        order: request.body.queryOrder
    }

    switch (request.body.queryType) {
        case "favorites":
            mergeParams.comparator = favoriteComparator
            break;

        case "retweets":
            mergeParams.comparator = reachComparator
            break;

        case "date":
            mergeParams.comparator = dateComparator
            break;
        default:
            break;
    }

    getTweets(params)
        .then(result => {
            console.log(`fetch success from user @${result.user.screen_name}, number of tweets: ${result.allTweets.length}`)
            // filter our tweets of just plain retweets, but keep quote tweets
            let tweetsWithoutRetweets = result.allTweets.filter(tweet => !tweet.retweeted_status)
            // sort tweets
            let sortedArray = mergeSort(tweetsWithoutRetweets, mergeParams)
            
            response.json({ tweets: sortedArray, user: result.user })
        })
        .catch(error => console.log(error))
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})