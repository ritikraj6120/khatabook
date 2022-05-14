import React, { useState, useContext } from 'react'
import SupplierContext from "../../../context/SupplierContext"
import { notifyWarning } from '../../../alert';
import 'react-phone-number-input/style.css'
import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'
// import Navbar from '../Navbar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
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
	const { addSupplier } = useContext(SupplierContext);
	const [phone, setPhone] = useState()
	const [supplier, setSupplier] = useState({ title: "Mr", name: "" });

	const onChange = (e) => {
		setSupplier({ ...supplier, [e.target.name]: e.target.value })
	}

	const handleClick = async (e) => {
		e.preventDefault();
		if (supplier.name.length < 1) {
			console.log(supplier.name.length);
			notifyWarning("Supplier length less than 1");
		}
		else if (isPossiblePhoneNumber(phone) === false) {
			notifyWarning("Enter correct phone Number");
		}
		else if (isValidPhoneNumber(phone) === false) {
			notifyWarning("Enter valid phone Number");
		}
		else {
			// console.log("very good");
			await addSupplier(supplier.title, supplier.name, phone);
			// history.push('/editcustomer');
		}
	}

	return (
		<>
			{/* <Navbar a="/addcustomer" b="/addsupplier" /> */}
			<br />
			<Breadcrumbs separator="›" sx={{ padding: 2 }} aria-label="breadcrumb">
				<Link underline="hover" color="inherit" href="/suppliers">
					Suppliers List
				</Link>
				<Link
					underline="hover"
					color="text.primary"
					href="#"
				>
					Add new supplier
				</Link>
			</Breadcrumbs>
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
						<label htmlFor="phone">Enter Phone No.</label>
						<PhoneInput
							international
							defaultCountry="IN"
							placeholder="Enter Phone Number"
							className="form-control"
							id="phone" value={phone} onChange={setPhone} />
						{/* <input required type="number" className="form-control" id="phone" name="phone" onChange={onChange} placeholder="Enter Phone Number" /> */}
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





