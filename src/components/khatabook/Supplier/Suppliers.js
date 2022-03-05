import React, { useContext, useEffect } from 'react'
import SupplierContext from "../../../context/SupplierContext"
import SupplierItem from './SupplierItem';
import { useHistory, Link } from 'react-router-dom'
import Navbar from '../Navbar'
import '../style.css'
import { Button } from '@mui/material';
import generatePDF from './supplierReport'
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';

const Suppliers = () => {
	const context = useContext(SupplierContext);
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
	let supplierpayment = 0;
	let supplierpurchase = 0;
	for (let i = 0; i < suppliers.length; i++) {
		if (suppliers[i].payment - suppliers[i].purchase >= 0) {
			supplierpayment += (suppliers[i].payment - suppliers[i].purchase);
		}
		else {
			supplierpurchase += (suppliers[i].purchase - suppliers[i].payment);
		}
	}

	return (
		<>
			<Navbar a="/customers" b="/suppliers" />
			<div className="card mt-5" style={{ width: "18rem" }}>
				<div className="card-body">
					<h5 className="card-title">Total Purchase </h5>
					<p className="card-text">Rs {supplierpurchase}</p>
					<h5 className="card-title">Your Advance</h5>
					<p className="card-text">Rs {supplierpayment}</p>
					<Button variant="contained" onClick={() => generatePDF(suppliers)}>
						Download Report
					</Button>
				</div>
			</div>
			<div className="my-3">
				<br />
				<div className="container mx-2 h3">
					{suppliers.length === 0 && 'No Suppliers'}
				</div>
				<div className="d-flex justify-content-center">
					<div className='d-grid gap-2 col-6 '>
						{
							suppliers.map((supplier) => {
								return <SupplierItem key={supplier._id} supplier={supplier} />
							})
						}
					</div>
				</div>
			</div>

			<Link to="/addsupplier">
				<button type="button" className="btn  sticky-btn" style={{ backgroundColor: "#3fcb1d" }}>
					<PersonAddRoundedIcon style={{ color: "white" }} />
				</button>
			</Link>
		</>
	)
}

export default Suppliers;

