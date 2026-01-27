import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';
import styles from './Info.module.less';
import Email from './components/Email';
import Phone from './components/Phone';
import Link from 'core/navigation/link';
import getMainUrl from 'helpers/getMainUrl';

import { head } from 'lodash-es';

import Editable from 'cms/editable';

const propTypes = {
	//from ui
	data: PropTypes.object,
};

const defaultProps = {
	//from ui
};

const uiProps = (ownProps) => {
	return {};
};

class Info extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { data } = this.props;
		return (
			<div className={styles.wrapper}>
				<Editable
					edit={{
						name: 'check_info',
					}}>
					<div className={styles.left}>
						<div className={styles.text} style={{ fontWeight: 600 }}>
							sia
						</div>
						<div className={styles.text}>regnr</div>
						<div className={styles.text}>address</div>
						<div className={styles.link_wrapper}>
							<Link to={'tel: ' + 'phone'} className={styles.link}>
								<Phone />
								phone
							</Link>
							<Link to={'mailto: ' + 'email'} className={styles.link}>
								<Email />
								email
							</Link>
						</div>
					</div>
				</Editable>

				<Link
					to={getMainUrl(true) + 'privatumu-politika'}
					target={'_blank'}
					className={styles.privacy_policy}>
					{_g.lang('privacy_policy')}
				</Link>
			</div>
		);
	}
}

Info.propTypes = propTypes;

Info.defaultProps = defaultProps;

export default WithUi(uiProps)(Info);
