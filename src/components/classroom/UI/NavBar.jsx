import React from 'react';

import logo from '../../../media/images/colab-04.png'

function NavBar(props) {
    return (
        <nav
            className="navbar navbar-horizontal navbar-expand-lg navbar-dark bg-dark"
            style={{ height: '13vh' }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img height="30px" src={logo} alt="codemarka_logo" />
                </a>
                <span className="navbar-brand">
                    {props.topic}
                    <br />
                    <small>by: {props.name}</small>
                </span>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar-success"
                    aria-controls="navbar-success"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar-success">
                    <ul className="navbar-nav ml-lg-auto">
                        <li className="nav-item" title="download files">
                            <a
                                className="nav-link nav-link-icon"
                                href={props.downloadLink}>
                                <i className="fa fa-file-download"></i>
                            </a>
                        </li>
                        <li
                            title="class participants"
                            className="nav-item"
                            data-toggle="modal"
                            data-target=".participants_modal_cont">
                            <span className="nav-link nav-link-icon">
                                <i className="fa fa-users">
                                    <span class="badge badge-danger badge-circle badge-sm badge-floating border-white">
                                        {props.number}
                                    </span>
                                </i>
                                <span className="nav-link-inner--text d-lg-none">
                                    Participants
                                </span>
                            </span>
                        </li>
                        <li title="favourite" className="nav-item">
                            <a
                                onClick={props.favourite}
                                className="nav-link nav-link-icon"
                                href="/#">
                                <i
                                    className={`fa fa-star ${
                                        props.isFavourite ? 'bg-gold' : ''
                                    }`}></i>
                                <span className="nav-link-inner--text d-lg-none">
                                    Favorite
                                </span>
                            </a>
                        </li>

                        <li
                            title="Audio Broadcast"
                            className="nav-item dropdown">
                            <span
                                className="nav-link nav-link-icon"
                                id="navbar-success_dropdown_1"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                <i className="fa fa-microphone-slash"></i>
                                <span className="nav-link-inner--text d-lg-none">
                                    Audio Broadcast
                                </span>
                            </span>
                            <div
                                className="dropdown-menu dropdown-menu-right"
                                aria-labelledby="navbar-success_dropdown_1">
                                <span className="dropdown-item">
                                    Audio Broadcast coming soon.
                                </span>
                            </div>
                        </li>

                        <li title="Notifications" className="nav-item dropdown">
                            <span
                                className="nav-link nav-link-icon"
                                id="navbar-success_dropdown_1"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                <i className="fa fa-bell"></i>
                                <span className="nav-link-inner--text d-lg-none">
                                    Notifications
                                </span>
                            </span>
                            <div
                                className="dropdown-menu dropdown-menu-right"
                                aria-labelledby="navbar-success_dropdown_1">
                                <span className="dropdown-item">
                                    No notifications
                                </span>
                            </div>
                        </li>

                        <li
                            data-toggle="modal"
                            data-target="#details_modal_cont"
                            title="classroom Information"
                            className="nav-item">
                            <span className="nav-link nav-link-icon">
                                <i className="fa fa-info-circle"></i>
                                <span className="nav-link-inner--text d-lg-none">
                                    Details
                                </span>
                            </span>
                        </li>

                        <li
                            data-toggle="modal"
                            data-target="#pinned_modal_cont"
                            title="Pinned Messages"
                            className="nav-item">
                            <span className="nav-link nav-link-icon">
                                <i className="fa fa-pen-nib"></i>
                                <span className="nav-link-inner--text d-lg-none">
                                    Pinned Messages
                                </span>
                            </span>
                        </li>
                        <li title="Settings" className="nav-item dropdown">
                            <span
                                className="nav-link nav-link-icon"
                                id="navbar-success_dropdown_1"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                <i className="fa fa-cogs"></i>
                                <span className="nav-link-inner--text d-lg-none">
                                    Settings
                                </span>
                            </span>
                            <div
                                className="dropdown-menu dropdown-menu-right"
                                aria-labelledby="navbar-success_dropdown_1">
                                <a
                                    style={{ cursor: 'pointer' }}
                                    className="dropdown-item"
                                    onClick={props.exitClassGracefully}>
                                    Exit
                                </a>

                                <div className="dropdown-divider"></div>
                                <a
                                    style={{ cursor: 'pointer' }}
                                    className="dropdown-item"
                                    onClick={props.testConnection}>
                                    Test connection
                                </a>
                                {props.owner ? (
                                    <div>
                                        <a
                                            style={{ cursor: 'pointer' }}
                                            onClick={props.startClass}
                                            className="dropdown-item text-success">
                                            Start Class
                                        </a>
                                        <a
                                            style={{ cursor: 'pointer' }}
                                            className="dropdown-item text-danger"
                                            onClick={props.endClass}>
                                            End Class
                                        </a>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
