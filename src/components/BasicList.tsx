import { useEffect } from "react";
import Messages from "../utils/Messages";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { getPosts, Post } from "../state/slices/postSlice";
import { setCurrentFormTopic } from "../state/slices/formSlice";
import { RootState } from "../state/store";
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
	// const posts = useAppSelector((state: RootState) => state.posts.posts);
	// const userEmail = useAppSelector((state: RootState) => state.users.userEmail);

	// useEffect(() => {
	// 	dispatch(getPosts());
	// }, [])

	const renderRegisterNow = (title: string) => {
		dispatch(setCurrentFormTopic(title))
		const destination = userEmail ? { pathname: "/webinar", hash: "#registerForm" } : { pathname: '/login' };
		return (<Link to={destination} >{Messages.REGISTER_NOW}</Link>)
	}

	const renderUnregister = (post: Post) => (
		<button onClick={() => handleUnregister(post)}>
			{Messages.UNREGISTER}
		</button>
	)
	type PostType = Post | {};
	const handleUnregister = (post: PostType) => {

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
			}
			)}
			{/* <icon /> */}
		</ul>
	)
}

export default BasicList;