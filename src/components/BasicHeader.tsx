import logo from '../assets/logo.png';
import Messages from '../utils/Messages';
import { DownOutlined } from '@ant-design/icons';
import styles from "./BasicHeader.module.scss";
import { logout, checkMe } from "../state/slices/userSlice";
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { RootState } from "../state/store";
// import { logout } from "../state/slices/userSlice";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

interface BasicHeaderTypes {

}

const BasicHeader = () => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(checkMe())
		}
	}, [])
	const userEmail = useAppSelector((state: RootState) => state.users.userEmail)
	// const handleLogin = () => {

	// }
	console.log("userEmail", userEmail)
	const handleLogout = () => {
		dispatch(logout())
	}
	const renderNavList = () => {
		const navTitles = [
			Messages.WHY_ACY, Messages.PRODUCTS,
			Messages.PLATFORMS, Messages.EDUCATION, Messages.PARTNERS
		]
		return (
			<ul className={styles.header__navList}>
				{navTitles.map((title, index) => (
					<li key={index}>
						<span>{title}</span>
						<span className={styles.header__downIcon}><DownOutlined /></span>
					</li>
				))}
			</ul>
		)
	}
	return (
		<header className={styles.header}>
			<nav>
				<Link to='/webinar'>
					<img src={logo} alt="logo" />
				</Link>
				{renderNavList()}
				<span className={styles.header__buttonGroup}>
					<Link className={styles.header__loginButton} to="/login" >
						{Messages.LOGIN}
					</Link>
					<button className={styles.header__logoutButton} onClick={handleLogout}>
						{Messages.LOGOUT}
					</button>
				</span>
			</nav>
		</header >
	)
}

export default BasicHeader;