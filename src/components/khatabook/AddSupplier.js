import React, { useState, useContext } from 'react'
// import { Link, useLocation } from "react-router-dom";
import khataContext from "../../context/notes/khataContext"

const Navbar = () => {
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

const AddCustomer = () => {
	const context = useContext(khataContext);
	const { addSupplier } = context;
	const [supplier, setSupplier] = useState({ title: "Mr", name: "", amount: "" });

	const onChange = (e) => {
		setSupplier({ ...supplier, [e.target.name]: e.target.value })
	}

	const handleClick = (e) => {
		e.preventDefault();
		addSupplier(supplier.title, supplier.name, supplier.amount);
		setSupplier({ title: "Mr", name: "", amount: "" });
	}

	return (
		<>
			<Navbar />
			<br />
			<form onSubmit={handleClick}>
				<div className="row">
					<div className="col-sm col-lg-4">
						<label htmlhtmlFor="exampleFormControlSelect1">Enter Title</label>
						<select className="form-control" id="exampleFormControlSelect1" name="title" value={supplier.title} onChange={onChange} >
							<option value="Mr">Mr</option>
							<option value="Mrs">Mrs</option>
						</select>
					</div>
					<div className="col-sm col-lg-4">
						<label htmlhtmlFor="name">Name</label>
						<input required="required" type="text" className="form-control" id="name" name="name"
							value={supplier.name} onChange={onChange} />
					</div>
					<div className="col-sm col-lg-4">
						<label htmlFor="amount">Amount</label>
						<input
							required="required"
							type="number"
							className="form-control"
							id="amount"
							value={supplier.amount}
							onChange={onChange}
							name="amount"
						/>
					</div>
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

export default AddCustomer;





