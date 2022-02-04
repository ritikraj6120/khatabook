import React, { useContext, useEffect } from 'react'
import khataContext from "../../context/notes/khataContext"
import Supplieritem from './Supplieritem';
import { useHistory, Link } from 'react-router-dom'
import Navbar from './Navbar'
import './style.css'
import { Button } from '@mui/material';
import generatePDF  from './services/supplierReport'
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
const Suppliers = () => {

	const context = useContext(khataContext);
	let history = useHistory();
	const { suppliers, getSuppliers } = context;
	useEffect(() => {
		if (localStorage.getItem('token'))
			getSuppliers()
		else {
			history.push('/login');
		}
		// eslint-disable-next-line
	}, [])
	let supplierbalance = 0;
	suppliers.map((supplier) => { supplierbalance += supplier.amount })

	return (
		<>
			<Navbar a="/khatabook/customers" b="/khatabook/suppliers" />
			<div className="card mt-5" style={{ width: "18rem" }}>
				<div className="card-body">
					<h5 className="card-title">You Will Give </h5>
					<p className="card-text">Rs {supplierbalance}</p>
					<Button variant="contained" onClick={() => generatePDF(suppliers)}>
						Download Report
					</Button>
				</div>
			</div>

			<div className=" my-3">
				<br />
				<div className="container mx-2 h3">
					{suppliers.length === 0 && 'No Suppliers'}
				</div>
				<div className="d-flex justify-content-center">
					<div className='d-grid gap-2 col-6 '>
						{suppliers.map((supplier) => {
							return <Supplieritem key={supplier._id} supplier={supplier} />
						})}
					</div>
				</div>
			</div>

			<Link to="/khatabook/addsupplier">
				<button type="button" className="btn  sticky-btn" style={{ backgroundColor: "#3fcb1d" }}>
					<PersonAddRoundedIcon style={{ color: "white" }} />
				</button>
			</Link>
		</>
	)
}

export default Suppliers;

