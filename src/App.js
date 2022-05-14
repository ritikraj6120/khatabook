import './App.css';
import { Switch, Route, Redirect } from "react-router-dom";
import { useState,useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import UserState from './context/UserState';
import NoteState from './context/NoteState';
import CustomerState from './context/CustomerState';
import SupplierState from './context/SupplierState';
import Navbar from './components/Navbar';
import Notes from './components/Notes/Notes';
import Important from './components/Notes/Important.js';
import Completed from './components/Notes/Completed.js';
import About from './components/About';
import User from './components/User';
import Signup from './components/Signup';
import Login from './components/Login';
import Error from './components/Error';
import Suppliers from './components/khatabook/Supplier/Suppliers'
import Customers from './components/khatabook/Customer/Customers'
import AddCustomer from './components/khatabook/Customer/AddCustomer';
import AddNewTransactionForCustomerGave from './components/khatabook/Customer/AddNewTransactionForCustomerGave';
import AddNewTransactionForCustomerGet from './components/khatabook/Customer/AddNewTransactionForCustomerGet';
import AddNewTransactionForSupplierPayment from './components/khatabook/Supplier/AddNewTransactionForSupplierpayment'
import AddNewTransactionForSupplierPurchase from './components/khatabook/Supplier/AddNewTransactionForSupplierpurchase'
import AddSupplier from './components/khatabook/Supplier/AddSupplier';
import SingleCustomer from './components/khatabook/Customer/SingleCustomer';
import SingleSupplier from './components/khatabook/Supplier/SingleSupplier';
import SingleCustomerReport from './components/khatabook/Customer/SingleCustomerReport';
import Reminder from './components/khatabook/Customer/Reminder';
import SingleSupplierReport from './components/khatabook/Supplier/SingleSupplierReport';
import EditSingleCustomerTransactionForGaveAmount from './components/khatabook/Customer/EditSingleCustomerTransactionForGaveAmount';
import EditSingleCustomerTransactionForGetAmount from './components/khatabook/Customer/EditSingleCustomerTransactionForGetAmount';
import EditSingleSupplierTransactionForPayment from './components/khatabook/Supplier/EditSingleSupplierTransactionForPayment';
import EditSingleSupplierTransactionForPurchase from './components/khatabook/Supplier/EditSingleSupplierTransactionForPurchase';

function KhataBookRouterapp(props) {
	const [userloggedin,setUserloggedin]=useState(!(localStorage.getItem('token') === null));
	useEffect(() => {
		setUserloggedin(!(localStorage.getItem('token') === null));
	}, [localStorage.getItem('token')])
	return (
		<Switch>
			<Route exact path="/">
				<Redirect to="/customers" />
			</Route>
			<Route exact path="/notes">
				{
					userloggedin ?
						<Notes /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/importantNotes">
				{
					userloggedin ?
						<Important /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/completedNotes">
				{
					userloggedin ?
						<Completed /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/about">
				<About />
			</Route>
			<Route exact path="/login">
				<Login />
			</Route>
			<Route exact path="/signup">
				<Signup />
			</Route>
			<Route exact path="/userdetail">
				{
					userloggedin ?
						<User /> :
						<Redirect to="/login" />
				}
				<User />
			</Route>
			<Route exact path="/addNewTransactionForCustomerGave">
				{
					userloggedin ?
						<AddNewTransactionForCustomerGave /> :
						<Redirect to="/login" />
				}

			</Route>
			<Route exact path="/addNewTransactionForCustomerGet">
				{
					userloggedin ?
					<AddNewTransactionForCustomerGet /> :
						<Redirect to="/login" />
				}
			
			</Route>
			<Route exact path="/addNewTransactionForSupplierPayment">
				{
					userloggedin ?
						<AddNewTransactionForSupplierPayment /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/addNewTransactionForSupplierPurchase">
				{
					userloggedin ?
						<AddNewTransactionForSupplierPurchase /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/customers">
				{
					userloggedin ?
						<Customers /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/suppliers">
				{
					userloggedin ?
						<Suppliers /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/addsupplier">
				{
					userloggedin ?
						<AddSupplier /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/addcustomer">
				{
					userloggedin ?
						<AddCustomer /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/singlecustomer">
				{
					userloggedin ?
						<SingleCustomer /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/singlesupplier">
				{
					userloggedin ?
						<SingleSupplier /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/singleCustomerReport">
				{
					userloggedin ?
						<SingleCustomerReport /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/reminder">
				{
					userloggedin ?
						<Reminder /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/singlesupplierReport">
				{
					userloggedin ?
						<SingleSupplierReport /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/editcustomertransactionforgetamount"  >
				{
					userloggedin ?
						<EditSingleCustomerTransactionForGetAmount /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/editcustomertransactionforgaveamount"  >
				{
					userloggedin ?
						<EditSingleCustomerTransactionForGaveAmount /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/editsinglesuppliertransactionforpayment" >
				{
					userloggedin ?
						<EditSingleSupplierTransactionForPayment /> :
						<Redirect to="/login" />
				}
			</Route>
			<Route exact path="/editsinglesuppliertransactionforpurchase" >
				{
					userloggedin ?
						<EditSingleSupplierTransactionForPurchase /> :
						<Redirect to="/login" />
				}
			</Route>

			<Route>
				<Error />
			</Route>
		</Switch>
	);
}



const App = () => {
	return (
		<UserState>
			<NoteState>
				<CustomerState>
					<SupplierState>

						<Navbar />
						{/* <Alert /> */}
						<ToastContainer />
						{/* <div className="container"> */}
						<KhataBookRouterapp />
						{/* </div> */}
					</SupplierState>
				</CustomerState>
			</NoteState>
		</UserState>
	);
};

export default App;


