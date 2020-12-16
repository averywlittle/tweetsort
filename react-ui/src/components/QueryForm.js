import React from 'react'

const QueryForm = (props) => (
    <div>
        @<input value={props.query} onChange={props.handleQueryChange}/>
        <button onClick={props.queryTweets} type="submit">Get Tweets</button>
    </div>
)

export default QueryForm