
import React,{Component} from 'react';
import {connect} from 'react-redux';


import Aux from '../Auxi';

class layout extends Component{

    state = {
        showSideDrawer:false
    }


    render(){
        return(
            <Aux>
       {this.props.children}
            </Aux>
    
            );
        
    }
        
}
    // higher order component Aux used
 
const mapStateToProps = state => {
    return {
        token:state.auth.token
    }
}
export default connect(mapStateToProps)(layout);