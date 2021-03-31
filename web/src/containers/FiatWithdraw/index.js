import React, { Component } from 'react';
import classnames from 'classnames';
import math from 'mathjs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector, change } from 'redux-form';
import { isMobile } from 'react-device-detect';

import { Loader, MobileBarBack } from '../../components';
import {
	ICONS,
	MIN_VERIFICATION_LEVEL_TO_WITHDRAW,
	MAX_VERIFICATION_LEVEL_TO_WITHDRAW,
	DEFAULT_COIN_DATA,
} from '../../config/constants';
import { getCurrencyFromName, roundNumber } from '../../utils/currency';
import { getDecimals } from '../../utils/utils';
import { performWithdraw } from '../../actions/walletActions';
import { errorHandler } from '../../components/OtpForm/utils';

import { openContactForm } from '../../actions/appActions';

import WithdrawForm from './form';
import { generateFormValues, generateInitialValues } from './formUtils';
import { generateBaseInformation } from './utils';

import { renderInformation, renderTitleSection } from '../Wallet/components';

import { FORM_NAME } from './form';

class Withdraw extends Component {
	state = {
		currency: null,
		balanceAvailable: null,
		formValues: {}, // Form Fields
		initialValues: {}, // initial Form Values
		checked: false, // flag to represent if recieved correct inital parameters.
	};

	UNSAFE_componentWillMount() {
		this.setCurrency(this.props.routeParams.currency);
	}
	// for re-computing some data only when a prop changes
	UNSAFE_componentWillReceiveProps(nextProps) {
		const nextCurrency = nextProps.routeParams.currency;
		const balanceAvailable = nextProps.balance[`${nextCurrency}_available`];
		console.log('next props', nextProps);
		if (!this.state.checked) {
			if (nextProps.verification_level)
				this.validateRoute(
					nextCurrency,
					nextProps.bank_account,
					nextProps.coins
				);
		} else if (
			nextProps.verification_level >= MIN_VERIFICATION_LEVEL_TO_WITHDRAW &&
			nextProps.verification_level <= MAX_VERIFICATION_LEVEL_TO_WITHDRAW &&
			(nextProps.activeLanguage !== this.props.activeLanguage ||
				nextCurrency !== this.state.currency ||
				balanceAvailable !== this.state.balanceAvailable)
		) {
			// update state
			const currency = getCurrencyFromName(nextCurrency, nextProps.coins);
			this.setCurrency(currency);
		}
	}

	validateRoute = (currency, bank_account, coins) => {
		// const {
		// 	meta: { is_fiat },
		// } = coins[currency] || false;
		const is_fiat = coins[currency]['type'] === 'fiat';

		if (is_fiat && this.props.balance) {
			const balanceAvailable = this.props.balance[`${currency}_available`];
			if (balanceAvailable) {
				const coin = coins[currency];
				if (coin && coin.active) {
					this.setState({ balanceAvailable: balanceAvailable }, () => {
						// calculate form values
						this.initFormValues(
							currency,
							this.props.coins,
							this.props.verification_level
						);
					});
					return true;
				}
			}
		}
		this.props.router.push('/wallet');
	};

	setCurrency = (currencyName) => {
		const currency = getCurrencyFromName(currencyName, this.props.coins);
		if (currency) {
			this.setState({ currency, checked: false }, () => {
				// callback
				this.validateRoute(
					currencyName,
					this.props.bank_account,
					this.props.coins
				);
			});
		} else {
			this.props.router.push('/wallet');
		}
	};

	initFormValues = (currency, coins, verification_level) => {
		const formValues = generateFormValues(
			currency,
			this.state.balanceAvailable,
			this.onCalculateMax,
			coins,
			verification_level,
			this.props.activeTheme
		);
		const initialValues = generateInitialValues(currency, coins);

		this.setState({ checked: true, formValues, initialValues });
	};

