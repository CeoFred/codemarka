
import React,{Component} from 'react';
import {connect} from 'react-redux';
import TopProgress from '../../components/UI/TopProgress'

import Aux from '../Auxi';

class layout extends Component{

    state = {
        showSideDrawer:false,
        mounted:false
    }

componentDidMount(){
    this.setState({mounted:true})
}
    render(){
        return(
            <Aux>
                <TopProgress mounted={this.state.mounted}/>
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