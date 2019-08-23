import React from 'react'
import {  withRouter } from 'react-router-dom';

import Layout from './containers/public/Layout';
import Routes from './routes'; 

const router = () => {
  return (
    <Layout>
      <Routes/>
    </Layout>
  )
}

export default withRouter(router)
