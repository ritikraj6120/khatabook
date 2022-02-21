import React, { useContext, useEffect } from 'react'
import khataContext from "../../context/khataContext"
import Customeritem from './Customeritem';
import { useHistory, Link } from 'react-router-dom'
import Navbar from './Navbar'
import './style.css'
import { Button } from '@mui/material';
import generatePDF  from './services/customerReport'

import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
const Customers = () => {
	let history = useHistory();
	const { customers, getCustomers } = useContext(khataContext);;
	useEffect(() => {
		if (localStorage.getItem('token'))
			getCustomers()
		else {
			history.push('/login');
		}
		// eslint-disable-next-line
	}, [])
	let customerlendamount = 0;
	let customertakeamount = 0;
	for (let i = 0; i < customers.length; i++) 
	{
		if(customers[i].lendamount-customers[i].takeamount>=0)
		{
			customerlendamount+=(customers[i].lendamount-customers[i].takeamount);
		}
		else{
			customertakeamount+=(customers[i].takeamount-customers[i].lendamount);
		}
	}
	return (
		<>
			<Navbar a="/khatabook/customers" b="/khatabook/suppliers" />
			<div className="card mt-5" style={{ width: "18rem" }}>
				<div className="card-body">
					<h5 className="card-title">You will get </h5>
					<p className="card-text">Rs {customerlendamount}</p> 
					<h5 className="card-title">You will give </h5>
					<p className="card-text">Rs {customertakeamount}</p>
					<Button variant="contained" onClick={() => generatePDF(customers)}>
						Download Report
					</Button>
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


