import React from 'react'
import { Link } from 'react-router-dom'
import NavigationBarItems from './NavigationBarItems';
import { useSelector } from 'react-redux';

import logo from '../../../media/images/colab-04.png'
export default function NavigationBar() {

    const { app } = useSelector(state => state);
    let display;
  
    if(app.environment === 'classroom'){
      display = false;
    }else{
      display = true;
    }
  
    return (
        <nav className="navbar navbar-horizontal navbar-expand-lg navbar-dark navbar-transparent" 
style={ { backgroundColor:'#172839',display:display ? 'block' : 'none' ,zIndex:9999,position:'absolute',width:'100%',top:0} }>
            <div className="container">
                <Link className="navbar-brand" to="/"><img height="30px" src={ logo } alt='logo'/></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-primary" aria-controls="navbar-primary" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavigationBarItems/>
            </div>
        </nav>
    )
}
