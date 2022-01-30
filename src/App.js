import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import UserState from './context/notes/UserState';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import User from './components/User'
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import Error from './components/Error';
import KhataBook from './components/KhataBook'
function App() {

	return (
		<>
			<Router>
				<UserState>
					<NoteState>

						<Navbar />
						<Alert  />
						<div className="container">
							<Switch>
								<Route exact path="/">
									<Home  />
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
								<Route>

									<Error />
								</Route>
							</Switch>
						</div>

					</NoteState>
				</UserState>
			</Router>
		</>
	);
}

export default App;
