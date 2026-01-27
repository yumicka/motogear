import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import UsersPage from 'admin/pages/users';
import TranslationsPage from 'admin/pages/translations';
import MetaDataPage from 'admin/pages/meta_data';
import SettingsPage from 'admin/pages/settings';
import Route from 'core/navigation/Route';
import Switch from 'core/navigation/Switch';
import BlogEntries from 'admin/pages/blog/components/blog_entries';
import BlogCategories from 'admin/pages/blog/components/blog_categories';

const propTypes = {};

const defaultProps = {};

class Content extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Switch>
				<Route
					path="/administration/blog/blog_entries"
					component={BlogEntries}
				/>
				<Route
					path="/administration/blog/blog_categories"
					component={BlogCategories}
				/>
				<Route
					path="/administration/translations"
					component={TranslationsPage}
				/>
				<Route path="/administration/settings" component={SettingsPage} />
				<Route path="/administration/metadata" component={MetaDataPage} />
				<Route path="/administration/users" component={UsersPage} />
				<Route path="/administration" component={UsersPage} />
			</Switch>
		);
	}
}

Content.propTypes = propTypes;

Content.defaultProps = defaultProps;

export default Content;
