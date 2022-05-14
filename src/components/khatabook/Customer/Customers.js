import React, { useContext, useEffect } from 'react'
import CustomerContext from "../../../context/CustomerContext"
import CustomerItem from './CustomerItem';
import { useHistory, Link } from 'react-router-dom'
// import Navbar from '../Navbar'
import '../style.css'
import { Button, Grid, Card } from '@mui/material';
import { Box } from '@mui/system';
import generatePDF from './customerReport';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import CircularProgress from '@mui/material/CircularProgress';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
const Customers = () => {
	let history = useHistory();
	const { customers, getCustomers, getCustomerBalance, customerstate } = useContext(CustomerContext);
	const { customerBalance, loading } = customerstate;
	useEffect(() => {
		getCustomers();
		getCustomerBalance();
		// eslint-disable-next-line
	}, [])
	useEffect(() => {
		if (customerstate.error === 'Something Went wrong!') {
			history.push('/login');
		}
	}, [customerstate.error])
	let TotalAmounttoget = 0;
	let TotalAmounttogive = 0;
	let NetBalance = 0;
	// console.log("hello");
	// console.log(customerstate.loading);
	if (loading === false) {

		for (let i = 0; i < customerBalance.length; i++) {
			let x = customerBalance[i].amounttoget - customerBalance[i].amounttogive;
			NetBalance += x;
			if (x >= 0) {
				TotalAmounttoget += x;
			}
			else {
				TotalAmounttogive += (-x);
			}
		}
	}
	return (
		<>
			{/* <Navbar a="/customers" b="/suppliers" /> */}
			{
				loading === true ? <CircularProgress color="secondary" /> :
					<>
						<div className="card mt-5" style={{ width: "18rem" }}>
							<div className="card-body">
								<h5 className="card-title">You will get </h5>
								<p className="card-text">Rs {TotalAmounttoget}</p>
								<h5 className="card-title">You will give </h5>
								<p className="card-text">Rs {TotalAmounttogive}</p>
								<Button variant="contained" onClick={() => generatePDF(customers, customerBalance)}>
									Download Report
								</Button>
							</div>
						</div>

						<div className=" my-3">
							<br />
							<div className="container mx-2 h3">
								{customers.length === 0 && 'No Customers'}
							</div>
							<div className="d-flex justify-content-center">
								<div className='d-grid gap-2 col-6 '>
									{customers.map((customer) => {
										return <CustomerItem key={customer._id} customer={customer} customerBalance={customerBalance} />
									})}
								</div>
							</div>
						</div>
					</>
			}
			<Link to="/addcustomer">
				<button type="button" className="btn  sticky-btn">
					<PersonAddRoundedIcon style={{ color: "white" }} />
				</button>
			</Link>
						{/* <Card variant="outlined" sx={{ textAlign: 'center', maxHeight: "60vh", overflowY: "auto" }}>
							<AccountBalanceWalletIcon sx={{ bgcolor: "#186fd9", width: 107, height: 107, marginLeft: "8vw", fontSize: 32, fontWeight: "bold", marginBottom: "16px", marginTop: "2vw" }} />


							<CardContent sx={{ paddingTop: 0 }}>
								<Typography variant="h6" sx={{ fontSize: 20, mb: 1 }}>
									Net Balance
								</Typography>
								{NetBalance >= 0 ? x > 0 ?
									<>
										<Box>
											<Typography sx={{ fontSize: 20, fontWeight: "bold", color: "#C82128" }}>
												<CurrencyRupeeIcon sx={{ fontSize: 20 }} />
												{NetBalance}
											</Typography>
											<Typography color="text.secondary" gutterBottom variant="body1" sx={{ display: 'inline' }}>
												You will get
											</Typography>
										</Box>
										:
										<Box>
											<Typography sx={{ fontSize: 20, fontWeight: "bold", color: "#0F814D" }}>
												<CurrencyRupeeIcon sx={{ fontSize: 20 }} />
												{NetBalance}
											</Typography>
											<Typography color="text.secondary" gutterBottom variant="body1" sx={{ display: 'inline' }}>
												You'll Give
											</Typography>
										</Box>
									</>
								}
								<Divider />
								<Typography sx={{ mb: 3, mt: 3 }}>
									<LocalPhoneOutlinedIcon sx={{ color: "red", mr: "5%" }} />
									{singleCustomer.phone}
								</Typography>
								<Box sx={{ mb: 3 }} >
									<Button size="small" style={{ backgroundColor: "#C82128", marginRight: "0.75rem" }} variant="contained" onClick={youGaveAddPage}>You Gave <CurrencyRupeeIcon sx={{ fontSize: "1.10rem" }} /></Button>

									<Button size="small" style={{ backgroundColor: "#0F814D", marginRight: "0.75rem" }} variant="contained" onClick={youGetAddPage}>You Got <CurrencyRupeeIcon sx={{ fontSize: "1.10rem" }} /></Button>
								</Box>
								<Divider />
							</CardContent>
							 <CardActions> 
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-evenly',
									// width: 'fit-content',
									borderBottom: (theme) => `10px solid rgb(0 0 0 / -1.88)`,
									borderRadius: 1,
									// bgcolor: 'yellow',
									color: 'text.secondary',
									'& hr': {
										mx: 0.5,
										// width:"50px",
										// height:"35px"
									},
								}}
							>
								<Link className="nav-link " to="/singleCustomerReport">
									<PictureAsPdfOutlinedIcon fontSize='100' />
									<Typography>
										Reports
									</Typography>
								</Link>


								<Divider orientation="vertical" variant="middle" />
								{
									x > 0 ?
										<Link className="nav-link" to={{ pathname: `https://api.whatsapp.com/send?phone=${singleCustomer.phone}&text=Dear Sir/Madam, your payment of Rs ${Math.abs(x)} is still pending. Please make payment as soon as possible.` }} target="_blank"><WhatsappOutlinedIcon fontSize='100' /><Typography> Reminder</Typography></Link> :
										<Box sx={{ color: "#9e9e9e" }}>
											<PictureAsPdfOutlinedIcon fontSize='100' />
											<Typography>
												Reports
											</Typography>
										</Box>
								}
								<Divider orientation="vertical" variant="middle" />
								{/* <Link to="/" className="nav-link" style={true ? { pointerEvents: "none" } : null}>Test</Link> */}
								{/* <Typography variant="body1">hello</Typography> */}
							{/* </Box> */}
							{/* </CardActions> */}
						{/* </Card >  */}

					</>
	)
}

			export default Customers


