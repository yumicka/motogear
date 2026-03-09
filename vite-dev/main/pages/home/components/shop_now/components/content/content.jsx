// @ts-ignore
import styles from './content.module.less';

import LeftBox from './components/LeftBox';
import RightBox from './components/RightBox';

let Content = ( ) => {
	return (
		<div className={styles.content}>
			<LeftBox />

			<RightBox />
		</div>
	);
};


export default Content;
