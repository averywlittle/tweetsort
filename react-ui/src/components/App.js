import React, { useState } from 'react'
import QueryForm from './QueryForm'
import ListTweets from './ListTweets'
import axios from 'axios'



const App = () => {

    const [ query, setQuery ] = useState("") // [ ] query can be expanded to include query params
    const [ user, setUser ] = useState(null)
    const [ tweets, setTweets ] = useState([])

    const handleQueryChange = (event) =>  {
        setQuery(event.target.value)
    }

    const queryTweets = () => {
        console.log('query', query)

        // post request because we need to send some data to form the query params
        axios.post('http://localhost:3001/api/query/', query)
            .then(response => {
                console.log(response.data.user)
                setUser(response.data.user)
                setTweets(response.data.tweets)
            })

    }

    return (
        <div>
            <h2>tweetsort</h2>
            <QueryForm query={query} handleQueryChange={handleQueryChange} queryTweets={queryTweets}/>
            <ListTweets tweets={tweets}/>
        </div>
    )
}

export default App