import React, { Component } from 'react';
import Home from './containers/Home.jsx';
import  Environment  from './containers/classroom/Environment.jsx'
class App extends Component{

    componentDidMount = () => {
        console.log('Monted App.js')
    }
   render() {
       return (
           <div data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
              {/* <Home />  */}
        <Environment/>
           </div>
       )
   }
}

export default App;