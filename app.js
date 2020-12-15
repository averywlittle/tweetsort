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
    include_entities: false
}

client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if(!error) {
        console.log('tweets length', tweets.length)
    }
})

const getTweets = (queryParams) => {

    client.get('statuses/user_timeline', queryParams, function(error, tweets, response) {
        return response.JSON(tweets)
    })


}

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