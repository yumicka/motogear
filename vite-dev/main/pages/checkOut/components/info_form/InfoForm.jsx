/* eslint-disable react/prop-types */
import styles from './InfoForm.module.less';
import { useEffect, useState } from 'react';
import Input from 'ui/inputs/input';
import Checkbox from 'ui/inputs/checkbox';
import RadioGroup from 'ui/inputs/radio_group';
import Select from 'ui/inputs/select';
import TextArea from 'ui/inputs/textarea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const InfoForm = ({ setStep, cart, setOrderId }) => {
	const [locations, setLocations] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState('');
	const [omnivaPackage, setOmnivaPackage] = useState(null);
	const [deliveryType, setDeliveryType] = useState('parcelMachine');
	const [paymentType, setPaymentType] = useState('card');
	const [privacyPolicy, setPrivacyPolicy] = useState('0');

	useEffect(() => {
		remoteRequest({
			url: 'omniva/packages',
			data: {},
			method: 'POST',
			onSuccess: (response) => {
				setLocations(response.rows || []);
			},
			onError: () => {
				setLocations([]);
			},
		});
	}, []);
	const filteredLocations = locations.filter(
		(loc) => loc.A0_NAME === selectedCountry,
	);
	return (
		<>
			<div className={styles.checkoutInformationBox}>
				<form
					onSubmit={(e) => {
						e.preventDefault();

						if (!selectedCountry) {
							alert('Select country');
							return;
						}

						if (!omnivaPackage) {
							alert('Select parcel machine');
							return;
						}

						if (privacyPolicy !== '1') {
							alert('Accept privacy policy');
							return;
						}

						const fd = new FormData(e.currentTarget);
						const data = Object.fromEntries(fd.entries());
						data.country = selectedCountry;
						data.deliveryType = deliveryType || data.deliveryType;
						data.omnivaPackage = omnivaPackage;
						data.items = cart?.product_summary || [];
						data.delivery_address = omnivaPackage.label || [];
						data.delivery_postal_code = omnivaPackage.value || [];
						data.delivery_country = selectedCountry || [];

						console.log(data);

						remoteRequest({
							url: 'order/actions',
							method: 'POST',
							data: {
								action: 'create',
								...data,
							},
							onSuccess: (response) => {
								const id = response?.order?.id;

								if (id) {
									setOrderId(id);
									setStep(2);
									return;
								}
								alert('Order was not created');
							},
							onError: () => {
								alert('Order create failed');
							},
						});
					}}>
					
					<div className={styles.checkoutInformationPersonType}>
						<RadioGroup
							classNames={{
								inner: styles.radioGroupRow,
								'option-wrapper': styles.radioOptionRow,
								label: styles.radioLabel,
							}}
							options={[
								{ value: 'private', label: 'Private individual' },
								{ value: 'company', label: 'Company' },
							]}
							name="person_type"
						/>
					</div>
					<div className={styles.checkoutInformationInputFields}>
						<div className={styles.InputField}>
							<Input name="name" placeholder="Name" required />
							<Input name="surname" placeholder="Surname" required />
						</div>
						<div className={styles.InputField}>
							<Input name="phoneNumber" placeholder="Phone Number" required />
							<Input name="emain" placeholder="E-mail" required />
						</div>
						<Input required name="adress" placeholder="Adress" />
						<Input
							name="adress_sec_field"
							placeholder="Apartment number ect."
						/>
						<div className={styles.labelContainer}>
							<Checkbox
								component={Checkbox}
								className={styles.InputField}
								name="isEqual"
							/>
							<label>This address matches the delivery address</label>
						</div>
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
							<Input name="city" required placeholder="City" />
							<Input name="postcode" required placeholder="Postal code" />
						</div>
					</div>
					<div className={styles.divider} />
					<div className={styles.checkoutInformationInputFields}>
						<TextArea
							name="comments"
							placeholder="Add a comment to your order"
						/>
					</div>
					<div className={styles.divider} />
					<h2>Delivery</h2>
					<div className={styles.deliveryBox}>
						<div className={styles.deliveryType}>
							<RadioGroup
								required
								classNames={{
									inner: styles.radioGroupRow,
									'option-wrapper': styles.radioOptionRow,
									label: styles.radioLabel,
								}}
								options={[
									// { value: 'сourier', label: 'Courier' },
									{ value: 'parcelMachine', label: 'Parcel machine' },
								]}
								onChange={({ value }) => setDeliveryType(value)}
								name="deliveryType"
							/>
						</div>

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

									console.log(omnivaPackage);
								}}
								options={filteredLocations.map((loc) => ({
									value: loc.ZIP,
									label: `${loc.NAME} (${loc.A0_NAME})`,
								}))}
								placeholder="Select package"
							/>
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
							<Checkbox
								required
								component={Checkbox}
								name="privacyPolicy"
								onChange={({ value }) => setPrivacyPolicy(value)}
							/>
							<label>I accept the terms of the Privacy Policy.</label>
						</div>
						<div className={styles.labelContainer}>
							<Checkbox required component={Checkbox} name="distanceContract" />
							<label>
								I agree to the distance contract at the time of purchase
							</label>
						</div>
					</div>
					<div className={styles.btn}>
						<button type="submit">
							Continue <FontAwesomeIcon icon={faArrowRight} />
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default InfoForm;
