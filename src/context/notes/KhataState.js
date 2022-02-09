import khataContext from "./khataContext";
import noteContext from "./noteContext";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

const KhataState = (props) => {
	const { showAlert } = useContext(noteContext)
	
	let history = useHistory();
	const host = "http://localhost:5000";
	
	const customerInitial = []
	const [customers, setCustomers] = useState(customerInitial)

	const supplierInitial = []
	const [suppliers, setSuppliers] = useState(supplierInitial)
	const [singlecustomer, setSinglecustomer] = useState({});
	const [singlesupplier, setSinglesupplier] = useState({});
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
	const addCustomer = async (title, name, lendamount,takeamount) => {
		// TODO: API Call
		// API Call 
		console.log(title);
		const response = await fetch(`${host}/api/khatabook/addcustomer`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ title, name, lendamount,takeamount})
		});
		console.log(response.status);
		if (response.status === 409) {
			showAlert("User already exists", "danger")
		}
		else if(response.status !== 200)
		{
			history.push('/login');
		}
		else {
			showAlert("Customer Added Succcessfully", "success")
			console.log("alert shown");
			const customer = await response.json();
			setCustomers(customers.concat(customer))
		}
	}

	// Add a Supplier
	const addSupplier = async (title, name,payment, purchase) => {
		// TODO: API Call
		// API Call 
		const response = await fetch(`${host}/api/khatabook/addsupplier`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({title, name,payment, purchase})
		});
		if (response.status === 409) {
			showAlert("User already exists", "danger")
		}
		else if(response.status !== 200)
		{
			history.push('/login');
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
		// const json = await response.json();
		const newCustomers = customers.filter((customer) => { return customer._id !== id })
		setCustomers(newCustomers)
	}





	// Edit a Customer
	const editCustomer = async (id, title, name,lendamount, takeamount) => {
		// API Call 
		console.log(title, name, lendamount,takeamount);
		const response = await fetch(`${host}/api/khatabook/updatecustomer/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ title, name, lendamount,takeamount })
		});
		// const json = await response.json();

		let newCustomers = JSON.parse(JSON.stringify(customers))
		// Logic to edit in client
		for (let index = 0; index < newCustomers.length; index++) {
			const element = newCustomers[index];
			if (element._id === id) {
				newCustomers[index].title = title;
				newCustomers[index].name = name;
				newCustomers[index].lendamount += lendamount;
				newCustomers[index].takeamount += takeamount;
				break;
			}
		}
		setCustomers(newCustomers);
		// Dummy promise for blocking  // but no need to do it because async by default returns a promise
		// return new Promise((resolve,reject)=>{
		// 	resolve("success");
		// 	reject("fail")
		// });
	}












	const editSupplier = async (id, title, name,payment, purchase) => {
		// API Call 
		console.log(title, name,payment, purchase);
		const response = await fetch(`${host}/api/khatabook/updatesupplier/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ title, name,payment, purchase })
		});
		// const json = await response.json();

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

	return (
		<khataContext.Provider value={{ customers, getCustomers, addCustomer, deleteCustomer, editCustomer, suppliers, getSuppliers, addSupplier, editSupplier, singlecustomer, setSinglecustomer, singlesupplier, setSinglesupplier }}>
			{props.children}
		</khataContext.Provider>
	)

}
export default KhataState;