import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	reduxForm,
	formValueSelector, // formValueSelector is a "selector" API to make it easier to connect() to form values. It creates a selector function that accepts field names and returns corresponding values from the named form.
	reset,
	SubmissionError,
	stopSubmit,
	change,
} from 'redux-form';
import math from 'mathjs';
import classnames from 'classnames';
import { isMobile } from 'react-device-detect';
import { Dialog, OtpForm, Loader } from '../../components';
import renderFields from '../../components/Form/factoryFields';

import STRINGS from '../../config/localizedStrings';
import ConfirmBankContent from './ConfirmBankContent';
import {
	processFreshFiatWithdraw,
	processDraftFiatWithdraw,
	processReadyFiatWithdraw,
} from '../../actions/fiatWithdrawAction';
import { calculate_total_amount } from '../../components/Form/validations';
import ButtonSection from '../../components/Button/ButtonSection';
import { ACTIONS } from '../../actions/fiatWithdrawAction';

export const FORM_NAME = 'WithdrawForm';

let errorTimeOut = null;

class Form extends Component {
	// Define and Initialize component's state
	state = {
		dialogIsOpen: false,
		dialogOtpOpen: false,
		otp_code: '',
	};
	UNSAFE_componentWillMount() {
		this.props.processFreshFiatWithdraw();
	}
	// First Init Function with props
	UNSAFE_componentWillReceiveProps(nextProps) {
		// If next props is different from current one, reset withdraw form
		if (nextProps.currency !== this.props.currency) {
			// Reset cyy type
			nextProps.dispatch(reset(FORM_NAME)); // reset withdraw from
			this.props.processFreshFiatWithdraw();
		}

		if (nextProps.fiatWithdraw.status === ACTIONS.FRESH_FIAT_WITHDAW_PROCESS) {
			this.onCloseDialog();
		} else {
			this.onOpenDialog();
		}
	}

	componentWillUnmount() {
		// clear timeer
		if (errorTimeOut) {
			clearTimeout(errorTimeOut);
		}
	}

	onOpenDialog = (ev) => {
		if (ev && ev.preventDefault) {
			ev.preventDefault();
		}
		this.setState({ dialogIsOpen: true });
	};
	onCloseDialog = (ev) => {
		if (ev && ev.preventDefault) {
			ev.preventDefault();
		}
		this.setState({ dialogIsOpen: false, dialogOtpOpen: false });
	};

	onClickContinue = (values) => {
		this.props.processDraftFiatWithdraw(values);
	};

	onClickCancel = () => {
		this.props.router.push('/wallet');
	};

	onReset = () => {
		this.props.processFreshFiatWithdraw();
	};

	onAcceptDialog = () => {
		if (this.props.otp_enabled) {
			this.setState({ dialogOtpOpen: true });
		} else {
			this.onCloseDialog();
			const values = this.props.data;
			return this.props
				.onSubmitWithdrawReq({
					...values,
					amount: math.eval(values.amount),
					fee: values.fee ? math.eval(values.fee) : 0,
				})
				.then((response) => {
					this.props.onSubmitSuccess(
						{ ...response.data, currency: this.props.currency },
						this.props.dispatch
					);
					return response;
				})
				.catch((err) => {
					const error = { _error: err.message, ...err.errors };
					errorTimeOut = setTimeout(() => {
						this.props.dispatch(change(FORM_NAME, 'captcha', ''));
					}, 5000);
					this.props.onSubmitFail(err.errors || err, this.props.dispatch);
					this.onCloseDialog();
					this.props.dispatch(stopSubmit(FORM_NAME, error));
				});
		}
	};

	onConfirmWithdrawWithBank = (data) => {
		this.props.processReadyFiatWithdraw(data);
	};

	onConfirmEmail = () => {
		this.onCloseDialog();
		this.props.router.push('/wallet');
	};

