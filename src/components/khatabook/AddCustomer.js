import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import khataContext from "../../context/notes/khataContext"
import Navbar from './Navbar';
const Navbar2 = () => {
	return (
		<nav className="navbar navbar-expand-lg  navbar-dark bg-primary" style={{ color: "#ffffff" }
		}>
			<div className="container-fluid" >
				<div className="collapse navbar-collapse" id="navbarSupportedContent" >
					<ul className="navbar-nav me-auto mb-2 mb-lg-0" >
						<li className="nav-item" >
							Add New Customer
						</li >

					</ul >
				</div >
			</div >
		</nav >
	)
}

const AddCustomer = () => {
	let history=useHistory();
	const context = useContext(khataContext);
	const { addCustomer } = context;
	const [customer, setCustomer] = useState({ title: "Mr", name: "", amount: 0 });
	const onChange = (e) => {
		setCustomer({ ...customer, [e.target.name]: e.target.value })
	}

	const handleClick = (e) => {
		e.preventDefault();
		addCustomer(customer.title, customer.name, customer.amount);
		setCustomer({ title: "Mr", name: "", amount: 0 });
		history.push('/khatabook/customers');
	}

	return (
		<>
			<Navbar a="/khatabook/addcustomer" b="/khatabook/addsupplier"/>
			<br/>
			<Navbar2 />
			<br />
			<form onSubmit={handleClick}>
				<div className="row">
					<div className="col-sm col-lg-4 ">
						<label htmlFor="exampleFormControlSelect1">Enter Title</label>
						<select className="form-control" id="exampleFormControlSelect1"
							name="title" value={customer.title} onChange={onChange} >
							<option value="Mr">Mr</option>
							<option value="Mrs">Mrs</option>
						</select>
					</div>
					<div className="col-sm col-lg-4">
						<label htmlFor="name">Name</label>
						<input required="required" type="text" className="form-control" id="name" name="name"
							value={customer.name} onChange={onChange} />
					</div>
					<div className="col-sm col-lg-4">
						<label htmlFor="amount">Amount</label>
						<input
							required="required"
							type="number"
							className="form-control"
							id="amount"
							value={customer.amount}
							onChange={onChange}
							name="amount"
						/>
					</div>
				</div>
				<div className="row mt-3">
					<div className="col-sm">
						<button type="submit" className="btn btn-primary">
							Add Customer
						</button>
					</div>
				</div>
			</form>
		</>
	)
}

export default AddCustomer;





