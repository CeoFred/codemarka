import React, { Component } from 'react';

class ChatList extends Component {

  render() {
    return (
        <div id="sidebar" className="users p-chat-user showChat">
                <div className="had-container">
                    <div className="p-fixed users-main">
                        <div className="user-box">
                            <div className="chat-search-box">
                                <a className="back_friendlist">
                                    <i className="feather icon-x"></i>
                                </a>
                                <div className="right-icon-control">
                                    <div className="input-group input-group-button">
                                        <input type="text" id="search-friends" name="footer-email" className="form-control" placeholder="Search Friend"/>
                                        <div className="input-group-append">
                                            <button className="btn btn-primary waves-effect waves-light" type="button"><i className="feather icon-search"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="main-friend-list">
                                <div className="media userlist-box waves-effect waves-light" data-id="1" data-status="online" data-username="Josephin Doe">
                                    <a className="media-left" href="#!">
                                                <img className="media-object img-radius img-radius" src="assets/images/avatar-3.jpg" alt="Generic placeholder image "/>
                                                <div className="live-status bg-success"></div>
                                            </a>
                                    <div className="media-body">
                                        <div className="chat-header">Josephin Doe</div>
                                    </div>
                                </div>
                                <div className="media userlist-box waves-effect waves-light" data-id="2" data-status="online" data-username="Lary Doe">
                                    <a className="media-left" href="#!">
                                                <img className="media-object img-radius" src="assets/images/avatar-2.jpg" alt="Generic placeholder image"/>
                                                <div className="live-status bg-success"></div>
                                            </a>
                                    <div className="media-body">
                                        <div className="f-13 chat-header">Lary Doe</div>
                                    </div>
                                </div>
                                <div className="media userlist-box waves-effect waves-light" data-id="3" data-status="online" data-username="Alice">
                                    <a className="media-left" href="#!">
                                                <img className="media-object img-radius" src="assets/images/avatar-4.jpg" alt="Generic placeholder image"/>
                                                <div className="live-status bg-success"></div>
                                            </a>
                                    <div className="media-body">
                                        <div className="f-13 chat-header">Alice</div>
                                    </div>
                                </div>
                                <div className="media userlist-box waves-effect waves-light" data-id="4" data-status="offline" data-username="Alia">
                                    <a className="media-left" href="#!">
                                                <img className="media-object img-radius" src="assets/images/avatar-3.jpg" alt="Generic placeholder image"/>
                                                <div className="live-status bg-default"></div>
                                            </a>
                                    <div className="media-body">
                                        <div className="f-13 chat-header">Alia<small className="d-block text-muted">10 min ago</small></div>
                                    </div>
                                </div>
                                <div className="media userlist-box waves-effect waves-light" data-id="5" data-status="offline" data-username="Suzen">
                                    <a className="media-left" href="#!">
                                                <img className="media-object img-radius" src="assets/images/avatar-2.jpg" alt="Generic placeholder image"/>
                                                <div className="live-status bg-default"></div>
                                            </a>
                                    <div className="media-body">
                                        <div className="f-13 chat-header">Suzen<small className="d-block text-muted">15 min ago</small></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
  }
}

export default ChatList;
