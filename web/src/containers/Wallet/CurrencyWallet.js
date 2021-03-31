import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import {
	IconTitle,
	CurrencyBallWithPrice,
	ButtonLink,
	ActionNotification,
	MobileBarBack,
} from '../../components';
import { FLEX_CENTER_CLASSES, DEFAULT_COIN_DATA } from '../../config/constants';
import {
	generateWalletActionsText,
	getCurrencyFromName,
} from '../../utils/currency';
import STRINGS from '../../config/localizedStrings';
import withConfig from 'components/ConfigProvider/withConfig';
import Dialog from '../../components/Dialog';

class Wallet extends Component {
	state = {
		currency: '',
		isErrorDialog: false,
	};

	UNSAFE_componentWillMount() {
		this.setCurrency(this.props.routeParams.currency);
		console.log('props', this.props);
		if (
			this.props.location.query.status &&
			this.props.location.query.status.toLowerCase() !== 'successful'
		) {
			this.setState({ isErrorDialog: true });
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.routeParams.currency !== this.props.routeParams.currency) {
			this.setCurrency(nextProps.routeParams.currency);
		}
	}

	setCurrency = (currencyName) => {
		const currency = getCurrencyFromName(currencyName, this.props.coins);
		if (currency) {
			this.setState({ currency });
		} else {
			this.props.router.push('/wallet');
		}
	};

	cancelErrorModal = () => {
		this.setState({ isErrorDialog: false });
	};

	renderWalletHeaderBlock = (symbol, price, balance, coins) => {
		const { icons: ICONS } = this.props;
		const balanceValue = balance[`${symbol}_balance`] || 0;
		const { fullname } = coins[symbol] || DEFAULT_COIN_DATA;
		return (
			<div className="wallet-header_block">
				<div className="wallet-header_block-currency_title">
					{STRINGS.formatString(STRINGS['CURRENCY_BALANCE_TEXT'], fullname)}
					<ActionNotification
						stringId="TRADE_HISTORY"
						text={STRINGS['TRADE_HISTORY']}
						status="information"
						iconId="BLUE_CLIP"
						iconPath={ICONS['BLUE_CLIP']}
						onClick={() => {
							this.props.router.push('/transactions');
						}}
					/>
				</div>
				<CurrencyBallWithPrice
					symbol={symbol}
					amount={balanceValue}
					price={price}
				/>
			</div>
		);
	};

	onGoBack = () => {
		this.props.router.push('/wallet');
	};

	render() {
		const { balance, price, coins, icons: ICONS } = this.props;

		const { currency } = this.state;
		if (!currency) {
			return <div />;
		}

		const { depositText, withdrawText } = generateWalletActionsText(
			currency,
			coins
		);

		const { type } = coins[currency];
		const is_fiat = type === 'fiat';

		return (
			<div>
				{isMobile && (
					<MobileBarBack onBackClick={this.onGoBack}></MobileBarBack>
				)}
				<div className="presentation_container apply_rtl">
					<IconTitle
						stringId="WALLET_TITLE"
						text={STRINGS['WALLET_TITLE']}
						iconId="BITCOIN_WALLET"
						iconPath={ICONS['BITCOIN_WALLET']}
						textType="title"
					/>
					<div className="wallet-container">
						{this.renderWalletHeaderBlock(currency, price, balance, coins)}
						<div
							className={classnames(
								...FLEX_CENTER_CLASSES,
								'wallet-buttons_action'
							)}
						>
							{coins[currency].allow_deposit ? (
								<ButtonLink
									label={depositText}
									link={
										(is_fiat ? '/fiat/' : '/wallet/') + `${currency}/deposit`
									}
								/>
							) : null}
							<div className="separator" />
							{coins[currency].allow_withdrawal ? (
								<ButtonLink
									label={withdrawText}
									link={
										(is_fiat ? '/fiat/' : '/wallet/') + `${currency}/withdraw`
									}
								/>
							) : null}
						</div>
					</div>
				</div>
				<Dialog
					isOpen={this.state.isErrorDialog}
					label="error-alert-modal"
					className={classnames('app-dialog', {
						'app-dialog-flex': true,
					})}
					onCloseDialog={this.cancelErrorModal}
				>
					<h3 className="text-danger pt-4 pr-4">
						Transaction {this.props.location.query.status}
					</h3>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = (store) => ({
	coins: store.app.coins,
	price: store.orderbook.price,
	balance: store.user.balance,
	activeLanguage: store.app.language,
});

export default connect(mapStateToProps)(withConfig(Wallet));
