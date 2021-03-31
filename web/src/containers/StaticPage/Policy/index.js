import React, { useState, useEffect } from 'react';

const Policy = () => {
	const menu = [
		'WHAT WE COLLECT ABOUT YOU',
		'USE OF COOKIES',
		'WHY WE USE YOUR PERSONAL DATA',
		'DISCLOSURE OF YOUR PERSONAL DATA',
		'SECURITY AND STORAGE OF PERSONAL DATA',
		'BASIS FOR PERSONAL DATA PROCESSING',
		'YOUR RIGHTS',
		'ACCESS TO PERSONAL DATA',
		'RETENTION OF PERSONAL DATA',
	];
	const [menuIndex, setMenuIndex] = useState(0);
	const [width, setWidth] = useState(window.innerWidth);

	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	return (
		<main className="policy-page py-5">
			<div className="container">
				<div className="policy-container mt-5">
					<div className="left-menu p-3">
						{menu.map((link, index) => (
							<div
								key={index}
								className="link-item my-3 d-flex"
								onClick={() => setMenuIndex(index)}
							>
								<span>{index + 1}.</span>
								<p>{link}</p>
							</div>
						))}
					</div>
					<div className="policy-text p-3">
						<h1 className="display-4 text-uppercase mb-5">Privacy Policy</h1>
						{(menuIndex === 0 || width < 768) && (
							<div>
								<p>
									KoinKoin and its affiliates (hereinafter “KoinKoin”, “we”,
									“us” or “our”) undertakes to take maximum efforts in order to
									protect your privacy. KoinKoin uses the collected information
									about you to fulfil its contractual obligations and improve
									the customer service.{' '}
								</p>
								<p>
									This policy together with the User Agreement and other
									documents referred to it defines the principles and rules on
									the basis of which we collect process and use your personal
									data.{' '}
								</p>
								<p>
									Please read this document carefully in order to understand our
									approach and policy regarding your personal data and how we
									will use your personal data.{' '}
								</p>
								<p>
									For the purpose of the Data Protection Act 1998 (the "Act"),
									the data controller is KoinKoin LTD a legal entity registered
									according to the law of UK, with the registration number
									08345572 of the 3rd of January, 2013. KOINKOIN LTD is wholly
									owned by SJ Finanzmann Limited (hereinafter referred to as
									KOINKOIN) and was incorporated under the International
									Business Companies Act of 1994 of the Republic of Seychelles
									with a company number of 204414 and registered address of
									Global Gateway 8, Rue de la Perl, Providence, Mahe, Seychelles{' '}
								</p>
								<h3>1. WHAT WE COLLECT ABOUT YOU</h3>
								<p>We may collect and process the following data about you:</p>
								<h4>Information you give to us.</h4>
								<p>
									You can provide us with information about yourself by filling
									in the relevant forms on the website or by providing us such
									information by phone, email, during a video conference or in
									any other manner. This information includes personal data
									which was specified when registering on the website, when
									subscribing to our service , opening an account and verifying
									the identity of the account holder or persons authorised to
									use it, as well as the payment instruments used by a person,
									when searching for a product, using any of services provided
									by our website, while placing orders on our website, by
									participating in discussions or using any other communication
									functions on our website, during participation in draws,
									promotions or surveys, and also when you tell us about
									problems or issues in the work of the website. For example,
									the data that you provide us, can include your last name and
									first name, your photos; your videos, your address; your
									nationality, your tax residency, your phone number; your
									e-mail address; your logins and nicknames, your bank details,
									including account numbers and payment details; your date of
									birth; your education; your experience and place of work, your
									sources of income and their amount; information on the status
									of your accounts opened with banks or payment systems.
								</p>
								<h4>Information we collect about you.</h4>
								<p>
									With regard to each of your visits to our website and use our
									services we can collect, for example, the following
									information about you (including automatically):
								</p>
								<ul className="agreement_list">
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										<span className="text_bold">technical information</span>,
										including the internet protocol (IP) address used to connect
										your computer to the internet, your login information,
										browser type and version, time zone setting, browser plug-in
										types and versions, operating system and platform;
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										<span className="text_bold">
											information about your visit
										</span>
										, including the full Uniform Resource Locators (URL)
										clickstream to, through and from our site (including date
										and time); products you viewed or searched for; page
										response times, download errors, length of visits to certain
										pages, page interaction information (such as scrolling,
										clicks, and mouse-overs), and methods used to browse away
										from the page and any phone number used to call our customer
										service number;
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										<span className="text_bold">
											information about geo-location
										</span>
										. We may collect information about real-time location based
										information from your device at any time while you download
										or use our services. We may use this information to optimize
										your experience.
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										<span className="text_bold">
											financial data and information on the use of services and
											facilities
										</span>{' '}
										provided by our website, including information on
										implemented transactions and parties thereto, including on
										margin transactions, information on the status and (crypto)
										currency of accounts and cash flow on them, accrued
										commissions, information on crediting and withdrawal of
										funds from our accounts.
									</li>
								</ul>
								<h4>Information we receive from other sources.</h4>
								<p>
									We may receive information about you if you use any of the
									other websites we operate or the other services we provide. We
									are also working closely with third parties (including, for
									example, business partners, sub-contractors in technical,
									payment and delivery services, advertising networks, analytics
									providers, search information providers, credit reference
									agencies) and may receive information about you from them.
								</p>
							</div>
						)}
						{(menuIndex === 1 || width < 768) && (
							<div>
								<h3>2. USE OF COOKIES</h3>
								<p>
									Cookies are typically stored on your computer's hard drive,
									which assigns a unique identification to your computer. We
									also may use cookies stored in emails to help us confirm your
									receipt of, and response to. We also may use service
									provider(s) who will place cookies on the hard drive of your
									computer and will receive information that we select that will
									give us information about the way our users and visitors
									navigate on our site, what products are browsed, and general
									transaction information.
								</p>
								<p>
									Information collected from cookies is used by us to evaluate
									the effectiveness of our site, analyse trends, see what
									difficulties our visitors may experience in accessing our
									site, and administer the platform. We need this information to
									improve the quality of our service.
								</p>
								<p>
									You are agreeing that we may use browser feature known as a
									"cookie" for the purposes set above.
								</p>
							</div>
						)}
						{(menuIndex === 2 || width < 768) && (
							<div>
								<h3>3. WHY WE USE YOUR PERSONAL DATA</h3>
								<h4>
									We are going to use your personal data for the following
									purposes:
								</h4>
								<ul className="agreement_list">
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										to fulfill the obligations provided by any contracts
										concluded with you, as well as to provide you with the
										information, products and services that you requested;
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										to verify and check the identity of users who open and
										operate accounts in order to prevent fraud, deception and
										other illegal activities;
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										to comply with legal requirements for the legalization
										(laundering) of proceeds from crime, financing of terrorism
										and financing the proliferation of weapons of mass
										destruction;
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										to notify you of other our products and services, similar to
										those products or services that you already purchased or
										information that you searched for;
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										to provide you by us or by third parties appointed by us
										with information about products or services that you, in our
										opinion, might be interested in. If you are already our
										customer, we will contact you via electronic means of
										communication (via e-mail or SMS) to inform you about
										products or services similar to those that were in a
										previous sale or negotiations to sell them to you. If you
										are a new customer and since we allow certain third parties
										to use your data, we (or they) will contact you only by
										electronic means and only upon your consent. If you do not
										want us to use your data in this way or transfer it to third
										parties for marketing purposes, please tick the appropriate
										box on the form in which we collect your data;
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										to notify you about changes related to our services;
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										to ensure the most effective presentation of the content of
										our website to you and use it from your computer;
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										for administration of our website and for internal
										operations, including troubleshooting, data analysis,
										testing, statistical data collection and for conducting
										surveys;
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										to improve our website and to make sure that our content is
										most convenient for the operating system of your computer;
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										to give you access to the interactive features of the
										website in case you wish to use them;
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										to ensure the security of our website, our services, and
										your accounts;
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										to evaluate and understand the effectiveness of promotional
										materials that we provide to you and other users, as well as
										to provide you with the necessary advertising information;
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										to support, respond and resolve your complaints and issues
										related to use of our services and the capabilities of our
										website.
									</li>
								</ul>
							</div>
						)}
						{(menuIndex === 3 || width < 768) && (
							<div>
								<h3>4. DISCLOSURE OF YOUR PERSONAL DATA</h3>
								<p>
									We may share your personal information with any member group,
									which means our subsidiaries, our ultimate holding company and
									subsidiaries, as defined in the UK Companies Act 2006.
								</p>
								<h4>
									We may share your information with selected third parties
									including:
								</h4>
								<ul className="agreement_list">
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										business partners, suppliers and sub-contractors for the
										performance of any contract we enter into with them or you;
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										advertisers and advertising networks that require the data
										to select and serve relevant adverts to you and others. We
										do not disclose information about identifiable individuals
										to our advertisers, but we may provide them with aggregate
										information about our users (for example, we may inform them
										that 500 females aged under 30 have clicked on their
										advertisement on any given day). We may also use such
										aggregate information to help advertisers reach the kind of
										audience they want to target (for example, women in SW1). We
										may make use of the personal data we have collected from you
										to enable us to comply with our advertisers' wishes by
										displaying their advertisement to that target audience;
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										analytics and search engine providers that assist us in the
										improvement and optimisation of our site.
									</li>
								</ul>
								<h4>
									We may also disclose your personal data to third parties in
									the following cases:
								</h4>
								<ul className="agreement_list">
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										if we sell or buy any business or assets. Personal data of
										users may be disclosed to a potential buyer or seller;
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										if KoinKoin or all of its assets are purchased by a third
										party, personal data of users will be transferred as one of
										the assets;
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										if we are required to disclose or transfer personal data of
										the user in accordance with any applicable laws or within
										the implementation of decisions of the relevant courts, or
										we are compelled to force users to comply with the terms and
										conditions of the agreements concluded with us; in case it
										is necessary to protect own rights, own property, to
										guarantee the safety of KoinKoin, our users or others. This
										includes the exchange of information with companies and
										organizations to prevent fraud and reduce the likelihood of
										default by borrowers in conducting margin transactions.
									</li>
								</ul>
							</div>
						)}
						{(menuIndex === 4 || width < 768) && (
							<>
								<h3>5. SECURITY AND STORAGE OF PERSONAL DATA</h3>
								<p>
									We have implemented security measures to ensure the
									confidentiality of your personal data and to protect your them
									from loss, misuse, alteration or destruction. Only authorized
									personnel of KoinKoin have access to your personal data, and
									these personnel are required to treat the information as
									confidential. The security measures in place will, from time
									to time, be reviewed in line with legal and technical
									developments.
								</p>
								<p>
									The information we receive from you can be transferred and
									stored outside the European Economic Area (EEA). The
									information about you can be processed by our employees or
									employees of service providers outside the EEA. When storing
									or otherwise processing information by such third parties
									outside the EEA, we guarantee that we will notify such third
									parties of our obligations under this Privacy Policy and will
									enter with them into relations that will impose obligations
									for them regarding your personal data, which are at least have
									level of protection as specified in this Privacy Policy. Such
									employees, among other things, can process your requests,
									payment details and provide technical support. By giving us
									your personal data, you consent to the transfer, storage and
									processing of your personal data. In its turn, we will take
									all necessary measures to ensure that your personal data is
									processed in compliance with the security rules and in
									accordance with the provisions of this Privacy Policy.
								</p>
								<p>
									Unfortunately, the transmission of information via the
									internet is not completely secure. Although we will do our
									best to protect your personal data, we cannot guarantee the
									security of your data transmitted to our site, and any
									transmission is at your own risk. Once we have received your
									information, we will use strict procedures and security
									features to try to prevent unauthorized access.
								</p>
							</>
						)}
						{(menuIndex === 5 || width < 768) && (
							<>
								<h3> 6. BASIS FOR PERSONAL DATA PROCESSING</h3>
								<p>
									We collect and process your personal data only when we have a
									legitimate reason for such processing. Legal grounds include
									consent (in cases where you provide it), a contract (in cases
									where processing is necessary to fulfill the terms and
									conditions of contracts between you and KoinKoin), compliance
									with a legal obligations (in cases where KoinKoin is required
									to request / receive and process as well as to store your
									personal data in order to comply with the requirements of
									applicable laws, for example the laws related to legalization
									(laundering) of proceeds of crime, financing of terrorism and
									financing the proliferation of weapons of mass destruction)
									and legitimate interest (for example, when processing is
									necessary to protect you or us from certain threats (fraud,
									security, etc.), compliance with the provisions of applicable
									laws, the proper level of conduct of our business (the quality
									of the services provided, identification of needs, preparation
									of reports), conclusion and implementation of corporate
									transactions (sale of participant interests / shares, mergers,
									acquisitions), etc.).
								</p>
								<p>
									In cases where the basis for data processing is the consent,
									you have the right to withdraw it at any time.
								</p>
							</>
						)}
						{(menuIndex === 6 || width < 768) && (
							<>
								<h3> 7. YOUR RIGHTS</h3>
								<p>By contacting us you can use the following rights:</p>
								<ul className="agreement_list">
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										the right to delete your data (all or part thereof);
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										the right to change or correct your data, in particular when
										it is incorrectly stated;
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										the right to object or restrict processing of your data;
									</li>
									<li className="agreement_text_node">
										<span className="wrap_ico">
											<i className="fa fa-circle" />
										</span>
										the right to access to your data and / or a copy of your
										data, which you provided to KoinKoin, in a machine-readable
										format.
									</li>
								</ul>
								<p>
									Also, you have the right to prohibit the use of your personal
									data for marketing purposes. Before requesting your personal
									information, we usually inform you that we are going to use
									your data or disclose it to third parties for promotional
									purposes. You can use the right to prohibit the processing of
									your personal data for promotional purposes by putting a tick
									in the relevant field in the questionnaire. You can also
									exercise this right by contacting us at any time.
								</p>
								<p>
									Please note that the implementation of some of your rights,
									depending on the situation, may limit, complicate or
									completely exclude the possibility of further cooperation.
								</p>
								<p>
									Our website can contain active links from / to the websites of
									partner organizations, advertisers and affiliated companies.
									If you are following an active link, please note that other
									websites have their own privacy policies, and we are not
									responsible for the provisions of these policies. Please
									review the privacy policies of these sites before sharing your
									personal information with them.
								</p>
							</>
						)}
						{(menuIndex === 7 || width < 768) && (
							<>
								<h3>8. ACCESS TO PERSONAL DATA</h3>
								<p>
									The Data Protection Act gives you the right to access
									information held about you. Your right of access can be
									exercised in accordance with the Act. Any access request may
									be subject to a fee of £10 to meet our costs in providing you
									with details of the information we hold about you.
								</p>
							</>
						)}
						{(menuIndex === 8 || width < 768) && (
							<>
								<h3>9. RETENTION OF PERSONAL DATA</h3>
								<p>
									We will hold your personal data only for as long as it is
									necessary for us to do so, having regard to the purposes
									described in this privacy policy and our own legal and
									regulatory requirements. In accordance with our record keeping
									obligations we will retain accounts and personal data for, at
									least a period of five years after they are closed by you.
								</p>
								<p>
									We may access your personal data or retain it for a longer
									period if it will be subject to an official request or legal
									obligation, an investigation by the government or an
									investigation into possible violations of our terms and
									conditions, or in other cases to prevent possible harm based
									on our reasonable considerations.
								</p>
							</>
						)}
						{(menuIndex === 9 || width < 768) && (
							<>
								<h3>10. CHANGES TO THIS PRIVACY POLICY</h3>
								<p>
									Any changes we may make to our privacy policy in the future
									will be posted on this page and, where appropriate, notified
									to you by e-mail. Please check back frequently to see any
									updates or changes to our privacy policy.
								</p>
							</>
						)}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Policy;
