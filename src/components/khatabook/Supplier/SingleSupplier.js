import React, { useContext, useState, useEffect } from 'react';
import SupplierContext from '../../../context/SupplierContext';
import { useHistory } from 'react-router-dom';
import '../style.css';
import SupplierDetail from './SupplierDetail';
import Navbar from '../Navbar';
import { Stack, CircularProgress, Button } from '@mui/material';

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

	return (
		<>
			<Navbar a="/editcustomer" b="/editsupplier" />
			{
				loading === true ? <CircularProgress color="secondary" /> :
					<>
						<SupplierDetail singleSupplier={singleSupplier} />
						<div className="d-flex justify-content-center">
							<div className='d-grid gap-2 col-6 '>
								{/* sort((a, b) => {
									return new Date(b.date) - new Date(a.date);
									}) */}
								{SingleSupplierTransaction.sort((a, b) => {
									return new Date(b.date) - new Date(a.date);
								}).map((item) => {
									return (
										<div key={item._id}>
											<button className="btn btn-outline-dark" >
												<div className="d-flex bd-highlight">
													<div className="p-2  bd-highlight">Rs {item.purchase_singleSupplier}</div>
													<div className="p-2 bd-highlight">Rs {item.payment_singleSupplier}</div>
												</div>
											</button>

										</div>)
								})}
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