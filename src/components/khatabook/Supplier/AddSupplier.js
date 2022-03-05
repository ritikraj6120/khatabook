import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import SupplierContext from "../../../context/SupplierContext"
import Navbar from '../Navbar';

const Navbar2 = () => {
	return (
		<nav className="navbar navbar-expand-lg  navbar-dark bg-primary" style={{ color: "#ffffff" }
		}>
			<div className="container-fluid" >
				<div className="collapse navbar-collapse" id="navbarSupportedContent" >
					<ul className="navbar-nav me-auto mb-2 mb-lg-0" >
						<li className="nav-item" >
							Add New Supplier
						</li >

					</ul >
				</div >
			</div >
		</nav >
	)
}

const AddSupplier = () => {
	let history = useHistory();
	const { addSupplier } =  useContext(SupplierContext);
	const [supplier, setSupplier] = useState({ title: "Mr", name: "",phone:0 });

	const onChange = (e) => {
		setSupplier({ ...supplier, [e.target.name]: e.target.value })
	}

	const handleClick = (e) => {
		e.preventDefault();
		addSupplier(supplier.title, supplier.name, supplier.phone);
		setSupplier({ title: "Mr", name: "", phone:0});
		history.push('/editsupplier');
	}

	return (
		<>
			<Navbar a="/addcustomer" b="/addsupplier" />
			<br />
			<Navbar2 />
			<br />
			<form onSubmit={handleClick}>
				<div className="row">
					<div className="col-sm col-lg-4">
						<label htmlFor="exampleFormControlSelect1">Enter Title</label>
						<select className="form-select" id="exampleFormControlSelect1" name="title" value={supplier.title} onChange={onChange} >
							<option value="Mr">Mr</option>
							<option value="Mrs">Mrs</option>
						</select>
					</div>
					<div className="col-sm col-lg-4">
						<label htmlFor="name">Name</label>
						<input required="required" type="text" className="form-control" id="name" name="name"
							value={supplier.name} onChange={onChange} placeholder="Enter Supplier Name to add Entries"/>
					</div>
					<div className="col-sm col-lg-4">
						<label htmlFor="phone">Phone</label>
						<input required type="tel" className="form-control" id="phone" name="phone"  onChange={onChange} placeholder="Enter Phone Number (Optional)"/>
					</div>
					{/* <div className="col-sm col-lg-4">
						<label htmlFor="amount">Your Payment</label>
						<input
							required="required"
							type="number"
							className="form-control"
							id="amount"
							value={supplier.payment}
							onChange={onChange}
							name="payment"
						/>
					</div>
					<div className="col-sm col-lg-4">
						<label htmlFor="amount">Your Purchase</label>
						<input
							required="required"
							type="number"
							className="form-control"
							id="amount"
							value={supplier.purchase}
							onChange={onChange}
							name="purchase"
						/>
					</div> */}
				</div>
				<div className="row mt-3">
					<div className="col-sm">
						<button type="submit" className="btn btn-primary">
							Add New Supplier
						</button>
					</div>
				</div>
			</form>
		</>
	)
}

export default AddSupplier;





