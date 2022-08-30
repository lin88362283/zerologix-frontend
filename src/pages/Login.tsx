import React, { useState } from "react";
import { login } from "../state/slices/userSlice";
import { useAppDispatch } from "../state/hooks";
import styles from './Login.module.scss';
const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useAppDispatch();
	const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(login({ email, password }));
	}
	return (
		<div className={styles.login}>
			<form>
				<label><b>Email</b></label>
				<input type="email" placeholder="Enter Email" required onChange={(e) => setEmail(e.target.value)} />
				<label><b>Password</b></label>
				<input type="password" placeholder="Enter Password" required onChange={(e) => setPassword(e.target.value)} />
				<button onClick={handleLogin} type='submit'>Login</button>
			</form>
		</div>
	)
}

export default Login;