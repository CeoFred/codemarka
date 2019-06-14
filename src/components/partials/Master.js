import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ChatList from './ChatList';
import InnerChat from './InnerChat';
import Nav from './Nav';
import CreateAppModal from '../core/Modals/CreateAppModal';

class Master extends Component {
    
  constructor(props){
      super(props);
  }

  componentWillMount(){
   
  }

  componentDidMount () {
    const links = [
        "/assets/js/pcoded.min.js",
        "/assets/js/vertical/vertical-layout.min.js",
        "/assets/pages/dashboard/custom-dashboard.min.js",
        "/assets/js/script.min.js",
        "/assets/js/common-pages.js",
        
    ];
    for(let i = 0; i < links.length; i++){
        const script = document.createElement("script");
        script.src = links[i];
        script.async = true;
        document.body.appendChild(script);
    }
    
}


  render() {
    
    return (
        <div>
            {/* Preloader start */}
            <CreateAppModal/>
            <div className="loader-bg">
                <div className="loader-bar"></div>
            </div>
           
            <div id="pcoded" className="pcoded">
                <div className="pcoded-overlay-box"></div>
                <div className="pcoded-container navbar-wrapper">
                    <Nav/>
                    <ChatList/>
                    <InnerChat/>     
                    <div className="pcoded-main-container">
                        <div className="pcoded-wrapper">
                            <Sidebar/>
                        </div>
                        <div className="pcoded-content">
                            {this.props.children}
                        </div>      
                    </div>
                </div>
            </div>
        </div>
    );
}
}

export default Master;
