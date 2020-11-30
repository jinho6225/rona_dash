import React from 'react';
import { Link } from "react-router-dom"


function Navigation() {
    return (
            <div className="nav" id="navbarNav">
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