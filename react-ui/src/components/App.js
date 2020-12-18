import React, { useState } from 'react'
import QueryForm from './QueryForm'
import ListTweets from './ListTweets'
import Loading from './Loading'
import QueryTypeSelector from './QueryTypeSelector'
import QueryOrderSelector from './QueryOrderSelector'
import PageSelector from './PageSelector'
import InfoPanel from './InfoPanel'
import axios from 'axios'


const App = () => {

    const [ query, setQuery ] = useState("")
    const [ user, setUser ] = useState(null)
    const [ tweets, setTweets ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ queryType, setQueryType ] = useState("favorites")
    const [ queryOrder, setQueryOrder ] = useState("desc")
    const [ page, setPage ] = useState(1)
    const [ error, setError ] = useState(null)

    const handleQueryChange = (event) =>  {
        setQuery(event.target.value)

        if (event.target.value.length === 0) {
            setTweets([])
            setError(null)
        }
    }

    const handleQueryTypeChange = (event) => {
        event.preventDefault()
        setQueryType(event.target.value)
    }

    const handleQueryOrderChange = (event) => {
        event.preventDefault()
        setQueryOrder(event.target.value)
    }

    // page cannot go lower than 1 or higher than tweets.length/10 + 1
    const handlePageUp = (event) => {
        event.preventDefault()
        if (tweets.length !== 0) {

            if (page <= (Math.ceil(tweets.length/10))) {
                setPage(page + 1)
            }
            else console.log('Page maximum')
        }
    }

    const handlePageDown = (event) => {
        event.preventDefault()
        if (tweets.length !== 0) {
            if (page !== 1) {
                setPage(page - 1)
            }
            else console.log('Page minimum')
        }
    }

    const queryTweets = () => {
        console.log('query', query)
        if (query.length > 0) {
            setError(null)
            setLoading(true)

            const queryObject = { query, queryType, queryOrder }

            // post request because we need to send some data to form the query params
            axios.post('/api/query/', queryObject)
                .then(response => {
                    console.log(response.data.user)
                    console.log('tweets returned', response.data.tweets.length)
                    setUser(response.data.user)
                    setQuery(response.data.user.screen_name)
                    setTweets(response.data.tweets)
                    setPage(1)
                    setLoading(false)
                })
                .catch(error => {
                    console.log('POST ERROR', error)
                    setError(error)
                    setLoading(false)
                    setTweets([])
                })
        }
    }

    return (
        <div>
            <h2>tweetsort</h2>
            <QueryTypeSelector queryType={queryType} handleQueryTypeChange={handleQueryTypeChange}/>
            <QueryOrderSelector queryOrder={queryOrder} handleQueryOrderChange={handleQueryOrderChange}/>
            <QueryForm query={query} handleQueryChange={handleQueryChange} queryTweets={queryTweets}/>
            <Loading loading={loading}/>
            <InfoPanel tweetsLength={tweets.length} page={page} maxPage={Math.ceil(tweets.length/10)} error={error}/>
            <ListTweets tweets={tweets} page={page}/>
            <PageSelector page={page} handlePageUp={handlePageUp} handlePageDown={handlePageDown} tweetsLength={tweets.length}/>
        </div>
    )
}

export default App