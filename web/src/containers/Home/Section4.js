import React from 'react';
import classnames from 'classnames';
import { browserHistory } from 'react-router';
// import STRINGS from '../../config/localizedStrings';

import { FLEX_CENTER_CLASSES } from '../../config/constants';
import CommonButton from '../../components/CommonButton';

// import YouTube from 'react-youtube';
import AnimationContainer from '../../components/AnimationContainer';
import { isMobile } from 'react-device-detect';

const Section4 = ({ style = {} }) => {
	const onClickSignUpBtn = () => {
		browserHistory.push('/signup');
	};

	return (
		<div
			className={classnames(
				...FLEX_CENTER_CLASSES,
				'flex-column',
				'section_4',
				'p-5'
			)}
			style={style}
		>
			<div className="animate-container">
				<img src={'/assets/background-animate-pattern.jpg'} alt="" />
			</div>

			<div className={classnames('f-1', ...FLEX_CENTER_CLASSES, 'flex-column')}>
				<AnimationContainer>
					<div className="my-3">
						{/* <YouTube videoId="juRNOzkJ6Qs" opts={opts} muted/> */}
						<iframe
							title="intro_video"
							width={isMobile ? '350' : '854'}
							height={isMobile ? '240' : '480'}
							src="https://www.youtube.com/embed/juRNOzkJ6Qs?autoplay=0&mute=1"
						></iframe>
					</div>
				</AnimationContainer>

				<AnimationContainer>
					<div className={'section-detail-item'}>
						<div className="home-title text-capitalize">
							NEW BEGINNINGS - BORDERLESS AFRICA
						</div>
						<p className="lead font-weight-bold text-center">
							KoinKoin’s continuing mission is to bolster small businesses and
							empower individuals using blockchain technology
						</p>
						<CommonButton
							className="btn-open-trading-account mt-5"
							label="OPEN TRADING ACCOUNT"
							onClick={onClickSignUpBtn}
						/>
					</div>
				</AnimationContainer>
			</div>
		</div>
	);
};

export default Section4;
