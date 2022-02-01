import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'; 
import khataContext from '../../context/notes/khataContext';

const Supplieritem = (props) => {
	let history=useHistory();
	const {  singlesupplier,setSinglesupplier } =   useContext(khataContext);
	
	const { supplier } = props;
	// console.log(supplier);
	const { title, name, amount } = supplier;

	const edit =()=>{
		// console.log(typeof singlecustomer);
		// console.log("clicked on button");
		setSinglesupplier(supplier)	;
		// console.log( singlecustomer);
		history.push('/khatabook/editsupplier');

	}

	return (
		<button className="btn btn-outline-dark" onClick={edit}>
			<div className="d-flex bd-highlight">
				<div className="p-2  bd-highlight">{title}</div>
				<div className="p-2 bd-highlight">{name}</div>
				<div className="p-2 flex-grow-1 bd-highlight">Rs {amount}</div>
			</div>
		</button>

	)
}

export default Supplieritem;
