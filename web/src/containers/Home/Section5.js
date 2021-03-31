import React, { useState } from 'react';
import classnames from 'classnames';

import { FLEX_CENTER_CLASSES } from '../../config/constants';
import AnimationContainer from '../../components/AnimationContainer';

const steps = [
	{
		title: 'Wallet',
		icon: 'assets/icons/step1.png',
		image: 'assets/images/step1.png',
		desc:
			'Once you have signed up, logged in and verified your account.  You will be able to go to our wallets page (Click Wallet at the top), make a quick cash or crypto deposit and start trading immediately. "Easy"',
	},
	{
		title: 'BTC-USDT',
		icon: 'assets/icons/step3.png',
		image: 'assets/images/step2.png',
		desc:
			'To get the best tradeable prices from over 40 exchanges for a variety of crypto/fiat pairs, go to our markets page (Click Pro Trade at the top) and you will be able to execute trades immediately at market price.  You can also place limit orders and/or stop orders on any of the pairs on offer. ',
	},
	{
		title: 'Trade',
		icon: 'assets/icons/step2.png',
		image: 'assets/images/step3.png',
		desc:
			'Simply make quick trades (Click Quick Trade at the top) by simply swapping cash for crypto, crypto for crypto or crypto for cash.',
	},
	{
		title: 'Send Coin',
		icon: 'assets/icons/step4.png',
		image: 'assets/images/step4.png',
		desc:
			'To send crypto to your friends and loved ones, simply go back to the wallets page and hit withdraw next to the crypto you wish to send.  Complete the wallet address details, memo if needed and amount you are sending.  It is all very easy.',
	},
	{
		title: 'Invite Friend',
		icon: 'assets/icons/step5.png',
		image: 'assets/images/step5.png',
		desc:
			'Refer as many friends and colleagues you wish and earn up to 500USDT Weekly from transaction fees.',
	},
];

const Section = ({ style, onClickDemo, token }) => {
	const [stepIndex, setStepIndex] = useState(0);

	return (
		<div
			className={classnames(...FLEX_CENTER_CLASSES, 'section_5 p-5')}
			style={style}
		>
			<AnimationContainer animationType="scale">
				<div className="row px-5">
					<div className="col-12 mb-5">
						<h1 className="display-5 font-weight-bold my-5 text-uppercase text-center">
							How it Works
						</h1>
					</div>
					<div className="col col-12 col-xl-5">
						{steps.map((step, index) => (
							<div
								className={classnames('step-card', {
									selected: index === stepIndex,
								})}
								onClick={() => setStepIndex(index)}
								key={index}
							>
								<div className="image-wrapper">
									<img src={step.icon} alt=""></img>
								</div>
								<div className="step-body">
									<p className="title">
										{'Step ' + (index + 1) + '. ' + step.title}
									</p>
									<p className="desc">{step.desc}</p>
								</div>
								<div className="d-flex d-xl-none justify-content-center align-items-center p-2">
									<img src={step.image} className="step-image" alt=""></img>
								</div>
							</div>
						))}
					</div>
					<div className="col col-12 col-xl-7 d-none d-xl-flex justify-content-center align-items-center p-2">
						<img
							src={steps[stepIndex].image}
							className="step-image"
							alt=""
						></img>
					</div>
				</div>
			</AnimationContainer>
		</div>
	);
};

export default Section;
