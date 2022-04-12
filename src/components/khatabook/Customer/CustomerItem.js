import React from 'react';
import { useHistory } from 'react-router-dom';
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
		history.push('/editcustomer');
	}
	return (
		<>
			<button className="btn btn-outline-dark" onClick={edit}>
				<div className="d-flex bd-highlight">
					<div className="p-2  bd-highlight">{title}</div>
					<div className="p-2 bd-highlight">{name}</div>
					<div className="p-2 flex-grow-1 bd-highlight">Rs {Math.abs(x)}
					<br />
					{x >= 0 ? x > 0 ? <small>You will get </small> : null : <small>You will give</small>}
					</div>
					<i className="fa-solid fa-trash " style={{height:"2rem",width:"2rem"}}></i>
				</div>
			</button>
		</>

	)
}

export default CustomerItem;
