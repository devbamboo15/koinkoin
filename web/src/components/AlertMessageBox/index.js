import React from 'react';
import PropTypes from 'prop-types';
import Ionicon from 'react-ionicons';

const AlertMessageBox = ({ text, fontSize, icon, color, onClose }) => {
	return (
		<div className="error-message-box">
			<span>{text}</span>
			<Ionicon
				color={color}
				icon={icon}
				fontSize={fontSize}
				className="alert-icon"
				onClick={onClose}
			/>
		</div>
	);
};

AlertMessageBox.propTypes = {
	text: PropTypes.string.isRequired,
	fontSize: PropTypes.string,
	icon: PropTypes.string,
	color: PropTypes.string,
	onClose: PropTypes.func,
};

AlertMessageBox.defaultProps = {
	fontSize: '11px',
	icon: 'md-close',
	color: 'white',
	onClose: () => {},
};

export default AlertMessageBox;
