import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	processRequestingFiatWithdraw,
	processPendingFiatWithdraw,
	processRequestingFailedFiatWithdraw,
	requestFiatWithdraw,
} from '../../actions/fiatWithdrawAction';
import math from 'mathjs';
import { formatToCurrency } from '../../utils/currency';
import {
	BASE_CURRENCY,
	CURRENCY_PRICE_FORMAT,
	DEFAULT_COIN_DATA,
} from '../../config/constants';
import STRINGS from '../../config/localizedStrings';
import { IconTitle } from '../../components';
import SummaryBlock from '../Summary/components/SummaryBlock';
import classnames from 'classnames';
import { calculate_total_amount } from '../../components/Form/validations';
import { getCountryByCode } from '../../utils/countries';
import ButtonSection from '../../components/Button/ButtonSection';

class FiatWithdrawOverview extends Component {
	onPerformWithdraw = () => {
		var data = this.props.data;
		data['currency'] = this.props.routeParams.currency;
		this.props.processRequestingFiatWithdraw();
		requestFiatWithdraw(this.props.data)
			.then((res) => {
				this.props.processPendingFiatWithdraw();
				if (res.status == 'success') {
					this.props.router.push(
						`/fiat/${data['currency']}/withdraw/submitted`
					);
				} else {
					alert(res.message || 'Failed to withdraw');
				}
			})
			.catch((err) => {
				alert(err.message || 'Error Occured when requesting withdraw');
				this.props.processRequestingFailedFiatWithdraw();
				this.props.router.push(`/fiat/${data['currency']}/withdraw`);
			});
	};

	onClickCancel = () => {
		this.props.router.push(`/fiat/${this.props.routeParams.currency}/withdraw`);
	};

	render() {
		const coins = this.props.coins;
		const data = this.props.data;
		const currency = this.props.routeParams.currency;
		const { min, fullname, symbol } =
			coins[currency || BASE_CURRENCY] || DEFAULT_COIN_DATA;
		const cyyCode = symbol.toUpperCase();
		const amount = math.number(math.fraction(data.amount));
		const feeAmount = math.number(math.fraction(data.fee || 0));
		const feeAmountText = STRINGS.formatString(
			CURRENCY_PRICE_FORMAT,
			formatToCurrency(feeAmount),
			cyyCode
		);
		const totalAmount = calculate_total_amount(data.amount, data.fee);
		const amountText = STRINGS.formatString(
			CURRENCY_PRICE_FORMAT,
			formatToCurrency(amount, min),
			cyyCode
		);
		const totalAmountText = STRINGS.formatString(
			CURRENCY_PRICE_FORMAT,
			formatToCurrency(totalAmount, min),
			cyyCode
		);

		const getBankNameByCode = (code) => {
			const bank = this.props.banks[this.props.data.bank_country].find(
				(it) => it.code == code
			);
			if (bank) return bank.name;
			else return '';
		};

		const getCountryNameByCode = (code) => {
			const ctry = getCountryByCode(code);
			if (ctry) return ctry.label;
			else return '';
		};

		const bank_name = getBankNameByCode(this.props.data.bank_code);
		const coutry_name = getCountryNameByCode(this.props.data.bank_country);
		return (
			<div className="summary-container">
				<IconTitle
					text={`${STRINGS['WITHDRAW_PAGE.WITHDRAW_OVERVIEW']}`}
					textType="title"
				/>
				<div>
					<div className="d-flex align-items-center">
						<div
							className={classnames('assets-wrapper', 'asset_wrapper_width')}
						>
							<SummaryBlock title="Transaction Information">
								<div>
									<div>Curreny: {fullname}</div>
									<div>Amount: {amountText}</div>
									<div>Fee: {feeAmountText}%</div>
									<div>Total Amount: {totalAmountText}</div>
								</div>
							</SummaryBlock>
						</div>
					</div>
					<div className="d-flex align-items-center">
						<div
							className={classnames('assets-wrapper', 'asset_wrapper_width')}
						>
							<SummaryBlock title="Bank Information">
								<div>
									<div>Country: {coutry_name}</div>
									<div>Bank name: {bank_name}</div>
									<div>Bank number: {this.props.data.account_number}</div>
								</div>
							</SummaryBlock>
						</div>
					</div>
					<ButtonSection
						onClickAccept={this.onPerformWithdraw}
						onClickCancel={this.onClickCancel}
						ok_label={STRINGS['CONFIRM_TEXT']}
						cancel_label={STRINGS['CANCEL']}
						ok_disabled={this.props.fetching}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (store) => ({
	fetching: store.fiatWithdraw.fetching,
	data: store.fiatWithdraw.data,
	coins: store.app.coins,
	banks: store.fiatWithdraw.banks,
});

const mapDispatchToProps = (dispatch) => ({
	processRequestingFiatWithdraw: bindActionCreators(
		processRequestingFiatWithdraw,
		dispatch
	),
	processRequestingFailedFiatWithdraw: bindActionCreators(
		processRequestingFailedFiatWithdraw,
		dispatch
	),
	processPendingFiatWithdraw: bindActionCreators(
		processPendingFiatWithdraw,
		dispatch
	),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FiatWithdrawOverview);
