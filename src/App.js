import './App.css';
import { Switch, Route } from "react-router-dom";
import NoteState from './context/NoteState';
import UserState from './context/UserState';
import CustomerState from './context/CustomerState';
import SupplierState from './context/SupplierState';
import AdminState from './context/AdminState';
import Navbar from './components/Navbar';
import Notes from './components/Notes/Notes';
import Important from './components/Notes/Important.js';
import Completed from './components/Notes/Completed.js';
import About from './components/About';
import User from './components/User';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import Error from './components/Error';
import Adminpage from './components/Admin/AdminPage';
import Suppliers from './components/khatabook/Supplier/Suppliers'
import Customers from './components/khatabook/Customer/Customers'
import AddCustomer from './components/khatabook/Customer/AddCustomer';
import AddNewTransactionForCustomerGave from './components/khatabook/Customer/AddNewTransactionForCustomerGave';
import AddNewTransactionForCustomerGet from './components/khatabook/Customer/AddNewTransactionForCustomerGet'; 
import AddSupplier from './components/khatabook/Supplier/AddSupplier';
import SingleCustomer from './components/khatabook/Customer/SingleCustomer';
import SingleSupplier from './components/khatabook/Supplier/SingleSupplier';
function Routerapp() {

	return (
		<>
			<Switch>
				<Route exact path="/">
					<Customers/>
				</Route>
				<Route exact path="/notes">
					<Notes/>
				</Route>
				<Route exact path="/important">
					<Important />
				</Route>
				<Route exact path="/completed">
					<Completed />
				</Route>
				<Route exact path="/about">
					<About />
				</Route>
				<Route exact path="/login">
					<Login />
				</Route>
				<Route exact path="/adminpage">
					<Adminpage />
				</Route>
				<Route exact path="/signup">
					<Signup />
				</Route>
				<Route exact path="/userdetail">
					<User />
				</Route>
				<Route exact path="/addNewTransactionForCustomerGave">
					<AddNewTransactionForCustomerGave/>
				</Route>
				<Route exact path="/addNewTransactionForCustomerGet">
					<AddNewTransactionForCustomerGet/>
				</Route>
				
				<Route exact path="/customers">
					<Customers />
				</Route>
				<Route exact path="/suppliers">
					<Suppliers />
				</Route>
				<Route exact path="/addsupplier">
					<AddSupplier />
				</Route>
				<Route exact path="/addcustomer">
					<AddCustomer />
				</Route>
				<Route exact path="/editcustomer">
					<SingleCustomer />
				</Route>
				<Route exact path="/editsupplier">
					<SingleSupplier />
				</Route>
				<Route>
					<Error />
				</Route>
			</Switch>
		</>
	);
}

const App = () => {
	return (
		<AdminState>
			<UserState>
				<NoteState>
					<CustomerState>
						<SupplierState>
							<Navbar />
							<Alert />
							<div className="container">
								<Routerapp />
							</div>
						</SupplierState>
					</CustomerState>
				</NoteState>
			</UserState >
		</AdminState >
	);
};

export default App;


