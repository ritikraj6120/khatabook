import React, { useContext, useEffect } from 'react'
import khataContext from "../../context/notes/khataContext"
import Customeritem from './Customeritem';
import { useHistory, Link } from 'react-router-dom'
import Navbar from './Navbar'
import './style.css'
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
const Customers = () => {
	const context = useContext(khataContext);
	let history = useHistory();
	const { customers, getCustomers } = context;
	useEffect(() => {
		if (localStorage.getItem('token'))
			getCustomers()
		else {
			history.push('/login');
		}
		// eslint-disable-next-line
	}, [])
	let customerbalance = 0;
	customers.map((customer) => { customerbalance += customer.amount })


	return (
		<>
			<Navbar />
			<div className="card mt-5" style={{ width: "18rem" }}>
				<div className="card-body">
					<h5 className="card-title">You will get </h5>
					<p className="card-text">Rs {customerbalance}</p>
				</div>
			</div>
			<div className=" my-3">
				<br />
				<div className="container mx-2 h3">
					{customers.length === 0 && 'No Customers'}
				</div>
				<div className="d-flex justify-content-center">
					<div className='d-grid gap-2 col-6 '>
						{customers.map((customer) => {
							return <Customeritem key={customer._id} customer={customer} />
						})}
					</div>
				</div>
			</div>
			<Link to="/khatabook/addcustomer">
				<button type="button" className="btn  sticky-btn">
					<PersonAddRoundedIcon style={{ color: "white" }} />
				</button>
			</Link>

		</>
	)
}

export default Customers

