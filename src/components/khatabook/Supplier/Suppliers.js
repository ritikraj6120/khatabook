import React, { useContext, useEffect } from 'react'
import SupplierContext from "../../../context/SupplierContext"
import SupplierItem from './SupplierItem';
import { useHistory, Link } from 'react-router-dom'
// import Navbar from '../Navbar'
import '../style.css'
import { Button } from '@mui/material';
import generatePDF from './supplierReport';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import CircularProgress from '@mui/material/CircularProgress';
const Suppliers = () => {
	let history = useHistory();
	const { suppliers, getSuppliers, getSupplierBalance, supplierstate } = useContext(SupplierContext);
	const { supplierBalance, loading } = supplierstate;
	useEffect(() => {
		getSuppliers();
		getSupplierBalance();
		// eslint-disable-next-line
	}, [])
	useEffect(() => {
		if (supplierstate.error === 'Something Went wrong!') {
			history.push('/login');
		}
	}, [supplierstate.error])
	let totalpurchase = 0;
	let remaining = 0;
	if (loading === false) {

		for (let i = 0; i < supplierBalance.length; i++) {
			totalpurchase += supplierBalance[i].purchase;
			remaining = supplierBalance[i].purchase - supplierBalance[i].payment;
		}
	}

	return (
		<>
			{/* <Navbar a="/customers" b="/suppliers" /> */}
			{loading === true ? <CircularProgress color="secondary" /> :
				<>
					<div className="card mt-5" style={{ width: "18rem" }}>
						<div className="card-body">
							<h5 className="card-title">Total Purchase </h5>
							<p className="card-text">Rs {totalpurchase}</p>
							{remaining >= 0 ? <h5 className="card-title">You'll Give</h5> : <h5 className="card-title">Advance</h5>}
							<p>
								Rs {Math.abs(remaining)}
							</p>
							<Button variant="contained" onClick={() => generatePDF(suppliers, supplierBalance)}>
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
										return <SupplierItem key={supplier._id} supplier={supplier}
											supplierBalance={supplierBalance}
										/>
									})
								}
							</div>
						</div>
					</div>
				</>
			}

			<Link to="/addsupplier">
				<button type="button" className="btn  sticky-btn" style={{ backgroundColor: "#3fcb1d" }}>
					<PersonAddRoundedIcon style={{ color: "white" }} />
				</button>
			</Link>
		</>
	)
}

export default Suppliers;

