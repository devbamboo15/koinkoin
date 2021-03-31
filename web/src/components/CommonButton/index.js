import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import classes from './style.module.scss';
import ReactLoading from 'react-loading';

const CommonButton = ({
	label,
	onClick,
	disabled,
	className,
	autoFocus = false,
	animationEffect = false,
	isLoading,
}) => (
	<div
		className={classnames({ [classes.animationContainer]: animationEffect })}
	>
		<div
			// type={type}
			onClick={onClick}
			className={classnames(
				classes.commonButton,
				{ [classes.hangingAnimation]: animationEffect },
				{
					disabled,
				},
				className
			)}
			disabled={disabled}
			autoFocus={autoFocus}
		>
			{isLoading && <ReactLoading type="spin" width="32px" height="32px" />}
			{!isLoading && label}
		</div>
	</div>
);

CommonButton.propTypes = {
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	isLoading: PropTypes.bool,
	animationEffect: PropTypes.bool,
};

CommonButton.defaultProps = {
	type: 'submit',
	disabled: false,
	animationEffect: false,
	className: '',
	isLoading: false,
};

export default CommonButton;
