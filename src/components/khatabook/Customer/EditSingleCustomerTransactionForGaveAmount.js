import React, { useContext, useState, useEffect } from 'react';
import CustomerContext from '../../../context/CustomerContext';
import { useLocation } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import '../style.css';
import { Breadcrumbs, Link } from '@mui/material';
// import Navbar from '../Navbar';
import { CircularProgress, Button, TextField, Typography } from '@mui/material';
const EditSingleCustomerTransactionForGaveAmount = () => {
	const location = useLocation();
	const { transactionid, name, ...item } = location.state;
	const { updateCustomerTransaction } = useContext(CustomerContext);
	const singlecustomerid = JSON.parse(localStorage.getItem('SingleCustomerId'));

	const errorStateinit = {
		amountError: null
	}
	const [errorState, seterrorState] = useState(errorStateinit);
	const [newTransaction, setNewTransaction] = useState('');
	const [newTransactiondate, setNewTransactiondate] = useState(new Date());
	const [newTransactionBilldetails, setNewTransactiondateBilldetails] = useState("");
	const [addBillNo, setAddBillNo] = useState("");
	const [toggleAddBillNo, settoggleAddBillNo] = useState(false);
	let loading = false;
	useEffect(() => {
		setNewTransaction(item.lendamount_singleCustomer);
		setNewTransactiondate(item.date);
		if ('billDetails' in item)
			setNewTransactiondateBilldetails(item.billDetails);
		if ('billNo' in item) {
			console.log("hello");
			setAddBillNo(item.billNo);
			settoggleAddBillNo(true);
		}
		else {
			settoggleAddBillNo(false);
			console.log("hh")
		}
		console.log(item);
	}, [item._id])
	// setNewTransaction(SingleTransactionOfParticularCustomer.lendamount_singleCustomer);
	// setNewTransactiondate(SingleTransactionOfParticularCustomer.date);
	// if ('billDetails' in SingleTransactionOfParticularCustomer)
	// 	setNewTransactiondateBilldetails(SingleTransactionOfParticularCustomer.billDetails);
	// if ('billNo' in SingleTransactionOfParticularCustomer) {
	// 	setAddBillNo(SingleTransactionOfParticularCustomer.addBillNo);
	// 	settoggleAddBillNo(true);
	// }
	// else {
	// 	settoggleAddBillNo(false);
	// }
	// loading = false;



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

	const handleSubmit = async (e) => {
		e.preventDefault();
		await updateCustomerTransaction(transactionid, singlecustomerid, parseInt(newTransaction), 0, newTransactionBilldetails, addBillNo, newTransactiondate);
	}

	return (
		<>

			{loading === true ? <CircularProgress /> :
				<>
					<div>
						<Breadcrumbs separator="›" sx={{ padding: 2 }} aria-label="breadcrumb">
							<Link underline="hover" color="inherit" href="/custmers">
								Customers List
							</Link>
							<Link
								underline="hover"
								color="inherit"
								href="/singlecustomer"
							>
								{name}
							</Link>
							<Link
								underline="hover"
								color="text.primary"
								href="#"
							>
								Edit Entry
							</Link>
						</Breadcrumbs>
						<h1>You gave Rs {newTransaction === '' ? 0 : newTransaction} to {name}</h1>
					</div>
					<form >
						<input type="number" className="form-control " placeholder="Enter Amount" value={newTransaction} onChange={onChange} />
						<span className="text-danger">{errorState.amountError}</span>
						<br />

						<input type="text" className="form-control " placeholder="Enter Details (Item Name, Bill No, Quantity...)" value={newTransactionBilldetails} onChange={(e) =>
							setNewTransactiondateBilldetails(e.target.value)} />
						<br />
						{toggleAddBillNo === false ?
							<Button onClick={(e) => {
								console.log("bye");
								settoggleAddBillNo(true);
								console.log(toggleAddBillNo)
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
						<br />
						<Typography align='center'>
							{
								newTransaction > 0 ? <Button sx={{
									width: 1 / 4, backgroundColor: "#f2183d", '&:hover': {
										background: "#f2183d",
									}
								}} onClick={handleSubmit} variant="contained">UPDATE</Button> :
									<Button disabled sx={{
										width: 1 / 4, backgroundColor: "#f2183d", '&:hover': {
											background: "#f2183d",
										}
									}} onClick={handleSubmit} variant="contained">UPDATE</Button>
							}
							<Button variant="outlined" color="error" sx={{ marginLeft: "1rem", color: "red", width: 1 / 4 }} startIcon={<DeleteIcon />}>
								DELETE
							</Button>
						</Typography>


					</form>
				</>
			}
		</>
	)
}

export default EditSingleCustomerTransactionForGaveAmount