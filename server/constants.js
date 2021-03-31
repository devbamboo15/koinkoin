'use strict';

const { toBool } = require('./utils/conversion');
const { cloneDeep } = require('lodash');
const redis = require('redis');
const config = require('./config/redis');
const subscriber = redis.createClient(config.pubsub);

// CONFIGURATION CONSTANTS START--------------------------------------------------
const CONFIGURATION_CHANNEL = 'channel:configuration';

let configuration = {
	coins: {},
	pairs: {},
	tiers: {},
	kit: {
		info: {},
		color: {},
		interface: {},
		icons: {},
		strings: {},
		links: {},
		captcha: {},
		defaults: {},
		features: {},
		meta: {}
	}
};

let secrets = {
	security: {},
	accounts: {},
	captcha: {},
	emails: {},
	smtp: {}
};

let frozenUsers = {};

subscriber.subscribe(CONFIGURATION_CHANNEL);

subscriber.on('message', (channel, message) => {
	if (channel === CONFIGURATION_CHANNEL) {
		const { type, data } = JSON.parse(message);

		switch(type) {
			case 'initial':
				updateAllConfig(data.configuration, data.secrets, data.frozenUsers);
				break;
			case 'update':
				if (data.info) updateKitInfo(data.info);
				if (data.tiers) updateTiers(data.tiers);
				if (data.kit) updateKit(data.kit);
				if (data.secrets) updateSecrets(data.secrets);
				break;
			case 'freezeUser':
				updateFrozenUser('add', data);
				break;
			case 'unfreezeUser':
				updateFrozenUser('remove', data);
				break;
			case 'stop':
				resetAllConfig();
				break;
			default:
				break;
		}
	}
});

const updateAllConfig = (newConfigurations, newSecrets, newFrozenUsers) => {
	configuration = newConfigurations;
	secrets = newSecrets;
	frozenUsers = newFrozenUsers;
};

const resetAllConfig = () => {
	frozenUsers = {};
	secrets = {
		security: {},
		accounts: {},
		captcha: {},
		emails: {},
		smtp: {}
	};
	configuration = {
		coins: {},
		pairs: {},
		kit: {
			info: {},
			color: {},
			interface: {},
			icons: {},
			strings: {},
			links: {},
			captcha: {},
			defaults: {},
			features: {},
			meta: {}
		}
	};
};

const updateTiers = (newTiers) => {
	Object.assign(configuration.tiers, newTiers);
};

const updateKitInfo = (newInfo) => {
	Object.assign(configuration.kit.info, newInfo);
};

const updateKit = (newKitConfig) => {
	Object.assign(configuration.kit, newKitConfig);
};

const updateSecrets = (newSecretsConfig) => {
	Object.assign(secrets, newSecretsConfig);
};

const updateFrozenUser = (action, userId) => {
	if (action === 'add') {
		frozenUsers[userId] = true;
	} else if (action === 'remove') {
		delete frozenUsers[userId];
	}
};

exports.GET_COINS = () => cloneDeep(configuration.coins);
exports.GET_PAIRS = () => cloneDeep(configuration.pairs);
exports.GET_TIERS = () => cloneDeep(configuration.tiers);
exports.GET_KIT_CONFIG = () => cloneDeep(configuration.kit);
exports.GET_KIT_SECRETS = () => cloneDeep(secrets);
exports.GET_FROZEN_USERS = () => cloneDeep(frozenUsers);

exports.KIT_CONFIG_KEYS = [
	'captcha',
	'api_name',
	'description',
	'color',
	'title',
	'links',
	'defaults',
	'native_currency',
	'logo_image',
	'valid_languages',
	'new_user_is_activated',
	'interface',
	'icons',
	'strings',
	'meta',
	'features',
	'setup_completed',
	'email_verification_required'
];

exports.KIT_SECRETS_KEYS = [
	'allowed_domains',
	'admin_whitelist',
	'emails',
	'security',
	'captcha',
	'smtp'
];

exports.COMMUNICATOR_AUTHORIZED_KIT_CONFIG = [
	'icons',
	'strings'
];
// CONFIGURATION CONSTANTS END --------------------------------------------------

// MAIN CONSTANTS START--------------------------------------------------

