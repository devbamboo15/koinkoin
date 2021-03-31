import React, { Component } from 'react';
import classnames from 'classnames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { ICONS } from '../../config/constants';

import {
	openContactForm,
	setSnackNotification,
} from '../../actions/appActions';

import { MobileBarBack } from '../../components';
import { renderInformation, renderTitleSection } from '../Wallet/components';
import CashDepositAmount from './components/CashDepositAmount';
import { generateBaseInformation } from './utils';

class Deposit extends Component {
	state = {
		depositPrice: 0,
		currency: '',
		checked: false,
		copied: false,
	};

	onGoBack = () => {
		this.props.router.push('/wallet');
	};

	render() {
		const {
			openContactForm,
			balance,
			coins,
			constants = { links: {} },
		} = this.props;
		let data = window.location.pathname.split('/');
		let currency = data[2];
		return (
			<div>
				{isMobile && <MobileBarBack onBackClick={this.onGoBack} />}
				<div className="presentation_container  apply_rtl">
					{!isMobile &&
						renderTitleSection(
							currency,
							'deposit',
							ICONS.DEPOSIT_BITCOIN,
							coins,
							currency
						)}
					<div
						className={classnames(
							'inner_container',
							'with_border_top',
							'with_border_bottom'
						)}
					>
						{renderInformation(
							currency,
							balance,
							openContactForm,
							generateBaseInformation,
							coins,
							'deposit',
							constants.links
						)}
						<CashDepositAmount
							email={this.props.userEmail}
							currency={currency}
							userId={this.props.id}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (store) => ({
	id: store.user.id,
	crypto_wallet: store.user.crypto_wallet,
	balance: store.user.balance,
	activeLanguage: store.app.language,
	quoteData: store.orderbook.quoteData,
	coins: store.app.coins,
	constants: store.app.constants,
	userEmail: store.user.email,
});

const mapDispatchToProps = (dispatch) => ({
	openContactForm: bindActionCreators(openContactForm, dispatch),
	setSnackNotification: bindActionCreators(setSnackNotification, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