	onSubmitOtp({ otp_code = '' }) {
		const values = this.props.data;
		return this.props
			.onSubmitWithdrawReq({
				...values,
				amount: math.eval(values.amount),
				fee: values.fee ? math.eval(values.fee) : 0,
				otp_code,
			})
			.then((response) => {
				this.onCloseDialog();
				this.props.onSubmitSuccess(
					{ ...response.data, currency: this.props.currency },
					this.props.dispatch
				);
				return response;
			})
			.catch((err) => {
				if (err instanceof SubmissionError) {
					if (err.errors && !err.errors.otp_code) {
						const error = { _error: err.message, ...err.errors };
						errorTimeOut = setTimeout(() => {
							this.props.dispatch(change(FORM_NAME, 'captcha', ''));
						}, 5000);
						this.props.onSubmitFail(err.errors, this.props.dispatch);
						this.onCloseDialog();
						this.props.dispatch(stopSubmit(FORM_NAME, error));
					}
					throw err;
				} else {
					const error = { _error: err.message };
					errorTimeOut = setTimeout(() => {
						this.props.dispatch(change(FORM_NAME, 'captcha', ''));
					}, 5000);
					this.props.onSubmitFail(error, this.props.dispatch);
					this.onCloseDialog();
					this.props.dispatch(stopSubmit(FORM_NAME, error));
					throw new SubmissionError(error);
				}
			});
	}

	loadModalContent() {
		const { coins, currency } = this.props;

		return (
			<ConfirmBankContent
				history={this.props.router}
				coin={coins[currency]}
				currency={currency}
				onClickAccept={this.onConfirmWithdrawWithBank}
				onClickCancel={this.onReset}
			/>
		);
	}

	render() {
		const {
			submitting, // Whether or not your form is currently submitting.
			error, //A generic error for the entire form given by the _error key in the result from the synchronous validation function, the asynchronous validation, or the rejected promise from onSubmit.
			valid, // true if the form passes validation (has no validation errors). Opposite of invalid.
			data, // form data
			openContactForm, //
			formValues, // A decorator to read a selection of the current form values. This is useful for subforms that change depending on the current values in the form.
			activeTheme,
			handleSubmit,
		} = this.props;

		const { dialogIsOpen, dialogOtpOpen } = this.state;
		return (
			<div>
				<form onSubmit={handleSubmit(this.onClickContinue)} autoComplete="off">
					<div className={classnames({ 'w-50': !isMobile })}>
						{renderFields(formValues)}
						<div style={{ fontSize: '0.9rem' }}>
							Total Amount:{' '}
							{data.amount ? calculate_total_amount(data.amount, data.fee) : 0}
						</div>
						<br />
						{error && <div className="warning_text">{error}</div>}
					</div>
					<ButtonSection
						ok_label={STRINGS['CONTINUE']}
						disabled={submitting || !valid}
						onClickCancel={this.onClickCancel}
						type="submit"
					/>
				</form>
				<Dialog
					isOpen={dialogIsOpen}
					label="withdraw-modal"
					onCloseDialog={this.onCloseDialog}
					shouldCloseOnOverlayClick={dialogOtpOpen}
					theme={activeTheme}
					showCloseText={false}
				>
					{dialogOtpOpen ? (
						<OtpForm
							onSubmit={this.onSubmitOtp}
							onClickHelp={openContactForm}
						/>
					) : !submitting ? (
						this.loadModalContent()
					) : (
						<Loader relative={true} background={false} />
					)}
				</Dialog>
			</div>
		);
	}
}

const WithdrawForm = reduxForm({
	form: FORM_NAME,
	enableReinitialize: true,
})(Form);

const selector = formValueSelector(FORM_NAME);

const mapStateToForm = (state) => ({
	data: selector(
		state,
		'address',
		'destination_tag',
		'amount',
		'fee',
		'captcha'
	), //  Select multiple fields as a group into a grouped prop
	activeTheme: state.app.theme,
	fiatWithdraw: state.fiatWithdraw,
	coins: state.app.coins,
	balance: state.user.balance,
});

const mapDispatchToProps = (dispatch) => ({
	processDraftFiatWithdraw: bindActionCreators(
		processDraftFiatWithdraw,
		dispatch
	),
	processFreshFiatWithdraw: bindActionCreators(
		processFreshFiatWithdraw,
		dispatch
	),
	processReadyFiatWithdraw: bindActionCreators(
		processReadyFiatWithdraw,
		dispatch
	),
});

const WithdrawFormWithValues = connect(
	mapStateToForm,
	mapDispatchToProps
)(WithdrawForm);

export default WithdrawFormWithValues;