	onSubmitWithdraw = (currency) => (values) => {
		const { destination_tag, ...rest } = values;
		let address = rest.address;
		if (destination_tag) address = `${rest.address}:${destination_tag}`;
		return performWithdraw(currency, {
			...rest,
			address,
			amount: math.eval(values.amount),
			fee: values.fee ? math.eval(values.fee) : 0,
			currency,
		})
			.then((response) => {
				return { ...response.data, currency: this.state.currency };
			})
			.catch(errorHandler);
	};

	onCalculateMax = () => {
		const {
			balance,
			selectedFee = 0,
			dispatch,
			verification_level,
			coins,
		} = this.props;
		const { currency } = this.state;
		const balanceAvailable = balance[`${currency}_available`];
		const { increment_unit, withdrawal_limits = {} } =
			coins[currency] || DEFAULT_COIN_DATA;

		let amount = math.number(
			math.subtract(math.fraction(balanceAvailable), math.fraction(selectedFee))
		);
		if (amount < 0) {
			amount = 0;
		} else if (
			math.larger(amount, math.number(withdrawal_limits[verification_level])) &&
			withdrawal_limits[verification_level] !== 0 &&
			withdrawal_limits[verification_level] !== -1
		) {
			amount = math.number(
				math.subtract(
					math.fraction(withdrawal_limits[verification_level]),
					math.fraction(selectedFee)
				)
			);
		}
		dispatch(
			change(
				FORM_NAME,
				'amount',
				roundNumber(amount, getDecimals(increment_unit))
			)
		);
	};

	onGoBack = () => {
		this.props.router.push('/wallet');
	};

	render() {
		const {
			balance, // the list of values for all currencies
			verification_level, // ?
			prices, // ?
			otp_enabled, // one time PIN
			openContactForm, //
			activeLanguage,
			router,
			coins, // info for all currencies
		} = this.props;
		const { links = {} } = this.props.constants;
		const { formValues, initialValues, currency, checked } = this.state;

		if (!currency || !checked) {
			return <div />;
		}

		const balanceAvailable = balance[`${currency}_available`];

		if (
			verification_level >= MIN_VERIFICATION_LEVEL_TO_WITHDRAW &&
			verification_level <= MAX_VERIFICATION_LEVEL_TO_WITHDRAW &&
			balanceAvailable === undefined
		) {
			return <Loader />;
		}

		const formProps = {
			currency,
			onSubmitWithdrawReq: this.onSubmitWithdraw(currency),
			onOpenDialog: this.onOpenDialog,
			otp_enabled,
			openContactForm: () => openContactForm({ helpdesk: links.helpdesk }),
			formValues,
			initialValues,
			activeLanguage,
			balanceAvailable,
			currentPrice: prices[currency],
			router,
		};

		return (
			<div>
				{isMobile && (
					<MobileBarBack onBackClick={this.onGoBack}></MobileBarBack>
				)}
				<div className="presentation_container apply_rtl">
					{!isMobile &&
						renderTitleSection(currency, 'withdraw', ICONS.WITHDRAW, coins)}
					{renderInformation(
						currency,
						balance,
						openContactForm,
						generateBaseInformation,
						coins,
						'withdraw',
						links
					)}

					<div className={classnames('inner_container', 'with_border_top')}>
						<WithdrawForm {...formProps} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (store) => ({
	prices: store.orderbook.prices,
	balance: store.user.balance,
	verification_level: store.user.verification_level,
	otp_enabled: store.user.otp_enabled,
	bank_account: store.user.userData.bank_account,
	activeLanguage: store.app.language,
	selectedFee: formValueSelector(FORM_NAME)(store, 'fee'),
	coins: store.app.coins,
	activeTheme: store.app.theme,
	constants: store.app.constants,
});

const mapDispatchToProps = (dispatch) => ({
	openContactForm: bindActionCreators(openContactForm, dispatch),
	dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Withdraw);
