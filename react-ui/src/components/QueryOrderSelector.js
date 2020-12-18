import React from 'react'

const QueryOrderSelector = (props) => (
    <form className="interactables">
        <label>
            In 
            <select className="selectButtons" value={props.queryOrder} onChange={props.handleQueryOrderChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </label>
        order
    </form>
)

export default QueryOrderSelector