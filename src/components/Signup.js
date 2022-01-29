import React, { useState } from "react";
import { useHistory } from "react-router-dom"


const Signup = (props) => {
	const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
	let history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, email, password } = credentials;
		const response = await fetch("http://localhost:5000/api/auth//createuser", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email, password })
		});
		const json = await response.json()
		console.log(json);
		if (json.success) {
			// Save the auth token and redirect
			localStorage.setItem('token', json.authtoken);
			
			history.push("/");
			props.showAlert("Account Created Successfully","success")

		}
		else {
			props.showAlert("Invalid Details","danger")
		}
	}

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
	}

	return (
        <div className='mt-3 container'>
			<h2 className="my-3">Create an account to use  iNotebook</h2>
			<form onSubmit={handleSubmit}>
				<div className="my-3">
					<label htmlFor="name" className="form-label">
						Enter Your Name
					</label>
					<input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" value={credentials.name} onChange={onChange} 
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email address
					</label>
					<input
						type="email"
						className="form-control"
						id="email"
						aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} required minLength={5}
					/>
					<div id="emailHelp" className="form-text">
						We'll never share your email with anyone else.
					</div>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="password" name="password" value={credentials.password} onChange={onChange} required minLength={5}
					/>
				</div>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Signup;
