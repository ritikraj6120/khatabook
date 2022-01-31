import React from 'react'
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'
import './style.css'
const About = () => {
	return (
		<>
			<Navbar />
			<div className="card mt-5" style={{ width: "18rem" }}>
				<div className="card-body">
					<h5 className="card-title">You will get </h5>
					<p className="card-text">total money</p>
				</div>
			</div>
			<Link to="/khatabook/addsupplier">
				<button type="button" className="btn  sticky-btn">
					<PersonAddRoundedIcon style={{ color: "white" }} />
				</button>
			</Link>
		</>
	)
}

export default About
