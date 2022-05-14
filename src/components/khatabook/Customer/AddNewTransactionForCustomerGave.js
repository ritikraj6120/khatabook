import React, { useContext, useState, useEffect } from 'react';
import CustomerContext from '../../../context/CustomerContext';
import { useHistory } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import CustomerDetail from './CustomerDetail';
// import Navbar from '../Navbar';
import { CircularProgress, Button, TextField, Typography, Breadcrumbs, Link } from '@mui/material';
const AddNewTransactionForCustomerGave = () => {
	let history = useHistory();
	const errorStateinit = {
		amountError: null
	}
	const [errorState, seterrorState] = useState(errorStateinit);
	const { getSingleCustomerDetail, singleCustomerDetail, addSingleCustomerTransaction } = useContext(CustomerContext);
	const { singleCustomer, loading } = singleCustomerDetail;
	const singlecustomerid = JSON.parse(localStorage.getItem('SingleCustomerId'));

	useEffect(() => {
		getSingleCustomerDetail(singlecustomerid);
		// eslint-disable-next-line
	}, [])
	const [newTransaction, setNewTransaction] = useState('');
	const [newTransactiondate, setNewTransactiondate] = useState(new Date());
	const [newTransactionBilldetails, setNewTransactiondateBilldetails] = useState("");
	const [toggleAddBillNo, settoggleAddBillNo] = useState(false);
	const [addBillNo, setAddBillNo] = useState("");
	const onChange = (e) => {
		let x = e.target.value
		if (x === '') {
			seterrorState(previousState => {
				return { ...previousState, amountError: null }
			});
			setNewTransaction('');
		}
		else {
			x = parseInt(x);
			// console.log(x)
			// console.log(typeof x)
			if (x <= 0) {
				seterrorState(previousState => {
					return { ...previousState, amountError: "Invalid Amount" }
				});
				setNewTransaction('0');
			}
			else {
				seterrorState({ ...errorState, amountError: null })
				setNewTransaction(x.toString());
			}
		}
	}
	const handlesubmit = async (e) => {
		e.preventDefault();
		await addSingleCustomerTransaction(singleCustomer._id, parseInt(newTransaction), 0, newTransactionBilldetails, addBillNo, newTransactiondate);
		history.push('/singlecustomer')
	}

	return (
		<>
			{/* <Navbar a="/singlecustomer" b="/singlesupplier" /> */}
			{loading === true ? <CircularProgress /> :
				<>
					<div>
						<Breadcrumbs separator="›" sx={{ padding: 2 }} aria-label="breadcrumb">
							<Link underline="hover" color="inherit" href="/customers">
								Customers List
							</Link>
							<Link
								underline="hover"
								color="inherit"
								href="/singlecustomer"
							>
								{singleCustomer.name}
							</Link>
							<Link
								underline="hover"
								color="text.primary"
								href="#"
							>
								You Gave
							</Link>
						</Breadcrumbs>
						<h1>You gave Rs {newTransaction === '' ? 0 : newTransaction} to {singleCustomer.name}</h1>
					</div>
					<form >
						<input type="number" className="form-control " placeholder="Enter Amount" value={newTransaction} onChange={onChange} />
						{/* <TextField
							variant='outlined'
							color='secondary'
							label="Enter Amount"
							onChange={onChange}
							type="number"
						/> */}
						<span className="text-danger">{errorState.amountError}</span>
						<br />

						<input type="text" className="form-control " placeholder="Enter Details (Item Name, Bill No, Quantity...)" value={newTransactionBilldetails} onChange={(e) => {
							setNewTransactiondateBilldetails(e.target.value);
						}} />
						<br />
						{toggleAddBillNo === false ?
							<Button onClick={(e) => {
								settoggleAddBillNo(true);
							}} >Add Bill No.</Button>
							: <input type="text" className="form-control " placeholder="Add Bill No." value={addBillNo} onChange={(e) => {
								setAddBillNo(e.target.value);
							}} />
						}

						<br />
						<br />
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								openTo="day"
								views={['year', 'month', 'day']}
								label="Month, date and year"
								value={newTransactiondate}
								onChange={(newValue) => {
									setNewTransactiondate(newValue);
								}}
								renderInput={(params) => <TextField {...params} helperText={null} />}
							/>
						</LocalizationProvider>
						<br />
						<Typography align='center'>
							{
								newTransaction > 0 ? <Button sx={{
									width: 1 / 4, backgroundColor: "#f2183d", '&:hover': {
										background: "#f2183d",
									}
								}} onClick={handlesubmit} variant="contained">SAVE</Button> :
									<Button disabled sx={{
										width: 1 / 4, backgroundColor: "#f2183d", '&:hover': {
											background: "#f2183d",
										}
									}} onClick={handlesubmit} variant="contained">SAVE</Button>
							}

						</Typography>


					</form>
				</>
			}
		</>
	);
};

export default AddNewTransactionForCustomerGave;