/* eslint-disable react/prop-types */
import styles from './InfoForm.module.less';
import { useEffect, useState } from 'react';

import Form from 'ui/form';
import Field from 'ui/form/field';

import Input from 'ui/inputs/input';
import Checkbox from 'ui/inputs/checkbox';
import RadioGroup from 'ui/inputs/radio_group';
import Select from 'ui/inputs/select';
import TextArea from 'ui/inputs/textarea';

const InfoForm = ({ setStep, cart, setOrderId }) => {
	const [locations, setLocations] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState('');
	const [omnivaPackage, setOmnivaPackage] = useState(null);
	const [deliveryType, setDeliveryType] = useState('parcelMachine');

	useEffect(() => {
		remoteRequest({
			url: 'omniva/packages',
			data: {},
			method: 'POST',
			onSuccess: (response) => setLocations(response.rows || []),
			onError: () => setLocations([]),
		});
	}, []);

	const filteredLocations = locations.filter(
		(loc) => loc.A0_NAME === selectedCountry,
	);

	const onBeforeSubmit = ({ data /*, Form*/ }) => {

		if (!selectedCountry) {
			alert('Select country');
			throw new Error('COUNTRY_REQUIRED');
		}

		if (!omnivaPackage?.value) {
			alert('Select parcel machine');
			throw new Error('OMNIVA_REQUIRED');
		}

		if (data?.privacyPolicy !== '1' && data?.privacyPolicy !== true) {
			alert('Accept privacy policy');
			throw new Error('PRIVACY_REQUIRED');
		}

		data.action = 'create';

		// товары
		data.items = cart?.product_summary || [];
		// доставка
		data.deliveryType = deliveryType;
		data.omnivaPackage = omnivaPackage; // если бэк ждёт объект
		data.delivery_address = omnivaPackage.label || '';
		data.delivery_postal_code = omnivaPackage.value || '';
		data.delivery_country = selectedCountry || '';

		// страна (если хочешь, можно брать из Field `country`, но у тебя она “двойная”)
		data.country = selectedCountry;
	};

	const onSuccess = ({ response }) => {
		const id = response?.order?.id ?? response?.data?.order?.id;
		if (id) {
			setOrderId(id);
			setStep(2);
			return;
		}
		alert('Order was not created');
	};

	const onError = ({ response }) => {
		// тут можно показать response.msg если есть
		alert('Order create failed');
		console.error(response);
	};

	return (
		<div className={styles.checkoutInformationBox}>
			<Form
				action="order/actions"
				showSuccess={false}
				showError={true}
				onBeforeSubmit={onBeforeSubmit}
				onSuccess={onSuccess}
				onError={onError}
				submit={{ title: 'Continue' }}>
				{/* Person type */}
				<div className={styles.checkoutInformationPersonType}>
					<Field
						name="person_type"
						component={RadioGroup}
						componentProps={{
							classNames: {
								inner: styles.radioGroupRow,
								'option-wrapper': styles.radioOptionRow,
								label: styles.radioLabel,
							},
							options: [
								{ value: 'private', label: 'Private individual' },
								{ value: 'company', label: 'Company' },
							],
						}}
					/>
				</div>

				{/* Contact fields */}
				<div className={styles.checkoutInformationInputFields}>
					<div className={styles.InputField}>
						<Field
							name="name"
							component={Input}
							componentProps={{ placeholder: 'Name', required: true }}
						/>
						<Field
							name="surname"
							component={Input}
							componentProps={{ placeholder: 'Surname', required: true }}
						/>
					</div>

					<div className={styles.InputField}>
						<Field
							name="phoneNumber"
							component={Input}
							componentProps={{ placeholder: 'Phone Number', required: true }}
						/>
						<Field
							name="emain"
							component={Input}
							componentProps={{ placeholder: 'E-mail', required: true }}
						/>
					</div>

					<Field
						name="adress"
						component={Input}
						componentProps={{ placeholder: 'Adress', required: true }}
					/>
					<Field
						name="adress_sec_field"
						component={Input}
						componentProps={{ placeholder: 'Apartment number ect.' }}
					/>

					<div className={styles.labelContainer}>
						<Field name="isEqual" component={Checkbox} />
						<label>This address matches the delivery address</label>
					</div>

					{/* Country: лучше сделать именно Field и параллельно сетать selectedCountry */}
					<Select
						name="country"
						required
						options={[
							{ value: 'LV', label: 'Latvia' },
							{ value: 'LT', label: 'Lithuania' },
							{ value: 'EE', label: 'Estonia' },
						]}
						placeholder="Select country"
						onChange={(option) => setSelectedCountry(option?.value)}
					/>

					<div className={styles.InputField}>
						<Field
							name="city"
							component={Input}
							componentProps={{ required: true, placeholder: 'City' }}
						/>
						<Field
							name="postcode"
							component={Input}
							componentProps={{ required: true, placeholder: 'Postal code' }}
						/>
					</div>
				</div>

				<div className={styles.divider} />

				<div className={styles.checkoutInformationInputFields}>
					<Field
						name="comments"
						component={TextArea}
						componentProps={{ placeholder: 'Add a comment to your order' }}
					/>
				</div>

				<div className={styles.divider} />

				<h2>Delivery</h2>

				<div className={styles.deliveryBox}>
					<div className={styles.deliveryType}>
						<Field
							name="deliveryTypeField"
							component={RadioGroup}
							componentProps={{
								required: true,
								classNames: {
									inner: styles.radioGroupRow,
									'option-wrapper': styles.radioOptionRow,
									label: styles.radioLabel,
								},
								options: [{ value: 'parcelMachine', label: 'Parcel machine' }],
								onChange: ({ value }) => setDeliveryType(value),
							}}
						/>
					</div>

					<div className={styles.deliveryType}>
						<div className={styles.deliveryType}>
							<Select
								name="omnivaPackage"
								required
								searchable
								disabled={!selectedCountry}
								onChange={({ value, Select }) => {
									const selectedOption = Select.getSelectedOptions()[0];

									setOmnivaPackage({
										value,
										label: selectedOption?.label,
									});
								}}
								options={filteredLocations.map((loc) => ({
									value: loc.ZIP,
									label: `${loc.NAME} (${loc.A0_NAME})`,
								}))}
								placeholder="Select package"
							/>
						</div>
					</div>

					<div className={styles.deliveryInfo}>
						<div className={styles.deliveryPrice}>
							<h3>Delivery fee:</h3>
							<p>6.24</p>
						</div>
						<div className={styles.deliveryTime}>
							<p>Estimated delivery time: 5-6 work days</p>
						</div>
					</div>
				</div>

				<div className={styles.divider} />

				<div className={styles.policyAgreement}>
					<div className={styles.labelContainer}>
						<Field
							name="privacyPolicy"
							component={Checkbox}
							componentProps={{
								required: true,
								onChange: () => {}, // если нужно
							}}
						/>
						<label>I accept the terms of the Privacy Policy.</label>
					</div>

					<div className={styles.labelContainer}>
						<Field
							name="distanceContract"
							component={Checkbox}
							componentProps={{ required: true }}
						/>
						<label>
							I agree to the distance contract at the time of purchase
						</label>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default InfoForm;
