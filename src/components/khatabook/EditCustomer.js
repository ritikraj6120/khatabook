import React, { useContext, useState,useEffect } from 'react';
import khataContext from '../../context/khataContext';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';
const EditCustomer = () => {
	let history = useHistory();
	const { editCustomer, getSingleCustomer, singleCustomer } = useContext(khataContext);
	const singlecustomer = JSON.parse(localStorage.getItem('singlecustomer'));

	useEffect(() => {
		getSingleCustomer(singlecustomer._id);
	}, [])


	const [credentials, setCredentials] = useState({ title: singlecustomer.title, name: singlecustomer.name, lendamount: 0, takeamount: 0 })

	const handleSubmit = async (e) => {
		e.preventDefault();
		let { title, name, lendamount, takeamount } = credentials;
		lendamount = parseInt(lendamount, 10);
		takeamount = parseInt(takeamount, 10);
		lendamount += singlecustomer.lendamount;
		takeamount += singlecustomer.takeamount;
		await editCustomer(singlecustomer._id, title, name, lendamount, takeamount);
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
						<label className="sr-only" htmlFor="inlineFormInputName">Title</label>
						<select className="form-control" id="inlineFormInputName"
							name="title" placeholder="Title" value={credentials.title} onChange={onChange} >
							<option value="Mr">Mr</option>
							<option value="Mrs">Mrs</option>
						</select>
						{/* <label className="sr-only" htmlFor="inlineFormInputName">Title</label>
						<input type="text" className="form-control" id="inlineFormInputName" name="title" placeholder="Title" value={credentials.title} onChange={onChange} /> */}
					</div>



					<div className="col-sm-3 my-1">
						<label className="sr-only" htmlFor="inlineFormInputName">Name</label>
						<input type="text" className="form-control" id="inlineFormInputName" name="name" placeholder="Name" value={credentials.name} onChange={onChange} required />
					</div>
					<div className="col-sm-3 my-1">
						<label className="sr-only" htmlFor="inlineFormInputGroupUsername">You give</label>
						<input type="number" className="form-control" id="inlineFormInputGroupUsername" name="lendamount" placeholder="You Give" min="0" onChange={onChange} />
					</div>
					<div className="col-sm-3 my-1">
						<label className="sr-only" htmlFor="inlineFormInputGroupUsername">You Got</label>
						<input type="number" className="form-control" id="inlineFormInputGroupUsername" name="takeamount" placeholder="You Got" min="0" onChange={onChange} />
					</div>
					<div className="col-auto my-1">
						<button type="submit" className="btn btn-primary">Update</button>
					</div>
				</div>
			</form>
			{singleCustomer.map((item) => {
				return <div key={item._id}>
					<button >{item.lendamount_singleCustomer} {item.takeamount_singleCustomer}</button>

				</div>
			})}
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




