import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ContactUs from './Contact_us';
import AboutUs from './About_us';
import Terms from './Terms';
import Policy from './Policy';

import { AppFooter } from '../../components';
import { bindActionCreators } from 'redux';
import { setLanguage, getExchangeInfo } from '../../actions/appActions';
import { logout } from '../../actions/authAction';

// import { AppBar, AppFooter } from '../../components';
const StaticPage = (props) => {
	const {
		path,
		activeTheme,
		activeLanguage,
		constants,
		changeLanguage,
		getExchangeInfo_,
	} = props;
	const onChangeLanguage = (language) => () => {
		return changeLanguage(language);
	};

	useEffect(() => {
		getExchangeInfo_();
	}, [getExchangeInfo_]);

	if (path === 'contact_us') {
		return (
			<>
				<ContactUs />
				<AppFooter
					theme={activeTheme}
					onChangeLanguage={onChangeLanguage}
					activeLanguage={activeLanguage}
					constants={constants}
				/>
			</>
		);
	}

	if (path === 'about_us') {
		return (
			<>
				<AboutUs />
				<AppFooter
					theme={activeTheme}
					onChangeLanguage={onChangeLanguage}
					activeLanguage={activeLanguage}
					constants={constants}
				/>
			</>
		);
	}
	if (path === 'terms') {
		return (
			<>
				<Terms />
				<AppFooter
					theme={activeTheme}
					onChangeLanguage={onChangeLanguage}
					activeLanguage={activeLanguage}
					constants={constants}
				/>
			</>
		);
	}

	if (path === 'policy') {
		return (
			<>
				<Policy />
				<AppFooter
					theme={activeTheme}
					onChangeLanguage={onChangeLanguage}
					activeLanguage={activeLanguage}
					constants={constants}
				/>
			</>
		);
	}

	return <div>This is static page</div>;
};

// export default StaticPage

const mapStateToProps = (store) => ({
	pair: store.app.pair,
	token: store.auth.token,
	verifyToken: store.auth.verifyToken,
	// estimatedValue: 100,
	// symbol: store.orderbook.symbol,
	// quickTradeData: store.orderbook.quickTrade,
	activeLanguage: store.app.language,
	info: store.app.info,
	activeTheme: store.app.theme,
	constants: store.app.constants,
});

const mapDispatchToProps = (dispatch) => ({
	// requestQuickTrade: bindActionCreators(requestQuickTrade, dispatch),
	changeLanguage: bindActionCreators(setLanguage, dispatch),
	logout: bindActionCreators(logout, dispatch),
	getExchangeInfo_: bindActionCreators(getExchangeInfo, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StaticPage);