exports.APM_ENABLED = toBool(process.env.APM_ENABLED) || false; // apm is used for sending logs etc
exports.API_HOST = process.env.API_HOST || 'localhost';
exports.DOMAIN = process.env.DOMAIN || (process.env.NODE_ENV === 'production' ? 'https://hollaex.com' : 'http://localhost:3000');
exports.NODE_ENV = process.env.NODE_ENV;
exports.HOLLAEX_NETWORK_ENDPOINT = process.env.NETWORK === 'testnet' ? 'https://api.testnet.hollaex.network' : 'https://api.hollaex.network';
exports.HOLLAEX_NETWORK_BASE_URL = '/v2';
exports.HOLLAEX_NETWORK_PATH_ACTIVATE = '/exchange/activate';

// MAIN CONSTANTS END --------------------------------------------------

// CHANNEL CONSTANTS START --------------------------------------------------

// API
exports.INIT_CHANNEL = 'channel:init';
exports.WITHDRAWALS_REQUEST_KEY = 'withdrawals:request';
exports.HMAC_TOKEN_KEY = 'hmac:token';
exports.EVENTS_CHANNEL = 'channel:events';
exports.CONFIGURATION_CHANNEL = CONFIGURATION_CHANNEL;

// Websocket
exports.WEBSOCKET_CHANNEL = (topic, symbolOrUserId) => {
	switch(topic) {
		case 'orderbook':
			return `orderbook:${symbolOrUserId}`;
		case 'trade':
			return `trade:${symbolOrUserId}`;
		case 'order':
			return `order:${symbolOrUserId}`;
		case 'wallet':
			return `wallet:${symbolOrUserId}`;
		case 'deposit':
			return `deposit:${symbolOrUserId}`;
		case 'chat':
			return 'chat';
		default:
			return;
	}
};
exports.WS_PUBSUB_DEPOSIT_CHANNEL = 'channel:ws:deposit';
exports.WS_HUB_CHANNEL = 'channel:websocket:hub';

// Chat
exports.CHAT_MAX_MESSAGES = 50;
exports.CHAT_MESSAGE_CHANNEL = 'channel:chat:message';

// CHANNEL CONSTANTS END --------------------------------------------------

// UTIL CONSTANTS START --------------------------------------------------

exports.AFFILIATION_CODE_LENGTH = 6;
exports.SEND_CONTACT_US_EMAIL = true;
//CSV Report keys
exports.AUDIT_KEYS = [
	'id',
	'admin_id',
	'event',
	'description.new',
	'description.old',
	'description.note',
	'description.user_id',
	'ip',
	'domain',
	'timestamp'
];

// UTIL CONSTANTS END --------------------------------------------------

// ACCOUNTS CONSTANTS START --------------------------------------------------

exports.SETTING_KEYS = [
	'language',
	'notification',
	'interface',
	'audio',
	'risk',
	'chat'
];

exports.OMITTED_USER_FIELDS = [
	'password',
	'note',
	'is_admin',
	'is_support',
	'is_supervisor',
	'is_kyc',
	'is_communicator',
	'flagged'
];

const ROLES = {
	SUPERVISOR: 'supervisor',
	SUPPORT: 'support',
	ADMIN: 'admin',
	KYC: 'kyc',
	COMMUNICATOR: 'communicator',
	USER: 'user',
	HMAC: 'hmac'
};

exports.DEFAULT_FEES = {
	zero: {
		maker: 0.3,
		taker: 0.3
	},
	lite: {
		maker: 0.1,
		taker: 0.2
	},
	member: {
		maker: 0,
		taker: 0.05
	}
};

exports.ROLES = ROLES;
exports.BASE_SCOPES = [ROLES.USER, ROLES.HMAC];
exports.DEFAULT_ORDER_RISK_PERCENTAGE = 90; // used in settings in percentage to display popups on big relative big orders of user

// ACCOUNTS CONSTANTS END --------------------------------------------------

// SECURITY CONSTANTS START --------------------------------------------------

exports.TOKEN_TYPES = {
	HMAC: 'hmac'
};
exports.HMAC_TOKEN_EXPIRY = 5 * 12 * 30 * 24 * 60 * 60 * 1000; // 5 years
exports.SECRET = process.env.SECRET || 'shhhh';
exports.ISSUER = process.env.ISSUER || 'hollaex.com';
exports.CAPTCHA_ENDPOINT = 'https://www.google.com/recaptcha/api/siteverify';
exports.SECRET_MASK = '************************';
exports.SALT_ROUNDS = 10;

