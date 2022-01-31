import React from 'react'
import { Link, useLocation } from "react-router-dom";



const Navbar = () => {
	const customers="/khatabook/customers";
	const suppliers="/khatabook/suppliers";
	let location = useLocation();
	return (
		<nav className="navbar navbar-expand-lg  navbar-dark bg-primary" style={{color : "#ffffff" }}>
			<div className="container-fluid">
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className={`nav-link pb-0 ${location.pathname === customers ? "active border-bottom border-white border-5" : ""}`} to={customers}>Customers</Link>
						</li>
						<li className="nav-item">
							<Link className={`nav-link pb-0 ${location.pathname === suppliers? "active border-bottom border-white border-5" : ""}`} to={suppliers}>Suppliers</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
