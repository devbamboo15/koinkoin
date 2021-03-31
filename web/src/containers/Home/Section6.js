import React from 'react';
import classnames from 'classnames';
// import STRINGS from '../../config/localizedStrings';

import { FLEX_CENTER_CLASSES } from '../../config/constants';

// import YouTube from 'react-youtube';
import AnimationContainer from '../../components/AnimationContainer';

const Section6 = ({ style = {} }) => {
	const openAndroidDownload = () => {
		window.location.href =
			'https://play.google.com/store/apps/details?id=com.koinkoin';
	};

	const openIOSDownload = () => {
		window.location.href =
			'https://apps.apple.com/gb/app/koinkoin-exchange/id1556014433';
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
			<div className={classnames('f-1', ...FLEX_CENTER_CLASSES, 'flex-column')}>
				<AnimationContainer>
					<div className={'section-detail-item'}>
						<div className="app-banner">
							<img src="assets/images/app-banner.png" alt=""></img>
						</div>
						<div className="mobile-app-icons mb-5">
							<div onClick={openIOSDownload}>
								<img src="/assets/home/app-store.png" alt="" />
							</div>
							<div onClick={openAndroidDownload}>
								<img src="/assets/home/google-store.png" alt="" />
							</div>
						</div>
					</div>
				</AnimationContainer>
			</div>
		</div>
	);
};

export default Section6;
