require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
// Serves static pages from React build
app.use(express.static('build'))
app.use(express.json())


const twitter = require('./twitter')
const sorting = require('./sorting')
const comparators = require('./comparators')

//////////

app.post('/api/query/', (request, response, next) => {

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
            mergeParams.comparator = comparators.options.byFavorites
            break;

        case "retweets":
            mergeParams.comparator = comparators.options.byReach
            break;

        case "date":
            mergeParams.comparator = comparators.options.byDate
            break;
        default:
            break;
    }

    twitter.getTweets(params)
        .then(result => {
            console.log(`fetch success from user @${result.user.screen_name}, number of tweets: ${result.allTweets.length}`)
            // filter our tweets of just plain retweets, but keep quote tweets
            let tweetsWithoutRetweets = result.allTweets.filter(tweet => !tweet.retweeted_status)
            // sort tweets
            let sortedArray = sorting.sortTweets(tweetsWithoutRetweets, mergeParams)
            
            response.json({ tweets: sortedArray, user: result.user })
        })
        .catch(error => {
            console.log('ERROR', error)
            next(error)
        })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})