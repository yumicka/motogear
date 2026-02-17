import styles from '../AboutProduct.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faComments, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

const AskQuestion = () => {
	return (
		<div className={styles.askQuestion}>
			<div className={styles.title}>
				<h3>
					<FontAwesomeIcon icon={faComments} /> Ask a Question
				</h3>
			</div>
			<form className={styles.form}>
				<label>
					Name
					<div className={styles.inputWrapper}>
						<FontAwesomeIcon icon={faUser} className={styles.inputIcon} />
						<input type="text" name="name" placeholder="Your name" required />
					</div>
				</label>

				<label>
					Email
					<div className={styles.inputWrapper}>
						<FontAwesomeIcon icon={faEnvelope} className={styles.inputIcon} />
						<input
							type="email"
							name="email"
							placeholder="Your email"
							required
						/>
					</div>
				</label>

				<label>
					Question
					<div className={styles.inputWrapper}>
						<FontAwesomeIcon
							icon={faCommentDots}
							className={styles.inputIconTextarea}
						/>
						<textarea
							name="question"
							placeholder="Type your question here..."
							rows={5}
							required
						/>
					</div>
				</label>

				<button type="submit">Send Question</button>
			</form>
		</div>
	);
};

export default AskQuestion;
