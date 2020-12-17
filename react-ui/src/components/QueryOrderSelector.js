import React from 'react'

const QueryOrderSelector = (props) => (
    <form>
        <label>
            In order:
            <select value={props.queryOrder} onChange={props.handleQueryOrderChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </label>
    </form>
)

export default QueryOrderSelector