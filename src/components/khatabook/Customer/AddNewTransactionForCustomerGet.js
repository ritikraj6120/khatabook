import React, { useContext, useState, useEffect } from 'react';
import CustomerContext from '../../../context/CustomerContext';
import { useHistory } from 'react-router-dom';
import '../style.css';
import Navbar from '../Navbar';
import { CircularProgress, Button, Typography } from '@mui/material';
const AddNewTransactionForCustomerGet = () => {
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
	}
	const handlesubmit = (e) => {
		e.preventDefault();
		console.log(typeof parseInt(newTransaction));
		addSingleCustomerTransaction(singleCustomer._id, 0, parseInt(newTransaction));
		history.push('/editcustomer')
	}
	return (
		<>
			<Navbar a="/editcustomer" b="/editsupplier" />
			{loading === true ? <CircularProgress /> :
				<>
					<div>
						<h1>You got Rs {newTransaction} from {singleCustomer.name}</h1>
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

export default AddNewTransactionForCustomerGet;