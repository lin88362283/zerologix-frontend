import React, { useEffect } from "react";
import BasicList from "../components/BasicList";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { RootState } from "../state/store";
import { getPosts } from "../state/slices/postSlice";
const Registered = () => {
	const dispatch = useAppDispatch()
	const posts = useAppSelector((state: RootState) => state.posts.posts);
	const userEmail = useAppSelector((state: RootState) => state.users.userEmail);

	useEffect(() => {
		dispatch(getPosts());
	}, [])

	return (
		<BasicList posts={posts} userEmail={userEmail} registered={true}/>
	)
}

export default Registered;