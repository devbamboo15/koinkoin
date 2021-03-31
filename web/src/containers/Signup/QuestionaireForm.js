import React from 'react';
import { getTheme } from '../../utils/theme';
import QuestionForm from '../../components/Form/QuestionForm';
import STRINGS from '../../config/localizedStrings';
import { reduxForm } from 'redux-form';

export const FORM_NAME = 'QuestionaireForm';

export const generateFormFields = (question, theme = getTheme()) => {
	let fieldValues = {};
	switch (question.type) {
		case 'CHOICE':
			fieldValues.answer = {
				type: 'radio',
				choices: question.choices,
				required: true,
				fullWidth: true,
			};
			break;
		case 'INPUT_TEXT':
		default:
			fieldValues.answer = {
				type: 'text',
				label: '',
				required: true,
				fullWidth: true,
			};
			break;
	}

	return fieldValues;
};

const Form = (props) => (
	<QuestionForm
		{...props}
		nextButtonLabel={STRINGS['NEXT_PAGE']}
		backButtonLabel={STRINGS['PREVIOUS_PAGE']}
	/>
);

const validate = (values) => {
	const { answer } = values;
	const errors = {};

	if (answer === undefined || answer === '') {
		errors.answer = STRINGS['VALIDATIONS.REQUIRED'];
	}

	return errors;
};

export default reduxForm({
	form: FORM_NAME,
	validate,
})(Form);