// SECURITY CONSTANTS END --------------------------------------------------

// EMAIL CONSTANTS START --------------------------------------------------

exports.CONFIRMATION = {
	btc: 1,
	eth: 15,
	bch: 2,
	xrp: 0
};
exports.EXPLORERS = (currency) => {
	switch(currency) {
		case 'btc':
			return [
				{
					name: 'Blockchain.info',
					baseUrl: 'https://www.blockchain.com',
					txPath: '/btc/tx'
				},
				{
					name: 'BlockCypher',
					baseUrl: 'https://live.blockcypher.com',
					txPath: '/btc/tx'
				},
				{
					name: 'Blockstream',
					baseUrl: 'https://blockstream.info',
					txPath: '/tx'
				},
				{
					name: 'Bitcoin.com',
					baseUrl: 'https://explorer.bitcoin.com',
					txPath: '/btc/tx'
				}
			];
		case 'xrp':
			return [
				{
					name: 'xrpscan',
					baseUrl: 'https://xrpscan.com',
					txPath: '/tx'
				},
				{
					name: 'Bithomp',
					baseUrl: 'https://bithomp.com',
					txPath: '/explorer'
				}
			];
		case 'bch':
			return [
				{
					name: 'Blockchain.info',
					baseUrl: 'https://www.blockchain.com',
					txPath: '/bch/tx'
				},
				{
					name: 'Bitcoin.com',
					baseUrl: 'https://explorer.bitcoin.com',
					txPath: '/bch/tx'
				}
			];
		case 'xlm':
			return [
				{
					name: 'stellarhain.io',
					baseUrl: 'https://stellarchain.io',
					txPath: '/tx'
				}
			];
		case 'xmr':
			return [
				{
					name: 'MoneroBlocks',
					baseUrl: 'https://moneroblocks.info',
					txPath: '/tx'
				}
			];
		case 'eth':
			return [
				{
					name: 'EtherScan',
					baseUrl: 'https://etherscan.io',
					txPath: '/tx'
				},
				{
					name: 'Blockchain.info',
					baseUrl: 'https://www.blockchain.com',
					txPath: '/eth/tx'
				}
			];
		default:
			return [
				{
					name: 'EtherScan',
					baseUrl: 'https://etherscan.io',
					txPath: '/tx'
				}
			];
	}
};

// EMAIL CONSTANTS END --------------------------------------------------

// PLUGIN CONSTANTS START------------------------------ to be moved
exports.AVAILABLE_PLUGINS = [
	'xht_fee',
	'kyc',
	'sms',
	'freshdesk',
	'chat',
	'bank',
	'announcement',
	'zendesk'
];

exports.REQUIRED_XHT = 100;

exports.SMS_CODE_KEY = 'user:sms';
exports.SMS_CODE_EXPIRATION_TIME = 6 * 60; // seconds -> 6 min

exports.S3_LINK_EXPIRATION_TIME = 300; // seconds

exports.ID_FIELDS = [
	'type',
	'number',
	'issued_date',
	'expiration_date',
	'status'
];

exports.USER_FIELD_ADMIN_LOG = [
	'full_name',
	'email',
	'dob',
	'gender',
	'nationality',
	'phone_number',
	'address',
	'id_data',
	'bank_account',
	'settings',
	'username'
];

exports.ADDRESS_FIELDS = ['city', 'address', 'country', 'postal_code'];

exports.VERIFY_STATUS = {
	EMPTY: 0,
	PENDING: 1,
	REJECTED: 2,
	COMPLETED: 3
};
// PLUGIN CONSTANTS END ------------------------------ to be moved

exports.CUSTOM_CSS = `
	.topbar-wrapper img {
		content:url('https://s3.ap-northeast-2.amazonaws.com/public-holla-images/bitholla/bitholla-white--01.png');
		height: 2rem;
	}
	.swagger-ui .opblock.opblock-get .opblock-summary-method {
		background: blue;
	}
	.swagger-ui .btn.execute {
		background-color: blue;
		color: #fff;
		border-color: blue;
	}
	.swagger-ui .btn.authorize {
		color: blue;
		border-color: blue;
	}
	.swagger-ui .btn.authorize svg {
		fill: blue;
	}
	.models {
		display: none !important;
	}
`;
