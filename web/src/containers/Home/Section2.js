import React from 'react';
import { browserHistory } from 'react-router';
import CommonButton from '../../components/CommonButton';
import AnimationContainer from '../../components/AnimationContainer';
// import LeadingFeatures from './LeadingFeatures';
import STRINGS from '../../config/localizedStrings';
import Image from 'components/Image';

const Section2 = ({ style }) => {
	const onClickSignupBtn = () => {
		browserHistory.push('/signup');
	};

	const onClickViewMarketBtn = () => {
		browserHistory.push('/trade/add/tabs');
	};

	return (
		<div className="my-5 section_2 text-dark" style={style}>
			<div className="animate-container">
				<img src={'/assets/background-animate-pattern.jpg'} alt="" />
			</div>
			<AnimationContainer>
				<div className="section-detail-item my-5 py-5">
					<div className="image">
						<img src={'/assets/home/home_box.svg'} alt="" width="150px" />
					</div>
					<h3 className="font-weight-bold mt-5 mb-0">
						ENGINEERED WITH THE LATEST TECHNOLOGY
					</h3>
					<p className="lead text-muted">
						Keeping ahead and staying up to date with the very best trading
						technology available
					</p>
					<div className="action-group">
						<CommonButton label="MORE INFO" />
						<CommonButton
							label="SIGN UP"
							onClick={onClickSignupBtn}
							animationEffect={true}
						/>
					</div>
				</div>
			</AnimationContainer>
			<AnimationContainer>
				<div className="section-detail-item my-5 py-5">
					<div className="image">
						<img src={'/assets/home/home_hand.png'} alt="" />
					</div>
					<h3 className="font-weight-bold mt-4 mb-0">FOR EVERYONE</h3>
					<p className="lead text-muted">
						Building a Borderless World Through International Crypto exchange
						trading
					</p>
					<div className="action-group">
						<CommonButton label="MORE INFO" />
					</div>
				</div>
			</AnimationContainer>
			<AnimationContainer>
				<div className="section-detail-item my-5 py-5">
					<div className="image">
						<img src={'/assets/home/home_search.png'} width="200px" alt="" />
					</div>
					<h3 className="font-weight-bold mt-0 mb-0">BEST LIQUIDITY</h3>
					<p className="lead text-muted">
						Trade your local currencies against BTC and other major crypto
						assets
					</p>
					<div className="action-group">
						<CommonButton label="VIEW MARKET" onClick={onClickViewMarketBtn} />
					</div>
				</div>
			</AnimationContainer>
			<AnimationContainer>
				<div
					className="d-flex justify-content-center align-items-center flex-column text-dark my-5"
					style={{ fontSize: '15px' }}
				>
					<h1 className="display-5 font-weight-bold my-5 text-uppercase text-center">
						KoinKoin Corporate OTC Trading
					</h1>
					<div className="d-flex flex-column text-center mt-2 mx-5 px-5">
						<div className="row px-5">
							<div className="col p-5 m-3 shadow-lg bg-white rounded">
								<Image
									icon="/assets/icons/00/handshake-icon.png"
									wrapperClassName="width-50px mb-4"
								></Image>
								<h3>{STRINGS['HOME.SECTION_5_CARD_1_TITLE']}</h3>
								<p className="lead">{STRINGS['HOME.SECTION_5_CARD_1_TEXT']}</p>
							</div>
							<div className="col p-5 m-3 shadow-lg bg-white rounded">
								<Image
									icon="/assets/icons/00/perfermence_icon.png"
									wrapperClassName="width-50px mb-4"
								></Image>
								<h3>{STRINGS['HOME.SECTION_5_CARD_2_TITLE']}</h3>
								<p className="lead">{STRINGS['HOME.SECTION_5_CARD_2_TEXT']}</p>
							</div>
							<div className="col p-5 m-3 shadow-lg bg-white rounded">
								<Image
									icon="/assets/icons/00/dollar-sign.jpg"
									wrapperClassName="width-50px mb-4"
								></Image>
								<h3>{STRINGS['HOME.SECTION_5_CARD_3_TITLE']}</h3>
								<p className="lead">{STRINGS['HOME.SECTION_5_CARD_3_TEXT']}</p>
							</div>
						</div>
						<div className="row px-5">
							<div className="col p-5 m-3 shadow-lg bg-white rounded">
								<Image
									icon="/assets/icons/00/auditable-transactions2.png"
									wrapperClassName="width-50px mb-4"
								></Image>
								<h3>{STRINGS['HOME.SECTION_5_CARD_4_TITLE']}</h3>
								<p className="lead">{STRINGS['HOME.SECTION_5_CARD_4_TEXT']}</p>
							</div>
							<div className="col p-5 m-3 shadow-lg bg-white rounded">
								<Image
									icon="/assets/icons/00/deal-confidentiality.jpg"
									wrapperClassName="width-50px mb-4"
								></Image>
								<h3>{STRINGS['HOME.SECTION_5_CARD_5_TITLE']}</h3>
								<p className="lead">{STRINGS['HOME.SECTION_5_CARD_5_TEXT']}</p>
							</div>
							<div className="col p-5 m-3 shadow-lg bg-white rounded">
								<Image
									icon="/assets/icons/00/certificate-icon.png"
									wrapperClassName="width-50px mb-4"
								></Image>
								<h3>{STRINGS['HOME.SECTION_5_CARD_6_TITLE']}</h3>
								<p className="lead">{STRINGS['HOME.SECTION_5_CARD_6_TEXT']}</p>
							</div>
						</div>
					</div>
				</div>
			</AnimationContainer>
			<AnimationContainer>
				<div className="section-detail-item my-5 py-5">
					<h1 className="display-5 font-weight-bold my-5 text-uppercase">
						KoinKoin Fiat Partners
					</h1>
					<div className="supported-cards-row m-5 d-flex col-md-9 col-sm-12">
						<div className="supported-card-item shadow-lg bg-white rounded">
							<div className="logo">
								<img src={'/assets/home/paystack.png'} alt="" />
							</div>
							<p className="lead text-center">
								Paystack provides us with a modern, frictionless, payment
								process. Our integration with paystack allows you to painlessly
								deposit your currency whilst keeping your financial details
								highly secure. Your payments are automatically routed through
								the most optimal channels, ensuring the highest transaction
								success rates in the market.
							</p>
						</div>
						<div className="supported-card-item shadow-lg bg-white rounded">
							<div className="logo">
								<img
									src={'/assets/home/koinal.png'}
									style={{ width: '60%' }}
									alt=""
								/>
							</div>
							<p className="lead text-center">
								Koinal provides you with 24/7 instant access to Bitcoin,
								Ethereum, Litecoin, Bitcoin Cash and Ripple liquidity. You can
								buy coin instantly with your debit/credit cards and wire
								transfers. With Koinal you'll have a peace of mind - your
								sensitive financial details are never shared with others and
								your payments are protected by sophisticated fraud monitoring
								and advanced encryption.
							</p>
						</div>
						<div className="supported-card-item shadow-lg bg-white rounded">
							<div className="logo">
								<img src={'/assets/home/ipaytotal.png'} alt="" />
							</div>
							<p className="lead text-center">
								iPaytotal are a London-based company that take security of your
								money to a very advanced level. They monitor transactions in
								real-time allowing you the peace of mind to make deposits and
								purchase cryptocurrency from any location in the world.
							</p>
						</div>
						<div className="supported-card-item shadow-lg bg-white rounded">
							<div className="logo">
								<img src={'/assets/home/flutterwave.png'} alt="" />
							</div>
							<p className="lead text-center">
								KoinKoin has partnered with Flutterwave to create a seamless
								fiat-to-crypto gateway for Africa. Flutterwave provides access
								to numerous regions in Africa allowing our users to take
								advantage of local payment methods to purchase cryptocurrency at
								Lightningfast speeds and over secure channels and gateways.
							</p>
						</div>
					</div>
				</div>
			</AnimationContainer>
		</div>
	);
};

export default Section2;
