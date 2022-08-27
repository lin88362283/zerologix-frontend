import React from "react";
import { logout } from "../state/slices/userSlice";
const Login = () => {
	const handleLogin = () =>{
		logout()
	}
	return (
		<div className="login">
			<form>
				<label><b>Username</b></label>
				<input type="text" placeholder="Enter Username" name="uname" required />
				<label><b>Password</b></label>
				<input type="password" placeholder="Enter Password" name="psw" required />
				<button type="submit" onClick={handleLogin}>Login</button>
			</form>
		</div>
	)
}

export default Login;