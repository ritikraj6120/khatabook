import React, { useContext, useState, useEffect } from 'react';
import CustomerContext from '../../../context/CustomerContext';
import { useHistory } from 'react-router-dom';
import '../style.css';
import CustomerDetail from './CustomerDetail';
import Navbar from '../Navbar';
import { CircularProgress } from '@mui/material';
import { CommentsDisabledOutlined, ConstructionOutlined } from '@mui/icons-material';
const AddNewTransactionForCustomerGave = () => {
	let history = useHistory();
	const { getSingleCustomerDetail, singleCustomerDetail, getSingleCustomerTransactions,addSingleCustomerTransaction } = useContext(CustomerContext);
	const { singleCustomer, loading } = singleCustomerDetail;
	const singlecustomerid = JSON.parse(localStorage.getItem('SingleCustomerId'));

	useEffect(() => {
		getSingleCustomerTransactions(singlecustomerid);
		getSingleCustomerDetail(singlecustomerid);
		// eslint-disable-next-line
	}, [])
	const [newTransaction, setNewTransaction] = useState(0);

	const onChange = (e) => {
		setNewTransaction(e.target.value)
		console.log(newTransaction)
	}
	const handlesubmit = (e) => {
		e.preventDefault();
		console.log(typeof parseInt(newTransaction));
		addSingleCustomerTransaction(singleCustomer._id, parseInt(newTransaction), 0);
		history.push('/editcustomers')
	}
	return (
		<>
			<Navbar a="/editcustomer" b="/editsupplier" />
			{ loading === true ? <CircularProgress /> :
				<>
					<div>
						<h1>You gave Rs {newTransaction} to {singleCustomer.name}</h1>
					</div>
					<form onSubmit={handlesubmit}>
						<input type="number" className="form-control " placeholder="Enter Amount"  onChange={onChange} />
						<button type="submit" className="btn btn-primary">Save</button>
					</form>
				</>
			}
		</>
	);
};

export default AddNewTransactionForCustomerGave;


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




