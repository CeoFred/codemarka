import React from 'react'
import PropTypes from 'prop-types'

function ColabClassPreviewLayout(props) {
  return (
    <div>
          <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/#">codemarka</a>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <a className="nav-link" href="/#">Sign out</a>
        </li>
      </ul>
    </nav>

    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link " href="/#">
                  <i className="fa fa-home pr-2"></i>
                  Dashboard <i className="sr-only">(current)</i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/#">
                  <i className="fa fa-file pr-2"></i>
                 Classrooms
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/#">
                  <i className="fa fa-shopping-cart pr-2"></i>
                  Activity
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/#">
                  <i className="fa fa-users pr-2"></i>
                  Students
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/#">
                  <i className="fa pr-2 fa-gears"></i>
                  Settings
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/#">
                  <i className="fa pr-2 fa-plus-square-o"></i>
                  Upgrade Plan
                </a>
              </li>
            </ul>

           
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">ClassName - class_id</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group mr-2">
                <button class="btn btn-sm btn-outline-success">Start</button>
                <button class="btn btn-sm btn-outline-danger">Delete</button>
              </div>
            </div>
          </div>

          <iframe title="class" className="my-4 w-100" id="myChart"
           width="900" height="500" src="http://localhost:3000/c/classroom/5dea4b6504275f0f4c02ec4e" frameborder="0"></iframe>
          <h2>Class Details</h2>
          <div className="table-responsive">
          
          </div>
        </main>
      </div>
    </div>

    </div>
  )
}

ColabClassPreviewLayout.propTypes = {
  children: PropTypes.any
}

export default ColabClassPreviewLayout

