// @ts-nocheck
import styles from './Footer.module.less';
import Link from 'core/navigation/link';

const Footer = () => {
	const year = new Date().getFullYear();

	const helpLinks = [
		{ label: 'Shipping & Delivery', to: '#' },
		{ label: 'Returns', to: '#' },
		{ label: 'Right to withdrawal', to: '#' },
		{ label: 'Payment', to: '#' },
		{ label: 'Claims & Complaints', to: '#' },
		{ label: 'Order Status', to: '#' },
		{ label: 'Privacy Policy', to: '#' },
		{ label: 'Terms & Conditions', to: '#' },
	];

	const companyLinks = [
		{ label: 'About', to: '#' },
		{ label: 'Declaration of Conformity', to: '#' },
		{ label: 'Recycling Information', to: '#' },
	];

	return (
		<footer className={styles.footer}>
			<div className={styles.inner}>
				<div className={styles.topGrid}>
					
					<div className={styles.ctaCard}>
						<h3 className={styles.ctaTitle}>Join the Riders Club</h3>
						<p className={styles.ctaText}>
							Unlock exclusive offers and rewards. Join now and elevate your
							riding experience.
						</p>
						<div className={styles.ctaActions}>
							<Link className={styles.ctaPrimary} to="#">
								Sign up
							</Link>
							<Link className={styles.ctaSecondary} to="#">
								Read more
							</Link>
						</div>
					</div>
					
					<div className={styles.col}>
						<h4 className={styles.colTitle}>Help</h4>
						<ul className={styles.list}>
							{helpLinks.map((l) => (
								<li key={l.label}>
									<Link className={styles.link} to={l.to}>
										{l.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

				
					<div className={styles.col}>
						<h4 className={styles.colTitle}>Company</h4>
						<ul className={styles.list}>
							{companyLinks.map((l) => (
								<li key={l.label}>
									<Link className={styles.link} to={l.to}>
										{l.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					
					<div className={styles.col}>
						<h4 className={styles.colTitle}>Customer service</h4>

						<div className={styles.contactBox}>
							<div className={styles.contactRow}>
								<span className={styles.muted}>Email</span>
								<a className={styles.link} href="mailto:info@24mx.eu">
									info@24mx.eu
								</a>
							</div>

							<div className={styles.contactRow}>
								<span className={styles.muted}>Hours</span>
								<span>Mon–Fri, 09:00–17:00</span>
							</div>

							<Link className={styles.supportBtn} to="#">
								Customer Care
							</Link>
						</div>
					</div>
				</div>

				<div className={styles.metaRow}>
					<div className={styles.badges}>
						<span className={styles.badge}>Visa</span>
						<span className={styles.badge}>Mastercard</span>
						<span className={styles.badge}>PayPal</span>
						<span className={styles.badge}>Klarna</span>
					</div>

					<div className={styles.socials}>
						<Link className={styles.social} to="#">
							Instagram
						</Link>
						<Link className={styles.social} to="#">
							Facebook
						</Link>
						<Link className={styles.social} to="#">
							YouTube
						</Link>
					</div>
				</div>

				<div className={styles.bottom}>
					<div className={styles.legalLeft}>
						<span>© {year} 24MX</span>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
