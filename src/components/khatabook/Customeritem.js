import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'; 
import khataContext from '../../context/notes/khataContext';
const Customeritem = (props) => {
	let history=useHistory();
	// const {  singlecustomer,setSinglecustomer} = useContext(khataContext);
	const { customer } = props;
	const { title, name,lendamount, takeamount } = customer;
	let currentTotal=lendamount-takeamount;
	const edit =()=>{
		// setSinglecustomer(customer)	;
		localStorage.setItem("singlecustomer",JSON.stringify(customer))
		history.push('/khatabook/editcustomer');

	}
	return (
		<>
			<button className="btn btn-outline-dark" onClick={edit}>
				<div className="d-flex bd-highlight">
					<div className="p-2  bd-highlight">{title}</div>
					<div className="p-2 bd-highlight">{name}</div>
					<div className="p-2 flex-grow-1 bd-highlight">Rs {Math.abs(currentTotal)}
					<br/>
					{ currentTotal >= 0? currentTotal>0?<small>You will get </small>:null : <small>You will give</small>}
					</div>
				</div>
			</button>
		</>

	)
}

export default Customeritem;
