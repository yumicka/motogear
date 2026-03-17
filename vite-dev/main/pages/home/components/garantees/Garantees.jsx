// @ts-nocheck
import { useState } from 'react';
import styles from './Garantees.module.less';
import Modal from './Modal/Modal.jsx';

import WithUi from 'hoc/store/ui';
import Editable from 'cms/editable';
import Item from './components/item';

const uiProps = () => {
	return {
		collections: {
			garantees: {
				ids: 'ids',
			},
		},
	};
};

const Garantees = ({ ids }) => {
	const [active, setActive] = useState(null);

	const renderItem = (id) => (
		<Item key={id} id={id} onClick={(data) => setActive(data)} />
	);

	return (
		<div className={styles.wrapper}>
			<div className={styles.inner_wrapper}>
				<Editable
					add={{
						name: 'garantees',
						action: 'add',
					}}
					sort={{
						name: 'garantees',
						action: 'sort',
					}}>
					<div className={styles.card_box}>{ids?.map(renderItem)}</div>
				</Editable>
			</div>

			<Modal
				open={!!active}
				onClose={() => setActive(null)}
				title={active?.title}
				icon={active?.icon}>
				{active?.full}
			</Modal>
		</div>
	);
};

export default WithUi(uiProps)(Garantees);
