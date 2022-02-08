import React, { useContext, useEffect, useState } from "react";
import AdminContext from "../../context/notes/AdminContext";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const bull = (
	<Box
		component="span"
		sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
	>
		•
	</Box>
);

const OutlinedCard = (props) => {
	const { deleteuser } = useContext(AdminContext);
	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	console.log(e.target.value);
	// 	deleteuser(Cookies, e.target.value);
	// 	window.location.reload();
	// };
	const handleSubmit = (e) => {
		e.preventDefault();
		deleteuser(e.target.value);
		window.location.reload();
	};
	return (
		<Box sx={{ minWidth: 275 }}>
			<Card variant="outlined">
				<React.Fragment>
					<CardContent>
						<Typography color="text.secondary">
							Name
						</Typography>
						<Typography variant="h5" component="div">
							{props.fname + " " + props.lname}
						</Typography>
						<Typography color="text.secondary">
							Email
						</Typography>
						<Typography variant="body2">
							{props.email}
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small" value={props._id} onClick={handleSubmit}>
							Delete User
						</Button>
					</CardActions>
				</React.Fragment>
			</Card>
		</Box>
	);
};

const AdminDashboard = () => {
	const { Users, fetchUserList } = useContext(AdminContext);
	const [userList, setUserList] = useState([]);

	useEffect(() => {
		fetchUserList();
	}, []);

	const simpleUsers = Users.filter(user => !user.isadmin);

	return (
		<div>
			<h1>Admin Dashboard</h1>
			<p>You are logged in as admin</p>
			<p>Users Count:- {simpleUsers.length}</p>
			<ul>
				{simpleUsers.map((user) => {
					// return <li key={user.id}>{user.firstName + " " + user.lastName}</li>;
					return <OutlinedCard key={user.id} {...user} />;
				})}
			</ul>
		</div>
	);
};

const AdminPage = () => {
	return (

		<AdminDashboard />

	);
};

export default AdminPage;

// import React from 'react'

// const About = () => {
//     return (
//         <div>
//             This is About page
//         </div>
//     )
// }

// export default About
