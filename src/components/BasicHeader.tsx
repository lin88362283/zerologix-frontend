import logo from '../assets/logo.png';
import Messages from '../utils/Messages';
import { DownOutlined } from '@ant-design/icons';
import styles from "./BasicHeader.module.scss";
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from "../state/store";
import { logout } from "../state/slices/userSlice";
import { Link } from 'react-router-dom';

interface BasicHeaderTypes {
	name: string
}

const BasicHeader = ({ name }: BasicHeaderTypes) => {
	const dispatch = useDispatch()
	const userId = useSelector((state: RootState) => state.users.userId)
	const handleLogin = () => {

	}
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
				<img src={logo} alt="logo" />
				{renderNavList()}
				<Link className={styles.header__loginButton} to="/login" >
					{Messages.LOGIN}
				</Link>
				<button className={styles.header__logoutButton} onClick={handleLogout}>
					{Messages.LOGOUT}
				</button>
			</nav>
		</header>
	)
}

export default BasicHeader;