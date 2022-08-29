import React, { useEffect } from "react";
import Messages from "../utils/Messages";
import BasicList from "../components/BasicList";
import WebinarRegisterForm from "../components/WebinarRegisterForm";
import styles from './Webinar.module.scss';
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { RootState } from "../state/store";
import { getPosts } from "../state/slices/postSlice";
import { RightOutlined } from '@ant-design/icons';

const Webinar = () => {
	const dispatch = useAppDispatch()
	const posts = useAppSelector((state: RootState) => state.posts.posts.data)
	console.log("posts", posts);

	const favPosts = posts?.filter(post => !post.favourited);
	const userEmail = useAppSelector((state: RootState) => state.users.userEmail);

	useEffect(() => {
		dispatch(getPosts());
	}, [])
	return (
		<>
			<section className={styles.webinar__introduction}>
				<h2>
					{Messages.WEBINAR_TITLE}
				</h2>
				<p>
					{Messages.WEBINAR_DESCRIPTION}
				</p>
			</section>
			<section>
				<BasicList posts={favPosts} userEmail={userEmail} registered={false} />
			</section>
			<section className={styles.webinar__meetYourHost}>
				<h3>
					{Messages.MEET_YOUR_HOST_TITLE}
				</h3>
				<article>
					<p>
						{Messages.MEET_YOUR_HOST_DESCRIPTION_1}
					</p>
					<p>
						{Messages.MEET_YOUR_HOST_DESCRIPTION_2}
					</p>
					<p>
						{Messages.MEET_YOUR_HOST_DESCRIPTION_3}
					</p>
				</article>
				<span>{Messages.SEE_MORE}</span>
				<RightOutlined />
			</section>
			<section>
				<WebinarRegisterForm />
			</section>
		</>
	)
}
export default Webinar;