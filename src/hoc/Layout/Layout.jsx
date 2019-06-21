
import React,{Component} from 'react';
import {connect} from 'react-redux';
import TopProgress from '../../components/UI/TopProgress'
import StoreWrapper from '../StoreWrapper';

import Aux from '../Auxi';

class layout extends Component{

    state = {
        showSideDrawer:false,
        mounted:true
    }

componentDidMount(){
    this.setState({mounted:true})
}
    render(){
        return(
            <Aux>
                <TopProgress mounted={this.state.mounted} />
                <StoreWrapper {...this.props} >
                   {this.props.children}
                </StoreWrapper>
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