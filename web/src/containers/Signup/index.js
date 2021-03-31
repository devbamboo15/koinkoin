import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { SubmissionError, change, submit } from 'redux-form';
import { bindActionCreators } from 'redux';
import { performSignup, performQuestions } from '../../actions/authAction';
import SignupForm, { generateFormFields, FORM_NAME } from './SignupForm';
import SignupSuccess from './SignupSuccess';
import { ContactForm } from '../';
import { IconTitle, Dialog, MobileBarBack } from '../../components';
import { FLEX_CENTER_CLASSES } from 'config/constants';
import STRINGS from '../../config/localizedStrings';
import withConfig from 'components/ConfigProvider/withConfig';
import QuestionaireContent from './QuestionaireContent';

let errorTimeOut = null;

const BottomLinks = () => (
	<div className={classnames('f-1', 'link_wrapper', 'multi_links')}>
		<div>
			{STRINGS['SIGN_UP.HAVE_ACCOUNT']}
			<Link to="/login" className="blue-link">
				{STRINGS['SIGN_UP.GOTO_LOGIN']}
			</Link>
		</div>
		<div>
			{STRINGS['SIGN_UP.NO_EMAIL']}
			<Link to="/verify" className="blue-link">
				{STRINGS['SIGN_UP.REQUEST_EMAIL']}
			</Link>
		</div>
	</div>
);

class Signup extends Component {
	state = {
		success: false,
		showContactForm: false,
		isReferral: false,
		isAnswers: false,
		answers: '',
	};

	componentDidMount() {
		const affiliation_code = this.getReferralCode();
		const email = this.getEmail();
		if (affiliation_code) {
			this.props.change(FORM_NAME, 'referral', affiliation_code);
			this.setState({ isReferral: true });
		}
		if (email) {
			this.props.change(FORM_NAME, 'email', email);
		}
	}

	componentDidUpdate() {
		const { constants = {}, router } = this.props;
		const { success } = this.state;

		if (success && !constants.email_verification_required) {
			router.push('/login');
		}
	}

	componentWillUnmount() {
		if (errorTimeOut) {
			clearTimeout(errorTimeOut);
		}
	}

	getReferralCode = () => {
		let affiliation_code = '';
		if (
			this.props.location &&
			this.props.location.query &&
			this.props.location.query.affiliation_code
		) {
			affiliation_code = this.props.location.query.affiliation_code;
		} else if (
			window.location &&
			window.location.search &&
			window.location.search.includes('affiliation_code')
		) {
			affiliation_code = window.location.search.split('?affiliation_code=')[1];
		}
		return affiliation_code;
	};
	getEmail = () => {
		let email = '';
		if (
			this.props.location &&
			this.props.location.query &&
			this.props.location.query.email
		) {
			email = this.props.location.query.email;
		} else if (
			window.location &&
			window.location.search &&
			window.location.search.includes('email')
		) {
			email = window.location.search.split('?email')[1];
		}
		return email;
	};

	onSubmitSignup = (values) => {
		if (this.state.isAnswers) {
			const answers = this.state.answers;
			return performSignup(values)
				.then((res) => {
					this.setState({ success: true });
					performQuestions({
						answers,
						email: values.email,
						password: values.password,
					})
						.then((re) => {
							console.log(re);
						})
						.catch((er) => {
							console.log(er);
						});
				})
				.catch((error) => {
					const errors = {};
					errorTimeOut = setTimeout(() => {
						this.props.change(FORM_NAME, 'captcha', '');
					}, 5000);

					if (error.response.status === 409) {
						errors.email = STRINGS['VALIDATIONS.USER_EXIST'];
					} else if (error.response) {
						const { message = '' } = error.response.data;
						if (message.toLowerCase().indexOf('password') > -1) {
							// TODO set error in constants for language
							errors.password = STRINGS['VALIDATIONS.INVALID_PASSWORD'];
						} else {
							errors._error = message || error.message;
						}
					} else {
						errors._error = error.message;
					}
					throw new SubmissionError(errors);
				})
				.then(() => {
					this.setState({ isAnswers: false });
				});
		} else {
			this.setState({ showQuestionaireForm: true });
		}
	};

	// onSubmitSignup = (values) => {
	// 	// const affiliation_code = this.getReferralCode();
	// 	// if (affiliation_code && !values.referral) {
	// 	// 	values.referral = affiliation_code;
	// 	// }
	// 	return performSignup(values)
	// 		.then((res) => {
	// 			this.setState({ success: true });
	// 		})
	// 		.catch((error) => {
	// 			const errors = {};
	// 			errorTimeOut = setTimeout(() => {
	// 				this.props.change(FORM_NAME, 'captcha', '');
	// 			}, 5000);

