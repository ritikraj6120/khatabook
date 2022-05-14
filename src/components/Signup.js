// import React, { useState,useContext } from "react";
// import { useHistory } from "react-router-dom";
// import noteContext from "../context/notes/noteContext";
// const Signup = (props) => {
// 	const context=useContext(noteContext);
// 	const { showAlert } = context;
// 	let history = useHistory();
// 	const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })


// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		const { name, email, password } = credentials;
// 		const response = await fetch("http://localhost:5000/api/auth//createuser", {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify({ name, email, password })
// 		});
// 		const json = await response.json()
// 		console.log(json);
// 		if (json.success) {
// 			// Save the auth token and redirect
// 			localStorage.setItem('token', json.authtoken);

// 			history.push("/");
// 			showAlert("Account Created Successfully","success")

// 		}
// 		else {
// 			showAlert("Invalid Details","danger")
// 		}
// 	}

// 	const onChange = (e) => {
// 		setCredentials({ ...credentials, [e.target.name]: e.target.value })
// 	}

// 	return (
//         <div className='mt-3 container'>
// 			<h2 className="my-3">Create an account to use  iNotebook</h2>
// 			<form onSubmit={handleSubmit}>
// 				<div className="my-3">
// 					<label htmlFor="name" className="form-label">
// 						Enter Your Name
// 					</label>
// 					<input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" value={credentials.name} onChange={onChange} 
// 					/>
// 				</div>
// 				<div className="mb-3">
// 					<label htmlFor="email" className="form-label">
// 						Email address
// 					</label>
// 					<input
// 						type="email"
// 						className="form-control"
// 						id="email"
// 						aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} required minLength={5}
// 					/>
// 					<div id="emailHelp" className="form-text">
// 						We'll never share your email with anyone else.
// 					</div>
// 				</div>
// 				<div className="mb-3">
// 					<label htmlFor="password" className="form-label">
// 						Password
// 					</label>
// 					<input
// 						type="password"
// 						className="form-control"
// 						id="password" name="password" value={credentials.password} onChange={onChange} required minLength={5}
// 					/>
// 				</div>

// 				<button type="submit" className="btn btn-primary">
// 					Submit
// 				</button>
// 			</form>
// 		</div>
// 	);
// };

// export default Signup;

import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext.js";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-phone-number-input/style.css'
import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'
import { notifyWarning, notifyError, notifySuccess } from '../alert';
function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			Ritik Raj
			{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

export default function SignUp() {
	const [phone, setPhone] = useState()
	const { signup } = useContext(UserContext);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isPossiblePhoneNumber(phone) === false) {
			notifyWarning("Enter correct phone Number");
			return;
		}
		else if (isValidPhoneNumber(phone) === false) {
			notifyWarning("Enter valid phone Number");
			return;
		}
		const data = new FormData(e.currentTarget);
		const user = {
			fname: data.get("firstName"),
			lname: data.get("lastName"),
			email: data.get("email"),
			password: data.get("password")
		};
		await signup(user);
	}

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									autoComplete="off"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="off"
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="off"
								/>
							</Grid>

							{/* <Grid item xs={12}>
								<PhoneInput
									// fullWidth
									required
									international
									defaultCountry="IN"
									placeholder="Phone Number"
									className="form-control"
									name="phone"
									autoComplete="off"
									id="phone" value={phone} onChange={setPhone} />

							</Grid> */}

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="off" inputProps={{ minLength: 8 }}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
}