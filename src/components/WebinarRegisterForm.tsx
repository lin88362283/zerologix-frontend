import React, { useState } from "react";
import Messages from "../utils/Messages";
import styles from "./WebinarRegisterForm.module.scss";
import { useAppSelector, useAppDispatch } from "../state/hooks";
import { RootState } from "../state/store";
import { registerPost } from "../state/slices/postSlice";


const WebinarRegisterForm = () => {
	const dispatch = useAppDispatch()
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [selectedPost, setSelectedPost] = useState("1");
	const posts = useAppSelector((state: RootState) => state.posts.posts.data)
	const unfavPosts = posts?.filter(post => !post.favourited);

	const handleSubmit = (e: React.MouseEvent) => {
		e.preventDefault();
		dispatch(registerPost({ id: selectedPost }))
	}

	const checkEmail = (email: string) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	}

	const checkPassStatus = () => {
		return checkEmail(email) && firstName && lastName ? true : false;
	}

	return (
		<form id="registerForm" className={styles.webinar__registerForm}>
			<div className={styles.form__header}>
				<h3>
					{Messages.WEBINAR_REGISTER_FORM_TITLE}
				</h3>
				<p>
					{Messages.WEBINAR_REGISTER_FORM_DESCRIPTION}
				</p>
			</div>
			<label>{Messages.FORM_TOPIC}</label>
			<select onChange={(e) => setSelectedPost(e.target.value)}>{unfavPosts?.map((post) => {
				return (
					<option key={post.id} value={post.id}>
						{post.title}
					</option>
				)
			})}</select>
			<label>{Messages.FORM_FIRST_NAME}</label>
			{firstName === "" && <p className={styles['form__alert--red']} > {Messages.ALERT_FIRST_NAME}</p>}
			<input required onChange={e => setFirstName(e.target.value)}></input>
			<label>{Messages.FORM_LAST_NAME}</label>
			{lastName === "" && <p className={styles['form__alert--red']}> {Messages.ALERT_LAST_NAME}</p>}
			<input required onChange={e => setLastName(e.target.value)}></input>
			<label>{Messages.FORM_EMAIL}</label>
			{!checkEmail(email) && <p className={styles['form__alert--red']}> {Messages.ALERT_EMAIL}</p>}
			<input onChange={e => setEmail(e.target.value)} type="email" required></input>
			<div className={styles.form__phone}>
				<label>{Messages.FORM_PHONE}</label>
				<select></select>
				<input></input>
			</div>
			<div className={styles.form__mobileAuth}>
				<label>{Messages.FORM_MOBILE_AUTHENTICATION}</label>
				<button>{Messages.FORM_GET_CODE}</button>
				<input></input>
			</div>
			<button type="submit" disabled={!checkPassStatus()} onClick={handleSubmit} className={styles.form__submit}>{Messages.REGISTER}</button>
		</form >
	)
}

export default WebinarRegisterForm;