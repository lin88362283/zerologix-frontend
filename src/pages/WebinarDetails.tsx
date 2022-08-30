import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPosts } from "../state/slices/postSlice";
import { useAppSelector, useAppDispatch } from "../state/hooks";
import { RootState } from "../state/store";
import { isEmpty } from "lodash";
import dayjs from 'dayjs';
import { Link } from "react-router-dom";
import Messages from '../utils/Messages'

const WebinarDetails = () => {
	const dispatch = useAppDispatch();
	const posts = useAppSelector((state: RootState) => state.posts.posts.data)
	const userEmail = useAppSelector((state: RootState) => state.users.userEmail)
	const postId = useParams()?.id;
	const renderRegisterNow = () => {
		const destination = userEmail ? { pathname: "/webinar", hash: "registerForm" } : { pathname: '/login' };
		return (<Link to={destination} >{Messages.REGISTER_NOW}</Link>)
	}
	useEffect(() => {
		if (isEmpty(posts)) {
			dispatch(getPosts({ page: 1 }));
		}
	}, [])
	const post = posts?.find((post) => String(post.id) === postId)
	return (!isEmpty(post) ? <>
		<span>
			{dayjs(post.created_at).format('DD/MM/YYYY')}
		</span>
		<h3>
			{post.title}
		</h3>
		<p>
			{post.content}
		</p>
		<span>
			{dayjs(post.created_at).add(10, 'day').format('YYYY/MM/DD hh:mm')}
		</span>
		{!post.favourited && renderRegisterNow()}
	</> : <>
	</>
	)
}

export default WebinarDetails;