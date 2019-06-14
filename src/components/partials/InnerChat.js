import React, { Component } from 'react';

class InnerChat extends Component {

  render() {
    return (
        <div className="showChat_inner">
        <div className="media chat-inner-header">
            <a className="back_chatBox">
                        <i className="feather icon-x"></i> Josephin Doe
                    </a>
        </div>
        <div className="main-friend-chat">
            <div className="media chat-messages">
                <a className="media-left photo-table" href="#!">
                                <img className="media-object img-radius img-radius m-t-5" src="assets/images/avatar-2.jpg" alt="Generic placeholder image"/>
                            </a>
                <div className="media-body chat-menu-content">
                    <div className="">
                        <p className="chat-cont">I'm just looking around. Will you tell me something about yourself?</p>
                    </div>
                    <p className="chat-time">8:20 a.m.</p>
                </div>
            </div>
            <div className="media chat-messages">
                <div className="media-body chat-menu-reply">
                    <div className="">
                        <p className="chat-cont">Ohh! very nice</p>
                    </div>
                    <p className="chat-time">8:22 a.m.</p>
                </div>
            </div>
            <div className="media chat-messages">
                <a className="media-left photo-table" href="#!">
                                <img className="media-object img-radius img-radius m-t-5" src="assets/images/avatar-2.jpg" alt="Generic placeholder image"/>
                            </a>
                <div className="media-body chat-menu-content">
                    <div className="">
                        <p className="chat-cont">can you come with me?</p>
                    </div>
                    <p className="chat-time">8:20 a.m.</p>
                </div>
            </div>
        </div>
        <div className="chat-reply-box">
            <div className="right-icon-control">
                <div className="input-group input-group-button">
                    <input type="text" className="form-control" placeholder="Write hear . . "/>
                    <div className="input-group-append">
                        <button className="btn btn-primary waves-effect waves-light" type="button"><i className="feather icon-message-circle"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default InnerChat;
