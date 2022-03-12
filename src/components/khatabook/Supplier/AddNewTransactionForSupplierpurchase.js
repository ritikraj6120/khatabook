import React, { useContext, useState, useEffect } from 'react';
import SupplierContext from '../../../context/SupplierContext';
import { useHistory } from 'react-router-dom';
import '../style.css';
import Navbar from '../Navbar';
import { CircularProgress } from '@mui/material';
import { CommentsDisabledOutlined, ConstructionOutlined } from '@mui/icons-material';
const AddNewTransactionForSupplierPurchase = () => {
	let history = useHistory();
	const { getSingleSupplierDetail, singleSupplierDetail, getSingleSupplierTransactions,addSingleSupplierTransaction } = useContext(SupplierContext);
	const { singleSupplier, loading } = singleSupplierDetail;
	const singlesupplierid = JSON.parse(localStorage.getItem('SingleSupplierId'));

	useEffect(() => {
		getSingleSupplierTransactions(singlesupplierid);
		getSingleSupplierDetail(singlesupplierid);
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
		addSingleSupplierTransaction(singleSupplier._id,0 , parseInt(newTransaction) );
		history.push('/editsupplier')
	}
	return (
		<>
			<Navbar a="/editcustomer" b="/editsupplier" />
			{ loading === true ? <CircularProgress /> :
				<>
					<div>
						<h1>You got Rs {newTransaction} from {singleSupplier.name}</h1>
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

export default AddNewTransactionForSupplierPurchase;


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




