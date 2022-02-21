import React from 'react'
import { useHistory } from 'react-router-dom'; 
// import khataContext from '../../context/khataContext';

const Supplieritem = (props) => {
	let history=useHistory();
	// const {  singlesupplier,setSinglesupplier } =   useContext(khataContext);
	
	const { supplier } = props;
	// console.log(supplier);
	const { title, name, payment, purchase } = supplier;
	let currentTotal=payment-purchase;

	const edit =()=>{
		localStorage.setItem("singlesupplier",JSON.stringify(supplier))
		history.push('/khatabook/editsupplier');

	}

	return (
		<button className="btn btn-outline-dark" onClick={edit}>
			<div className="d-flex bd-highlight">
				<div className="p-2  bd-highlight">{title}</div>
				<div className="p-2 bd-highlight">{name}</div>
				<div className="p-2 flex-grow-1 bd-highlight">Rs {Math.abs(currentTotal)}
				<br/>
					{ currentTotal>=0 ? currentTotal>0? <small>Advance </small>:null : <small>You'll Give</small>}
				</div>
			</div>
		</button>

	)
}

export default Supplieritem;
