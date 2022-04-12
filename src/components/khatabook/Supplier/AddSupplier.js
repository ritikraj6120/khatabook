import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import SupplierContext from "../../../context/SupplierContext"
import noteContext from '../../../context/noteContext';
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
	const { addSupplier } = useContext(SupplierContext);
	const {showAlert}=useContext(noteContext)
	const [supplier, setSupplier] = useState({ title: "Mr", name: "", phone: 0 });

	const onChange = (e) => {
		setSupplier({ ...supplier, [e.target.name]: e.target.value })
	}

	const handleClick = async (e) => {
		e.preventDefault();
		if (supplier.name.length < 1) {
			console.log(supplier.name.length);
			showAlert("Supplier length less than 1", "danger");
		}
		else {
			await addSupplier(supplier.title, supplier.name, supplier.phone);
			console.log("shyam")
			setSupplier({ title: "Mr", name: "", phone: 0 });
			history.push('/editsupplier');
		}
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
							value={supplier.name} onChange={onChange} placeholder="Enter Supplier Name to add Entries" />
					</div>
					<div className="col-sm col-lg-4">
						<label htmlFor="phone">Phone</label>
						<input required type="number" className="form-control" id="phone" name="phone" onChange={onChange} placeholder="Enter Phone Number " />
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

export default AddSupplier;





