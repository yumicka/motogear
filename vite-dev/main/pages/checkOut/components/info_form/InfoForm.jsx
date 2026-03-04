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

	const onBeforeSubmit = ({ data }) => {
		data.action = 'create';

		data.items = cart?.product_summary || [];

		data.deliveryType = deliveryType;
		data.omnivaPackage = omnivaPackage;
		data.delivery_address = omnivaPackage.label || '';
		data.delivery_postal_code = omnivaPackage.value || '';
		data.delivery_country = selectedCountry || '';

		data.country = selectedCountry;
	};

	const onSuccess = ({ response }) => {
		const id = response?.order?.id ?? response?.data?.order?.id;
		if (id) {
			setOrderId(id);
			setStep(2);
			return;
		}
	};

	const onError = () => {
		setTimeout(() => {
			const firstError = document.querySelector('.field_error, .form-error');

			if (firstError) {
				firstError.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				});
			}
		}, 50);
	};

	const validatePersonName =
		(label) =>
			({ value, msg }) => {
				const v = String(value ?? '').trim();
				const re = /^[A-Za-zÀ-žĀ-ſ\u0400-\u04FF' -]{2,}$/;
				if (!v) return { passed: false, msg: msg || `${label} ir obligāts!` };
				if (!re.test(v))
					return {
						passed: false,
						msg: msg || 'Ir atļauti tikai burti!.',
					};
				return { passed: true };
			};

	const validateTextReasonable =
		( minLen = 3) =>
			({ value, msg }) => {
				const v = String(value ?? '').trim();
				const hasLetter = /[A-Za-zÀ-žĀ-ſ\u0400-\u04FF]/.test(v);
				if (v.length < minLen || !hasLetter) {
					return {
						passed: false,
						msg: msg || 'Lūdzu, ievadiet pareizu informāciju',
					};
				}
				return { passed: true };
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
							isRequired={true}
							componentProps={{ placeholder: 'Name *' }}
							customValidation={validatePersonName('Name')}
						/>
						<Field
							name="surname"
							component={Input}
							isRequired={true}
							componentProps={{ placeholder: 'Surname *' }}
							customValidation={validatePersonName('Surname')}
						/>
					</div>

					<div className={styles.InputField}>
						<Field
							name="phoneNumber"
							component={Input}
							isRequired={true}
							componentProps={{ placeholder: 'Phone Number *' }}
							customValidation={({ value, msg }) => {
								const raw = String(value ?? '');
								const digits = raw.replace(/[^\d+]/g, '');
								const normalized = digits.startsWith('+')
									? digits
									: digits.replace(/^00/, '+');

								const onlyDigits = normalized.replace(/\D/g, '');

								
								const ok =
									onlyDigits.length === 8 ||
									(onlyDigits.length === 11 &&
										onlyDigits.startsWith('371') &&
										onlyDigits.startsWith('370') &&
										onlyDigits.startsWith('372'));

								return ok
									? { passed: true }
									: {
										passed: false,
										msg: msg || 'Ievadiet derīgu tālruņa numuru (8 cipari).',
									};
							}}
						/>

						<Field
							name="emain"
							component={Input}
							isRequired={true}
							componentProps={{ placeholder: 'E-mail *' }}
						/>
					</div>

					<Field
						name="adress"
						component={Input}
						isRequired={true}
						componentProps={{ placeholder: 'Adress *' }}
						customValidation={validateTextReasonable(5)}
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

					<Field
						name="country"
						component={Select}
						isRequired={true}
						onChange={({ value }) => {
							setSelectedCountry(value);
							setOmnivaPackage(null);
						}}
						componentProps={{
							options: [
								{ value: 'LV', label: 'Latvia' },
								{ value: 'LT', label: 'Lithuania' },
								{ value: 'EE', label: 'Estonia' },
							],
							placeholder: 'Select country *',
						}}
					/>

					<div className={styles.InputField}>
						<Field
							name="city"
							isRequired={true}
							component={Input}
							componentProps={{ placeholder: 'City *' }}
							customValidation={validateTextReasonable(2)}
						/>
						<Field
							name="postcode"
							component={Input}
							isRequired={true}
							componentProps={{ placeholder: 'Postal code *' }}
							customValidation={({ value, msg }) => {
								const v = String(value ?? '').trim().toUpperCase();

								const digits = v.replace(/\D/g, '');

								let ok = false;
								if (selectedCountry === 'LV') {
									ok = digits.length === 4;
								} else if (selectedCountry === 'LT') {
									ok = digits.length === 5;
								} else if (selectedCountry === 'EE') {
									ok = digits.length === 5;
								} else {
									ok = digits.length >= 4; 
								}

								return ok
									? { passed: true }
									: { passed: false, msg: msg || 'Ievadiet derīgu pasta indeksu izvēlētajai valstij.' };
							}}
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
							isRequired={true}
							componentProps={{
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
							<Field
								name="omnivaPackage"
								component={Select}
								isRequired={true}
								disabled={!selectedCountry}
								onChange={({ value, Select }) => {
									const selectedOption = Select.getSelectedOptions()[0];
									setOmnivaPackage({
										value,
										label: selectedOption?.label,
									});
								}}
								componentProps={{
									searchable: true,
									placeholder: selectedCountry
										? 'Select parcel machine *'
										: 'Select country first',
									options: filteredLocations.map((loc) => ({
										value: loc.ZIP,
										label: `${loc.NAME} (${loc.A0_NAME})`,
									})),
								}}
							/>
						</div>
					</div>

					<div className={styles.deliveryInfo}>
						<div className={styles.deliveryPrice}>
							<h3>Delivery fee:</h3>
							<p>0.00 €</p>
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
							mustAccept={true}
						/>
						<label>I accept the terms of the Privacy Policy. *</label>
					</div>

					<div className={styles.labelContainer}>
						<Field
							name="distanceContract"
							component={Checkbox}
							mustAccept={true}
						/>
						<label>
							I agree to the distance contract at the time of purchase *
						</label>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default InfoForm;
