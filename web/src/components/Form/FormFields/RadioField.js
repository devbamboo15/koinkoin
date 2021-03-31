import React from 'react';
import classnames from 'classnames';
import FieldWrapper from './FieldWrapper';

const RadioField = (props) => {
	const { input, label, type, ...rest } = props;
	return (
		<FieldWrapper
			hideUnderline={true}
			className={classnames('radiofield-wrapper', 'd-flex', 'flex-column')}
			type={type}
			error_disabled={true}
			{...rest}
		>
			<div className={classnames('radiofield-input-wrapper', 'd-flex')}>
				<input type={type} {...input} className="radiofield-input" />
				<div className="radiofield-label field-label">{label}</div>
			</div>
		</FieldWrapper>
	);
};

export default RadioField;
