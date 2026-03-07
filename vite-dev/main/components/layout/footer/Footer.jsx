/* eslint-disable react/prop-types */
// @ts-nocheck
import getMainUrl from 'helpers/getMainUrl';
import styles from './Footer.module.less';
import Link from 'core/navigation/link';
import WithUi from 'hoc/store/ui';

const uiProps = (ownProps) => {
	return {
		categories: 'categories',
	};
};

const Footer = ({ categories }) => {
	const year = new Date().getFullYear();

	const helpLinks = [
		{ label: 'Shipping & Delivery', to: '#' },
		{ label: 'Returns', to: '#' },
		{ label: 'Right to withdrawal', to: '#' },
		{ label: 'Payment', to: '#' },
		{ label: 'Claims & Complaints', to: '#' },
		{ label: 'Order Status', to: '#' },
		{ label: 'Privacy Policy', to: getMainUrl(true) + 'privacy_policy' },
		{ label: 'Terms & Conditions', to: '#' },
	];

	return (
		<footer className={styles.footer}>
			<div className={styles.inner}>
				<div className={styles.topGrid}>
					<div className={styles.ctaCard}>
						<h3 className={styles.ctaTitle}>{_g.lang('riders_club')}</h3>
						<p className={styles.ctaText}>{_g.lang('riders_club_content')}</p>
						<div className={styles.ctaActions}>
							<Link className={styles.ctaPrimary} to="#">
								{_g.lang('sign_up')}
							</Link>
							<Link className={styles.ctaSecondary} to="#">
								{_g.lang('read_more')}
							</Link>
						</div>
					</div>

					<div className={styles.col}>
						<h4 className={styles.colTitle}>{_g.lang('footer_help')}</h4>
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
						<h4 className={styles.colTitle}>{_g.lang('categories')}</h4>
						<ul className={styles.list}>
							{categories
								.filter((category) => category.parent_id == null)
								.map((category) => {
									return (
										<Link
											key={category.id}
											to={
												getMainUrl(true) + 'veikals?categoryId=' + category.id
											}
											className={styles.category}>
											{category.title}
										</Link>
									);
								})}
						</ul>
					</div>

					<div className={styles.col}>
						<h4 className={styles.colTitle}>{_g.lang('sustomer_service')}</h4>
						<div>
							<div className={styles.socials}>
								<Link className={styles.link} href="mailto:info@skujins.lv">
									info@skujins.lv
								</Link>
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
					</div>
				</div>

				<div className={styles.metaRow}>
					<div className={styles.badges}>
						<span className={styles.badge}>Visa</span>
						<span className={styles.badge}>Mastercard</span>
						<span className={styles.badge}>PayPal</span>
						<span className={styles.badge}>Klarna</span>
					</div>
				</div>

				<div className={styles.bottom}>
					<div className={styles.legalLeft}>
						<span>© {year} Skujins.lv</span>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default WithUi(uiProps)(Footer);
