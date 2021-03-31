import React, { Component } from 'react';

class AboutUs extends Component {
	render() {
		return (
			<main className="about-us-page py-5">
				<div className="container">
					<div className="contact-header d-flex justify-content-center text-center p-4">
						<h1 className="display-4 text-uppercase m-0">About Us</h1>
					</div>
					<div id="about-us">
						<div className="row justify-content-center text-center">
							<div className="col col-12 col-md-10 col-lg-8">
								{/* <h1 className="page-title mt-5 mb-5">ABOUT US</h1> */}
								<p className="mt-5">
									KoinKoin was created by a team of individuals who are
									passionate about business in Africa & Asia and it is our
									intention to meet as many individual traders across both
									regions at their point of need. Are you a Kenyan completing
									business in Malaysia? Are you a small business buying goods
									from Nigeria? Whatever your need is with regards
									cryptocurrencies and local currencies, KoinKoin is here to
									help!
								</p>
							</div>
						</div>
					</div>
					<div className="our-goal p-4 mt-5 pt-5">
						<div className="desc">
							<h2 className="text-dark">Our Goal</h2>
							<p>
								KoinKoin’s continuing mission is to bolster small businesses and
								empower individuals using blockchain technology.
							</p>
							<h2 className="text-dark mt-5"> What Makes KoinKoin Unique?</h2>
							<p>
								We provide a secure, Lightningfast and seamless service at very
								low cost to individuals and small businesses across Africa who
								wish to benefit from the expediency of our cryptocurrency
								exchange services. Our easy to use e-wallet services allows you
								to convert and send your LOCAL currency into cryptocurrency
								which is accepted in many regions all over the world as a form
								of payment for your goods and services or for goods and services
								you wish to purchase from anywhere in the world where BTC and
								other cryptocurrencies are accepted. Whilst we aim to please our
								business customers, the KoinKoin platform is also powered to
								serve cryptocurrency speculators and intraday traders who simply
								wish to BUY, HOLD & TRADE cryptocurrencies. The KoinKoin
								platform provides exchange and Lightningfast execution services
								for an array of African Fiat including ZAR, NGN, GHS, UGX and
								KES as well as South East Asian Fiat including VND, MYR, IDR and
								THB and of course our virtual currencies to BTC (BitCoin), ETH
								(Ethereum), LTC (LiteCoin) & XRP (Ripple) with fast deposits and
								withdrawals. We also permit deposits in EUR and USD for those
								who are not based in Africa or South East Asia but wish to
								transact and complete business in these regions.
							</p>
						</div>

						<div className="image d-flex align-items-center">
							<img
								src="/assets/images/unique-koinkoin.png"
								alt="koin koin what makes us unique"
							/>
						</div>
					</div>
					<div className="features row mt-5">
						<div className="col col-12 col-md-4 text-center mb-3">
							<div className="feature-card">
								<span className="single-image">
									<img
										src="/assets/images/compliance-and-security.png"
										alt="compliance and security"
									/>
								</span>
								<h3 className="mt-3">COMPLIANCE & SECURITY</h3>
								<p>
									KoinKoin is committed to adhering to global financial
									regulations that help prevent, detect and remediate any
									unlawful behaviour with our platform.
								</p>
							</div>
						</div>
						<div className="col col-12 col-md-4 text-center mb-3">
							<div className="feature-card">
								<span className="single-image">
									<img
										src="/assets/images/the-future.png"
										alt="compliance and security"
									/>
								</span>
								<h3 className="mt-3">THE FUTURE</h3>
								<p>
									We at KoinKoin believe cryptocurrency is the future and we are
									happy to provide a platform which serves not just Africa but
									all regions that have an active interest in trade within
									Africa and the South East Asian Region.
								</p>
							</div>
						</div>
						<div className="col col-12 col-md-4 text-center mb-3">
							<div className="feature-card">
								<span className="single-image">
									<img
										src="/assets/images/get-in-touch.png"
										alt="compliance and security"
									/>
								</span>
								<h3 className="mt-3">GET IN TOUCH</h3>
								<p>
									If you are interested in cooperation or have any suggestions
									for us, drop a message to{' '}
									<a href="mailto:support@koinkoin.com">support@koinkoin.com</a>
									.
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		);
	}
}

export default AboutUs;
