import React, { useContext, useState } from 'react';
import khataContext from '../../context/notes/khataContext';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';
const EditCustomer = () => {
	let history = useHistory();
	const { singlecustomer, editCustomer } = useContext(khataContext);
	const [credentials, setCredentials] = useState({ title: singlecustomer.title, name: singlecustomer.name, amount: 0 })





	const handleSubmit = async (e) => {
		e.preventDefault();
		let { title, name, amount } = credentials;
		amount = parseInt(amount, 10);
		amount += singlecustomer.amount
		await editCustomer(singlecustomer._id, title, name, amount);
		history.push("/khatabook/customers");
	}







	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
	}

	return (
		<>
			<Navbar a="/khatabook/editcustomer" b="/khatabook/editsupplier" />
			<h3> Update Customer</h3>
			<form onSubmit={handleSubmit}>
				<div className="form-row align-items-center">
					<div className="col-sm-3 my-1">
					<label  className="sr-only" htmlFor="inlineFormInputName">Title</label>
						<select className="form-control" id="inlineFormInputName"
							name="title"  placeholder="Title" value={credentials.title} onChange={onChange} >
							<option value="Mr">Mr</option>
							<option value="Mrs">Mrs</option>
						</select>
						{/* <label className="sr-only" htmlFor="inlineFormInputName">Title</label>
						<input type="text" className="form-control" id="inlineFormInputName" name="title" placeholder="Title" value={credentials.title} onChange={onChange} /> */}
					</div>



					<div className="col-sm-3 my-1">
						<label className="sr-only" htmlFor="inlineFormInputName">Name</label>
						<input type="text" className="form-control" id="inlineFormInputName" name="name" placeholder="Name" value={credentials.name} onChange={onChange} />
					</div>
					<div className="col-sm-3 my-1">
						<label className="sr-only" htmlFor="inlineFormInputGroupUsername">Amount</label>
						<input type="number" className="form-control" id="inlineFormInputGroupUsername" name="amount" placeholder="Add extra amount"  onChange={onChange} />
					</div>
					<div className="col-auto my-1">
						<button type="submit" className="btn btn-primary">Update</button>
					</div>
				</div>
			</form>

		</>
	);
};

export default EditCustomer;

// <form>
//   <div className="form-row align-items-center">
//     <div className="col-sm-3 my-1">
//       <label className="sr-only" htmlFor="inlineFormInputName">Name</label>
//       <input type="text" className="form-control" id="inlineFormInputName" placeholder="Jane Doe"/>
//     </div>
//     <div className="col-sm-3 my-1">
//       <label className="sr-only" for="inlineFormInputGroupUsername">Username</label>
//       <div className="input-group">
//         <div className="input-group-prepend">
//           <div className="input-group-text">@</div>
//         </div>
//         <input type="text" className="form-control" id="inlineFormInputGroupUsername" placeholder="Username"/>
//       </div>
//     </div>
//     <div className="col-auto my-1">
//       <div className="form-check">
//         <input className="form-check-input" type="checkbox" id="autoSizingCheck2"/>
//         <label className="form-check-label" htmlFor="autoSizingCheck2">
//           Remember me
//         </label>
//       </div>
//     </div>
//     <div className="col-auto my-1">
//       <button type="submit" className="btn btn-primary">Submit</button>
//     </div>
//   </div>
// </form>




