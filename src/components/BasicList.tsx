import Messages from "../utils/Messages";
import { useAppDispatch } from "../state/hooks";
import { Post, unregisterPost } from "../state/slices/postSlice";
import styles from './BasicList.module.scss';
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { RightCircleOutlined } from "@ant-design/icons";


interface BasicListProps {
	posts?: Post[],
	userEmail: string,
	registered: boolean
}

const BasicList = ({ posts, userEmail, registered }: BasicListProps) => {
	const dispatch = useAppDispatch()

	const renderRegisterNow = (title: string) => {
		const destination = userEmail ? { pathname: "/webinar", hash: "#registerForm" } : { pathname: '/login' };
		return (<Link className={styles.registerButton} to={destination} >{Messages.REGISTER_NOW}</Link>)
	}

	const renderUnregister = (post: Post) => (
		<button className={styles.registerButton} onClick={() => handleUnregister(post)}>
			{Messages.UNREGISTER}
		</button>
	)

	const handleUnregister = (post: Post) => {
		dispatch(unregisterPost({ id: post.id }))
	}

	return (
		<ul className={styles.basicList}>
			{posts?.map((post, index) => {
				const { created_at, title, content, id } = post;
				return (
					<li key={index} className={styles.basicList__item}>
						{created_at && <span className={styles.basicList__createdAt}>
							{dayjs(created_at).format('DD/MM/YYYY')}
						</span>}
						<h4>{title}</h4>
						<p>{content}</p>
						{created_at && <span>
							{dayjs(created_at).add(10, 'day').format('YYYY/MM/DD hh:mm')}
						</span>}
						<div className={styles.basicList__footer}>
							{!registered && renderRegisterNow(title)}
							{registered && renderUnregister(post)}
							<Link to={`/webinar/${id}`}>
								<RightCircleOutlined />
							</Link>
						</div>
					</li>
				)
			})}
		</ul>
	)
}

export default BasicList;