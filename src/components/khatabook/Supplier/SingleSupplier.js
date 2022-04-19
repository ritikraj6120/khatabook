import React, { useContext, useState, useEffect } from 'react';
import SupplierContext from '../../../context/SupplierContext';
import { useHistory } from 'react-router-dom';
import '../style.css';
import SupplierDetail from './SupplierDetail';
import Navbar from '../Navbar';
import { Stack, Typography, Button, CircularProgress, Table, TableRow, TableHead, TableBody, TableCell } from '@mui/material';

const SingleSupplier = () => {
	let history = useHistory();
	const { SingleSupplierTransaction, getSingleSupplierTransactions, getSingleSupplierDetail, singleSupplierDetail } = useContext(SupplierContext);
	const { singleSupplier, loading } = singleSupplierDetail;
	const singlesupplierid = JSON.parse(localStorage.getItem('SingleSupplierId'));

	useEffect(() => {
		getSingleSupplierTransactions(singlesupplierid);
		getSingleSupplierDetail(singlesupplierid);
		// eslint-disable-next-line
	}, [])
	const youGetAddPage = (e) => {
		history.push('/addNewTransactionForSupplierPurchase');
	}
	const youGaveAddPage = (e) => {
		history.push('/addNewTransactionForSupplierPayment');
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
					<>
						<SupplierDetail singleSupplier={singleSupplier} />
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
													PURCHASE
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="h6">
													PAYMENT
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
											SingleSupplierTransaction.sort((a, b) => {
												return new Date(b.date) - new Date(a.date);
											}).map((item, i) => {
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
																Rs {item.purchase_singleSupplier}
															</Typography>
														</TableCell>
														<TableCell>
															<Typography variant="body1">
																Rs {item.payment_singleSupplier}
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
							<Stack spacing={2} direction="row">
								<Button style={{ backgroundColor: "red" }} variant="contained" onClick={youGetAddPage}>PURCHASE</Button>
								<Button style={{ backgroundColor: "#2da62d" }} variant="contained" onClick={youGaveAddPage}>PAYMENT</Button>
							</Stack>
						</div>
					</>
			}
		</>
	);
};

export default SingleSupplier;