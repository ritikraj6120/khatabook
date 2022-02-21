import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import khataContext from "../../context/khataContext"
import noteContext from '../../context/noteContext';
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
	let history = useHistory();
	const {showAlert}=useContext(noteContext)
	const { addCustomer } = useContext(khataContext)
	const [customer, setCustomer] = useState({ title: "Mr", name: "", lendamount: 0, takeamount: 0 });
	const onChange = (e) => {
		console.log(customer)
		setCustomer({ ...customer, [e.target.name]: e.target.value })
		console.log(customer)
	}

	const handleClick = (e) => {
		e.preventDefault();
		if (customer.name.length < 1) {
			console.log(customer.name.length);
			showAlert("Customer length less than 1", "danger");
		}
		else {
			addCustomer(customer.title, customer.name, customer.lendamount, customer.takeamount);
			setCustomer({ title: "Mr", name: "", lendamount: 0, takeamount: 0 });
			history.push('/khatabook/customers');
		}
	}

	return (
		<>
			<Navbar a="/khatabook/addcustomer" b="/khatabook/addsupplier" />
			<br />
			<Navbar2 />
			<br />
			<form onSubmit={handleClick}>
				<div className="row">
					<div className="col-sm col-lg-4 ">
						<label htmlFor="exampleFormControlSelect1">Enter Title</label>
						<select className="form-select" id="exampleFormControlSelect1"
							name="title" value={customer.title} onChange={onChange} >
							<option value="Mr">Mr</option>
							<option value="Mrs">Mrs</option>
						</select>
					</div>
					<div className="col-sm col-lg-4">
						<label htmlFor="name">Name</label>
						<input required type="text" className="form-control" id="name" name="name"
							value={customer.name} onChange={onChange} />
					</div>
					<div className="col-sm col-lg-4">
						<label htmlFor="amount">You Gave</label>
						<input
							required="required" min="0"
							type="number"
							className="form-control"
							id="amount"
							value={customer.lendamount}
							onChange={onChange}
							name="lendamount"
						/>
					</div>
					<div className="col-sm col-lg-4">
						<label htmlFor="amount">You Got</label>
						<input
							required="required" min="0"
							type="number"
							className="form-control"
							id="amount"
							value={customer.takeamount}
							onChange={onChange}
							name="takeamount" 
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





