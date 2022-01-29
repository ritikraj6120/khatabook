import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
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
function App() {
	const [alert, setAlert] = useState(null);
	const showAlert = (message, type) => {
		setAlert({
			msg: message,
			type: type
		})
		setTimeout(() => {
			setAlert(null);
		}, 1500);
	}

	return (
		<>
			<UserState>
				<NoteState>
					<Router>
						<Navbar />
						<Alert alert={alert} />
						<div className="container">
							<Switch>
								<Route exact path="/">
									<Home showAlert={showAlert} />
								</Route>
								<Route exact path="/about">
									<About />
								</Route>
								<Route exact path="/login">
									<Login showAlert={showAlert} />
								</Route>
								<Route exact path="/signup">
									<Signup showAlert={showAlert} />
								</Route>
								<Route exact path="/userdetail">
									<User />
								</Route>
								<Route>

									<Error />
								</Route>
							</Switch>
						</div>
					</Router>
				</NoteState>
			</UserState>
		</>
	);
}

export default App;
