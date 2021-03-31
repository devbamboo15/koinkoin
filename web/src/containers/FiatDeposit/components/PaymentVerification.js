import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
	required,
	email as isEmail,
	requireOnlyString,
	maxLength,
	exactLength,
} from '../../../components/Form/validations';
import renderFields from '../../../components/Form/factoryFields';
import { Button } from '../../../components';
import { paymentData } from '../../../actions/verificationActions';
import { isMobile } from 'react-device-detect';
import STRINGS from '../../../config/localizedStrings';
import { PLUGIN_URL } from '../../../config/constants';

const FORM_NAME = 'PaymentVerification';

class PaymentVerification extends Component {
	state = {
		formFields: {},
		paymentStaticData: {
			response_url: `${window.location.origin}/wallet`,
			webhook_url: `${PLUGIN_URL}/plugins/deposit/credit/pg-ipaytotal`,
			sulte_apt_no: this.props.userId,
		},
	};

	componentDidMount() {
		this.generateFormFields();
	}

	generateFormFields = () => {
		const formFields = {};

		formFields.first_name = {
			type: 'text',
			label: 'FirstName',
			placeholder: 'First Name',
			validate: [required, requireOnlyString],
			fullWidth: isMobile,
		};
		formFields.last_name = {
			type: 'text',
			label: 'Last Name',
			placeholder: 'Last Name',
			validate: [required, requireOnlyString],
			fullWidth: isMobile,
		};
		formFields.address = {
			type: 'textarea',
			label: 'address',
			placeholder: 'address',
			rows: '2',
			validate: [required, maxLength(150)],
			// maxValue: 150,
			fullWidth: isMobile,
		};
		formFields.country = {
			type: 'text',
			label: 'Country',
			placeholder: 'Country',
			validate: [
				required,
				maxLength(
					2,
					STRINGS[
						'USER_VERIFICATION.PAYMENT_ACCOUNT_FORM.VALIDATIONS.COUNTRY_MAX_LENGTH'
					]
				),
			],
			// maxValue: 2,
			fullWidth: isMobile,
		};
		formFields.state = {
			type: 'text',
			label: 'state',
			placeholder: 'state',
			validate: [required, requireOnlyString],
			fullWidth: isMobile,
		};
		formFields.city = {
			type: 'text',
			label: 'city',
			placeholder: 'city',
			validate: [required, requireOnlyString],
			fullWidth: isMobile,
		};
		formFields.zip = {
			type: 'text',
			label: 'zip',
			placeholder: 'zip',
			validate: [required, maxLength(5)],
			// maxValue: 5,
			fullWidth: isMobile,
		};
		formFields.phone_no = {
			type: 'number',
			label: 'phone_no',
			placeholder: 'phone_no',
			validate: [
				required,
				exactLength(
					10,
					STRINGS[
						'USER_VERIFICATION.PAYMENT_ACCOUNT_FORM.VALIDATIONS.MOBILE_MAX_LENGTH'
					]
				),
			],
			// maxValue: 10,
			// minValue: 10,
			fullWidth: isMobile,
		};
		formFields.email = {
			type: 'email',
			label: 'Email',
			placeholder: 'Email',
			validate: [required, isEmail],
			fullWidth: isMobile,
		};

		this.setState({ formFields });
	};

	handleSubmit = (formData) => {
		const { paymentStaticData } = this.state;
		const { currency, amount } = this.props;

		let data = currency.toUpperCase();
		let country = formData.country.toUpperCase();
		let amountData = {
			currency: data,
			amount: amount,
			country: country,
		};

		return paymentData({ ...formData, ...paymentStaticData, ...amountData })
			.then(({ data }) => {
				if (data.status === 'success') {
					window.location.assign(data.payment_redirect_url);
				} else {
					alert(data.message);
				}
			})
			.catch((err) => {
				const error = { _error: err.message };
				if (
					err.response &&
					err.response.data &&
					err.response.data.iPayTotalResponse
				) {
					alert(err.response.data.iPayTotalResponse.message);
				} else if (err.response && err.response.data) {
					error._error = err.response.data.message;
					alert(err.response.data.message);
				} else {
					alert(err.message);
				}
			});
	};

	onGoBack = () => {
		this.props.setActivePageContent('email');
		this.props.handleBack('bank');
	};

	render() {
		const { handleSubmit, pristine, submitting, valid, error } = this.props;
		const { formFields } = this.state;
		return (
			<>
				{renderFields(formFields)}
				<div className="w-50">
					<Button
						label={'Submit'}
						type="button"
						onClick={handleSubmit(this.handleSubmit)}
						disabled={pristine || submitting || !valid || !!error}
					/>
				</div>
			</>
		);
	}
}

const PaymentVerificationForm = reduxForm({
	form: FORM_NAME,
})(PaymentVerification);

const mapStateToProps = (state) => {
	const values = {};
	return values;
};

export default connect(mapStateToProps)(PaymentVerificationForm);
