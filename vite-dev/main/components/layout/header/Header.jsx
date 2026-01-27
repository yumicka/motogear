import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.less';
import WithUi from 'hoc/store/ui';
import menuHide from 'main/components/utils/menuHide';
import Logo from './components/logo/Logo';
import SearchBar from './components/search_bar/SearchBar';
import Cart from './components/cart/Cart';
import Categories from './components/categories/Categories';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const propTypes = { browserWidth: PropTypes.number };
const defaultProps = {};
const uiProps = () => ({});

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAtTop: true,
			mobileMenuOpen: false,
		};
	}

	componentDidMount() {
		menuHide();
		window.addEventListener('scroll', this.handleScroll);
		this.handleScroll();
		window.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	handleKeyDown = (e) => {
		if (e.key === 'Escape' && this.state.mobileMenuOpen) {
			this.setState({ mobileMenuOpen: false });
			document.body.style.overflow = '';
		}
	};

	handleScroll = () => {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		const isAtTop = scrollTop === 0;
		if (this.state.isAtTop !== isAtTop) this.setState({ isAtTop });
	};

	toggleMobileMenu = () => {
		this.setState(
			(s) => ({ mobileMenuOpen: !s.mobileMenuOpen }),
			() => {
				document.body.style.overflow = this.state.mobileMenuOpen
					? 'hidden'
					: '';
			},
		);
	};

	closeMobileMenu = () => {
		this.setState({ mobileMenuOpen: false });
		document.body.style.overflow = '';
	};

	render() {
		const { isAtTop, mobileMenuOpen } = this.state;

		return (
			<header className={styles.wrapper}>
				<div
					className={styles.inner_wrapper}
					id="header"
					style={isAtTop ? { background: 'transparent' } : null}>
					<div className={styles.container}>
						<Link to="/" className={styles.logo_container}>
							<Logo />
						</Link>

						{/* desktop */}
						<div className={styles.desktop_only}>
							<div className={styles.search}>
								<SearchBar />
							</div>
						</div>

						<div className={styles.desktop_only}>
							<div className={styles.cart_container}>
								<Cart />
							</div>
						</div>

						{/* mobile burger */}
						<button
							type="button"
							className={styles.burger}
							aria-label="Open menu"
							aria-expanded={mobileMenuOpen}
							onClick={this.toggleMobileMenu}>
							<span>
								<FontAwesomeIcon icon={faBars} />
							</span>
						</button>
					</div>

					{/* desktop categories */}
					<div className={styles.categories_desktop}>
						<Categories />
					</div>
				</div>

				{/* mobile panel */}
				<div
					className={`${styles.mobile_overlay} ${mobileMenuOpen ? styles.open : ''}`}
					onMouseDown={this.closeMobileMenu}>
					<div
						className={styles.mobile_panel}
						onMouseDown={(e) => e.stopPropagation()}>
						<div className={styles.mobile_panel_header}>
							<div className={styles.mobile_title}>Menu</div>
							<button
								type="button"
								className={styles.mobile_close}
								aria-label="Close menu"
								onClick={this.closeMobileMenu}>
								<FontAwesomeIcon icon={faXmark} />
							</button>
						</div>

						<div className={styles.mobile_block}>
							<SearchBar />
						</div>
						<div className={styles.mobile_block}>
							<Cart />
						</div>

						<div className={styles.mobile_block}>
							<Categories />
						</div>
					</div>
				</div>
			</header>
		);
	}
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
export default WithUi(uiProps)(Header);
