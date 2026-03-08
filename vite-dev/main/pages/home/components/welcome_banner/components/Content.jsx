/* eslint-disable react/prop-types */
import styles from './Content.module.less';
import WithUi from 'hoc/store/ui';
import Editable from 'cms/editable';

const uiProps = (ownProps) => {
	return {
		content: {
			welcome_banner: {
				langData: 'langData',
			},
		},
	};
};

let Content = ({ langData }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<div className={styles.content}>
					<Editable
						edit={{
							name: 'welcome_banner',
						}}>
						<div className={styles.text}>
							<div className={styles.label}>
								<h1 dangerouslySetInnerHTML={{ __html: langData.title }} />
							</div>

							<div className={styles.paragraph}>
								<p dangerouslySetInnerHTML={{ __html: langData.content }} />
							</div>
						</div>
					</Editable>
				</div>
			</div>
		</div>
	);
};

export default WithUi(uiProps)(Content);
