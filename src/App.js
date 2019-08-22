import React, { useEffect } from 'react';
import Router from './router';
import { useDispatch } from 'react-redux'


import * as action from './redux/actions/Types';

import './App.css';
function App() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher({type:action.COOKIE_VALIDATE_INIT})
  }, [dispatcher])
  return (
    <Router />
  );
};
export default App;