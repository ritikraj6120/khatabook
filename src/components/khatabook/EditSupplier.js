import React, { useContext, useState } from 'react';
import khataContext from '../../context/notes/khataContext';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';
const EditSupplier = () => {
	let history = useHistory();
	const { singlesupplier, editSupplier } = useContext(khataContext);
	const [credentials, setCredentials] = useState({ title: singlesupplier.title, name: singlesupplier.name, amount: 0 })

	const handleSubmit = async (e) => {
		e.preventDefault();
		let { title, name, amount } = credentials;
		// singlecustomer.amount;
		// console.log("hello");
		// console.log(typeof singlecustomer.amount);
		// console.log(typeof amount);
		amount=parseInt(amount, 10);
		// console.log(typeof amount);
		// console.log(amount);
		// console.log("hi");
		amount+=singlesupplier.amount
		editSupplier(singlesupplier._id, title, name, amount);
		history.push("/khatabook/suppliers");
	}

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
	}

	return (
		<>
		<Navbar a="/khatabook/editcustomer" b="/khatabook/editsupplier"/>
		<h3> Update Supplier</h3>
			<form onSubmit={handleSubmit}>
				<div className="form-row align-items-center">
					<div className="col-sm-3 my-1">
						<label className="sr-only" htmlFor="inlineFormInputName">Title</label>
						<input type="text" className="form-control" id="inlineFormInputName" name="title" placeholder="Title" value={credentials.title} onChange={onChange}/>
					</div>
					<div className="col-sm-3 my-1">
						<label className="sr-only" htmlFor="inlineFormInputName">Name</label>
						<input type="text" className="form-control" id="inlineFormInputName" name="name" placeholder="Name" value={credentials.name} onChange={onChange}/>
					</div>
					<div className="col-sm-3 my-1">
						<label className="sr-only" htmlFor="inlineFormInputGroupUsername">Amount</label>
						<input type="number" className="form-control" id="inlineFormInputGroupUsername" name="amount" placeholder="Add extra amount" value={credentials.amount} onChange={onChange}/>
					</div>
					<div className="col-auto my-1">
						<button type="submit" className="btn btn-primary">Update</button>
					</div>
				</div>
			</form>

		</>
	);
};

export default EditSupplier;