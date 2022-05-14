import React from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
const CustomerItem = (props) => {
	let history = useHistory();
	const { customer, customerBalance } = props;
	const { title, name } = customer;
	const result = customerBalance.filter(item => item.customer === customer._id);
	let x = 0
	if (result[0])
		x = result[0].amounttoget - result[0].amounttogive;
	const edit = () => {
		localStorage.setItem("SingleCustomerId", JSON.stringify(customer._id));
		history.push('/singlecustomer');
	}
	const stringAvatar = (name) => {
		let text;
		if (name.split(' ').length > 1)
			text = text = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
		else
			text = text = `${name.split(' ')[0][0]}`;
		return text.toUpperCase();
	}

	return (
		<>
			<button className="btn btn-outline-dark" onClick={edit}>
				<div className="d-flex bd-highlight">
					<Avatar sx={{ bgcolor: "#186fd9", width: 40, height: 40, marginLeft: "8vw", fontSize: 16 }}>
						{stringAvatar(name)}
					</Avatar>
					<div className="p-2  bd-highlight">{title}</div>
					<div className="p-2 bd-highlight">{name}</div>
					<div className="p-2 flex-grow-1 bd-highlight">Rs {Math.abs(x)}
						<br />
						{x >= 0 ? x > 0 ? <small>You will get </small> : null : <small>You will give</small>}
					</div>
				</div>
			</button>
		</>

	)
}

export default CustomerItem;
