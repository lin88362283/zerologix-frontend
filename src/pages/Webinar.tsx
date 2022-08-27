import Messages from "../utils/Messages";
import BasicList from "../components/BasicList";
import WebinarRegisterForm from "../components/RegisterForm";
import styles from './Webinar.module.scss';
const Webinar = () => {
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
				<BasicList />
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