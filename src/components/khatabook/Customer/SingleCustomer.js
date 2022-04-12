import React, { useContext, useState, useEffect } from 'react';
import CustomerContext from '../../../context/CustomerContext';
import { useHistory } from 'react-router-dom';
import '../style.css';
import CustomerDetail from './CustomerDetail';
import Navbar from '../Navbar';
import { Stack, CircularProgress, Button } from '@mui/material';

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
	return (
		<>
			<Navbar a="/editcustomer" b="/editsupplier" />
			{

				loading === true ? <CircularProgress color="secondary" /> :
					<div>
						<CustomerDetail singleCustomer={singleCustomer} />

						<div className="d-flex justify-content-center">
							<div className='d-grid gap-2 col-6 '>
								{
									SingleCustomerTransaction.sort((a, b) => {
										return new Date(b.date) - new Date(a.date);
									}).map(
										(item) => {
											return (
												<div key={item._id}>
													<button className="btn btn-outline-dark">
														<div className="d-flex bd-highlight">
															<div className="p-2  bd-highlight">Rs {item.lendamount_singleCustomer}</div>
															<div className="p-2 bd-highlight">Rs  {item.takeamount_singleCustomer}</div>
															<div><i className="fa-solid fa-trash " style={{height:"2rem",width:"2rem"}}></i></div>
														</div>
													</button>
												</div>
											)
										}
									)
								}
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



