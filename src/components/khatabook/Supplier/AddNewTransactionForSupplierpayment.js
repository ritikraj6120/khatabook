import React, { useContext, useState, useEffect } from 'react';
import SupplierContext from '../../../context/SupplierContext';
import { useHistory } from 'react-router-dom';
import '../style.css';
// import CustomerDetail from './CustomerDetail';
import Navbar from '../Navbar';
import { CircularProgress, Button, Typography } from '@mui/material';
// import { CommentsDisabledOutlined, ConstructionOutlined } from '@mui/icons-material';
const AddNewTransactionForSupplierPayment = () => {
	const errorStateinit = {
		amountError: null
	}
	const [errorState, seterrorState] = useState(errorStateinit);
	let history = useHistory();
	const { getSingleSupplierDetail, singleSupplierDetail, getSingleSupplierTransactions, addSingleSupplierTransaction } = useContext(SupplierContext);
	const { singleSupplier, loading } = singleSupplierDetail;
	const singlesupplierid = JSON.parse(localStorage.getItem('SingleSupplierId'));

	useEffect(() => {
		getSingleSupplierTransactions(singlesupplierid);
		getSingleSupplierDetail(singlesupplierid);
		// eslint-disable-next-line
	}, [])
	const [newTransaction, setNewTransaction] = useState(0);

	const onChange = (e) => {

		let x = e.target.value
		if (x == '') {
			seterrorState(previousState => {
				return { ...previousState, amountError: null }
			});
			setNewTransaction(0);
		}
		else {
			x = parseInt(x);
			// console.log(x)
			if (x <= 0) {
				seterrorState(previousState => {
					return { ...previousState, amountError: "Invalid Amount" }
				});

			}
			else
				setNewTransaction(e.target.value);
		}
		// setNewTransaction(e.target.value)
		// console.log(newTransaction)
	}
	const handlesubmit = (e) => {
		e.preventDefault();
		console.log(typeof parseInt(newTransaction));
		addSingleSupplierTransaction(singleSupplier._id, 0, parseInt(newTransaction));
		history.push('/editsupplier')
	}
	return (
		<>
			<Navbar a="/editcustomer" b="/editsupplier" />
			{loading === true ? <CircularProgress /> :
				<>
					<div>
						<h1>You gave Rs {newTransaction} to {singleSupplier.name}</h1>
					</div>
					<form >
						<input type="number" className="form-control " placeholder="Enter Amount" onChange={onChange} />
						<span className="text-danger">{errorState.amountError}</span>
						<br />

						<Typography align='center'>
							<Button onClick={handlesubmit} variant="contained">Update</Button>
						</Typography>

					</form>
				</>
			}
		</>
	);
};

export default AddNewTransactionForSupplierPayment;