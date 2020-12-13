import React from 'react';
import { Link } from "react-router-dom"


function Navigation() {
    return (
            <div className="nav" id="navbarNav">
                <h3 className="title" style={{ margin: "0.2rem" }} id="navbarTitle">
                <Link to='/'>COVID Tracker</Link></h3>
                <ul className="navbar-nav">
                    <li className="navbar-nav-li">
                        <Link to='/'>Home</Link>
                    </li>
                    <li className="navbar-nav-li">
                        <Link to='/racing'>Racing Bar Chart</Link>
                    </li>
                </ul>
            </div>
    )
}

export default Navigation;