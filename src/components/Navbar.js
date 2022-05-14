import React from 'react'
import { Link, useLocation, useHistory } from "react-router-dom";
import UserNavbar from './UserNavbar';
import Button from '@mui/material/Button';

const Navbar = () => {
	let history = useHistory();
	const handleLogout = () => {
		localStorage.removeItem('token');
		history.push('/login');
	}
	let location = useLocation();
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/customers">Shopkeeper-diary</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className={`nav-link ${location.pathname.toLowerCase().includes('customer') === true ? "active" : ""}`} aria-current="page" to="/customers">Customers</Link>
						</li>

						<li className="nav-item">
							<Link className={`nav-link ${location.pathname.toLowerCase().includes('supplier') === true ? "active" : ""}`} to="/suppliers">	Suppliers</Link>
						</li>

						<li className="nav-item">
							<Link className={`nav-link ${location.pathname.toLowerCase().includes('note') === true ? "active" : ""}`} to="/notes">Notes</Link>
						</li>

						<li className="nav-item">
							<Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About Khatabook</Link>
						</li>
					</ul>
					{
						!localStorage.getItem('token') ? <form className="d-flex">
							<Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
							<Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
						</form> :
							<>
								<UserNavbar />
								<Button variant="contained" onClick={handleLogout}>Logout</Button>
								{/* <button onClick={handleLogout} className="btn btn-primary">Logout</button> */}
							</>
					}
				</div>
			</div>
		</nav>
	)
}

export default Navbar


// location.pathname.includes() === "/khatabook/customers" || location.pathname === "/khatabook/suppliers"