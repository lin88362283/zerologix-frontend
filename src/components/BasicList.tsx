import { useEffect } from "react";
import Messages from "../utils/Messages";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { getPosts, Post } from "../state/slices/postSlice";
import { setCurrentFormTopic } from "../state/slices/formSlice";
import { RootState } from "../state/store";
import styles from './BasicList.module.scss';
import dayjs from "dayjs";
import { Link } from "react-router-dom";


interface BasicListProps {
	posts: Post[],
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
			{posts.map((post, index) => (
				<li key={index}>
					<span>
						{dayjs(post.createdAt).format('DD/MM/YYYY')}
					</span>
					<h4>
						{post.title}
					</h4>
					<p>
						{post.content}
					</p>
					<span>
						{dayjs(post.createdAt).add(10, 'day').format('YYYY/MM/dd hh:mm')}
					</span>
					{!registered && renderRegisterNow(post.title)}
					{registered && renderUnregister(post)}
					<Link to={`/webinar/${post.id}`}>
					</Link>
				</li>)
			)}
			{/* <icon /> */}
		</ul>
	)
}

export default BasicList;