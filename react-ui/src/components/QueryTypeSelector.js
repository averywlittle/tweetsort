import React from 'react'

const QueryTypeSelector = (props) => (
    <form className="interactables">
        <label>
            Sort by 
            <select className="selectButtons" value={props.QueryType} onChange={props.handleQueryTypeChange}>
                <option value="favorites">Likes</option>
                <option value="retweets">Reach</option>
                <option value="date">Date</option>
            </select>
        </label>
    </form>
)

export default QueryTypeSelector