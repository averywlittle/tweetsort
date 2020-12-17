import React from 'react'

const QueryForm = (props) => (
    <div>
        @<input value={props.query} onChange={props.handleQueryChange}/>
        <div class="interactables"><button onClick={props.queryTweets} type="submit">Get Tweets</button></div>
    </div>
)

export default QueryForm