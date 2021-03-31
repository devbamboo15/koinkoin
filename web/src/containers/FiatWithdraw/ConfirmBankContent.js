import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { IconTitle, Loader } from '../../components';
import STRINGS from '../../config/localizedStrings';
import { ICONS, FIAT_WITHDRAW_COUNTRIES } from '../../config/constants';
import { generateBankInfoFormFields } from './formUtils';
import BankInfoForm from './BankInfoForm';
import { calculate_total_amount } from '../../components/Form/validations';
import {
	requestWithdrawBanks,
	set_fw_withdraw_banks,
	set_bank_country,
	processRequestingFiatWithdraw,
	processRequestingFailedFiatWithdraw,
	processPendingFiatWithdraw,
	requestFiatWithdraw,
} from '../../actions/fiatWithdrawAction';
import { connect } from 'react-redux';
import { getCountryByCurrency, getCountryByCode } from '../../utils/countries';
import { ACTIONS } from '../../actions/fiatWithdrawAction';
import ButtonSection from '../../components/Button/ButtonSection';
import CommonButton from '../../components/CommonButton';
// import { refresh_flutterwave_withdrawal_status } from '../../actions/walletActions';

class ConfirmBankContent extends Component {
	state = {
		isBankLoaded: false,
	};
	UNSAFE_componentWillMount() {
		this.contentUpdate(this.props);
	}
	// First Init Function with props
	UNSAFE_componentWillReceiveProps(nextProps) {
		this.contentUpdate(nextProps);
	}
	contentUpdate(nextProps) {
		if (nextProps.fiatWithdraw.status === ACTIONS.FRESH_FIAT_WITHDAW_PROCESS) {
			return;
		}

		const {
			currency,
			fiatWithdraw,
			setWithdrawBanks,
			setBankCountry,
		} = nextProps;
		let countryCode = null;
		if (!fiatWithdraw.country) {
			const country = getCountryByCurrency(currency);
			countryCode = country ? country.value : null;
			setBankCountry(countryCode);
		} else {
			countryCode = fiatWithdraw.country;
		}

		if (!countryCode) {
			this.goMainpage();
		}

		if (
			fiatWithdraw.banks[countryCode] &&
			fiatWithdraw.banks[countryCode].length > 0
		) {
			this.setState({ isBankLoaded: true });
		} else {
			requestWithdrawBanks(countryCode)
				.then((res) => {
					const result = fiatWithdraw.banks;
					result[countryCode] = res.data;
					setWithdrawBanks(result);
					this.setState({ isBankLoaded: true });
				})
				.catch((err) => {
					console.log('ConfirmBankContent->failed: ', err.data);
				});
		}
	}

	getFormFields = () => {
		const bankCodeList = this.props.fiatWithdraw.banks[
			this.props.fiatWithdraw.country
		].map((it) => {
			return { label: it.name, value: it.code };
		});

		return generateBankInfoFormFields(
			FIAT_WITHDRAW_COUNTRIES,
			bankCodeList,
			(val) => {
				this.props.setBankCountry(val);
			}
		);
	};
	getInitialValues = () => {
		return {
			bank_country: this.props.fiatWithdraw.country,
			bank_code: this.props.fiatWithdraw.banks[
				this.props.fiatWithdraw.country
			][0].code,
		};
	};

	onPerformWithdraw = () => {
		var data = this.props.fiatWithdraw.data;
		data['currency'] = this.props.currency;
		this.props._processRequestingFiatWithdraw();
		requestFiatWithdraw(data)
			.then((res) => {
				console.log(res.status, 'Flutterwave Status');
				if (res.status) {
					this.props._processPendingFiatWithdraw(res);
					//refresh_flutterwave_withdrawal_status();
				} else {
					this.props._processRequestingFailedFiatWithdraw(res);
				}
			})
			.catch((err) => {
				this.props._processRequestingFailedFiatWithdraw(err);
			});
	};

	getCountryNameByCode = (code) => {
		const ctry = getCountryByCode(code);
		if (ctry) return ctry.label;
		else return '';
	};

	getBankNameByCode = (code) => {
		const bank = this.props.fiatWithdraw.banks[
			this.props.fiatWithdraw.data.bank_country
		].find((it) => it.code === code);
		if (bank) return bank.name;
		else return '';
	};
	goMainpage = () => {
		if (
			this.props.fiatWithdraw.status === ACTIONS.PENDING_FIAT_WITHDRAW_PROCESS
		) {
			this.props.history.push('/transactions');
		} else this.props.history.push(`/fiat/${this.props.currency}/withdraw`);
	};

