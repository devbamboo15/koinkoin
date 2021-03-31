import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	reduxForm,
	formValueSelector, // formFieldselector is a "selector" API to make it easier to connect() to form values. It creates a selector function that accepts field names and returns corresponding values from the named form.
} from 'redux-form';
import renderFields from '../../components/Form/factoryFields';
import ButtonSection from '../../components/Button/ButtonSection';
import STRINGS from '../../config/localizedStrings';

export const FORM_NAME = 'BankInfoForm';

class Form extends Component {
	onCofirmButtonClick = () => {
		this.props.onOk(this.props.data);
	};

	render() {
		const {
			submitting, // Whether or not your form is currently submitting.
			error, //A generic error for the entire form given by the _error key in the result from the synchronous validation function, the asynchronous validation, or the rejected promise from onSubmit.
			valid, // true if the form passes validation (has no validation errors). Opposite of invalid.
			formFields, // A decorator to read a selection of the current form values. This is useful for subforms that change depending on the current values in the form.
			handleSubmit,
		} = this.props;

		return (
			<form
				onSubmit={handleSubmit(this.onCofirmButtonClick)}
				autoComplete="off"
			>
				<div>
					{renderFields(formFields)}
					{error && <div className="warning_text">{error}</div>}
				</div>
				<ButtonSection
					onClickCancel={this.props.onCancel}
					ok_label={STRINGS['CONFIRM_TEXT']}
					ok_disabled={!valid || submitting}
					type="submit"
				/>
			</form>
		);
	}
}

const BankInfoForm = reduxForm({
	form: FORM_NAME,
	enableReinitialize: true,
})(Form);

const selector = formValueSelector(FORM_NAME);

const mapStateToForm = (state) => ({
	data: selector(
		state,
		'bank_country',
		'bank_code',
		'account_number',
		'captcha'
	), //  Select multiple fields as a group into a grouped prop
});

export default connect(mapStateToForm)(BankInfoForm);
