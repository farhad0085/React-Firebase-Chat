import React from "react";
import "./App.css";
import firebase from "./config/firebaseConfig";

import { useAuthState } from "react-firebase-hooks/auth";

import SignOut from "./components/SignOut";
import SignIn from "./components/SignIn";
import ChatRoom from "./components/ChatRoom";

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
	const [user] = useAuthState(auth);

	return (
		<div className="App">
			<header>
				<h1>
					<i className="fa fa-envelope" aria-hidden="true"></i>
				</h1>
				<SignOut auth={auth} />
			</header>

			<section>
				{user ? (
					<ChatRoom
						firebase={firebase}
						firestore={firestore}
						auth={auth}
					/>
				) : (
					<SignIn firebase={firebase} auth={auth} />
				)}
			</section>
		</div>
	);
}

export default App;
