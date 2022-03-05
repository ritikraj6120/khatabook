import SupplierContext from "./SupplierContext";
import noteContext from "./noteContext";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

const SupplierState = (props) => {
	const { showAlert } = useContext(noteContext)

	let history = useHistory();
	const host = "http://localhost:5000";
	const [suppliers, setSuppliers] = useState([])
	const [SingleSupplierTransaction, setSingleSupplierTransaction] = useState([]);
	const [singleSupplierDetail, setsingleSupplierDetail] = useState([]);

	// Get all Suppliers function no 1
	const getSuppliers = async () => {
		// API Call 
		const response = await fetch(`${host}/api/khatabook/getsuppliers`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		if (response.status !== 200) {

			history.push("/login");
		}
		else {
			const json = await response.json()
			setSuppliers(json);
		}

	}

	


	// Add a Supplier function no 2
	const addSupplier = async (title, name, phone) => {
		// TODO: API Call
		// API Call 
		phone = parseInt(phone);
		const response = await fetch(`${host}/api/khatabook/addsupplier`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ title, name, phone })
		});
		if (response.status === 409) {
			showAlert("User already exists", "danger")
		}
		else if (response.status !== 200) {
			history.push('/login');
		}
		else {

			const supplier = await response.json();
			setSuppliers(suppliers.concat(supplier))
			localStorage.setItem("SingleSupplierId", JSON.stringify(supplier._id))
			showAlert("Supplier Added Succcessfully", "success")
		}
	}

	// Edit a supplier function no 3
	const editSupplier = async (id, title, name, payment, purchase) => {
		// API Call 
		console.log(title, name, payment, purchase);
		const response = await fetch(`${host}/api/khatabook/updatesupplier/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ title, name, payment, purchase })
		});
		// const json = await response.json();
		if (response.status === 400 || response.status === 401) {
			showAlert("Invalid User", "danger");
			history.push('/login');
		}
		else {
			let newSuppliers = JSON.parse(JSON.stringify(suppliers))
			// Logic to edit in client
			for (let index = 0; index < newSuppliers.length; index++) {
				const element = newSuppliers[index];
				if (element._id === id) {
					newSuppliers[index].title = title;
					newSuppliers[index].name = name;
					newSuppliers[index].payment += payment;
					newSuppliers[index].purchase += purchase;
					break;
				}
			}
			setSuppliers(newSuppliers);
		}

	}

	// Delete a Supplier function no 4
	const deleteSupplier = async (id) => {
		// API Call
		const response = await fetch(`${host}/api/supplier/deletesupplier/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		if (response.status === 400 || response.status === 401) {
			showAlert("Invalid User", "danger");
			history.push('/login');
		}
		else {
			// const json = await response.json();
			const newSuppliers = suppliers.filter((supplier) => { return supplier._id !== id })
			setSuppliers(newSuppliers);
		}

	}

	// Get single Supplier function no 5

	const getSingleSupplier = async (id) => {
		const response = await fetch(`${host}/api/khatabook/getSingleSupplier/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		if (response.status !== 200) {

			history.push("/login");
		}
		else {
			const json = await response.json()
			singleSupplierDetail(json);
		}
	}

	//get Supplier transcation function no 6

	const getSingleSupplierTransactions = async (id) => {
		const response = await fetch(`${host}/api/supplier/getSupplierTransactions/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')

			}
		});
		if (response.status !== 200) {

			history.push("/login");
		}
		else {
			const json = await response.json()
			setSingleSupplierTransaction(json);
		}
	}

	//  add a transaction  using: post "/api/supplier/addSupplierTransaction/" function no 7

	const addSingleSupplierTransaction = async (id, purchase_singleSupplier, payment_singleSupplier) => {
		const response = await fetch(`${host}/api/customer/addCustomerTransaction/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ purchase_singleSupplier, payment_singleSupplier })
		});
		if (response.status !== 200) {
			history.push('/login');
		}
		else {
			const newSuppliertransaction = await response.json();
			setSingleSupplierTransaction(SingleSupplierTransaction.concat(newSuppliertransaction));
			showAlert("Supplier Transaction Added Succcessfully", "success");
		}
	}

		//	Update a transaction  using: post "/api/supplier/updateTransaction/" function no 8

	return (
		<SupplierContext.Provider value={
			{
				suppliers, //contains all suppliers
				getSuppliers, //fetches all suppliers from database
				addSupplier, // add a new supplier to database
				editSupplier, // edit a given customer from a datbase
				deleteSupplier, // delete a given customer from a datbase
				singleSupplierDetail, // contains information about a given supplier

				getSingleSupplier, // fetches information for a given supplier
				
				SingleSupplierTransaction, // contains information about a given supplier
				getSingleSupplierTransactions, // fetches all transaction for a given supplier
				addSingleSupplierTransaction,// adds a new transaction for a given supplier
				
			}
		}>
			{props.children}
		</SupplierContext.Provider>
	)

}
export default SupplierState;