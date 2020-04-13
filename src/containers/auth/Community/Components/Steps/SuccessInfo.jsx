/** @format */

import React from 'react'

function SuccessInformation() {
    return (
        <div className="row">
            <div
                className="col-md-12 mt-5 text-center d-flex justify-content-center align-items-end"
                style={{ paddingLeft: '15px' }}>
                <h6 className="h2 mb-1 text-success">
                    <b>You are all set!</b>
                </h6>
                <p className="mb-0">
                    One more thing, you'll need to verify your email to 
                    have access to your dashboard but checking for a welcome message from
                    us in your inbox,happy learning.
                </p>
            </div>
       </div>
    )
}

export default SuccessInformation
