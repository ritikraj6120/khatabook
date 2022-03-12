import CustomerContext from "./CustomerContext";
import noteContext from "./noteContext";
// import axios from 'axios';
import { useState, useContext, useReducer } from "react";
import { useHistory } from "react-router-dom";

const CustomerState = (props) => {
	const { showAlert } = useContext(noteContext)

	let history = useHistory();
	const host = "http://localhost:5000";
	const [customers, setCustomers] = useState([])
	const [SingleCustomerTransaction, setSingleCustomerTransaction] = useState([]);
	const initialState = {
		loading: true,
		error: '',
		customerBalance: []
	}

	const reducer = (state, action) => {
		switch (action.type) {
			case 'FETCH_SUCCESS':
				return {
					loading: false,
					error: '',
					customerBalance: action.payload
				}
			case 'FETCH_ERROR':
				return {
					loading: false,
					error: 'Something Went wrong!',
					customerBalance: []
				}
			default:
				return state
		}
	}
	const initialStatesingleCustomerDetail = {
		loading: true,
		error: '',
		singleCustomer: {}
	}

	const reducersingleCustomerDetail = (state, action) => {
		switch (action.type) {
			case 'FETCH_SUCCESS':
				console.log("hurray current");
				return {
					loading: false,
					error: '',
					singleCustomer: action.payload
				}
			case 'FETCH_ERROR':
				return {
					loading: false,
					error: 'Something Went wrong!',
					singleCustomer: {}
				}
			default:
				return state
		}
	}
	const [state, dispatch] = useReducer(reducer,initialState);
	const[singleCustomerDetail,dispatchsingleCustomerDetail]=useReducer(reducersingleCustomerDetail,initialStatesingleCustomerDetail);

	///////////////////////////////////////////////////////////////////////
	// Get all Customers function no 1
	const getCustomers = async () => {
		// API Call 
		const response = await fetch(`${host}/api/customer/getcustomers`, {
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
			setCustomers(json);


		}

	}
	// Add a Customer function no 2
	const addCustomer = async (title, name, phone) => {

		phone = parseInt(phone);
		const response = await fetch(`${host}/api/customer/addcustomer`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ title, name, phone })
		});
		if (response.status === 409) {
			console.log(response.status);
			showAlert("User already exists", "danger")

		}
		else if (response.status !== 200) {
			history.push('/login');
		}
		else {


			const customer = await response.json();
			setCustomers(customers.concat(customer))
			localStorage.setItem("SingleCustomerId", JSON.stringify(customer._id))
			showAlert("Customer Added Succcessfully", "success")

		}
	}

	// Edit a Customer function no 3
	const editCustomer = async (id, title, name, phone) => {
		// API Call 
		console.log(title, name, phone);
		const response = await fetch(`${host}/api/customer/updatecustomer/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ title, name, phone })
		});
		// const json = await response.json();
		if (response.status === 400 || response.status === 401) {
			showAlert("Invalid User", "danger");
			history.push('/login');
		}
		else {
			let newCustomers = JSON.parse(JSON.stringify(customers))
			// Logic to edit in client
			for (let index = 0; index < newCustomers.length; index++) {
				const element = newCustomers[index];
				if (element._id === id) {
					newCustomers[index].title = title;
					newCustomers[index].name = name;
					newCustomers[index].phone = phone;
					break;
				}
			}
			setCustomers(newCustomers);
		}

	}

	// Delete a Customer function no 4
	const deleteCustomer = async (id) => {
		// API Call
		const response = await fetch(`${host}/api/customer/deletecustomer/${id}`, {
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
			const newCustomers = customers.filter((customer) => { return customer._id !== id })
			setCustomers(newCustomers);

		}

	}

	// Get single Customer function no 5
	const getSingleCustomerDetail = async (id) => {
		// console.log("hello i am here")
		const response = await fetch(`${host}/api/customer/getSingleCustomerDetail/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		if (response.status !== 200) {
			dispatchsingleCustomerDetail({ type: 'FETCH_ERROR' })
			history.push("/login");
		}
		else {
			const json = await response.json();
			// console.log(json);
			dispatchsingleCustomerDetail({ type: 'FETCH_SUCCESS', payload: json })
		}
	}

	//get customer transcation function no 6

	const getSingleCustomerTransactions = async (id) => {
		const response = await fetch(`${host}/api/customer/getCustomerTransactions/${id}`, {
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
			setSingleCustomerTransaction(json);
		}
	}

	//  add a transaction  using: post "/api/customer/addCustomerTransaction/" function no 7

	const addSingleCustomerTransaction = async (id, lendamount_singleCustomer, takeamount_singleCustomer) => {


		const response = await fetch(`${host}/api/customer/addCustomerTransaction/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ lendamount_singleCustomer, takeamount_singleCustomer })
		});
		if (response.status !== 200) {
			history.push('/login');
		}
		else {


			const newCustomertransaction = await response.json();
			setSingleCustomerTransaction(SingleCustomerTransaction.concat(newCustomertransaction))
			showAlert("Customer Transaction Added Succcessfully", "success")

		}
	}

	//	 Update an existing customerTransaction  using: PUT "/api/customer/updatetransactions/" function no 8

	// fetch balance of each customer function no 9
	const getCustomerBalance = async () => {
		try {
			const response = await fetch(`${host}/api/customer/getCustomerBalance`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					"auth-token": localStorage.getItem('token')
	
				}
			});
			if (response.status === 200) {
				const json = await response.json();
				// console.log(json);
				dispatch({ type: 'FETCH_SUCCESS', payload: json })
			}
			else if (response.status !== 200) {
				dispatch({ type: 'FETCH_ERROR' })
				history.push("/login");
			}
		}
		catch (error) {
			dispatch({ type: 'FETCH_ERROR' })
			history.push("/login");
		}


		// const response = await fetch(`${host}/api/customer/getCustomerBalance`, {
		// 	method: 'GET',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		"auth-token": localStorage.getItem('token')

		// 	}
		// });
		// if (response.status !== 200) {

		// 	history.push("/login");
		// }
		// else {
		// 	const json = await response.json();
		// }
	}

	return (
		<CustomerContext.Provider value={
			{
				customers, // Contains all customers
				getCustomers,  //fetches all customers from database
				addCustomer,   //add a new customer to database
				deleteCustomer, // delete a given customer from database
				editCustomer,   // edit a given customer from a database
				singleCustomerDetail, //contains information about a given customer 
				getSingleCustomerDetail,// fetches information about a single customer
				SingleCustomerTransaction, // contains all  transactions for a customer
				getSingleCustomerTransactions,  // fetches all transcations of a given customer
				addSingleCustomerTransaction, //  adds a new transaction for a given customer
				getCustomerBalance,// fetch balance of all customer
				customerstate: state,  // contains balance of all customer 
			}
		}>
			{props.children}
		</CustomerContext.Provider>
	)

}
export default CustomerState;