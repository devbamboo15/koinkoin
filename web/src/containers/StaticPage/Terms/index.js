import React, { useState, useEffect } from 'react';

const Terms = () => {
	const menu = [
		'TERMS AND DEFINITIONS',
		'SUBJECT OF THE AGREEMENT',
		'ACCESS TO THE SYSTEM, REGISTRATION PROCESS AND CHAT USE',
		'THE ACCOUNT',
		'TRADING DEALS',
		'TYPES OF ORDERS',
		'MARGIN DEALS',
		'DETECTION AND PREVENTION OF ILLEGAL SITE AND SYSTEM USE',
		'RISK WARNING',
		'INTELLECTUAL PROPERTY AND RESTRICTIONS ON SITE AND SYSTEM USE',
		'RESPONSIBILITIES OF THE PARTIES',
		'SPECIAL CONDITIONS',
		'WARRANTIES',
		'LIMITATION OF LIABILITY',
		'INDEMNIFICATION',
		'DISPUTE SETTLEMENT',
		'AMENDMENTS OF THE AGREEMENT',
		'CONCLUDING PROVISIONS',
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
						<h1 className="display-4 text-uppercase mb-5">
							Terms & Conditions
						</h1>
						{(menuIndex === 0 || width < 768) && (
							<div>
								<p>
									KOINKOIN and the third party using the site in the Internet
									network located at{' '}
									<a className="bright_color" href="https://koinkoin.io">
										https://koinkoin.io/
									</a>{' '}
									have concluded the present Agreement on the following
									conditions.
								</p>
								<h3>1. TERMS AND DEFINITIONS</h3>
								<p>
									In the present Agreement the following terms have the meaning
									indicated below, unless otherwise is stipulated:
								</p>

								<p>1.1. Agreement means the present User Agreement.</p>
								<p>
									1.2. Account means functional part of the System that controls
									User’s Funds and operations conducted with them.
								</p>
								<p>
									1.3. Anti-Money Laundering Policy means program on prevention
									of laundering of money derived from criminal activity and
									financing of terrorism, which constitutes an essential part of
									the Agreement which text is available at{' '}
									<a className="bright_color" href="https://koinkoin.io/terms">
										https://koinkoin.com/#/terms
									</a>{' '}
								</p>
								<p>
									1.4. Chat means the System's function intended for instant
									messaging between the Users.
								</p>
								<p>
									1.5. Cryptocurrency means peer-to-peer digital currency that
									has no central issuer and is distributed directly between the
									owners of such currency.
								</p>
								<p>
									1.6. Deal means agreement on onerous alienation of rights on
									Cryptocurrency concluded between the Users of KOINKOIN.
								</p>
								<p>
									1.7. Deposit means a transaction involving a transfer of Funds
									to the Account.
								</p>
								<p>
									1.8. KOINKOIN is KOINKOIN LTD, a legal entity registered
									according to the law of UK, with the registration number
									08345572 of the 3rd of January, 2013, including but not
									limited by employees, officers, directors and shareholders,
									affiliated persons of KOINKOIN LTD. KOINKOIN LTD is wholly
									owned by SJ Finanzmann Limited (hereinafter referred to as
									KOINKOIN) and was incorporated under the International
									Business Companies Act of 1994 of the Republic of Seychelles
									with a company number of 204414 and registered address of
									Global Gateway 8, Rue de la Perl, Providence, Mahe,
									Seychelles. Depending on the context KOINKOIN also may mean
									services, products, web-sites, content and other materials,
									provided by KOINKOIN.
								</p>
								<p>
									1.9. Exchange Rate means relation between the amount of Funds
									and the price offered by the User for Deals of exchanging
									Funds.
								</p>
								<p>
									1.10. Fees mean rewards payed to KOINKOIN by the parties of
									deals and the prices for additional services rendered by
									KOINKOIN constantly available at https://koinkoin.com/#/fees .
								</p>
								<p>
									1.11. Fiat money means government-issued currency that is
									designated as legal tender in its country of issuance on the
									legislative level.
								</p>
								<p>
									1.12. Funds mean Fiat money and Cryptocurrency used during the
									execution of Deals.
								</p>
								<p>
									1.13. Margin Deal means deal executed with the use of the
									Funds provided by to the Client in returned and refundable
									use.
								</p>
								<p>
									1.14. Margin Level means the amount of Funds in the User
									Account necessary for execution of a Margin Deal expressed in
									a percentage ratio to the amount of Funds provided to the
									User.
								</p>
								<p>
									1.15. Order means User's offer to close a Deal on certain
									conditions.
								</p>
								<p>1.16. Parties mean KOINKOIN and the User.</p>
								<p>
									1.17. Personal Cabinet means set of protected pages created as
									a result of the User registration in the System, using which
									the User can to place Orders for further execution of Deals as
									well as instruct the KOINKOIN commissions stipulated by the
									present Agreement. The Personal Cabinet reflects information
									about placed and cancelled Orders, closed Deals, available
									funds and/or Cryptocurrency and other information determined
									by the functions of the Site.
								</p>
								<p>
									1.18. Privacy Policy means rules of collection, storage,
									distribution and protection of personal data that the KOINKOIN
									gets from the Users and that is an essential part of the
									Agreement which text is available at{' '}
									<a className="bright_color" href="https://koinkoin.io/policy">
										https://koinkoin.com/#/policy
									</a>{' '}
									.
								</p>
								<p>
									1.19. Site means set of information, texts, graphic and design
									elements, pictures, photo, video and other fruits of
									intellectual activity, as well as set of computer programs
									contained in the information system which ensures the
									accessibility of this information at{' '}
									<a className="bright_color" href="https://koinkoin.io">
										https://koinkoin.com/
									</a>
									.
								</p>
								<p>
									1.20. Services mean all and any service provided by KOINKOIN.
								</p>
								<p>
									1.21. System means set of software and technical means used by
									the KOINKOIN in automatic mode to process operations conducted
									by the User in his/her Personal Cabinet.
								</p>
								<p>
									1.22. User means capable under personal law natural person or
									business entity formatted in the appropriate legal form
									according to local legislation that use the Site and/or the
									System and has concluded the corresponding Agreement with
									KOINKOIN.
								</p>
								<p>
									1.23. User Account Data means User Data necessary to access
									and use the System – login, password, email and other data
									indicated during the registration process as well as after it.
								</p>
								<p>
									1.24. Withdrawal means a transaction involving a transfer of
									Funds from the User’s Account.
								</p>
								<p>
									1.25. Stopout - forced closure of trading position at a market
									price, in order to protect the financial interests of
									participants in the Marginal Deal from the negative balance of
									the Account.
								</p>
								<p>
									1.26. Leverage is the ratio of the User's own funds to the
									volume of trading operations that it can perform at the
									expense of the Funds granted to it under a Loan agreement.
								</p>
								<p>
									The rest of terms and definitions that can be found in the
									text of the Agreement should be interpreted by the Parties
									according to the legislation of the UK and to the general
									rules of interpretation of such terms accepted in the Internet
									network.
								</p>
								<p>
									The titles of different sections (articles) of the Agreement
									have been put with the only objective to make the text more
									comfortable for the reader and do not have any literal legal
									effect.
								</p>
							</div>
						)}
						{(menuIndex === 1 || width < 768) && (
							<div>
								<h3>2. SUBJECT OF THE AGREEMENT</h3>
								<p>
									2.1. Under the Agreement KOINKOIN renders to the User the
									following services:
									<br />
									<i className="small fa fa-circle" /> grants access to the
									System in order to carry out Deals;
									<br />
									<i className="small fa fa-circle" /> grants access to the
									Account within the System;
									<br />
									<i className="small fa fa-circle" /> gives the possibility to
									carry out Margin deals;
									<br />
									<i className="small fa fa-circle" /> provides information
									necessary for the use of the System and carrying out Deals.
								</p>
								<p>
									2.2. Depending on the User’s place of residence, the User may
									not be able to use all the functions of the Site. It is the
									User’s responsibility to follow those rules and laws in
									his/her place of residence and/or place from which the User
									accesses this Site.
								</p>
								<p>
									2.3. The User acknowledges and agrees that, when completing
									Trading Transactions, he/she is trading with other User, and
									that KOINKOIN is not a counterparty to any trade.
								</p>
								<p>
									2.4. Essential parts of the present Agreement are sections
									dedicated to Privacy policy, Anti-Money Laundering Policy, and
									the Fees.
								</p>
							</div>
						)}
						{(menuIndex === 2 || width < 768) && (
							<div>
								<h3>
									3. ACCESS TO THE SYSTEM, REGISTRATION PROCESS AND CHAT USE
								</h3>
								<p>
									3.1. KOINKOIN grants the User access to the information about
									the System, Currency Rates offered by other Users, closed
									Deals and about placed Orders before the registration process
									is completed.
								</p>
								<p>
									3.2. In order to get access to the System, the User should
									complete the registration process. After that the User will
									get access to the Personal Cabinet created on the basis of the
									User Account Data.
								</p>
								<p>
									3.3. The User is responsible for setting up a password during
									the registration process. The User can change the password any
									time after the registration process is completed. The User
									commits to safeguard password and User Account Data from the
									access of third parties and is the one to determine the best
									way to save this data and take steps to prevent it from being
									discredited. In case of loss or discrediting the password
									and/or the User Account Data as well as in cases when third
									parties illegally obtain access to the User’s Personal
									Cabinet, the User has to inform the KOINKOIN about these
									circumstances by contacting the technical support team
									(support@koinkoin.com). Until KOINKOIN receives the
									corresponding message, all the actions made from the User
									Personal Cabinet will be considered as made by the proper User
									as the holder of the Account.
								</p>
								<p>
									3.4. The User has the right to hold and use only one Personal
									Cabinet and cannot use two or more Personal Cabinets. Such
									actions will be considered as violation of this Agreement.
								</p>
								<p>
									3.5. The User gets access to the Chat after replenishing the
									Account with the sum equal to or exceeding 1000,00 (one
									thousand) USD regardless of the kind of Funds. While using the
									Chat, the User is prohibited to:
									<br />
									<i className="small fa fa-circle" /> insult and threaten other
									users and/or KOINKOIN staff. This is considered as a direct
									violation of the rules of chat use and may result in a
									permanent ban of the User;
									<br />
									<i className="small fa fa-circle" /> use any forms of obscene
									language;
									<br />
									<i className="small fa fa-circle" /> make statements stirring
									up to international dissention, containing violence propaganda
									or offending religious feelings of other Users;
									<br />
									<i className="small fa fa-circle" /> send any kind of external
									links;
									<br />
									<i className="small fa fa-circle" /> text messages in capital
									letters only;
									<br />
									<i className="small fa fa-circle" /> repeatedly text the same
									information or constantly repeat the same phrase;
									<br />
									<i className="small fa fa-circle" /> offer to buy or sell the
									Funds;
									<br />
									<i className="small fa fa-circle" /> advertise products or
									services of other companies;
									<br />
									<i className="small fa fa-circle" /> flood, spam and discuss
									topics that are not related to cryptocurrency or the exchange;
									<br />
									<i className="small fa fa-circle" /> providing false or
									misleading information about exchange.
									<br />
								</p>
							</div>
						)}
						{(menuIndex === 3 || width < 768) && (
							<div>
								<h3>4. THE ACCOUNT</h3>
								<p>
									4.1. After registration in the System the User gets access to
									his/her Account in the Personal Cabinet. The User can operate
									personally using his/her Account and the Personal Cabinet as
									well as instruct the System to execute operations with their
									Account automatically.
								</p>
								<p>
									4.2. The KOINKOIN platform indicates in the Personal Cabinet
									the information necessary for the replenishment of the Account
									and for the withdrawal of Funds from the Account.
								</p>
								<p>
									4.3. To replenish the Account the User has to transfer Funds
									according to the bank details indicated by KOINKOIN in the
									User Personal Cabinet. The User is responsible for paying
									commissions and service fees related to the transfer as well
									as assume the risks of indicating an incorrect bank account
									details.
								</p>
								<p>
									4.4. The Account is considered to be replenished when the
									corresponding amount of money enters the current account of
									KOINKOIN or when a corresponding message appears in the
									KOINKOIN wallet about receiving not less than 6 (six)
									confirmations.
								</p>
								<p>
									4.5. The KOINKOIN platform commits to receive Cryptocurrency
									items from Users, keep them, keep a record of them, execute
									transactions and provide them to the Users upon their request.
								</p>
								<p>
									4.6. The KOINKOIN platform keeps a record of the funds
									transferred to the Account and does not keep Users’ money.
									Money transfers during the Account replenishment as well while
									executing Deals between the Users are carried out by third
									parties (aggregators, payment institutions and other
									facilitators). KOINKOIN is not liable for actions of these
									third parties.
								</p>
								<p>
									4.7. All Account operations are carried out at User’s request.
									The KOINKOIN platform does not accept orders on carrying out
									any operation with the User Account from third persons except
									otherwise is stipulated by the Agreement or other agreements
									between the Parties.
								</p>
								<p>
									4.8. All the Funds placed on the Account belong to the User.
									The KOINKOIN platform cannot block Funds on the Account
									without the order emitted by the User as well as can write-off
									Funds only in cases stipulated by the Agreement.
								</p>
								<p>
									4.9. Interests do not apply to the remainder amount of Funds
									in the User Account, and KOINKOIN is not committed to pay the
									abovementioned interests.
								</p>
								<p>
									4.10. To withdraw Funds from the Account, the User has to fill
									the corresponding form in their Personal Cabinet. The User
									will get a message to the email address indicated during the
									registration process asking to confirm or to deny the
									withdrawal operation. In case the User denies or does not
									confirm the withdrawal, the Funds will remain in the Account.
								</p>
								<p>
									4.11. The System sets some restrictions for Funds withdrawals
									and the User cannot instigate withdraw Funds during 3 (three)
									days after changing User Account Data, which includes changing
									or restoring password, and also changing authorization method.
								</p>
								<p>
									4.12. The User acknowledges and agrees that Deposit and
									Withdrawal Transaction in Fiat currency may be delayed due to
									bank verifications and checks, for a period up to one (1)
									month. Similarly and due to the inherent nature of the
									cryptocurrency networks, the User acknowledges and agrees that
									depositing and withdrawing Cryptocurrencies into/from his/her
									Account may take between one (1) hour and seventy two (72)
									hours, barring unforeseen or unavoidable network issues.
								</p>
								<p>
									4.13. Unverified users are not allowed to withdraw any
									Cryptocurrencies from their Account within forty-eight (48)
									hours after the Account was created.
								</p>
								<p>
									4.14. In case if the User discovers suspicious transaction
									activity, including but not limited to unknown deposits and
									withdrawals, on his/her Account that was not initiated by the
									User, the User shall immediately notify KOINKOIN of this fact
									and follow the instructions sent by KOINKOIN. Otherwise,
									KOINKOIN reserves the right to freeze the Account until the
									end of investigation.
								</p>
								<p>
									4.15. KOINKOIN may be forced to cancel or recall already
									executed Withdrawal Transaction at a request of financial
									institutions, including but not limited to banks, which are
									involved in settlement related to deposit and withdrawal of
									Funds from User`s Accounts. In such cases the User is obliged
									to cooperate with KOINKOIN in order to discover the reasons
									for such request.
								</p>
							</div>
						)}
						{(menuIndex === 4 || width < 768) && (
							<>
								<h3>5. TRADING DEALS</h3>
								<p>
									5.1. The Deals in the System are made on the basis of Orders
									placed by the User and according to the conditions stipulated
									by the Parties, taking into consideration the preliminary
									conditions of the agreement on onerous alienation of rights to
									Cryptocurrency. KOINKOIN in no circumstances should be
									considered the dealing party. All the Deals are conducted
									between the Users on the information support of KOINKOIN.
								</p>
								<p>
									5.2. The User recognizes that an Order shall only be submitted
									after careful consideration and understands and accepts
									consequences of its execution.
								</p>
								<p>
									5.3. KOINKOIN charges reward for the execution of Deals. The
									commission rewards are determined by the Fees.
								</p>
								<p>
									5.4. To place an Order The User has to replenish the Account
									for the amount indicated in the Order and fill the
									corresponding form in the page ‘Trades’ or ‘Exchange’
									depending on the Order type that can be consulted in the
									section 6 of the present Agreement.
								</p>
								<p>
									5.5. The User’s Order is registered in the System after
									verifying the availability of required amount of Funds on the
									Account. KOINKOIN controls the possibility of Users to carry
									out transactions and by this strengthens confidence between
									the Users and reduces the risk of non-execution of Users’
									obligations under the Deals. The System does not register the
									Order if the Account does not have enough Funds for conducting
									the Deal.
								</p>
								<p>
									5.6. User cannot place more than 20 (twenty) Orders at the
									same time. The System does not register Orders that exceed the
									indicated amount.
								</p>
								<p>
									5.7. The User can call back the Order at any moment until its
									full execution.
								</p>
								<p>
									5.8. All the Users can consult an Order until it is fully
									executed or called back. Placed Order represents a User’s
									proposal to close a Deal.
								</p>
								<p>
									5.9. The Deal on the placed Order is closed when the System
									registers a Counter Order placed by another User. Counter
									Orders are reverse orders that have the same Exchange Rate.
									The registration of counter orders in the System is considered
									the User’s acceptance of the offer. The Order is considered
									executed at the moment of the counter order registration in
									the System.
								</p>
								<p>
									5.10. Order can be executed partially. If this happens the
									System will place another Order for the amount of unencumbered
									balance of the originally placed Order.
								</p>
								<p>
									5.11. The execution of the Order is realized by transferring
									the corresponding Funds indicated in counter orders to Users
									Accounts. Transfer of these Funds is made automatically by the
									System. Herewith the actions realized by the System are
									considered to have been realised at Users request.
								</p>
								<p>
									5.12. Such actions as placing Orders, calling them back and
									closing the Deals are reflected in the User Personal Cabinet.
								</p>
								<p>
									5.13. The information about the closed Deals is available for
									all the Users during a period of time determined by the
									KOINKOIN platform.
								</p>
							</>
						)}
						{(menuIndex === 5 || width < 768) && (
							<>
								<h3>6. TYPES OF ORDERS</h3>
								<p>6.1. Simple buy order</p>
								<p>
									6.1.1. A simple buy Order represents the User’s offer to buy a
									certain amount of Funds at the Exchange Rate set by the User.
								</p>
								<p>
									6.1.2. To place a simple buy Order the User has to fill the
									corresponding form in the Personal Cabinet indicating the
									amount of Funds to buy and setting the Exchange Rate.
								</p>
								<p>
									6.1.3. A simple buy Order can be executed at a lower Exchange
									Rate than the one indicated in the placed Order. Herewith the
									User will be refunded with the excessively paid part of the
									commission. A simple buy Order cannot be executed at a higher
									Exchange Rate than the one indicated in the placed Order.
								</p>
								<p>6.2. Simple sell Order</p>
								<p>
									6.2.1. A simple sell Order represents the User’s offer to sell
									a certain amount of Funds at the Exchange Rate set by the
									User.
								</p>
								<p>
									6.2.2. To place a simple sell Order the User has to fill the
									corresponding form in the Personal Cabinet indicating the
									amount of Funds to sell and setting the Exchange Rate.
								</p>
								<p>
									6.2.3. When placing a simple sell Order the User has the
									possibility to use additional functions of the System like
									‘Stop Loss’ or ‘Trailing Stop’. Marking a special box opposite
									the corresponding field in the form for placing a simple sell
									Order is considered the ground for using these functions.
								</p>
								<p>
									6.2.4. To use ‘Stop Loss’ the User has to indicate in the form
									the minimum price at which the Order can be executed. If the
									System Exchange Rate falls the placed Order will be executed
									when reaches the value indicated by the User in the box ‘Stop
									Loss’.
								</p>
								<p>
									6.2.5. To use ‘Trailing Stop’ the User has to indicate in the
									form the amount of Funds to sell as well as ‘Trailing Stop’
									and ‘Stop Loss’ values. The Funds will be offered for sale at
									a highest current Exchange Rate determined by the System. If
									the System Exchange Rate starts to raise and will increment by
									the value indicated in the box ‘Trailing Stop’, the Exchange
									Rate for the Order placed by the User will increment by a
									corresponding amount. Herewith ‘Stop Loss’ index will
									increment by the amount indicated in the box ‘Trailing Stop’.
								</p>
								<p>6.3. Market buy Order</p>
								<p>
									6.3.1. A market buy Order represents the User’s offer to buy a
									certain amount of Funds without setting the Exchange Rate.
								</p>
								<p>
									6.3.2. To place a market buy Order the User has to fill the
									corresponding form in the Personal Cabinet indicating the
									amount of Funds to buy.
								</p>
								<p>
									6.3.3. The Order will be executed at the lowest Exchange Rate
									found among the Orders placed by other Users.
								</p>
								<p>
									6.3.4. The KOINKOIN reward for the operation will be charged
									immediately at the moment of Deal closure.
								</p>
								<p>6.4. Market sell Order</p>
								<p>
									6.4.1. A market sell Order represents the User’s offer to sell
									a certain amount of Funds without setting the Exchange Rate.
								</p>
								<p>
									6.4.2. To place a market sell Order the User has to fill the
									corresponding form in the Personal Cabinet indicating the
									amount of Funds to sell.
								</p>
								<p>
									6.4.3. The Order will be executed at the highest Exchange Rate
									found among the Orders placed by other Users.
								</p>
								<p>
									6.4.4. The KOINKOIN reward for the operation will be charged
									immediately at the moment of Deal closure.
								</p>
								<p>6.5. Complex buy and sell Order</p>
								<p>
									6.5.1. A complex buy and sell Order represents the User’s
									offer to buy a certain amount of Funds at the Exchange Rate
									set by the User and to sell the acquired amount of Funds at
									the Exchange Rate set by the User. So, when the User places a
									complex buy and sell Order, the System in its turn places
									firstly a simple buy Order and when it is executed, places a
									simple sell Order.
								</p>
								<p>
									6.5.2. To place a complex buy and sell Order the User has to
									fill the corresponding form in the Personal Cabinet indicating
									the amount of Funds to buy and setting the Exchange Rate as
									well as setting the Exchange Rate to be used during the sale
									of the acquired Funds.
								</p>
								<p>
									6.5.3. This type of Order is governed by a set of rules
									elaborated for simple buy Order and simple sell Order with
									specificities related to complex buy and sell Order.
								</p>
							</>
						)}
						{(menuIndex === 6 || width < 768) && (
							<>
								<h3>7. MARGIN DEALS</h3>
								<p>
									7.1. In certain cases stipulated by the Agreement the KOINKOIN
									gives the User a possibility to make a Margin Deal.
								</p>
								<p>
									7.2. It is possible to make a Margin Deal using the following
									Order types:
								</p>
								<p>7.2.1. Simple sell Order;</p>
								<p>7.2.2. Simple buy Order;</p>
								<p>
									7.2.3. Complex buy and sell Order but only during the purchase
									phase.
								</p>
								<p>
									7.3. Providing of any actions envisaged by the System's
									functionality aimed at concluding a Marginal Deal (marking in
									the "Loan"/ "Take a Loan" field, etc.) means the User's
									consent to the conditions for the implementation of Marginal
									Transactions.
								</p>
								<p>
									7.4. The loan agreement is considered concluded from the
									moment of crediting of Funds to the Account of the User.7.5.
									The funds are provided to Users on a refundable and onerous
									basis.
								</p>
								<p>
									7.5. The funds are provided to Users on a refundable and
									onerous basis.
								</p>
								<p>
									7.6. The User should have the necessary margin Level on their
									Account in order to make a Margin Deal.
								</p>
								<p>
									7.7. Margin Level amounts to 100% (one hundred percent) of the
									amount of provided Funds for the Margin Deal. Margin Level can
									be changed at the agreement with the KOINKOIN but cannot be
									lower than 25% (twenty five percent) of the amount of provided
									Funds.
								</p>
								<p>
									7.8. In case the Margin Deal is closed on the parameters set
									by the User in the placed Order, the System writes off the
									User Account the amount of Funds equivalent to the amount of
									Funds provided on the basis of loan agreement as well as the
									corresponding commission. The amount of commission is
									determined by the Fees.
								</p>
								<p>
									7.9. In case the User acquires a debt as a result of making a
									Margin Deal, the KOINKOIN has the right to restrict the use of
									Personal Cabinet until the User replenishes his/her Account
									for a sum equivalent to the amount of the debt. Herewith the
									User is obliged to replenish the corresponding Account during
									5 (five) working days from the moment of acquiring these
									liabilities.
								</p>
								<p>
									7.10. In case of risk that the Margin Level on the User
									Account can result insufficient, the KOINKOIN has the right,
									at sole discretion and without previously notifying the User,
									to decide on the immediate execution of the Order or call it
									back. The above mentioned actions are not considered as a
									violation of obligations on behalf of the KOINKOIN.
								</p>
								<p>
									7.11. The User agrees that KOINKOIN has the right to execute a
									stop-loss at a Margin Level of less than 30% at a 1: 2
									leverage, and this action is not a violation of the
									obligations of KOINKOIN.
								</p>
								<p>
									7.12. Tracking changes in the conditions for execution of
									Marginal transactions and compliance with the performance of
									margin requirements is a direct duty of the client. KOINKOIN
									is not liable for any losses that may result from a lack of
									information or untimely disclosure of the margin requirement.
									KOINKOIN does not have to inform the User in any way about the
									execution of the stop-loss (s), or about the sale or
									liquidation of the User's Funds from his Account in the
									System, if such account is not replenished as a result of
									arrears.
								</p>
							</>
						)}
						{(menuIndex === 7 || width < 768) && (
							<>
								<h3>
									8. DETECTION AND PREVENTION OF ILLEGAL SITE AND SYSTEM USE
								</h3>
								<p>
									8.1. The User is prohibited to conduct Deals omitting the
									formal procedure of placing Orders by means of using personal
									messages and other options of the Site and/or the System. In
									these cases a message ceases to be private and becomes
									available for moderators and the administration if one of chat
									users complaints about it.
								</p>
								<p>
									8.2. The User is prohibited to use the Site and/or the System
									in any other way than those stipulated in the Agreement; in
									particular, the User is not allowed to advertise products on
									the Site in case the Parties have not entered an additional
									specific agreement.
								</p>
								<p>
									8.3. The User is prohibited to use the Site and/or the System
									with unlawful aims including laundering of money derived from
									criminal activity, financing of terrorism and involvement in
									extremist activity.
								</p>
								<p>
									8.4. The User is obliged to go through the identification
									process established by the System or third parties
									(aggregators, credit or other organs) during the Deal-making
									process as well as fulfil the requirements stipulated by UK
									law in the field of counteraction of laundering
									(legitimisation) proceeds of crime.
								</p>
							</>
						)}
						{(menuIndex === 8 || width < 768) && (
							<>
								<h3>9. RISK WARNING</h3>
								<p>
									9.1. The User guarantees that he/she understands general
									principles of work with Cryptocurrencies and is aware of
									Cryptocurrency of the following characteristics affecting its
									value and risks related to it:
									<br />
									<i className="small fa fa-circle" /> Price volatility: The
									value of cryptocurrencies is extremely volatile. They are
									vulnerable to sharp changes in price due to unexpected events
									or changes in market sentiment.
									<br />
									<i className="small fa fa-circle" /> Leverage: Leverage
									multiplies User’s profits but also potential losses and can
									have a significant impact on fees. It also places User at risk
									of losing more than his/her initial investment.
									<br />
									<i className="small fa fa-circle" /> Charges and funding
									costs: Charges and Fees can include the spread, funding
									charges, and commissions.
									<br />
									<i className="small fa fa-circle" /> Price transparency: When
									compared with fiat currencies, there can be more significant
									variations in the pricing of cryptocurrencies used to
									determine the value of User’s position. There is a greater
									risk that the User will not receive a fair and accurate price
									for the underlying cryptocurrency when trading.
								</p>
								<p>
									9.2. User should only participate in trading deals if he/she
									has a sophisticated knowledge of financial markets and fully
									understands the risks associated with cryptocurrencies.
								</p>
								<p>
									9.3. The User guarantees that he/she has a right to execute
									transactions with Cryptocurrency and possesses a full legal
									capacity.
								</p>
								<p>
									9.4. The User understands that KOINKOIN in no way influences
									the Exchange Rate set by the Users, does not give
									recommendations on Exchange Rate determination and does not
									forecast the rates. The User is responsible for all economic
									risks related to choosing particular Exchange Rate. The
									KOINKOIN does not guarantee that the Deal will be finally
									closed and that the conditions of this Deal will be of the
									User’s benefit.
								</p>
								<p>
									9.5. The User understands that the KOINKOIN in no way bear’s
									relation to deal conduction and/or transactions related to
									Cryptocurrency. Correspondingly the KOINKOIN does not assume
									the responsibility to guarantee terms and/or possibilities of
									carrying out this or that operation and/or transaction related
									to Cryptocurrency, which are necessary for Deal making.
								</p>
								<p>
									9.6. The User understands that all the operations with
									Cryptocurrency have irreversible character and that Funds
									acquired during the Deal can be returned only on the basis of
									additional specific agreement with other User.
								</p>
							</>
						)}
						{(menuIndex === 9 || width < 768) && (
							<>
								<h3>
									10. INTELLECTUAL PROPERTY AND RESTRICTIONS ON SITE AND SYSTEM
									USE
								</h3>
								<p>
									10.1. The Site and the System contain fruits of intellectual
									labour that belongs to KOINKOIN, affiliated persons and other
									related parties, sponsors, partners, representatives, all the
									parties acting on behalf of KOINKOIN and other third parties.
								</p>
								<p>
									10.2. By using the Site and the System the User acknowledges
									and agrees that all Site content and the structure of Site
									content are protected by copyright, trademark and other rights
									concerning the results of intellectual activity, and that the
									abovementioned rights are authentic and are protected in their
									every form, in all carriers and regarding all existing and
									created later technologies. No rights as well as no Site nor
									System content are committed to the User as a result of Site
									and System use or on the conclusion of the Agreement.
								</p>
								<p>
									10.3. To avoid any misunderstanding the User is prohibited to:
									<br />
									<i className="small fa fa-circle" /> copy and/or diffuse any
									items of intellectual property published on the Site and/or in
									the System except when this function is clearly contemplated
									by the Site and/or the System;
									<br />
									<i className="small fa fa-circle" /> copy or use in any other
									way the program part of the Site and/or the System as well as
									its design;
									<br />
									<i className="small fa fa-circle" /> diffuse on the Site
									and/or in the System personal data of third persons without
									their permission;
									<br />
									<i className="small fa fa-circle" /> change in any way the
									program part of the Site and/or the System, take any actions
									aimed at changing the functionality and operability of the
									Site and/or the System;
									<br />
									<i className="small fa fa-circle" /> use insults or any words
									violating rights and liberties of third persons as a login
									(nickname, alias) during the registration.
								</p>
							</>
						)}
						{(menuIndex === 10 || width < 768) && (
							<>
								<h3>11. RESPONSIBILITIES OF THE PARTIES</h3>
								<p>
									11.1. In case the User violates the conditions of the present
									Agreement, the legislation of the UK, morality norms or in
									case he/she conspires with another User to violate the
									conditions of the Agreement, the KOINKOIN will have the right
									to block or delete the User’s Personal Cabinet, prohibit or
									restrict their access to certain or all functions of the
									System using his/her Personal Cabinet.
								</p>
								<p>
									11.2. In case the User violates the terms of the return of
									Funds provided under the Marginal Deal, KOINKOIN is entitled
									to demand from the User payment of a penalty amounted to 1%
									(one percent) of the Funds provided to the User for each day
									of delay.
								</p>
								<p>
									11.3. If the KOINKOIN detects that the User has violated
									paragraph 8 of the present Agreement, the KOINKOIN will have
									the right to delete the User’s Personal Cabinet and demand
									indemnity for losses.
								</p>
								<p>
									11.4. The KOINKOIN is not responsible for the operability of
									the Site and/or the System and does not guarantee its
									continuous operation. The KOINKOIN does not guarantee the
									safety of the information published on the Site and/or in the
									System as well as does not guarantee the possibility of
									continuous access to the information about Orders and closed
									Deals, the possibility of Order placement and of making Deals.
								</p>
								<p>
									11.5. The User uses the Site and the System in its original
									form at his/her own risk. The KOINKOIN does not guarantee the
									achievement of any results by the User owing to the Site
									and/or System use.
								</p>
								<p>
									11.6. The KOINKOIN does not guarantee that the Site and the
									System satisfy the requirements of the User as well as does
									not guarantee continuous, fast, save and error-free access to
									the Site and/or the System.
								</p>
							</>
						)}
						{(menuIndex === 11 || width < 768) && (
							<>
								<h3>12. SPECIAL CONDITIONS</h3>
								<p>
									12.1. The Site and the System can contain external links to
									other sites in the Internet network (third parties’ sites).
									The abovementioned third parties’ sites and their content are
									not checked by criteria of conformity with certain
									requirements (authenticity, completeness, legality, etc.). The
									KOINKOIN will not be liable for the information and the
									materials published on third parties’ sites, which the User
									can access via the Site and/or the System as well as does not
									assume any responsibility for expressed opinions or
									statements, advertising materials, the accessibility and
									possible consequences of use of third parties’ sites.
								</p>
								<p>
									12.2. The KOINKOIN has the right to transfer rights and debts
									under all obligations derived from the Agreement. By accepting
									the present Agreement the User gives their consent on
									transferring rights and debts to any third party. In case of
									rights and/or debts are transferred, the KOINKOIN will inform
									the User about it leaving the corresponding message on the
									Site and/or in the System.
								</p>
								<p>
									12.3. Given the specifics of transactions, KOINKOIN does not
									implement a chargeback policy. However, KOINKOIN has developed
									and implemented a detailed Cross-Chain Recovery Policy, which
									provides a detailed guideline in the cases where an erroneous
									deposit of one cryptocurrency into wallet address instead of
									another cryptocurrency is made by the User. The recovery of
									Cross-chain deposits is an inherently dangerous and a very
									time consuming process. Not all deposits can be recovered and
									dependent on which currency has been mistakenly sent to which
									address can influence difficulty, time and security risk
									involved.
								</p>
								<p>
									12.4. Making a transaction, the User agrees and carries the
									entire risk on the transaction. To KOINKOIN cannot be made any
									claims for the cancellation of the Transaction. KOINKOIN does
									not accept or process applications from anyone for the return
									and / or cancellation of an operation.
								</p>
							</>
						)}
						{(menuIndex === 12 || width < 768) && (
							<>
								<h3>13. WARRANTIES</h3>
								<p>
									13.1. Neither KOINKOIN nor its affiliates make any specific
									promises about functioning of the Site and/or System. For
									example, KOINKOIN does not make any commitments about the
									content of the Site, the specific functions of the System, or
									their reliability, availability or ability to meet the User’s
									needs. KOINKOIN provides the Site and System "AS IS".
								</p>
								<p>
									13.2. To the extent permitted by law KOINKOIN excludes all
									warranties, guarantees, conditions, representations, and
									undertakings.
								</p>
							</>
						)}
						{(menuIndex === 13 || width < 768) && (
							<>
								<h3>14. LIMITATION OF LIABILITY</h3>
								<p>
									14.1. To the extent permitted by law neither KOINKOIN nor
									KOINKOIN'S affiliates, and KOINKOIN'S suppliers and
									distributors will be responsible for lost profits, revenues,
									financial losses, indirect, special, consequential, exemplary
									damages.
								</p>
								<p>
									14.2. To the extent permitted by law the total amount of
									KOINKOIN liability, its affiliates, and KOINKOIN'S suppliers
									and distributors is limited to the amount you paid to KOINKOIN
									for all Services provided during 3 (three) months prior to the
									event giving rise to the liability.
								</p>
								<p>
									14.3. KOINKOIN, its affiliates, and KOINKOIN'S suppliers and
									distributors will not be liable for any expense, loss or
									damage that is not reasonably foreseeable.
								</p>
							</>
						)}
						{(menuIndex === 14 || width < 768) && (
							<>
								<h3>15. INDEMNIFICATION</h3>
								<p>
									15.1. The User agrees to defend, indemnify and hold KOINKOIN,
									its affiliates and their respective employees, officers,
									directors and stockholders harmless from and against any and
									all damages claimed by a third party as a result of actions by
									User in violation of this Agreement. The User agrees to
									defend, indemnify and hold KOINKOIN, its affiliates and their
									respective employees, officers, directors and stockholders
									harmless from and against any and all damages for damages to
									property, bodily injury, death, or other injuries arising from
									the negligence or misconduct of the User or any person for
									whom User is legally responsible.
								</p>
								<p>
									15.2. The party seeking indemnification in any case shall
									promptly give written notice to the other of the claim for
									which indemnification is sought and shall cooperate with the
									other party in the defence of such an action or suit. The
									failure to give or delay in giving any such notice shall not
									limit the indemnifying party's rights hereunder except to the
									extent it is prejudiced thereby. The indemnifying party shall
									have the right, at its expense, to direct any such legal
									proceeding and the negotiation and settlement of any such
									claim or demand. The indemnifying party shall have no
									liability for any settlement made without its consent or for
									any fees or expenses incurred by the other party after the
									indemnifying party begins directing the legal proceeding.
								</p>
							</>
						)}
						{(menuIndex === 15 || width < 768) && (
							<>
								<h3>16. DISPUTE SETTLEMENT</h3>
								<p>
									16.1. The Parties will tend to solve all disputes, differences
									and claims that can arise out of the execution, termination or
									cancellation of the Agreement by means of negotiations. The
									Party that has some claims should send a notification to the
									other Party describing the arisen claims and/or differences.
								</p>
								<p>
									16.2. The Party in default on its obligations hereunder shall
									promptly cure the breach and take due measures to eliminate
									the consequences. Any dispute arising out of or in connection
									with this Agreement (including a dispute regarding the
									existence, validity or termination of this Agreement or the
									consequences of its nullity) shall be referred to and finally
									resolved by arbitration under the Arbitration Rules of the
									London Court of International Arbitration
								</p>
								<p>
									16.3. If any dispute occurs as to the performance or
									interpretation of the present Agreement that cannot be
									resolved amicably or in arbitration the Company is entitled to
									demand the dispute be settled by the Court in location where
									the KOINKOIN resides.
								</p>
							</>
						)}
						{(menuIndex === 16 || width < 768) && (
							<>
								<h3>17. AMENDMENTS OF THE AGREEMENT</h3>
								<p>
									17.1. The Service has the right to unilaterally change the
									terms of the Agreement, Privacy Policy, Anti-Money Laundering
									Policy and the Fees. The changes take effect 3 (three) days
									after the moment the new version of corresponding documents is
									published.
								</p>
								<p>
									17.2. At each successive visit to the Site and before starting
									the use of the Personal Cabinet the User commits to become
									familiar with the new version of the Agreement, Privacy
									Policy, Anti-Money Laundering Policy and the Fees. If the User
									continues to use the Site and the System it will mean that
									he/she agrees with new versions of the corresponding
									documents.
								</p>
								<p>
									17.3. If the User does not accept new terms of the Agreement,
									Privacy Policy, Anti-Money Laundering Policy and the Fees,
									he/she should stop using the Site having closed the Deals with
									other Users.
								</p>
							</>
						)}
						{(menuIndex === 17 || width < 768) && (
							<>
								<h3>18. CONCLUDING PROVISIONS</h3>
								<p>
									18.1. With the exception to the cases defined by the Agreement
									and the current legislation, all the notifications, messages
									and documents related to the fulfilment of obligations from
									the Agreement should be sent to and are considered as received
									by the Parties if they have been sent via email from the
									authorized address of one Party to the authorized address of
									the other Party. An authorised address can be:
									<br />
									<i className="small fa fa-circle" /> for the User: the email
									address indicated in the User Personal Cabinet;
									<br />
									<i className="small fa fa-circle" /> for KOINKOIN:{' '}
									<a
										className="bright_color"
										href="mailto:support@koinkoin.com"
									>
										support@koinkoin.com
									</a>
									.<br />
								</p>
								<p>
									18.2. KOINKOIN and all legal relations concerning it are
									regulated by the legislation of the UK without taking into
									account its conflict rules. Any disputes are solved according
									to the legislation of the UK.
								</p>
								<p>
									18.3. If any clause of the Agreement is found void and
									unenforceable by a court decision, it will not affect the
									validity of other clauses of the Agreement, which shall remain
									valid and enforceable.
								</p>
							</>
						)}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Terms;
