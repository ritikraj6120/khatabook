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

	// const [credentials, setCredentials] = useState({ title: singlesupplier.title, name: singlesupplier.name,phone:singlecustomer.phone})

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	let { title, name, phone} = credentials;
	// 	await editSupplier(singlesupplier._id, title, name,phone);
	// }

	// const edit=async(e)=>{
	// 	e.preventDefault();
	// 	console.log("hello")
	// }

	// const onChange = (e) => {
	// 	setCredentials({ ...credentials, [e.target.name]: e.target.value })
	// }
	const youGaveAddPage = (e) => {
		history.push('/addNewTransactionForSupplierPayment');
	}
	const youGetAddPage = (e) => {
		history.push('/addNewTransactionForSupplierPurchase');
	}
	return (
		<>
			<Navbar a="/editcustomer" b="/editsupplier" />
			{
				loading === true ? <CircularProgress color="secondary" /> :
					<>
						<SupplierDetail singleSupplier={singleSupplier} />
						{/* <form onSubmit={handleSubmit}>
				<div className="form-row align-items-center">
					<div className="col-sm-3 my-1">
						<label className="sr-only" htmlFor="inlineFormInputName">Title</label>
						<select className="form-control" id="inlineFormInputName"
							name="title" placeholder="Title" value={credentials.title} onChange={onChange} >
							<option value="Mr">Mr</option>
							<option value="Mrs">Mrs</option>
						</select>
					</div>
					<div className="col-sm-3 my-1">
						<label className="sr-only" htmlFor="inlineFormInputName">Name</label>
						<input required type="text" className="form-control" id="inlineFormInputName" name="name" placeholder="Name" value={credentials.name} onChange={onChange} />
					</div>
					<div className="col-sm-3 my-1">
						<label className="sr-only" htmlFor="inlineFormInputGroupUsername">Payment</label>
						<input type="number" className="form-control" id="inlineFormInputGroupUsername" name="payment" placeholder="Enter Payment Amount" min="0" onChange={onChange} />
					</div>
					<div className="col-sm-3 my-1">
						<label className="sr-only" htmlFor="inlineFormInputGroupUsername">Purchase</label>
						<input type="number" className="form-control" id="inlineFormInputGroupUsername" name="purchase" placeholder="Enter Purchase amount" min="0" onChange={onChange} />
					</div>
					<div className="col-auto my-1">
						<button type="submit" className="btn btn-primary">Update</button>
					</div>
				</div>
			</form> */}
						<div className="d-flex justify-content-center">
							<div className='d-grid gap-2 col-6 '>
								{SingleSupplierTransaction.map((item) => {
									return (
										<div key={item._id}>
											<button className="btn btn-outline-dark" >
												<div className="d-flex bd-highlight">
													<div className="p-2  bd-highlight">{item.purchase_singleSupplier}</div>
													<div className="p-2 bd-highlight">{item.payment_singleSupplier}</div>
												</div>
											</button>

										</div>)
								})}
							</div>
						</div>
						<div className='fixed'>
							<Stack spacing={2} direction="row">
								<Button style={{ backgroundColor: "red" }} variant="contained" onClick={youGaveAddPage}>PURCHASE</Button>
								<Button style={{ backgroundColor: "#2da62d" }} variant="contained" onClick={youGetAddPage}>PAYMENT</Button>
							</Stack>
						</div>
					</>
			}
		</>
	);
};

			export default SingleSupplier;