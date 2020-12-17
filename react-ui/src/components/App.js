import React, { useState } from 'react'
import QueryForm from './QueryForm'
import ListTweets from './ListTweets'
import Loading from './Loading'
import QueryTypeSelector from './QueryTypeSelector'
import QueryOrderSelector from './QueryOrderSelector'
import axios from 'axios'



const App = () => {

    const [ query, setQuery ] = useState("")
    const [ user, setUser ] = useState(null)
    const [ tweets, setTweets ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ queryType, setQueryType ] = useState("favorites")
    const [ queryOrder, setQueryOrder ] = useState("desc")

    const handleQueryChange = (event) =>  {
        setQuery(event.target.value)
    }

    const handleQueryTypeChange = (event) => {
        event.preventDefault()
        setQueryType(event.target.value)
    }

    const handleQueryOrderChange = (event) => {
        event.preventDefault()
        setQueryOrder(event.target.value)
    }

    const queryTweets = () => {
        console.log('query', query)
        setLoading(true)

        const queryObject = { query, queryType, queryOrder }

        // post request because we need to send some data to form the query params
        axios.post('/api/query/', queryObject)
            .then(response => {
                console.log(response.data.user)
                setUser(response.data.user)
                setTweets(response.data.tweets)
                setLoading(false)
            })

    }

    return (
        <div>
            <h2>tweetsort</h2>
            <QueryTypeSelector queryType={queryType} handleQueryTypeChange={handleQueryTypeChange}/>
            <QueryOrderSelector queryOrder={queryOrder} handleQueryOrderChange={handleQueryOrderChange}/>
            <QueryForm query={query} handleQueryChange={handleQueryChange} queryTweets={queryTweets}/>
            <Loading loading={loading}/>
            <ListTweets tweets={tweets}/>
        </div>
    )
}

export default App