import khataContext from "./khataContext";
import noteContext from "./noteContext";
import { useState,useContext } from "react";
import { useHistory } from "react-router-dom";
const KhataState = (props) => {
	const context=useContext(noteContext)
	const {showAlert}=context;
	let history = useHistory();
	const host = "http://localhost:5000"
	const customerInitial = []
	const [customers, setCustomers] = useState(customerInitial)

	const supplierInitial=[]
	const [suppliers, setSuppliers] = useState(supplierInitial)


	// Get all Customers
	const getCustomers = async () => {
		// API Call 
		const response = await fetch(`${host}/api/khatabook/getcustomers`, {
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
			console.log(json);
			setCustomers(json);
		}

	}


	// Get all Suppliers
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
			console.log(json);
			setSuppliers(json);
		}

	}

	// Add a Customer
	const addCustomer = async (title, name, amount) => {
		// TODO: API Call
		// API Call 
		console.log(title);
		const response = await fetch(`${host}/api/khatabook/addcustomer`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ title, name, amount})
		});
		console.log(response.status);
		if (response.status !== 200) {

			history.push("/login");
		}
		else {
			showAlert("Customer Added Succcessfully", "success")
			console.log("alert shown");
			const customer = await response.json();
			setCustomers(customers.concat(customer))
		}
	}

	// Add a Supplier
	const addSupplier = async (title, name, amount) => {
		// TODO: API Call
		// API Call 
		const response = await fetch(`${host}/api/khatabook/addsupplier`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ title, name, amount})
		});
		if (response.status !== 200) {

			history.push("/login");
		}
		else {
			showAlert("Supplier Added Succcessfully", "success")
			const supplier = await response.json();
			setSuppliers(suppliers.concat(supplier))
		}
	}

	// Delete a Customer
	const deleteCustomer = async (id) => {
		// API Call
		const response = await fetch(`${host}/api/khatabook/deletecustomer/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		const json = await response.json();
		const newCustomers = customers.filter((customer) => { return customer._id !== id })
		setCustomers(newCustomers)
	}

	// Edit a Customer
	const editCustomer = async (id,  title, name, amount) => {
		// API Call 
		console.log("got my boy");
		const response = await fetch(`${host}/api/notes/updatecustomer/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({  title, name, amount })
		});
		const json = await response.json();

		let newCustomers = JSON.parse(JSON.stringify(customers))
		// Logic to edit in client
		for (let index = 0; index < newCustomers.length; index++) {
			const element = newCustomers[index];
			if (element._id === id) {
				newCustomers[index].title = title;
				newCustomers[index].name = name;
				newCustomers[index].amount = amount;
				break;
			}
		}
		setCustomers(newCustomers);
	}

	return (
		<khataContext.Provider value={{ customers, addCustomer, deleteCustomer, editCustomer, getCustomers ,getSuppliers,addSupplier,suppliers}}>
			{props.children}
		</khataContext.Provider>
	)

}
export default KhataState;