import React from 'react'

const PageSelector = (props) => {
    if (props.tweetsLength === 0) {
        return null
    }

    return (
    <div class="pagers">
        <button onClick={props.handlePageDown} type="submit" class="interactables">Page Down</button>
        {props.page}
        <button onClick={props.handlePageUp} type="submit" class="interactables">Page Up</button>
    </div>
    )
}

export default PageSelector