import { useState } from 'react';
import ProductCart from '../cart/components/productCart/productCart';
import styles from './checkOut.module.less';
import Form from 'ui/form';
import Input from 'ui/inputs/input';
import Checkbox from 'ui/inputs/checkbox';
import RadioGroup from 'ui/inputs/radio_group';
import Select from 'ui/inputs/select';
import TextArea from 'ui/inputs/textarea';
import Link from 'core/navigation/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Checkout = () => {
	const [cart, setCart] = useState(uiStore.get('cart', {}));
	return (
		<div className={styles.checkoutWrapper}>
			<div className={styles.checkoutInnerWrapper}>
				<div className={styles.checkoutContent}>
					<section className={styles.checkoutProducts}>
						<h2>Your Cart</h2>
						<div className={styles.checkoutProductsCart}>
							<ProductCart cart={cart} setCart={setCart} />
						</div>
					</section>

					<section className={styles.checkoutInformation}>
						<h2>Contact Information</h2>
						<div className={styles.checkoutInformationBox}>
							<Form>
								<div className={styles.checkoutInformationPersonType}>
									<RadioGroup
										classNames={{
											inner: styles.radioGroupRow,
											'option-wrapper': styles.radioOptionRow,
											label: styles.radioLabel,
										}}
										options={[
											{ value: 'private', label: 'Privātpersona' },
											{ value: 'company', label: 'Uzņēmums' },
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
										<Input
											name="phoneNumber"
											placeholder="Phone Number"
											required
										/>
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
											{ value: 'lv', label: 'Latvia' },
											{ value: 'lt', label: 'Lithuania' },
											{ value: 'ee', label: 'Estonia' },
										]}
										placeholder="Select country"
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
							</Form>
						</div>
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
										{ value: 'сourier', label: 'Courier' },
										{ value: 'parcelMachine', label: 'Parcel machine' },
									]}
									name="deliveryType"
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
								<Checkbox required component={Checkbox} name="privacyPolicy" />
								<label>I accept the terms of the Privacy Policy.</label>
							</div>
							<div className={styles.labelContainer}>
								<Checkbox
									required
									component={Checkbox}
									name="distanceContract"
								/>
								<label>
									I agree to the distance contract at the time of purchase
								</label>
							</div>
						</div>

						<div className={styles.btn}>
							<Link>
								Continue <FontAwesomeIcon icon={faArrowRight} />
							</Link>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
