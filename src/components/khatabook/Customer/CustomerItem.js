import React from 'react';
// import CustomerContext from "../../../context/CustomerContext"
import { useHistory } from 'react-router-dom'; 
const CustomerItem = (props) => {
	let history=useHistory();
	const { customer,customerBalance } = props;
	const { title, name} = customer;
	const result = customerBalance.filter(item => item.customer === customer._id);
	let currentTotal=0;
	// console.log(result[0])
	let x=0
	if(result[0])
	x= result[0].amounttoget-result[0].amounttogive;
	if(x>=0)
	{
		currentTotal=x;
	}
	else{
		currentTotal=-x;
	}
	const edit =()=>{
		localStorage.setItem("SingleCustomerId",JSON.stringify(customer._id))
		history.push('/editcustomer');
	}
	return (
		<>
			<button className="btn btn-outline-dark" onClick={edit}>
				<div className="d-flex bd-highlight">
					<div className="p-2  bd-highlight">{title}</div>
					<div className="p-2 bd-highlight">{name}</div>
					<div className="p-2 flex-grow-1 bd-highlight">
					Rs {Math.abs(currentTotal)}
					<br/>
					{ currentTotal >= 0? currentTotal>0?<small>You will get </small>:null : <small>You will give</small>}
					</div>
				</div>
			</button>
		</>

	)
}

export default CustomerItem;
