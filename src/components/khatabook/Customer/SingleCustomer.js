import React, { useContext, useState, useEffect } from 'react';
import CustomerContext from '../../../context/CustomerContext';
import { useHistory } from 'react-router-dom';
import '../style.css';
import CustomerDetail from './CustomerDetail';
import Navbar from '../Navbar';
import { Stack, Typography, Button, CircularProgress, Table, TableRow, TableHead, TableBody, TableCell, TextField } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const SingleCustomer = () => {
	let history = useHistory();
	const { SingleCustomerTransaction, getSingleCustomerTransactions, getSingleCustomerDetail, singleCustomerDetail } = useContext(CustomerContext);
	const { singleCustomer, loading } = singleCustomerDetail;
	const singlecustomerid = JSON.parse(localStorage.getItem('SingleCustomerId'));


	useEffect(() => {
		getSingleCustomerTransactions(singlecustomerid);
		getSingleCustomerDetail(singlecustomerid);
		// eslint-disable-next-line
	}, [])

	const youGaveAddPage = (e) => {
		history.push('/addNewTransactionForCustomerGave');
	}
	const youGetAddPage = (e) => {
		history.push('/addNewTransactionForCustomerGet');
	}


	const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
	const formatdate = (d) => {
		return d.getDate() + month[d.getMonth()] + ('' + d.getFullYear()).slice(2);
	}

	return (
		<>
			<Navbar a="/editcustomer" b="/editsupplier" />
			{

				loading === true ? <CircularProgress color="secondary" /> :
					<div>
						<CustomerDetail singleCustomer={singleCustomer} />

						<div className="d-flex justify-content-center">
							<div className='d-grid gap-2 col-6 '>
								<Table>
									<TableHead sx={{
										background: '#ffeb3b'
									}}>
										<TableRow>
											<TableCell>
												<Typography variant="h6">
													Entries
												</Typography>

											</TableCell>
											<TableCell>
												<Typography variant="h6">
													YOU GAVE
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="h6">
													YOU GOT
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="h6">
													UPDATE
												</Typography>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>

										{
											SingleCustomerTransaction.sort((a, b) => {
												return new Date(b.date) - new Date(a.date);
											}).map(
												(item, i) => {
													let d = new Date(item.date)
													return (
														<TableRow key={i}>
															<TableCell>
																<Typography variant="body1">
																	{formatdate(d)}
																</Typography>
															</TableCell>
															<TableCell>
																<Typography variant="body1">
																	Rs {item.lendamount_singleCustomer}
																</Typography>
															</TableCell>
															<TableCell>
																<Typography variant="body1">
																	Rs  {item.takeamount_singleCustomer}
																</Typography>
															</TableCell>
															<TableCell>
																<Typography variant="body1">
																	<Button variant="contained" size="small"> Edit </Button>
																</Typography>
															</TableCell>
														</TableRow>
													)
												}
											)
										}
									</TableBody>
								</Table >
							</div>
						</div>

						<div className='fixed'>
							{/* {SingleCustomerTransaction.length===0?<div className='fixed'>ADD first transaction</div>:null} */}
							<Stack spacing={2} direction="row">
								<Button style={{ backgroundColor: "red" }} variant="contained" onClick={youGaveAddPage}>You Gave Rs</Button>
								<Button style={{ backgroundColor: "#2da62d" }} variant="contained" onClick={youGetAddPage}>You Got Rs</Button>
							</Stack>
						</div>

					</div >
			}

		</>
	);
};

export default SingleCustomer;



