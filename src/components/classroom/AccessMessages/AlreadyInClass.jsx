import React from 'react';
import notSupportedImg from '../../../media/images/vectors/page-under-construction-1.png'

function AlreadyInClass() {
    return (
        <div>
            <div
                style={ { height: '100vh' } }
                className="bg-warning pt-7 text-center justify-content-center">
                <div className="m-auto">
                    <h1 className="text-white">Heads Up!</h1>
                    <p className="p-3 text-white">
                        {' '}
                        <span className="text-white">
                            Whoops!! Seems you already joined this room, try exiting from every instance of this room and refresh this page.
                        </span>
                        <br />
                        <a
                            href="/"
                            className="btn btn-outline-success text-dark text-uppercase font-weight-bold">
                            Home
                        </a>
                    </p>
                    <hr className="divider" />
                    <div className="m-3">
                        <img
                            style={ { height: '300px' } }
                            src={ notSupportedImg }
                            alt="failed"
                            className="img-fluid"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlreadyInClass