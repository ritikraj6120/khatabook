import React from 'react'
import { useHistory } from 'react-router-dom'; 

const SupplierItem = (props) => {
	let history=useHistory();
	
	const { supplier,supplierBalance } = props;
	const { title, name} = supplier;
	const result = supplierBalance.filter(item => item.supplier === supplier._id);
	let currentTotal=0;
	let x=0
	if(result[0])
	x= result[0].payment -result[0].purchase;
	if(x>=0)
	{
		currentTotal=x;
	}
	else{
		currentTotal=-x;
	}
	const edit =()=>{
		localStorage.setItem("SingleSupplierId",JSON.stringify(supplier._id));
		history.push('/editsupplier');

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

export default SupplierItem;