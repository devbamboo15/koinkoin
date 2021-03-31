import React from 'react';
import { Field } from 'redux-form';
import InputField from './FormFields/InputField';
import TextAreaField from './FormFields/TextAreaField';
import FileField from './FormFields/FileField';
import DropdownField from './FormFields/DropdownField';
import DateField from './FormFields/DateField';
import DropdownDateField from './FormFields/DropdownDateField';
import CheckField from './FormFields/CheckField';
import RadioField from './FormFields/RadioField';
import EditableInputField from './FormFields/EditableInputField';
import CaptchaField from './FormFields/Captcha';
import ToggleField from './FormFields/ToggleField';

const renderFields = (fields = {}, callback) => {
	return (
		<div>
			{Object.keys(fields).map((key, index) => {
				const { type, validate = [], choices, ...rest } = fields[key];
				const commonProps = {
					callback,
					key,
					name: key,
					type,
					validate,
					...rest,
				};

				switch (type) {
					case 'captcha':
						return <Field component={CaptchaField} {...commonProps} />;
					case 'hidden':
						return <Field component="input" {...commonProps} />;
					case 'file':
						return <Field component={FileField} {...commonProps} />;
					case 'select':
					case 'autocomplete':
						return (
							<Field
								component={DropdownField}
								autocomplete={type === 'autocomplete'}
								{...commonProps}
							/>
						);
					case 'date-dropdown':
						return <Field component={DropdownDateField} {...commonProps} />;
					case 'date':
						return <Field component={DateField} {...commonProps} />;
					case 'checkbox':
						return <Field component={CheckField} {...commonProps} />;
					case 'radio':
						return (
							<div key={key} style={{ margin: '1rem 0' }}>
								{choices.map((c) => {
									commonProps.key = `${c.value}`;
									return (
										<Field
											component={RadioField}
											label={c.label}
											value={c.value.toString()}
											{...commonProps}
										/>
									);
								})}
							</div>
						);
					case 'editable':
						return <Field component={EditableInputField} {...commonProps} />;
					case 'textarea':
						return <Field component={TextAreaField} {...commonProps} />;
					case 'toggle':
						return <Field component={ToggleField} {...commonProps} />;
					case 'text':
					case 'password':
					case 'email':
					default:
						return <Field component={InputField} {...commonProps} />;
				}
			})}
		</div>
	);
};

export default renderFields;
