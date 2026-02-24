import styles from './CheckoutSteps.module.less';

const steps = [
	{ id: 1, label: 'Payment details' },
	{ id: 2, label: 'Payment' },
	{ id: 3, label: 'Confirmation' },
];

const CheckoutSteps = ({ step }) => {
	return (
		<div className={styles.steps}>
			<div className={styles.progressLineBackground} />
			<div
				className={styles.progressLineFilled}
				style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
			/>
			{steps.map((item) => {
				const isActive = step === item.id;
				const isCompleted = step > item.id;
				return (
					<div key={item.id} className={styles.stepWrapper}>
						<div
							className={[
								styles.circle,
								isActive && styles.active,
								isCompleted && styles.completed,
							]
								.filter(Boolean)
								.join(' ')}>
							{item.id}
						</div>
						<span className={styles.label}>{item.label}</span>
					</div>
				);
			})}
		</div>
	);
};

export default CheckoutSteps;
