import './App.css';
import { Switch, Route } from "react-router-dom";
import NoteState from './context/NoteState';
import UserState from './context/UserState';
import KhataState from './context/KhataState';
import AdminState from './context/AdminState';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Important from './components/Notes/Important.js';
import Completed from './components/Notes/Completed.js';
import About from './components/About';
import User from './components/User';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import Error from './components/Error';
import Adminpage from './components/Admin/AdminPage';
// import KhataBook from './components/khatabook/KhataBook'
import Suppliers from './components/khatabook/Suppliers'
import Customers from './components/khatabook/Customers'
import AddCustomer from './components/khatabook/AddCustomer';
import AddSupplier from './components/khatabook/AddSupplier';
import EditCustomer from './components/khatabook/EditCustomer';
import EditSupplier from './components/khatabook/EditSupplier';
function Routerapp() {

	return (
		<>
			<Switch>
				<Route exact path="/">
					<Home />
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
				{/* <Route exact path="/khatabook">
					<KhataBook />
				</Route> */}
				<Route exact path="/khatabook/customers">
					<Customers />
				</Route>
				<Route exact path="/khatabook/suppliers">
					<Suppliers />
				</Route>
				<Route exact path="/khatabook/addsupplier">
					<AddSupplier />
				</Route>
				<Route exact path="/khatabook/addcustomer">
					<AddCustomer />
				</Route>
				<Route exact path="/khatabook/editcustomer">
					<EditCustomer />
				</Route>
				<Route exact path="/khatabook/editsupplier">
					<EditSupplier />
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
					<KhataState>
						<Navbar />
						<Alert />
						<div className="container">
							<Routerapp />
						</div>
					</KhataState>
				</NoteState>
			</UserState >
		</AdminState>
	);
};

export default App;


