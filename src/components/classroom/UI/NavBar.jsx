import React from 'react';

import logo from '../../../media/images/colab-04.png'

function NavBar(props) {
    return (
        <div>
            <nav className="navbar navbar-horizontal navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/"><img height="30px" src={ logo } alt='codemarka_logo'/></a>
                    <span className="navbar-brand">{props.name}</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-success" aria-controls="navbar-success" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar-success">
            
                        <ul className="navbar-nav ml-lg-auto">
                            <li className="nav-item">
                                <a className="nav-link nav-link-icon" href={ props.downloadLink }>
                                    <i className="fa fa-file-download"></i>
                                </a>
                            </li>
                            <li className="nav-item" data-toggle="modal" data-target=".participants_modal_cont">
                                <span className="nav-link nav-link-icon" >
                                    <i className="fa fa-users"></i>
                                    <span className="nav-link-inner--text d-lg-none">Participants</span>
                                </span>

                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-link-icon" href="/w#">
                                    <i className="fa fa-star"></i>
                                    <span className="nav-link-inner--text d-lg-none">Favorite</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-link-icon" href="/w#">
                                    <i className="fa fa-info-circle"></i>
                                    <span className="nav-link-inner--text d-lg-none">Details</span>
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link nav-link-icon" href="/w#" id="navbar-success_dropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-cogs"></i>
                                    <span className="nav-link-inner--text d-lg-none">Settings</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-success_dropdown_1">
                                    <a className="dropdown-item" href="/">Leave</a>
                                    <a className="dropdown-item" href="/classroom/report/:classid">Report classroom</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="/w#">Alert Admin</a>
                                </div>
                            </li>
                        </ul>
            
                    </div>
                </div>
            </nav> 
        </div>
    )
}

export default NavBar
