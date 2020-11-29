import React from 'react';
import { Link } from "react-router-dom"



function Navigation() {
    return (
            <div className="collapse navbar-collapse flex-grow-0" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="mx-2"><Link to='/'>Home</Link></li>
                    <li className="mx-2"><Link to='/racing'>Racing Bar Chart</Link></li>
                </ul>
            </div>
    )
}

export default Navigation;