	// 			if (error.response && error.response.status === 409) {
	// 				errors.email = STRINGS['VALIDATIONS.USER_EXIST'];
	// 			} else if (error.response) {
	// 				const { message = '' } = error.response.data;
	// 				if (message.toLowerCase().indexOf('password') > -1) {
	// 					// TODO set error in constants for language
	// 					errors.password = STRINGS['VALIDATIONS.INVALID_PASSWORD'];
	// 				} else {
	// 					errors._error = message || error.message;
	// 				}
	// 			} else {
	// 				errors._error = error.message;
	// 			}
	// 			throw new SubmissionError(errors);
	// 		});
	// };

	doSignup = (answers) => {
		this.setState(
			{ showQuestionaireForm: false, answers: answers, isAnswers: true },
			() => {
				this.props.remoteSubmit();
			}
		);
	};

	onOpenDialog = () => {
		const { links = {} } = this.props.constants;
		if (window && links && links.helpdesk) {
			window.open(links.helpdesk, '_blank');
		}
	};

	onCloseDialog = () => {
		this.setState({ showContactForm: false });
	};

	onCloseQuestionaireDialog = () => {
		this.setState({ showQuestionaireForm: false });
	};

	onGoBack = () => {
		this.props.router.push(`/login`);
	};

	onBackActiveEmail = () => {
		this.setState({ success: false });
	};

	render() {
		const {
			languageClasses,
			activeTheme,
			constants = {},
			icons: ICONS,
		} = this.props;
		const {
			success,
			showContactForm,
			isReferral,
			showQuestionaireForm,
		} = this.state;

		if (success && constants.email_verification_required) {
			return (
				<div>
					{isMobile && <MobileBarBack onBackClick={this.onBackActiveEmail} />}
					<SignupSuccess activeTheme={activeTheme} />
				</div>
			);
		}

		const formFields = generateFormFields(
			STRINGS,
			activeTheme,
			constants.links,
			isReferral
		);

		return (
			<div className={classnames(...FLEX_CENTER_CLASSES, 'flex-column', 'f-1')}>
				{isMobile && !showContactForm && (
					<MobileBarBack onBackClick={this.onGoBack} />
				)}
				<div
					className={classnames(
						...FLEX_CENTER_CLASSES,
						'flex-column',
						'auth_wrapper',
						'w-100'
					)}
				>
					<IconTitle
						iconId="EXCHANGE_LOGO"
						iconPath={ICONS['EXCHANGE_LOGO']}
						text={STRINGS['SIGNUP_TEXT']}
						textType="title"
						underline={true}
						className="w-100 exir-logo"
						imageWrapperClassName="auth_logo-wrapper"
						subtitle={STRINGS.formatString(
							STRINGS['SIGN_UP.SIGNUP_TO'],
							constants.api_name || ''
						)}
						actionProps={{
							text: STRINGS['HELP_TEXT'],
							iconPath: ICONS['BLUE_QUESTION'],
							onClick: this.onOpenDialog,
							useSvg: true,
							showActionText: true,
						}}
					/>
					<div
						className={classnames(
							...FLEX_CENTER_CLASSES,
							'flex-column',
							'auth_form-wrapper',
							'w-100'
						)}
					>
						<SignupForm
							onSubmit={this.onSubmitSignup}
							formFields={formFields}
						/>
						{isMobile && <BottomLinks />}
					</div>
				</div>
				{!isMobile && <BottomLinks />}
				<Dialog
					isOpen={showContactForm}
					label="contact-modal"
					onCloseDialog={this.onCloseDialog}
					shouldCloseOnOverlayClick={false}
					style={{ 'z-index': 100 }}
					className={classnames(languageClasses)}
					showCloseText={false}
					theme={activeTheme}
				>
					<ContactForm
						onSubmitSuccess={this.onCloseDialog}
						onClose={this.onCloseDialog}
					/>
				</Dialog>
				<Dialog
					isOpen={showQuestionaireForm}
					label="questionaire-modal"
					onCloseDialog={this.onCloseQuestionaireDialog}
					shouldCloseOnOverlayClick={false}
					style={{ 'z-index': 100 }}
					showCloseText={false}
					theme={activeTheme}
				>
					<QuestionaireContent
						onSubmit={this.doSignup}
						onClose={this.onCloseQuestionaireDialog}
					/>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = (store) => ({
	activeTheme: store.app.theme,
	constants: store.app.constants,
});

const mapDispatchToProps = (dispatch) => ({
	change: bindActionCreators(change, dispatch),
	remoteSubmit: () => {
		dispatch(submit(FORM_NAME));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(withConfig(Signup));
