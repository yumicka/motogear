import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Editable from 'cms/editable';
import Item from './components/item/Item';

const propTypes = {
	//from ui
	ids: PropTypes.array,
};

const defaultProps = {
	//from ui
	ids: [],
};

const uiProps = (ownProps) => {
	return {
		collections: {
			terms: {
				ids: 'ids',
			},
		},
	};
};

class Terms extends Component {
	constructor(props) {
		super(props);
	}

	renderItem = (id) => {
		//<editor-fold defaultstate="collapsed" desc="renderItem">
		return <Item key={id} id={id} />;
		//</editor-fold>
	};

	render() {
		const { ids } = this.props;

		return (
			<div className="container py-4 max-w-[900px] mx-auto ">
				<div className="text-[48px] font-normal font-['Sen'] py-14">
					{_g.lang('footer_terms')}
				</div>
				<Editable
					add={{
						name: 'terms',
						action: 'add',
					}}
					sort={{
						name: 'terms',
						action: 'sort',
					}}>
					<div>{ids.map(this.renderItem)}</div>
				</Editable>
			</div>
		);
	}
}

Terms.propTypes = propTypes;

Terms.defaultProps = defaultProps;

export default WithUi(uiProps)(Terms);
