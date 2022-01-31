import './App.css';
import { Switch, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import UserState from './context/notes/UserState';
import KhataState from './context/notes/KhataState';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import User from './components/User'
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import Error from './components/Error';
import KhataBook from './components/khatabook/KhataBook'
import Suppliers from './components/khatabook/Suppliers'
import Customers from './components/khatabook/Customers'
import AddCustomer from './components/khatabook/AddCustomer';
import AddSupplier from './components/khatabook/AddSupplier';
function Routerapp() {

	return (
		<>
			<Switch>
				<Route exact path="/">
					<Home />
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
					<User />
				</Route>
				<Route exact path="/khatabook">
					<KhataBook />
				</Route>
				<Route exact path="/khatabook/customers">
					<Customers />
				</Route>
				<Route exact path="/khatabook/addcustomer">
					<AddCustomer />
				</Route>
				<Route exact path="/khatabook/suppliers">
					<Suppliers />
				</Route>
				<Route exact path="/khatabook/addsupplier">
					<AddSupplier />
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
	);
};

export default App;