	render() {
		const { fiatWithdraw, coin, onClickAccept, onClickCancel } = this.props;

		switch (fiatWithdraw.status) {
			case ACTIONS.DRAFT_FIAT_WITHDRAW_PROCESS:
				return (
					<div className="d-flex flex-column review_email-wrapper">
						<IconTitle
							text={STRINGS['WITHDRAWAL_INFO']}
							iconPath={ICONS['ACCOUNT_SUMMARY']}
							useSvg={true}
							textType="title"
						/>
						{this.state.isBankLoaded &&
						fiatWithdraw.country &&
						fiatWithdraw.banks[fiatWithdraw.country] &&
						fiatWithdraw.banks[fiatWithdraw.country].length > 0 ? (
							<BankInfoForm
								initialValues={this.getInitialValues()}
								formFields={this.getFormFields()}
								onOk={onClickAccept}
								onCancel={onClickCancel}
							/>
						) : (
							<Loader relative={true} background={false} />
						)}
					</div>
				);
			case ACTIONS.REQUEST_FIAT_WITHDRAW_PROCESS:
			case ACTIONS.READY_FIAT_WITHDRAW_PROCESS:
				return (
					<div className="d-flex flex-column review_email-wrapper">
						<IconTitle
							text={STRINGS['WITHDRAW_PAGE.WITHDRAW_OVERVIEW']}
							iconPath={ICONS['ACCOUNT_SUMMARY']}
							useSvg={true}
							textType="title"
						/>
						{fiatWithdraw.fetching ? (
							<Loader relative={true} background={false} />
						) : (
							<div>
								<div className="review_email-content">
									<dl>
										<dt>Country</dt>
										<dl>
											{this.getCountryNameByCode(
												fiatWithdraw.data.bank_country
											)}
										</dl>
										<dt>Bank name</dt>
										<dl>
											{this.getBankNameByCode(fiatWithdraw.data.bank_code)}
										</dl>
										<dt>Bank number</dt>
										<dl>{fiatWithdraw.data.account_number}</dl>
									</dl>
									<dl>
										<dt>Curreny</dt>
										<dd>{coin.fullname}</dd>
										<dt>Amount</dt>
										<dd>{fiatWithdraw.data.amount}</dd>
										<dt>Fee(%)</dt>
										<dd>{fiatWithdraw.data.fee}</dd>
										<dt>Total Amount</dt>
										<dd>
											{calculate_total_amount(
												fiatWithdraw.data.amount,
												fiatWithdraw.data.fee
											)}
										</dd>
									</dl>
								</div>
								<ButtonSection
									onClickAccept={this.onPerformWithdraw}
									onClickCancel={onClickCancel}
									ok_label={STRINGS['CONFIRM_TEXT']}
									cancel_label={STRINGS['CANCEL']}
									ok_disabled={fiatWithdraw.fetching}
								/>
							</div>
						)}
					</div>
				);

			case ACTIONS.PENDING_FIAT_WITHDRAW_PROCESS:
			case ACTIONS.REQUEST_FAILED_FIAT_WITHDRAW_PROCESS:
				const is_failed =
					fiatWithdraw.status === ACTIONS.REQUEST_FAILED_FIAT_WITHDRAW_PROCESS;
				return (
					<div className="d-flex flex-column review_email-wrapper">
						<IconTitle
							text={STRINGS['WITHDRAW_PAGE.WITHDRAW_ORDER_SUBMITTED']}
							iconPath={ICONS['ACCOUNT_SUMMARY']}
							useSvg={true}
							textType="title"
						/>
						<div className="review_email-content">
							<p className={is_failed ? 'red' : ''}>
								{fiatWithdraw.data.description}
							</p>
						</div>
						<CommonButton
							label={is_failed ? 'Try again' : 'Done'}
							onClick={this.goMainpage}
						/>
					</div>
				);
			default:
				return <div>Something went wrong</div>;
		}
	}
}

const mapStateToForm = (state) => ({
	fiatWithdraw: state.fiatWithdraw,
});

const mapDispatchToProps = (dispatch) => ({
	setWithdrawBanks: bindActionCreators(set_fw_withdraw_banks, dispatch),
	setBankCountry: bindActionCreators(set_bank_country, dispatch),
	_processRequestingFiatWithdraw: bindActionCreators(
		processRequestingFiatWithdraw,
		dispatch
	),
	_processRequestingFailedFiatWithdraw: bindActionCreators(
		processRequestingFailedFiatWithdraw,
		dispatch
	),
	_processPendingFiatWithdraw: bindActionCreators(
		processPendingFiatWithdraw,
		dispatch
	),
});

export default connect(mapStateToForm, mapDispatchToProps)(ConfirmBankContent);
