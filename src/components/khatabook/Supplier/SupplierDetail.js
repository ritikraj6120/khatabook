import React, { useContext, useState, useEffect } from 'react'
import SupplierContext from '../../../context/SupplierContext'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
const SupplierDetail = (props) => {
	const { singleSupplier } = props;
	const { editSupplier,deleteSupplier } = useContext(SupplierContext);
	const [credentials, setCredentials] = useState({ title: singleSupplier.title, name: singleSupplier.name, phone: singleSupplier.phone })
	useEffect(() => {
		setCredentials({ title: singleSupplier.title, name: singleSupplier.name, phone: singleSupplier.phone })
	}, [singleSupplier]);
	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
	}

	const handleUpdate = async (e) => {
		e.preventDefault();
		const { title, name, phone } = credentials;
		await editSupplier(singleSupplier._id, title, name, phone);
	}

	const handleDelete = async (e) => {
		e.preventDefault();
		await deleteSupplier(singleSupplier._id);
	}

	return (
		<form >
			<div className="form-row align-items-center">
				<div className="col-sm-3 my-1">
					<label className="sr-only" htmlFor="inlineFormInputName">Title</label>
					<select className="form-control" id="inlineFormInputName"
						name="title" placeholder="Title" value={credentials.title} onChange={onChange} >

						<option value="Mr">Mr</option>
						<option value="Mrs">Mrs</option>
					</select>
				</div>
				<div className="col-sm-3 my-1">
					<label className="sr-only" htmlFor="inlineFormInputName">Name</label>
					<input type="text" className="form-control" id="inlineFormInputName" name="name" placeholder="Name" value={credentials.name} onChange={onChange} required />
				</div>
				<div className="col-sm-3 my-1">
					<label className="sr-only" htmlFor="inlineFormInputName">Phone</label>
					<input type="tel" className="form-control" id="inlineFormInputName" name="phone" placeholder="Phone" value={credentials.phone} onChange={onChange} required />
				</div>
				<Stack spacing={2} direction="row">
					<Button onClick={handleUpdate} variant="contained">Update</Button>
					<Button onClick={handleDelete} variant="contained">Delete Supplier</Button>
				</Stack>
			</div>
		</form>
	)
}
export default SupplierDetail;
