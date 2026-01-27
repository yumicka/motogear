import { useEffect } from 'react';
import styles from './Modal.module.less';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Modal({ open, onClose, title, children, icon }) {
	useEffect(() => {
		if (!open) return;

		const onKeyDown = (e) => e.key === 'Escape' && onClose();
		document.addEventListener('keydown', onKeyDown);

		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', onKeyDown);
			document.body.style.overflow = prev;
		};
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div className={styles.backdrop} onMouseDown={onClose}>
			<div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
				<button className={styles.close} onClick={onClose} aria-label="Close">
					<FontAwesomeIcon icon={faXmark} />
				</button>

				<div className={styles.content}>
					{icon ? <div className={styles.icon}>{icon}</div> : null}
					{title ? <div className={styles.title}>{title}</div> : null}
					<div className={styles.body}>{children}</div>
				</div>
			</div>
		</div>
	);
}
