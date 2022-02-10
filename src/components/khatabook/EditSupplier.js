import React, { useContext, useState } from 'react';
import khataContext from '../../context/notes/khataContext';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';
const EditSupplier = () => {
	let history = useHistory();
	const { editSupplier } = useContext(khataContext);
	const singlesupplier = JSON.parse(localStorage.getItem('singlesupplier'));
	console.log(singlesupplier);
	const [credentials, setCredentials] = useState({ title: singlesupplier.title, name: singlesupplier.name, payment:0,purchase:0 })

	const handleSubmit = async (e) => {
		e.preventDefault();
		let { title, name, payment, purchase } = credentials;
		// amount=parseInt(amount, 10);
		// amount+=singlesupplier.amount;
		payment = parseInt(payment, 10);
		purchase = parseInt(purchase, 10);
		console.log(payment);
		console.log(purchase);
		payment += singlesupplier.payment;
		purchase += singlesupplier.purchase;
		await editSupplier(singlesupplier._id, title, name, payment, purchase);
		history.push("/khatabook/suppliers");
	}

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
	}

	return (
		<>
			<Navbar a="/khatabook/editcustomer" b="/khatabook/editsupplier" />
			<h3> Update Supplier</h3>
			<form onSubmit={handleSubmit}>
				<div className="form-row align-items-center">
					<div className="col-sm-3 my-1">
						<label className="sr-only" htmlFor="inlineFormInputName">Title</label>
						<select className="form-control" id="inlineFormInputName"
							name="title" placeholder="Title" value={credentials.title} onChange={onChange} >
							<option value="Mr">Mr</option>
							<option value="Mrs">Mrs</option>
						</select>
					</div>
					<div className="col-sm-3 my-1">
						<label className="sr-only" htmlFor="inlineFormInputName">Name</label>
						<input required type="text" className="form-control" id="inlineFormInputName" name="name" placeholder="Name" value={credentials.name} onChange={onChange} />
					</div>
					<div className="col-sm-3 my-1">
						<label className="sr-only" htmlFor="inlineFormInputGroupUsername">Payment</label>
						<input type="number" className="form-control" id="inlineFormInputGroupUsername" name="payment" placeholder="Enter Payment Amount" min="0" onChange={onChange} />
					</div>
					<div className="col-sm-3 my-1">
						<label className="sr-only" htmlFor="inlineFormInputGroupUsername">Purchase</label>
						<input type="number" className="form-control" id="inlineFormInputGroupUsername" name="purchase" placeholder="Enter Purchase amount" min="0" onChange={onChange} />
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