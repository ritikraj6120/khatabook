import React, { useContext, useState, useEffect } from 'react';
import CustomerContext from '../../../context/CustomerContext';
import { useHistory } from 'react-router-dom';
import '../style.css';
// import CustomerDetail from './CustomerDetail';
import Navbar from '../Navbar';
import { CircularProgress, Button, TextField, Typography } from '@mui/material';
const AddNewTransactionForCustomerGave = () => {

	const errorStateinit = {	
		amountError: null
	}
	const [errorState, seterrorState] = useState(errorStateinit);
	let history = useHistory();
	const { getSingleCustomerDetail, singleCustomerDetail, getSingleCustomerTransactions, addSingleCustomerTransaction } = useContext(CustomerContext);
	const { singleCustomer, loading } = singleCustomerDetail;
	const singlecustomerid = JSON.parse(localStorage.getItem('SingleCustomerId'));

	useEffect(() => {
		getSingleCustomerTransactions(singlecustomerid);
		getSingleCustomerDetail(singlecustomerid);
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
			if (x === 0) {
				seterrorState(previousState => {
					return { ...previousState, amountError: "Invalid Amount" }
				});

			}
			else
				setNewTransaction(e.target.value);
		}


		// console.log(newTransaction)
	}
	const handlesubmit = (e) => {
		e.preventDefault();
		console.log(typeof parseInt(newTransaction));
		addSingleCustomerTransaction(singleCustomer._id, parseInt(newTransaction), 0);
		history.push('/editcustomer')
	}

	return (
		<>
			<Navbar a="/editcustomer" b="/editsupplier" />
			{loading === true ? <CircularProgress /> :
				<>
					<div>
						<h1>You gave Rs {newTransaction} to {singleCustomer.name}</h1>
					</div>
					<form >
						<input type="number" className="form-control " placeholder="Enter Amount" onChange={onChange} />
						{/* <TextField
							variant='outlined'
							color='secondary'
							label="Enter Amount"
							onChange={onChange}
							type="number"
						/> */}
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

export default AddNewTransactionForCustomerGave;