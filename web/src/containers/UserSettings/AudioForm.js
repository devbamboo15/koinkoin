import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import renderFields from '../../components/Form/factoryFields';
import { Button, Accordion } from '../../components';
import { getErrorLocalized } from '../../utils/errors';
import STRINGS from '../../config/localizedStrings';
import { EditWrapper } from 'components';

export const generateAudioCueFormValues = () => ({
	all: {
		type: 'toggle',
		stringId: 'USER_SETTINGS.AUDIO_CUE_FORM.ALL_AUDIO',
		label: STRINGS['USER_SETTINGS.AUDIO_CUE_FORM.ALL_AUDIO'],
		className: 'toggle-wrapper-all',
	},
	public_trade: {
		type: 'toggle',
		stringId: 'USER_SETTINGS.AUDIO_CUE_FORM.PUBLIC_TRADE_AUDIO',
		label: STRINGS['USER_SETTINGS.AUDIO_CUE_FORM.PUBLIC_TRADE_AUDIO'],
		className: 'toggle-wrapper',
		disabled: false,
	},
	order_partially_completed: {
		type: 'toggle',
		stringId: 'USER_SETTINGS.AUDIO_CUE_FORM.ORDERS_PARTIAL_AUDIO',
		label: STRINGS['USER_SETTINGS.AUDIO_CUE_FORM.ORDERS_PARTIAL_AUDIO'],
		className: 'toggle-wrapper',
		disabled: false,
	},
	order_placed: {
		type: 'toggle',
		stringId: 'USER_SETTINGS.AUDIO_CUE_FORM.ORDERS_PLACED_AUDIO',
		label: STRINGS['USER_SETTINGS.AUDIO_CUE_FORM.ORDERS_PLACED_AUDIO'],
		className: 'toggle-wrapper',
		disabled: false,
	},
	order_canceled: {
		type: 'toggle',
		stringId: 'USER_SETTINGS.AUDIO_CUE_FORM.ORDERS_CANCELED_AUDIO',
		label: STRINGS['USER_SETTINGS.AUDIO_CUE_FORM.ORDERS_CANCELED_AUDIO'],
		className: 'toggle-wrapper',
		disabled: false,
	},
	order_completed: {
		type: 'toggle',
		stringId: 'USER_SETTINGS.AUDIO_CUE_FORM.ORDERS_COMPLETED_AUDIO',
		label: STRINGS['USER_SETTINGS.AUDIO_CUE_FORM.ORDERS_COMPLETED_AUDIO'],
		className: 'toggle-wrapper',
		disabled: false,
	},
	click_amounts: {
		type: 'toggle',
		stringId: 'USER_SETTINGS.AUDIO_CUE_FORM.CLICK_AMOUNTS_AUDIO',
		label: STRINGS['USER_SETTINGS.AUDIO_CUE_FORM.CLICK_AMOUNTS_AUDIO'],
		className: 'toggle-wrapper',
		disabled: false,
	},
	get_quote_quick_trade: {
		type: 'toggle',
		stringId: 'USER_SETTINGS.AUDIO_CUE_FORM.GET_QUICK_TRADE_AUDIO',
		label: STRINGS['USER_SETTINGS.AUDIO_CUE_FORM.GET_QUICK_TRADE_AUDIO'],
		className: 'toggle-wrapper',
		disabled: false,
	},
	quick_trade_success: {
		type: 'toggle',
		stringId: 'USER_SETTINGS.AUDIO_CUE_FORM.SUCCESS_QUICK_TRADE_AUDIO',
		label: STRINGS['USER_SETTINGS.AUDIO_CUE_FORM.SUCCESS_QUICK_TRADE_AUDIO'],
		className: 'toggle-wrapper',
		disabled: false,
	},
	quick_trade_timeout: {
		type: 'toggle',
		stringId: 'USER_SETTINGS.AUDIO_CUE_FORM.QUICK_TRADE_TIMEOUT_AUDIO',
		label: STRINGS['USER_SETTINGS.AUDIO_CUE_FORM.QUICK_TRADE_TIMEOUT_AUDIO'],
		className: 'toggle-wrapper',
		disabled: false,
	},
});

const Form = ({
	handleSubmit,
	submitting,
	pristine,
	error,
	valid,
	initialValues,
	formFields,
	callback,
}) => (
	<form onSubmit={handleSubmit}>
		{renderFields(formFields, callback)}
		{error && <div className="warning_text">{getErrorLocalized(error)}</div>}
		<EditWrapper stringId="SETTING_BUTTON" />
		<Button
			className="mt-4"
			label={STRINGS['SETTING_BUTTON']}
			disabled={pristine || submitting || !valid}
		/>
	</form>
);

class AudioCueForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formFields: this.props.formFields,
		};
	}

	componentDidMount() {
		if (this.props.initialValues.all === undefined) {
			this.callback(true);
		} else if (!this.props.initialValues.all) {
			this.callback(false);
		}
	}

	componentDidUpdate(prevProps) {
		if (
			JSON.stringify(this.props.initialValues) !==
			JSON.stringify(prevProps.initialValues)
		) {
			this.props.initialize(this.props.initialValues);
		}
	}

	callback = (selected) => {
		let formFields = { ...this.state.formFields };
		Object.keys(formFields).map((key) => {
			formFields[key].disabled = !selected;
			return null;
		});
		this.setState({ formFields });
	};

	render() {
		const section = [
			{
				stringId: 'USER_SETTINGS.TITLE_AUDIO_CUE',
				title: STRINGS['USER_SETTINGS.TITLE_AUDIO_CUE'],
				description: 'This is the description',
				content: (
					<div>
						<p>{STRINGS['USER_SETTINGS.DESC_AUDIO_CUE']}</p>
						<Form
							{...this.props}
							callback={this.callback}
							formFields={this.state.formFields}
						/>
					</div>
				),
				isOpen: true,
			},
		];
		return <Accordion sections={section} />;
	}
}

export default reduxForm({
	form: 'AudioCueForm',
})(AudioCueForm);
