import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode"
import './App.css';

function App() {
	const [user, setUser] = useState({})

	function handleCallbackResponse(response) {
		console.log(("Encoded JWT ID token: " + response.credential))
		const userObject = jwt_decode(response.credential)
		console.log(userObject)
		setUser(userObject)
		document.getElementById("signInDiv").hidden = true
	}
	function handleSignout(event) {
		setUser({})
		document.getElementById("signInDiv").hidden = false
	}
	useEffect(() => {
		/* global google */
		google.accounts.id.initialize({
			client_id: "101047074780-h0l802vagvrdllg6984i9dcsmhbfcng9.apps.googleusercontent.com",
			callback: handleCallbackResponse
		})

		google.accounts.id.renderButton(
			document.getElementById("signInDiv"),
			{
				theme: "outline", size: "large"
			}
		)

		google.accounts.id.prompt()
	}, [])

	// if no user: sign in button
	// if yes user: show login button
	return (
		<div className="App">
			<div id="signInDiv"></div>
			{ Object.keys(user).length != 0 &&
				<button onClick={(e) => handleSignout(e)}>Sign Out</button>
			}
			{user &&
				<div>
					<img src={user.picture} alt=""></img>
					<h3>{user.name}</h3>
				</div>
			}
		</div>
	);
}

export default App;
