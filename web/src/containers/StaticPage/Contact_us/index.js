import React, { Component, Fragment } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { IoMailSharp } from 'react-icons/io5';

const emailValidation = (data, type) => {
	let errors = {};
	const regExp = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!data.email.length) {
		errors.email = 'This field is required';
	} else if (!re.test(data.email.toLowerCase())) {
		errors.email = 'Write correct email';
	}
	if (type) {
		if (!regExp.test(data.password)) {
			errors.password =
				'Password must be at least 8 characters long and include 1 uppercase letter, 1 number';
		}

		if (!data.captcha || !data.captcha.length) {
			errors.captcha = 'Verify reCAPTHA';
		}
	}

	if (data.login_totp && !data.totp) {
		errors.totp = 'This field is required';
	}
	return {
		errors,
		isValid: !Object.keys(errors).length,
	};
};

class ContactUs extends Component {
	state = {
		email: '',
		subject: '',
		text: '',
		fullname: '',
		lastName: '',
		firstName: '',
		errors: {},
		status: false,
	};

	changeData = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
		if (Object.keys(this.state.errors)) {
			this.setState({
				errors: {},
			});
		}
	};

	contactUs = (e) => {
		e.preventDefault();
		const valid = emailValidation(this.state);
		if (!this.state.subject.length) {
			valid.errors.subject = 'This field is required';
			valid.isValid = false;
		}
		if (!this.state.text.length) {
			valid.errors.text = 'This field is required';
			valid.isValid = false;
		}
		if (!this.state.firstName.length) {
			valid.errors.firstName = 'This field is required';
			valid.isValid = false;
		}
		if (!this.state.lastName.length) {
			valid.errors.lastName = 'This field is required';
			valid.isValid = false;
		}
		if (!valid.isValid) {
			this.setState({
				errors: {
					...this.state.errors,
					...valid.errors,
				},
			});
		} else {
			let { email, subject, text, lastName, firstName } = this.state;
			const data = {
				email,
				subject,
				text,
				firstName,
				lastName,
			};
			this.props
				.contactUs(data)
				.then((res) => {
					if (res.data.status === 'success') {
						// Alert.success(null, {
						// 	customFields: {
						// 		title: "Success",
						// 		message: 'desc'
						// 	},
						// });
						this.setState({
							email: '',
							subject: '',
							text: '',
							firstName: '',
							lastName: '',
							errors: {},
							status: true,
						});
					} else {
						// Alert.error(null, {
						//   customFields: {
						//     title: 'Error',
						//     message: res.data.message,
						//   },
						// });
					}
				})
				.catch(() => {
					// Alert.error(null, {
					//   customFields: {
					//     title: 'Error',
					//     message: 'Please Wait while we optimise the platform for your browser',
					//   },
					// });
				});
		}
	};

	back = () => {
		this.setState({
			status: false,
		});
	};

	render() {
		const {
			email,
			text,
			subject,
			errors,
			status,
			lastName,
			firstName,
		} = this.state;
		return (
			<Fragment>
				{!status ? (
					<div className="contact-us-page pt-5 pb-5">
						<div className="container">
							<div className="contact-header d-flex justify-content-center text-center p-4">
								<h1 className="display-4 text-uppercase m-0">Contact Us</h1>
							</div>
							<div className="contact-body p-4 mt-5">
								<div className="message">
									We're here to help and answer any question you might have. We
									look forward to hearing from you.
								</div>
								<div className="row">
									<div className="col col-12 col-md-6">
										<iframe
											src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.7921591150603!2d-0.08001438422966867!3d51.5170289796367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761cb30d422641%3A0x379c04e7c3045bb8!2s8+Devonshire+Square%2C+London+EC2M+4PL%2C+UK!5e0!3m2!1sen!2sin!4v1553492769136"
											width="100%"
											height="450px"
											frameBorder="0"
											allowFullScreen
											title="map-section2"
										/>
									</div>
									<div className="col col-12 col-md-5 offset-md-1">
										<div className="contact-info mt-5">
											<div className="info-icon">
												<FaMapMarkerAlt></FaMapMarkerAlt>
											</div>
											<div className="info-body">
												<p className="m-0">
													<b>KoinKoin Ltd</b> <br />
													<span>8 Devonshire Square London, UK, EC2M 4YF</span>
												</p>
											</div>
										</div>
										<div className="contact-info">
											<div className="info-icon">
												<IoMailSharp></IoMailSharp>
											</div>
											<div className="info-body">
												<a href="mailto:support@koinkoin.com">
													support@koinkoin.com
												</a>
											</div>
										</div>
										<div className="contact-info">
											<div className="info-icon">
												<FaPhoneAlt></FaPhoneAlt>
											</div>
											<div className="info-body">
												<a href="tel:+442076600741">+442076600741</a>
											</div>
										</div>
									</div>
								</div>
								<div className="contact-form">
									<div className="form-row">
										<div className="form-group col-md-6">
											<div
												className={`input_wrap ${
													errors && errors.firstName ? 'warning' : ''
												}`}
											>
												<label htmlFor="firstName"> First Name</label>
												<input
													type="text"
													name="firstName"
													value={firstName}
													onChange={this.changeData}
													className="form-control"
												/>
												{errors && errors.firstName && (
													<span className="warn_wrap">
														{/*<i className="fa fa-exclamation-circle"/>*/}
														<div className="warning_message">
															{errors.firstName}
														</div>
													</span>
												)}
											</div>
										</div>
										<div className="form-group col-md-6">
											<div
												className={`input_wrap ${
													errors && errors.lastName ? 'warning' : ''
												}`}
											>
												<label htmlFor="lastName"> Last Name</label>
												<input
													type="text"
													name="lastName"
													value={lastName}
													onChange={this.changeData}
													className="form-control"
												/>
												{errors && errors.lastName && (
													<span className="warn_wrap">
														{/*<i className="fa fa-exclamation-circle"/>*/}
														<div className="warning_message">
															{errors.lastName}
														</div>
													</span>
												)}
											</div>
										</div>
									</div>

									<div className="form-row">
										<div className="form-group col-md-6">
											<div
												className={`input_wrap ${
													errors && errors.email ? 'warning' : ''
												}`}
											>
												<label htmlFor="email"> Email Address</label>
												<input
													type="text"
													name="email"
													value={email}
													onChange={this.changeData}
													className="form-control"
												/>
												{errors && errors.email && (
													<span className="warn_wrap">
														{/*<i className="fa fa-exclamation-circle"/>*/}
														<div className="warning_message">
															{errors.email}
														</div>
													</span>
												)}
											</div>
										</div>

										<div className="form-group col-md-6">
											<div
												className={`input_wrap ${
													errors && errors.subject ? 'warning' : ''
												}`}
											>
												<label htmlFor="subject"> Subject</label>
												<input
													type="text"
													name="subject"
													value={subject}
													onChange={this.changeData}
													className="form-control"
												/>
												{errors && errors.subject && (
													<span className="warn_wrap">
														{/*<i className="fa fa-exclamation-circle"/>*/}
														<div className="warning_message">
															{errors.subject}
														</div>
													</span>
												)}
											</div>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-12">
											<div
												className={`input_wrap ${
													errors && errors.text ? 'warning' : ''
												}`}
											>
												<label htmlFor="text"> Message</label>
												<textarea
													name="text"
													value={text}
													onChange={this.changeData}
													className="form-control "
													data-gramm="true"
													data-txt_gramm_id="3baad1b6-5824-2081-6db8-72d2635556c0"
													data-gramm_id="3baad1b6-5824-2081-6db8-72d2635556c0"
													spellCheck="false"
													data-gramm_editor="true"
												/>
												{errors && errors.text && (
													<span className="warn_wrap">
														{/*<i className="fa fa-exclamation-circle"/>*/}
														<div className="warning_message-textarea">
															{errors.text}
														</div>
													</span>
												)}
											</div>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-12 text-center mb-0">
											<button
												onClick={this.contactUs}
												className="btn btn-outline-secondary"
											>
												Send
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="inner-page">
						<div id="hero-inner">
							<div className="container">
								<div className="row align-items-center justify-content-center text-center">
									<div className="col col-12 col-md-10 col-lg-8">
										<h1 className="page-title">Contact</h1>
									</div>
								</div>
							</div>
						</div>
						<br />
						<section className="contact_us">
							<div className="container">
								<div className="main_title">
									<h2 className="page_title">Thanks!</h2>
									<h2 className="page_title">Your message has been sent.</h2>
								</div>
							</div>
						</section>
						<section className="contact_us_wrap">
							<div className="container">
								<div className="contact_send">
									<button
										onClick={this.back}
										className="btn btn-outline-secondary"
									>
										Back to form
									</button>
								</div>
							</div>
						</section>
					</div>
				)}
			</Fragment>
		);
	}
}

export default ContactUs;
