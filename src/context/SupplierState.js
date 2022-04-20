import SupplierContext from "./SupplierContext";
import noteContext from "./noteContext";
import { useState, useContext,useReducer } from "react";
import { useHistory } from "react-router-dom";

const SupplierState = (props) => {
	const { showAlert } = useContext(noteContext)

	let history = useHistory();
	const host = "http://localhost:5000";
	const [suppliers, setSuppliers] = useState([])

	const [SingleSupplierTransaction, setSingleSupplierTransaction] = useState([]);
	const initialState = {
			loading: true,
			error: '',
			supplierBalance: []
		}
		const reducer = (state, action) => {
			switch (action.type) {
				case 'FETCH_SUCCESS':
					return {
						loading: false,
						error: '',
						supplierBalance: action.payload
					}
				case 'FETCH_ERROR':
					return {
						loading: false,
						error: 'Something Went wrong!',
						supplierBalance: []
					}
				default:
					return state
			}
		}


		const initialStatesingleSupplierDetail = {
			loading: true,
			error: '',
			singleSupplier: {}
		}
		const reducersingleSupplierDetail = (state, action) => {
			switch (action.type) {
				case 'FETCH_SUCCESS':
					console.log("hurray current");
					return {
						loading: false,
						error: '',
						singleSupplier: action.payload
					}
				case 'FETCH_ERROR':
					return {
						loading: false,
						error: 'Something Went wrong!',
						singleSupplier: {}
					}
				default:
					return state
			}
		}
	const [state, dispatch] = useReducer(reducer,initialState);
	const[singleSupplierDetail,dispatchsingleSupplierDetail]=useReducer(reducersingleSupplierDetail,initialStatesingleSupplierDetail);


	/////////////////////////////////////////////////////////////






	// Get all Suppliers function no 1
	const getSuppliers = async () => {
		// API Call 
		const response = await fetch(`${host}/api/supplier/getsuppliers`, {
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

		phone = parseInt(phone);
		const response = await fetch(`${host}/api/supplier/addsupplier`, {
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
	const editSupplier = async (id, title, name, phone) => {
		// API Call 
		console.log(title, name,phone);
		const response = await fetch(`${host}/api/supplier/updatesupplier/${id}`, {
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
			let newSuppliers = JSON.parse(JSON.stringify(suppliers))
			// Logic to edit in client
			for (let index = 0; index < newSuppliers.length; index++) {
				const element = newSuppliers[index];
				if (element._id === id) {
					newSuppliers[index].title = title;
					newSuppliers[index].name = name;
					newSuppliers[index].phone = phone;
					
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
		console.log(response.status);
		if (response.status === 400 || response.status === 401) {
			showAlert("Invalid User", "danger");
			history.push('/login');
		}
		else if(response.status === 200){
			// const json = await response.json();
			const newSuppliers = suppliers.filter((supplier) => { return supplier._id !== id })
			setSuppliers(newSuppliers);
			history.push("/suppliers");
		}
		else{
			showAlert("Internal server error", "danger");
			history.push('/login');
		}

	}

	// Get single Supplier function no 5
	const getSingleSupplierDetail = async (id) => {
		const response = await fetch(`${host}/api/supplier/getSingleSupplierDetail/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		if (response.status !== 200) {
			dispatchsingleSupplierDetail({ type: 'FETCH_ERROR' })
			history.push("/login");
		}
		else {
			const json = await response.json()
			dispatchsingleSupplierDetail({ type: 'FETCH_SUCCESS', payload: json })
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

		const response = await fetch(`${host}/api/supplier/addSupplierTransaction/${id}`, {
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

		//	Update an existing supplierTransaction  using: PUT "/api/supplier/updateTransactions/" function no 8

		// fetch balance of each supplier function no 9
		const getSupplierBalance = async () => {
			try {
				const response = await fetch(`${host}/api/supplier/getSupplierBalance`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						"auth-token": localStorage.getItem('token')
		
					}
				});
				if (response.status === 200) {
					const data = await response.json();
					console.log(data);
					if(data===null)
					{
						dispatch({ type: 'FETCH_SUCCESS', payload: [] })
					}
					else
					dispatch({ type: 'FETCH_SUCCESS', payload: data })
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
		}	

	return (
		<SupplierContext.Provider value={
			{
				suppliers, //contains all suppliers
				getSuppliers, //fetches all suppliers from database
				addSupplier, // add a new supplier to database
				editSupplier, // edit a given supplier from a datbase
				deleteSupplier, // delete a given supplier from a datbase
				singleSupplierDetail, // contains information about a given supplier
				getSingleSupplierDetail,// fetches information about a single supplier

				SingleSupplierTransaction, // contains information about a given supplier

				getSingleSupplierTransactions, // fetches all transaction of a given supplier
				addSingleSupplierTransaction,// adds a new transaction for a given supplier
				 getSupplierBalance, // fetch balance of all supplier
				supplierstate: state,  // contains balance of all supplier  
			}
		}>
			{props.children}
		</SupplierContext.Provider>
	)

}
export default SupplierState;