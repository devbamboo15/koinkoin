import React from 'react';
import classnames from 'classnames';
// import { ReactSVG } from 'react-svg';
import STRINGS from '../../config/localizedStrings';

import { FLEX_CENTER_CLASSES } from '../../config/constants';
import CommonButton from '../../components/CommonButton';
import AnimationContainer from '../../components/AnimationContainer';

// const BUTTONS_CLASSES = ['buttons-section--button', ...FLEX_CENTER_CLASSES];

// const generateCardsContentFromStrings = () => {
// 	return [
// 		{
// 			iconId: 'FEATURES_PRO_TRADING',
// 			icon: ICONS['FEATURES_PRO_TRADING'],
// 			stringId: 'HOME.SECTION_3_CARD_1_TITLE,HOME.SECTION_3_CARD_1_TEXT',
// 			title: STRINGS['HOME.SECTION_3_CARD_1_TITLE'],
// 			text: STRINGS['HOME.SECTION_3_CARD_1_TEXT'],
// 		},
// 		{
// 			iconId: 'FEATURES_PAYMENT',
// 			icon: ICONS['FEATURES_PAYMENT'],
// 			stringId: 'HOME.SECTION_3_CARD_2_TITLE,HOME.SECTION_3_CARD_2_TEXT',
// 			title: STRINGS['HOME.SECTION_3_CARD_2_TITLE'],
// 			text: STRINGS['HOME.SECTION_3_CARD_2_TEXT'],
// 		},
// 		{
// 			iconId: 'FEATURES_SECURITY',
// 			icon: ICONS['FEATURES_SECURITY'],
// 			stringId: 'HOME.SECTION_3_CARD_3_TITLE,HOME.SECTION_3_CARD_3_TEXT',
// 			title: STRINGS['HOME.SECTION_3_CARD_3_TITLE'],
// 			text: STRINGS['HOME.SECTION_3_CARD_3_TEXT'],
// 		},
// 		{
// 			iconId: 'FEATURES_REPORTING',
// 			icon: ICONS['FEATURES_REPORTING'],
// 			stringId: 'HOME.SECTION_3_CARD_4_TITLE,HOME.SECTION_3_CARD_4_TEXT',
// 			title: STRINGS['HOME.SECTION_3_CARD_4_TITLE'],
// 			text: STRINGS['HOME.SECTION_3_CARD_4_TEXT'],
// 		},
// 		{
// 			iconId: 'FEATURES_SUPPORT',
// 			icon: ICONS['FEATURES_SUPPORT'],
// 			stringId: 'HOME.SECTION_3_CARD_5_TITLE,HOME.SECTION_3_CARD_5_TEXT',
// 			title: STRINGS['HOME.SECTION_3_CARD_5_TITLE'],
// 			text: STRINGS['HOME.SECTION_3_CARD_5_TEXT'],
// 		},
// 		{
// 			iconId: 'FEATURES_LEGAL',
// 			icon: ICONS['FEATURES_LEGAL'],
// 			stringId: 'HOME.SECTION_3_CARD_6_TITLE,HOME.SECTION_3_CARD_6_TEXT',
// 			title: STRINGS['HOME.SECTION_3_CARD_6_TITLE'],
// 			text: STRINGS['HOME.SECTION_3_CARD_6_TEXT'],
// 		},
// 	];
// };

// const Card = ({ icon, title, text, stringId, iconId }) => (
// 	<div className={classnames(...FLEX_CENTER_CLASSES, 'home-card-container')}>
// 		<ReactSVG
// 			src={icon}
// 			beforeInjection={(svg) => {
// 				svg.classList.add('home-card-icon');
// 			}}
// 			className="home-card-icon-wrapper"
// 		/>
// 		<div
// 			className={classnames(
// 				'd-flex',
// 				'flex-column',
// 				'f-1',
// 				'home-card-text-container'
// 			)}
// 		>
// 			<EditWrapper stringId={stringId} iconId={iconId}>
// 				<div className="home-card-title f-0">{title}</div>
// 			</EditWrapper>
// 			<div className="home-card-text f-1">{text}</div>
// 		</div>
// 	</div>
// );

const Section = ({ style, onClickDemo, token }) => (
	<div
		className={classnames(...FLEX_CENTER_CLASSES, 'section_3')}
		style={style}
	>
		<h1 className="display-4 font-weight-bold mx-2 text-center">
			{STRINGS['HOME.SECTION_3_TITLE']}
		</h1>
		<div className="image-desktop">
			<img src="/assets/home/home_desktop.jpg" alt="" />
		</div>

		<AnimationContainer animationType="scale">
			<div className="step-container">
				<div className="step-item">
					<span>{STRINGS['HOME.SECTION_3_CARD_1_TITLE']}</span>
					<p>{STRINGS['HOME.SECTION_3_CARD_1_TEXT']}</p>
				</div>
				<div className="step-item">
					<span>{STRINGS['HOME.SECTION_3_CARD_2_TITLE']}</span>
					<p>{STRINGS['HOME.SECTION_3_CARD_2_TEXT']}</p>
				</div>
				<div className="step-item">
					<span>{STRINGS['HOME.SECTION_3_CARD_3_TITLE']}</span>
					<p>{STRINGS['HOME.SECTION_3_CARD_3_TEXT']}</p>
				</div>
			</div>
			<div className={classnames('buttons-section', ...FLEX_CENTER_CLASSES)}>
				<CommonButton
					className="btn-open-trading-account"
					label={STRINGS['HOME.SECTION_3_BUTTON_LABEL']}
				/>
			</div>
		</AnimationContainer>
	</div>
);

export default Section;
