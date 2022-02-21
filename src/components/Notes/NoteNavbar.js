import React from 'react'
import { Link, useLocation } from "react-router-dom";

const NoteNavbar = () => {
	let location = useLocation();
	return (
		<nav className="navbar navbar-expand-lg   navbar-dark bg-primary" style={{color : "#ffffff" }}>
			<div className="container-fluid">
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className={`nav-link pb-0 ${location.pathname === '/important'? "active border-bottom border-white border-5" : ""}`} to="/important">Important</Link>
						</li>
						<li className="nav-item">
							<Link className={`nav-link pb-0 ${location.pathname === '/completed' ? "active border-bottom border-white border-5" : ""}`} to="/completed">Completed</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default NoteNavbar
