import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'; 
import khataContext from '../../context/notes/khataContext';
const Customeritem = (props) => {
	let history=useHistory();
	const {  singlecustomer,setSinglecustomer} = useContext(khataContext);
	const { customer } = props;
	const { title, name, amount } = customer;
	const edit =()=>{
		setSinglecustomer(customer)	;
		history.push('/khatabook/editcustomer');

	}
	return (
		<>
			<button className="btn btn-outline-dark" onClick={edit}>
				<div className="d-flex bd-highlight">
					<div className="p-2  bd-highlight">{title}</div>
					<div className="p-2 bd-highlight">{name}</div>
					<div className="p-2 flex-grow-1 bd-highlight">Rs {amount}
					
					</div>
				</div>
			</button>
		</>



	)
}

export default Customeritem;
