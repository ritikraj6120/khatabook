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


	// const [credentials, setCredentials] = useState({ title: singlecustomer.title, name: singlecustomer.name, phone: singlecustomer.phone })

	// const handleSubmit = async (e) => {
	// 	let { title, name, phone } = credentials;
	// 	e.preventDefault();
	// 	await editCustomer(singlecustomer._id, title, name, phone);
	// }

	// const onChange = (e) => {
	// 	setCredentials({ ...credentials, [e.target.name]: e.target.value })
	// }
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
					<>
						<CustomerDetail singleCustomer={singleCustomer} />

						<div className="d-flex justify-content-center">
							<div className='d-grid gap-2 col-6 '>
								{SingleCustomerTransaction.map((item) => {

									return (<div key={item._id}>
										<button >{item.lendamount_singleCustomer} {item.takeamount_singleCustomer}</button>

									</div>)
								})}
							</div>
						</div>

						<div className='fixed'>
							{/* {SingleCustomerTransaction.length===0?<div className='fixed'>ADD first transaction</div>:null} */}
							<Stack spacing={2} direction="row">
								<Button style={{ backgroundColor: "red" }} variant="contained" onClick={youGaveAddPage}>You Gave Rs</Button>
								<Button style={{ backgroundColor: "#2da62d" }} variant="contained" onClick={youGetAddPage}>You Got Rs</Button>
							</Stack>
						</div>

					</>
			}

		</>
	);
};

export default SingleCustomer;


// <form>
//   <div className="form-row align-items-center">
//     <div className="col-sm-3 my-1">
//       <label className="sr-only" htmlFor="inlineFormInputName">Name</label>
//       <input type="text" className="form-control" id="inlineFormInputName" placeholder="Jane Doe"/>
//     </div>
//     <div className="col-sm-3 my-1">
//       <label className="sr-only" for="inlineFormInputGroupUsername">Username</label>
//       <div className="input-group">
//         <div className="input-group-prepend">
//           <div className="input-group-text">@</div>
//         </div>
//         <input type="text" className="form-control" id="inlineFormInputGroupUsername" placeholder="Username"/>
//       </div>
//     </div>
//     <div className="col-auto my-1">
//       <div className="form-check">
//         <input className="form-check-input" type="checkbox" id="autoSizingCheck2"/>
//         <label className="form-check-label" htmlFor="autoSizingCheck2">
//           Remember me
//         </label>
//       </div>
//     </div>
//     <div className="col-auto my-1">
//       <button type="submit" className="btn btn-primary">Submit</button>
//     </div>
//   </div>
// </form>




