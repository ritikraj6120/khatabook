import React, { useContext, useEffect } from 'react'
import CustomerContext from "../../../context/CustomerContext"
import CustomerItem from './CustomerItem';
import { useHistory, Link } from 'react-router-dom'
import Navbar from '../Navbar'
import '../style.css'
import { Button } from '@mui/material';
import generatePDF from './customerReport';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import CircularProgress from '@mui/material/CircularProgress';
const Customers = () => {
	let history = useHistory();
	const { customers, getCustomers, getCustomerBalance, customerstate } = useContext(CustomerContext);
	useEffect(() => {
		getCustomers();
		getCustomerBalance();
		// eslint-disable-next-line
	}, [])
	let TotalAmounttoget = 0;
	let TotalAmounttogive = 0;
	// console.log("hello");
	// console.log(customerstate.loading);
	if (customerstate.loading===false) {
		let { customerBalance } = customerstate;

		for (let i = 0; i < customerBalance.length; i++) {
			let x = customerBalance[i].amounttoget - customerBalance[i].amounttogive;
			if (x >= 0) {
				TotalAmounttoget += x;
			}
			else {
				TotalAmounttogive += (-x);
			}
		}
	}
	return (
		<>
			<Navbar a="/customers" b="/suppliers" />
			{customerstate.loading===true ? <CircularProgress color="secondary" /> :
			<div>
				<div className="card mt-5" style={{ width: "18rem" }}>
					<div className="card-body">
						<h5 className="card-title">You will get </h5>
						<p className="card-text">Rs {TotalAmounttoget}</p>
						<h5 className="card-title">You will give </h5>
						<p className="card-text">Rs {TotalAmounttogive}</p>
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
								return <CustomerItem key={customer._id} customer={customer} customerBalance={customerstate.customerBalance} />
							})}
						</div>
					</div>
				</div>
			</div>
			}
			<Link to="/addcustomer">
				<button type="button" className="btn  sticky-btn">
					<PersonAddRoundedIcon style={{ color: "white" }} />
				</button>
			</Link>

		</>
	)
}

export default Customers


