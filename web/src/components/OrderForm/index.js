import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { DEFAULT_COIN_DATA } from '../../config/constants';

import { isLoggedIn } from '../../utils/token';
import AlertMessageBox from '../AlertMessageBox';

import {
	formatToCurrency,
	calculateBalancePrice,
	donutFormatPercentage,
	calculatePrice,
	calculatePricePercentage,
} from '../../utils/currency';
import SelectSearchBox from './SelectSearchBox';
import CommonButton from '../CommonButton';

import { buyCoin } from '../../actions/orderAction';
import STRINGS from '../../config/localizedStrings';
import withConfig from 'components/ConfigProvider/withConfig';

const find = (arr, obj) => {
	const res = [];
	arr.forEach((o) => {
		let match = false;
		Object.keys(obj).forEach((i) => {
			if (`${obj[i]}` === `${o[i]}`) {
				match = true;
			}
		});
		if (match) {
			res.push(o);
		}
	});
	return res;
};

const OrderForm = (props) => {
	const inputRef = React.createRef(null);
	const [isLoading, setLoading] = useState(false);
	const [options, setOptions] = useState([]);

	useEffect(() => {
		const { wallets, balance, prices, coins, icons } = props;
		const data = [];
		const totalAssets = calculateBalancePrice(balance, prices, coins);
		const arr = [];
		Object.keys(coins).forEach((currency) => {
			const { symbol, min, type } = coins[currency] || DEFAULT_COIN_DATA;
			// let is_fiat = coins[currency].meta && !!coins[currency].meta.is_fiat;
			let is_fiat = type === 'fiat';

			const currencyBalance = calculatePrice(
				balance[`${symbol}_balance`],
				prices[currency]
			);
			const balancePercent = calculatePricePercentage(
				currencyBalance,
				totalAssets
			);
			data.push({
				...coins[currency],
				balance: balancePercent,
				balanceFormat: formatToCurrency(currencyBalance, min),
				balancePercentage: donutFormatPercentage(balancePercent),
			});

			if (!is_fiat) {
				arr.push({
					...coins[currency],
					walletAddress: wallets[symbol],
					isCryto: !is_fiat,
					balance: balancePercent,
					balanceFormat: formatToCurrency(currencyBalance, min),
					balancePercentage: donutFormatPercentage(balancePercent),
					id: `${coins[currency].id}`,
					icon: icons[`${coins[currency].symbol.toUpperCase()}_ICON`]
						? icons[`${coins[currency].symbol.toUpperCase()}_ICON`]
						: icons.DEFAULT_ICON,
				});
			} else {
				arr.push({
					...coins[currency],
					walletAddress: wallets[symbol],
					isCryto: !is_fiat,
					balance: balancePercent,
					balanceFormat: formatToCurrency(currencyBalance, min),
					balancePercentage: donutFormatPercentage(balancePercent),
					id: `${coins[currency].id}`,
					icon: icons[`${coins[currency].symbol.toUpperCase()}_ICON`]
						? icons[`${coins[currency].symbol.toUpperCase()}_ICON`]
						: icons.DEFAULT_ICON,
				});
			}
		});
		setOptions(arr);
	}, [props]);

	const [isShowError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [cryto, setCryto] = useState('btc');
	const [cash, setCash] = useState('usd');
	const currentCtytoItem =
		find(options, { symbol: cryto })[0] || find(options, { isCryto: true })[0];
	const currentCashItem =
		find(options, { symbol: cash })[0] || find(options, { isCryto: false })[0];

	const onCrytoChangeSelect = (element) => {
		setCryto(element.symbol);
	};
	const onCashChangeSelect = (element) => {
		setCash(element.symbol);
	};
	const onClickBuyBtn = () => {
		let cryptocurrency_amount = null;
		if (inputRef.current.value && inputRef.current.value !== '') {
			cryptocurrency_amount = parseFloat(inputRef.current.value);
		}

		if (!cryptocurrency_amount) {
			setErrorMessage(STRINGS['CRYPTOCURRENCY_AMOUNT_REQUIRED']);
			setShowError(true);
		}

		const cryptocurrency = cryto;
		const currency_amount = null;
		const currency = 'USD';
		const walletAddress = currentCtytoItem.walletAddress;

		if (isLoggedIn()) {
			if (walletAddress) {
				setLoading(true);
				buyCoin({
					cryptocurrency_amount,
					cryptocurrency,
					currency_amount,
					currency,
					walletAddress,
				})
					.then((response) => {
						setLoading(false);
						window.open(response.data.checkout_url, '_blank');
					})
					.catch((error, response) => {
						setLoading(false);
						console.error('catch error when buy coins', error);

						let message = 'Invalid token';

						if (error) {
							const err = error.data;
							if (err) {
								if (err.detail && err.detail.message) {
									message = err.detail.message;
								} else if (err.message) {
									message = err.message;
								}
							}
						}

						setErrorMessage(message);
						setShowError(true);
					});
			} else {
				setErrorMessage(STRINGS['WALLET.NOT_SELECTED_NOTICE']);
				setShowError(true);
			}
		} else {
			browserHistory.push('/login');
		}
	};

	return (
		<div className="order-form-container">
			<div className="error-message">
				{isShowError && (
					<AlertMessageBox
						text={errorMessage}
						onClose={() => {
							setShowError(false);
							setErrorMessage('');
						}}
					/>
				)}
			</div>
			<div className="order-form">
				<div className="input-select-box">
					<input
						ref={inputRef}
						type="number"
						name="cryto"
						placeholder="Enter Amount"
					/>
					<SelectSearchBox
						options={options}
						onChange={onCrytoChangeSelect}
						value={currentCtytoItem}
						type="cryto"
					/>
					<SelectSearchBox
						options={options}
						onChange={onCashChangeSelect}
						value={currentCashItem}
						type="cash"
					/>
				</div>
				<CommonButton
					label="Buy"
					className="btn-buy"
					onClick={onClickBuyBtn}
					isLoading={isLoading}
				/>
			</div>
			<div className="order-tips">
				<div>
					<span>Instant Coin Purchase | Minimum Amount</span>
					<ul>
						<li>BTC - 0.005</li>
						<li>ETH - 0.15</li>
						<li>BCH - 0.25</li>
						<li>XRP - 350</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	pairs: state.app.pairs,
	coins: state.app.coins,
	user: state.user || {},
	verification_level: state.user.verification_level,
	balance: state.user.balance,
	// activeTheme: state.app.theme,
	prices: state.orderbook.prices,
	// price: state.orderbook.price,
	// orders: state.order.activeOrders,
	// activeLanguage: state.app.language,
	// tradeVolumes: state.user.tradeVolumes,
	// isValidBase: state.app.isValidBase,
	// config_level: state.app.config_level,
	// affiliation: state.user.affiliation,
	// constants: state.app.constants,
	wallets: state.user.crypto_wallet,
});

export default connect(mapStateToProps)(withConfig(OrderForm));
