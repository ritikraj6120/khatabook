import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'; 
import khataContext from '../../context/notes/khataContext';
const Customeritem = (props) => {
	let history=useHistory();
	const context = useContext(khataContext);
	const {  singlecustomer,setSinglecustomer } =  context ;
	const { customer } = props;
	const { title, name, amount } = customer;
	const edit =()=>{
		// console.log(typeof singlecustomer);
		// console.log("clicked on button");
		setSinglecustomer(customer)	;
		// console.log( singlecustomer);
		history.push('/khatabook/editcustomer');

	}
	return (
		<>
			<button className="btn btn-outline-dark" onClick={edit}>
				<div className="d-flex bd-highlight">
					<div className="p-2  bd-highlight">{title}</div>
					<div className="p-2 bd-highlight">{name}</div>
					<div className="p-2 flex-grow-1 bd-highlight">Rs {amount}</div>
				</div>
			</button>
		</>



	)
}

export default Customeritem;
