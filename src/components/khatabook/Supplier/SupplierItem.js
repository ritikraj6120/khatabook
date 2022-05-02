import React from 'react'
import { useHistory } from 'react-router-dom'; 
import Avatar from '@mui/material/Avatar';
const SupplierItem = (props) => {
	let history=useHistory();
	
	const { supplier,supplierBalance } = props;
	const { title, name} = supplier;
	const result = supplierBalance.filter(item => item.supplier === supplier._id);
	let x=0
	if(result[0])
	x= result[0].payment -result[0].purchase;
	const edit =()=>{
		localStorage.setItem("SingleSupplierId",JSON.stringify(supplier._id));
		history.push('/singlesupplier');
	}

	return (
		<button className="btn btn-outline-dark" onClick={edit}>
			<div className="d-flex bd-highlight">
				<div className="p-2  bd-highlight">{title}</div>
				<div className="p-2 bd-highlight">{name}</div>
				<div className="p-2 flex-grow-1 bd-highlight ">Rs {Math.abs(x)}
				<br/>
					{ x>=0 ? x>0? <small>Advance </small>:null : <small>You'll Give</small>}
				</div>
			</div>
		</button>

	)
}

export default SupplierItem;
