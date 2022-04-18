import React, { useContext, useEffect } from 'react'
import UserContext from '../context/userContext';
import { useHistory } from 'react-router-dom';
// import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const User = () => {
	let history = useHistory();
	const { UserDetail, getUser } = useContext(UserContext);
	useEffect(() => {
		if (localStorage.getItem('token'))
			getUser()
		else {
			history.push('/login');
		}
		// eslint-disable-next-line
	}, [])
	// console.log(UserDetail);
	return (

		// <div>

		// 	<p>😎 {UserDetail.fname} {UserDetail.lname}</p>
		// 	<p>📧 { UserDetail.email}</p>
		// 	<p> {UserDetail.name} created account on {new Date(UserDetail.date).toLocaleString()} I.S.T</p>
		// </div>
		<Box sx={{ minWidth: 275 }}>
			<Card variant="outlined">
				<>
					<CardContent>
						<Typography color="text.secondary">
							Name
						</Typography>
						<Typography variant="h5" component="div">
							{UserDetail.fname + " " + UserDetail.lname}
						</Typography>
						<Typography color="text.secondary">
							Email
						</Typography>
						<Typography variant="body2">
							{UserDetail.email}
						</Typography>
						<Typography color="text.secondary">
							Created account on
						</Typography>
						<Typography variant="body2">
							{new Date(UserDetail.date).toLocaleString()} I.S.T
						</Typography>
					</CardContent>
					{/* <CardActions>
						<Button size="small" value={props._id} onClick={handleSubmit}>
							Delete User
						</Button>
					</CardActions> */}
				</>
			</Card>
		</Box>
	)
}
export default User;

