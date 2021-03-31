import React, { Component } from 'react';
import STRINGS from '../../config/localizedStrings';
import { IconTitle } from '../../components';
import CommonButton from '../../components/CommonButton';

class WithdrawRequested extends Component {
	onGoMainpage = () => {
		this.props.router.push('/wallet');
	};

	render() {
		return (
			<div className="summary-container">
				<IconTitle
					text={`${STRINGS['WITHDRAW_PAGE.WITHDRAW_ORDER_SUBMITTED']}`}
					textType="title"
				/>
				<div>
					<CommonButton label="OK" onClick={this.onGoMainpage} />
				</div>
			</div>
		);
	}
}

export default WithdrawRequested;
