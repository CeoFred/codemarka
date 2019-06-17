import React, { Component } from 'react';
import Home from './containers/Home.jsx';
import  Environment  from './containers/classroom/Environment.jsx'
import { BrowserRouter , Route, Switch,Redirect } from "react-router-dom";
// import 'typeface-roboto';
class App extends Component{

    componentDidMount = () => {
        console.log('Monted App.js')
    }
   render() {
       return (
           <div data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
              {/* <Home />  */}
            <BrowserRouter>
            <Switch>
  <Route exact path="/login" component={Home} />
  <Route path="/classroom" component={Environment} />
  {/* <Route path="/contact" component={Contact} /> */}
  {/* when none of the above match, <NoMatch> will be rendered */}
  {/* <Route component={NoMatch} /> */}
  {/* <Redirect from="/old-match" to="/will-match" /> */}
        
</Switch>
            </BrowserRouter>
           </div>
       )
   }
}

export default App;