import React from 'react'

const PageSelector = (props) => {
    if (props.tweetsLength === 0) {
        return null
    }

    return (
    <div className="pagers">
        <button className="styledPagerButtons" onClick={props.handlePageDown} type="submit">Previous Page</button>
        {props.page}
        <button className="styledPagerButtons" onClick={props.handlePageUp} type="submit">Next Page</button>
    </div>
    )
}

export default PageSelector