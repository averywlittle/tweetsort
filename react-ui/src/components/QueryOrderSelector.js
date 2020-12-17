import React from 'react'

const QueryOrderSelector = (props) => (
    <form class="interactables">
        <label>
            In 
            <select value={props.queryOrder} onChange={props.handleQueryOrderChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
             order
        </label>
    </form>
)

export default QueryOrderSelector