// yet to start

import React from 'react'
import notStartedImg from '../../../media/images/vectors/pluto-coming-soon-1.png'

function NotStarted(props){
    return (
        <div>
            <div
                style={{ height: '100vh' }}
                className="bg-success pt-7 text-center justify-content-center">
                <div className="m-auto">
                    <h1 className="text-white">Heads Up!</h1>
                    <p className="p-3 text-white">
                        {' '}
                        <span className="text-white">
                            This class session is schedulled to
                            start at {props.startTimeFull}
                        </span>
                        <br />
                        <a
                            href="/"
                            className="btn btn-primary text-dark text-uppercase font-weight-bold">
                            Home
                        </a>
                    </p>
                    <hr className="divider" />
                    <div className="m-3">
                        <img
                            style={{ height: '300px' }}
                            src={notStartedImg}
                            alt="failed"
                            className="img-fluid"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotStarted;