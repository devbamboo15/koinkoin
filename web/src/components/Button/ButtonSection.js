import React from 'react';
import PropTypes from 'prop-types';
import Button from './index';
import STRINGS from '../../config/localizedStrings';

const ButtonSection = ({
	onClickAccept,
	onClickCancel,
	ok_label,
	cancel_label,
	ok_disabled,
	type = 'button',
}) => {
	const onClickAccept_ = (e) => {
		if (onClickAccept) {
			onClickAccept(e);
		}
	};
	const onClickCancel_ = (e) => {
		if (onClickCancel) {
			onClickCancel(e);
		}
	};
	return (
		<div className="d-flex">
			<Button
				type="button"
				label={cancel_label}
				onClick={onClickCancel ? onClickCancel_ : null}
				className="button-fail"
			/>
			<div style={{ width: '2rem' }} />
			<Button
				type={type}
				label={ok_label}
				onClick={onClickAccept ? onClickAccept_ : null}
				className="button-success"
				disabled={ok_disabled}
			/>
		</div>
	);
};

ButtonSection.propTypes = {
	ok_label: PropTypes.string,
	cancel_label: PropTypes.string,
	ok_disabled: PropTypes.bool,
	onClickAccept: PropTypes.func,
	onClickCancel: PropTypes.func,
};

ButtonSection.defaultProps = {
	onClickAccept: null,
	onClickCancel: null,
	ok_disabled: false,
	cancel_label: STRINGS['CANCEL'],
	ok_label: STRINGS['NOTIFICATIONS.BUTTONS.OKAY'],
};

export default ButtonSection;
