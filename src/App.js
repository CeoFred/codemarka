import React, { useEffect } from 'react';
import Router from './router';
import { useDispatch } from 'react-redux'


import * as actionCreator from './redux/actions/index';

import './app.css';
function App() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(actionCreator.tryValidatingCookie())
  }, [dispatcher])
  return (
    <Router />
  );
};
export default App;