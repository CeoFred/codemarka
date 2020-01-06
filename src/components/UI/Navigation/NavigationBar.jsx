/** @format */

import React from 'react'
import NavigationBarItems from './NavigationBarItems'
import { useSelector } from 'react-redux'

import logo from '../../../media/images/logo/codemark__logo.png'
export default function NavigationBar() {
    const { app } = useSelector(state => state)
    let display

    if (app.environment === 'classroom') {
        display = false
    } else {
        display = true
    }
    return (
        <div style={ {display:display ? 'block':'none'} }>
            <nav
                className="navbar navbar-main navbar-expand-lg navbar-sticky navbar-dark bg-dark"
                id="navbar-main">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img
                            style={ { height: '20px', width: '130px' } }
                            alt="codemarka"
                            src={ logo }
                            id="navbar-logo"
                        />{' '}
                    </a>
                    <button
                        className="navbar-toggler collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbar-main-collapse"
                        aria-controls="navbar-main-collapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="navbar-collapse navbar-collapse-overlay collapse"
                        id="navbar-main-collapse">
                        <div className="collapse-header align-items-center">
                            <div className="col-6">
                                <a className="navbar-brand" href="/">
                                    <img
                                        style={ {
                                            height: '20px',
                                            width: '130px'
                                        } }
                                        alt="codemarka"
                                        src={ logo }
                                    />{' '}
                                </a>{' '}
                            </div>{' '}
                            <div className="col-6 text-right">
                                <button
                                    className="navbar-toggler collapsed"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#navbar-main-collapse"
                                    aria-controls="navbar-main-collapse"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-x">
                                        <line
                                            x1="18"
                                            y1="6"
                                            x2="6"
                                            y2="18"></line>
                                        <line
                                            x1="6"
                                            y1="6"
                                            x2="18"
                                            y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <NavigationBarItems />
                    </div>
                </div>
            </nav>
        </div>
    )
}
