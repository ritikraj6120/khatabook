import React, {  useContext, useEffect, useState} from 'react'
import CustomerContext from '../../../context/CustomerContext'
import noteContext from '../../../context/noteContext';
const CustomerDetail = (props) => {
	const {singleCustomer} = props; // db 
	const {showAlert}=useContext(noteContext)
	const {editCustomer} = useContext(CustomerContext);
	const [credentials, setCredentials] = useState({ title: singleCustomer.title, name: singleCustomer.name, phone:singleCustomer.phone })
	// console.log(singleCustomer.title, singleCustomer.name, singleCustomer.phone)//databse
	console.log(credentials.title,credentials.name,credentials.phone)//usestate
	useEffect(()=>{
		setCredentials({ title: singleCustomer.title, name: singleCustomer.name, phone:singleCustomer.phone })
	},[singleCustomer]);
	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { title, name, phone } = credentials;
		if (name.length < 1) {
			console.log(name.length);
			showAlert("Customer name less than 1", "danger");
		}
		else if(phone.length>11){
			showAlert("Customer phone number length greater than 11 digits", "danger");
		}
		else {
			await editCustomer(singleCustomer._id, title, name,phone);
			// history.push('/editcustomer');
		}
	}
	return(
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
				<input type="text" className="form-control" id="inlineFormInputName" name="name" placeholder="Name" value={credentials.name} onChange={onChange} required />
			</div>
			<div className="col-sm-3 my-1">
				<label className="sr-only" htmlFor="inlineFormInputName">Phone</label>
				<input type="tel" className="form-control" id="inlineFormInputName" name="phone" placeholder="Phone" value={credentials.phone} onChange={onChange} required />
			</div>
			<div className="col-auto my-1">
				<button type="submit" className="btn btn-primary">Update</button>
			</div>
		</div>
	</form>
	)
}
export default CustomerDetail;
