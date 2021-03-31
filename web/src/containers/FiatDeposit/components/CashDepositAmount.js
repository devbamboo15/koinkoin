import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { required } from '../../../components/Form/validations';
import renderFields from '../../../components/Form/factoryFields';
import { Button } from '../../../components';
import {
	flutterwaveCredit,
	payStackCredit,
} from '../../../actions/verificationActions';
import { isMobile } from 'react-device-detect';
import { PaystackButton } from 'react-paystack';
import PaymentVerification from './PaymentVerification';
import { browserHistory } from 'react-router';
import { FlutterWaveButton } from 'flutterwave-react-v3';

const FORM_NAME = 'CashDepositAmount';
const publicKey = 'pk_live_18cf67104d65faa915ef4d9ec976bd4f88a7ffcd';

class CashDepositAmount extends Component {
	state = {
		formFields: {},
		amountData: null,
		ipay_Total: false,
	};

	fwConfig = {
		...this.config,
		text: 'Pay with Flutterwave!',
		callback: (response) => {
			console.log(response);
		},
		onClose: () => {},
	};

	componentDidMount() {
		this.generateFormFields();
	}

	onChange = (e) => {
		this.setState({
			amountData: e.target.value,
		});
	};
	generateFormFields = () => {
		const formFields = {};

		formFields.cashAmount = {
			type: 'number',
			label: 'amount',
			placeholder: 'amount',
			validate: [required],
			fullWidth: isMobile,
			onChange: this.onChange,
		};
		this.setState({ formFields });
	};

	onGoBack = () => {
		this.props.setActivePageContent('email');
		this.props.handleBack('bank');
	};
	IpayTotalSet = () => {
		this.setState({
			ipay_Total: true,
		});
	};

	checkflutterWaveCurrency = (currency) => {
		const currencies = [
			'GBP',
			'EUR',
			'NGN',
			'USD',
			'RWF',
			'GHS',
			'KES',
			'TZS',
			'UGX',
			'ZAR',
			'ETB',
		];
		if (currencies.indexOf(currency.toUpperCase()) > -1) {
			return true;
		}
		return false;
	};

	render() {
		const { email } = this.props;
		const { amountData, ipay_Total, formFields } = this.state;
		let amount = amountData * 100;
		const componentProps = {
			email,
			amount,
			metadata: {},
			publicKey,
			text: 'Pay Using Paystack',
			onSuccess: (data) => {
				let obj = {
					transaction_ref: data.trxref,
					currency: this.props.currency,
					type: 'deposit',
					address: 'address',
				};

				return payStackCredit(obj)
					.then(({ data }) => {
						console.log(data, 'payStack');
						browserHistory.push(`/wallet`);
					})
					.catch((err) => {
						console.log(err, 'err');
						alert(err.message);
						const error = { _error: err.message };
						if (err.response && err.response.data) {
							error._error = err.response.data.message;
							alert(err.response.data.message);
							console.log(err.response.data.message);
						}
						// throw new SubmissionError(error);
					});
			},
			onClose: () => {
				browserHistory.push(`/wallet`);
			},
		};
		const { currency } = this.props;

		const config = {
			public_key: 'FLWPUBK-5c59a9752a29c1ac49a1718ec68d22d7-X',
			tx_ref: Date.now(),
			amount: parseFloat(amount) / 100,
			currency: currency.toUpperCase(),
			payment_options: 'card,mobilemoney,ussd',
			customer: {
				email: email,
				//   phonenumber: '07064586146',
				//   name: 'joel ugwumadu',
			},
			customizations: {
				title: 'KOINKOIN',
				//   description: 'Payment for items in cart',
				//   logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
			},
			text: 'Pay with Flutterwave!',
			callback: (data) => {
				console.log(data);
				let obj = {
					transaction_ref: data.transaction_id,
					currency: this.props.currency,
					type: 'deposit',
					address: 'address',
				};
				return flutterwaveCredit(obj)
					.then(({ data }) => {
						browserHistory.push(`/wallet`);
					})
					.catch((err) => {
						console.log(err, 'err');
						alert(err.message);
						const error = { _error: err.message };
						if (err.response && err.response.data) {
							error._error = err.response.data.message;
							alert(err.response.data.message);
							console.log(err.response.data.message);
						}
						// throw new SubmissionError(error);
					});
			},
			onClose: () => {
				browserHistory.push(`/wallet`);
			},
		};

		return (
			<>
				<div className="amount-text-field">{renderFields(formFields)}</div>
				{amountData ? (
					<>
						<div className="payment-button">
							{currency === 'ngn' && (
								<PaystackButton
									className="paystack-button exir-button mdc-button mdc-button--unelevated exir-button-font button-payment"
									{...componentProps}
								/>
							)}
							{this.checkflutterWaveCurrency(currency) && (
								<FlutterWaveButton
									className="paystack-button exir-button mdc-button mdc-button--unelevated exir-button-font button-payment"
									{...config}
								/>
							)}
							{currency !== 'ngn' && (
								<Button
									label={'Pay Using Ipaytotal'}
									onClick={this.IpayTotalSet}
									className={'button-payment'}
								/>
							)}
						</div>
					</>
				) : null}

				{ipay_Total ? (
					<div>
						<PaymentVerification
							amount={amountData}
							currency={currency}
							location={this.props.location}
							userId={this.props.userId}
						/>
					</div>
				) : null}
			</>
		);
	}
}

const CashDepositAmountForm = reduxForm({
	form: FORM_NAME,
})(CashDepositAmount);

const mapStateToProps = (state) => {
	const values = {};
	return values;
};

export default connect(mapStateToProps)(CashDepositAmountForm);
