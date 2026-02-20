/* eslint-disable react/prop-types */
import Popup from 'reactjs-popup';

const EditQuantityPopup = ({product, quantity, setQuantity, onSave, onClose}) => {
	return (
		<Popup open={!!product} modal nested onClose={onClose}>
			<div className="modal">
				<div className="content">
					<h3>Edit {product?.title}</h3>
					<div>
						<label>Quantity: </label>
						<input
							type="number"
							min={1}
							value={quantity}
							onChange={(e) => setQuantity(Number(e.target.value))}
						/>
					</div>
				</div>
				<div className="actions">
					<button onClick={onSave}>Save</button>
					<button onClick={onClose}>Cancel</button>
				</div>
			</div>
		</Popup>
	);
};

export default EditQuantityPopup;
