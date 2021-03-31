import React, { Component } from 'react';
import {
	oneOfType,
	object,
	func,
	bool,
	string,
	array,
	number,
} from 'prop-types';
import classnames from 'classnames';
import Image from 'components/Image';
import { isMobile } from 'react-device-detect';
import withConfig from 'components/ConfigProvider/withConfig';

import { Button } from 'components';
import STRINGS from 'config/localizedStrings';
import { FLEX_CENTER_CLASSES } from 'config/constants';
import InputGroup from './InputGroup';

class QuickTrade extends Component {
	render() {
		const {
			targetAmount,
			sourceAmount,
			onSelectSource,
			onSelectTarget,
			onChangeSourceAmount,
			onChangeTargetAmount,
			onReviewQuickTrade,
			disabled,
			targetOptions,
			sourceOptions,
			selectedSource,
			selectedTarget,
			forwardSourceError,
			forwardTargetError,
			orderLimits: { SIZE, PRICE },
			side,
			icons: ICONS,
		} = this.props;

		return (
			<div
				className={classnames('quick_trade-wrapper', 'd-flex', 'flex-column')}
			>
				<div
					className={classnames(
						'quick_trade-section_wrapper',
						'quick_trade-bottom-padded'
						// ...GROUP_CLASSES
					)}
				>
					<div className="d-flex content-center">
						<Image
							iconId="SIDEBAR_QUICK_TRADING_INACTIVE,QUICK_TRADE"
							icon={
								isMobile
									? ICONS['SIDEBAR_QUICK_TRADING_INACTIVE']
									: ICONS['QUICK_TRADE_ICON']
							}
							wrapperClassName={
								isMobile ? 'quick_trade-tab-icon' : 'quick_trade-icon'
							}
						/>
					</div>
					<div
						className={classnames(
							'title text-capitalize',
							...FLEX_CENTER_CLASSES
						)}
					>
						{STRINGS['QUICK_TRADE_COMPONENT.TITLE']}
					</div>
				</div>
				<InputGroup
					name="convert"
					options={sourceOptions}
					inputValue={sourceAmount}
					selectValue={selectedSource}
					onSelect={onSelectSource}
					onInputChange={onChangeSourceAmount}
					forwardError={forwardSourceError}
					limits={side === 'buy' ? PRICE : SIZE}
				/>
				<InputGroup
					name="to"
					options={targetOptions}
					inputValue={targetAmount}
					selectValue={selectedTarget}
					onSelect={onSelectTarget}
					onInputChange={onChangeTargetAmount}
					forwardError={forwardTargetError}
					limits={side === 'buy' ? SIZE : PRICE}
				/>
				<div
					className={classnames(
						'quick_trade-section_wrapper',
						'quick_trade-bottom-padded',
						'my-5'
						// ...GROUP_CLASSES
					)}
				>
					<Button
						label={STRINGS['QUICK_TRADE_COMPONENT.BUTTON']}
						onClick={onReviewQuickTrade}
						disabled={disabled}
						type="button"
					/>
				</div>
			</div>
		);
	}
}

QuickTrade.propTypes = {
	onReviewQuickTrade: func.isRequired,
	theme: string.isRequired,
	disabled: bool.isRequired,
	pairs: object.isRequired,
	coins: object.isRequired,
	orderLimits: object.isRequired,
	onSelectTarget: func.isRequired,
	onSelectSource: func.isRequired,
	targetOptions: array,
	sourceOptions: array,
	selectedSource: string,
	selectedTarget: string,
	targetAmount: oneOfType([number, string]),
	sourceAmount: oneOfType([number, string]),
	onChangeTargetAmount: func.isRequired,
	onChangeSourceAmount: func.isRequired,
};

QuickTrade.defaultProps = {
	targetOptions: [],
	sourceOptions: [],
	onReviewQuickTrade: () => {},
	disabled: false,
};

export default withConfig(QuickTrade);
