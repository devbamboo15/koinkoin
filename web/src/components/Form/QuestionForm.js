import React from 'react';
import renderFields from './factoryFields';
import ButtonSection from '../Button/ButtonSection';
import { getErrorLocalized } from '../../utils/errors';

const Form = (props) => {
	const {
		handleSubmit,
		cancelSubmit,
		submitting,
		// pristine,
		error,
		valid,
		formFields,
		nextButtonLabel,
		backButtonLabel,
		reset,
	} = props;
	return (
		<form onSubmit={handleSubmit} autoComplete="off" className="w-100">
			<div className="w-100">
				{renderFields(formFields)}
				{error && (
					<div className="warning_text error_text">
						{getErrorLocalized(error)}
					</div>
				)}
			</div>
			<ButtonSection
				onClickCancel={() => {
					reset();
					cancelSubmit();
				}}
				type="submit"
				ok_label={nextButtonLabel}
				cancel_label={backButtonLabel}
				ok_disabled={!!error || submitting || !valid}
			/>
		</form>
	);
};

export default Form;
