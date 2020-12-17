import React from 'react'

const QueryTypeSelector = (props) => (
    <form class="interactables">
        <label>
            Sort by 
            <select value={props.QueryType} onChange={props.handleQueryTypeChange}>
                <option value="favorites">Likes</option>
                <option value="retweets">Reach</option>
                <option value="date">Date</option>
            </select>
        </label>
    </form>
)

export default QueryTypeSelector