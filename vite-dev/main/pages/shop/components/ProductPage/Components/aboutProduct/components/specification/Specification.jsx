/* eslint-disable react/prop-types */
import styles from './Specification.module.less';

const Specification = ({ specifications }) => {
	const productSpecifications = specifications;

	return (
		<div className={styles.wrapper}>
			<table className={styles.table}>
				<tbody>
					{productSpecifications.map((spec) => (
						<tr key={spec.id}>
							<td className={styles.title}>{spec.title}</td>
							<td className={styles.content}>{spec.content}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Specification;
