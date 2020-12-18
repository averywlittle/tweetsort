import React from 'react'

const QueryForm = (props) => (
    <div className="interactables">
        @<input className="queryBar" value={props.query} onChange={props.handleQueryChange} maxLength="15" size="15" placeholder="username"
        onKeyPress={event => {
            if (event.key === 'Enter') {
                console.log("Enter!")
                props.queryTweets()
            }
        }}/>
        <div className="interactables"><button className="styledButtons" onClick={props.queryTweets} type="submit">Get Tweets</button></div>
    </div>
)

export default QueryForm