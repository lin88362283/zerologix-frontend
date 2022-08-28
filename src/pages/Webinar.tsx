import React, { useEffect } from "react";
import Messages from "../utils/Messages";
import BasicList from "../components/BasicList";
import WebinarRegisterForm from "../components/RegisterForm";
import styles from './Webinar.module.scss';
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { RootState } from "../state/store";
import { getPosts } from "../state/slices/postSlice";

const Webinar = () => {
	const dispatch = useAppDispatch()
	const posts = useAppSelector((state: RootState) => state.posts.posts).filter(post=>!post.favourited);
	const userEmail = useAppSelector((state: RootState) => state.users.userEmail);

	useEffect(() => {
		dispatch(getPosts());
	}, [])
	return (
		<>
			<section className={styles.introduction}>
				<h2>
					{Messages.WEBINAR_TITLE}
				</h2>
				<p>
					{Messages.WEBINAR_DESCRIPTION}
				</p>
			</section>
			<section>
				<BasicList posts={posts} userEmail={userEmail} registered={false} />
			</section>
			<section>
				<h3>
					{Messages.MEET_YOUR_HOST_TITLE}
				</h3>
				<p>
					{Messages.MEET_YOUR_HOST_DESCRIPTION_1}
				</p>
				<p>
					{Messages.MEET_YOUR_HOST_DESCRIPTION_2}
				</p>
				<p>
					{Messages.MEET_YOUR_HOST_DESCRIPTION_3}
				</p>
				<span>{Messages.SEE_MORE}</span>
			</section>
			<section>
				<WebinarRegisterForm />
			</section>
		</>
	)
}
export default Webinar;