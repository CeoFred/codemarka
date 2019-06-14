import React from 'react'

function Images(props) {
    return (
        <div>
            <img src={'../../../public/images/'+props.src} alt={props.alt} className="img-fluid img-absolute"/>
        </div>
    )
}

export default Images
