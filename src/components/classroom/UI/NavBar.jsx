import React from 'react'

function NavBar(props) {
    return (
        <div>
<nav className="navbar navbar-horizontal navbar-expand-lg navbar-dark bg-success">
    <div className="container">
    <a className="navbar-brand" href="/w#">ClassRoom__name</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-success" aria-controls="navbar-success" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-success">
            
            <ul className="navbar-nav ml-lg-auto">
                <li className="nav-item">
                    <a className="nav-link nav-link-icon" href="/w#">
                        <i className="fa fa-star"></i>
                        <span className="nav-link-inner--text d-lg-none">Favorites</span>
                    </a>
                </li>
                <li className="nav-item">
                     <a className="nav-link nav-link-icon" href="/w#">
                        <i className="fa fa-fire"></i>
                        <span className="nav-link-inner--text d-lg-none">Another action</span>
                    </a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link nav-link-icon" href="/w#" id="navbar-success_dropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-cogs"></i>
                        <span className="nav-link-inner--text d-lg-none">Settings</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-success_dropdown_1">
                        <a className="dropdown-item" href="/w#">Action</a>
                        <a className="dropdown-item" href="/w#">Another action</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/w#">Something else here</a>
                    </div>
                </li>
            </ul>
            
        </div>
    </div>
</nav> 
        </div>
    )
}

export default NavBar
