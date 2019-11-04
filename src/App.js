import React, { useEffect } from 'react';
import Router from './router';
import { useDispatch } from 'react-redux'

import * as action from './store/actions/Types';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: action.COOKIE_VALIDATE_INIT })
  }, [dispatch])

  return (
    <Router />
  );
};
export default App;