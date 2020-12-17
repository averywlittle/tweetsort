import React from 'react'

const Loading = (props) => {

    if (props.loading === true) {
        return (
            <div id="loading"> 
                <img src="loading.gif" alt="loading symbol" width="100" height="25"/> 
            </div>
        )
    } else {
        return null
    }
}

export default Loading