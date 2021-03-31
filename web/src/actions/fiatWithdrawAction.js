import { PLUGIN_URL } from '../config/constants';
import { requestAuthenticated } from '../utils';

export const ACTIONS = {
	FRESH_FIAT_WITHDAW_PROCESS: 'FRESH_FIAT_WITHDAW_PROCESS',
	DRAFT_FIAT_WITHDRAW_PROCESS: 'DRAFT_FIAT_WITHDRAW_PROCESS',
	READY_FIAT_WITHDRAW_PROCESS: 'READY_FIAT_WITHDRAW_PROCESS',
	REQUEST_FIAT_WITHDRAW_PROCESS: 'REQUEST_FIAT_WITHDRAW_PROCESS',
	PENDING_FIAT_WITHDRAW_PROCESS: 'PENDING_FIAT_WITHDRAW_PROCESS',
	REQUEST_FAILED_FIAT_WITHDRAW_PROCESS: 'REQUEST_FAILED_FIAT_WITHDRAW_PROCESS',
	REJECTED_FIAT_WITHDRAW_PROCESS: 'REJECTED_FIAT_WITHDRAW_PROCESS',
	SUCCESS_FIAT_WITHDRAW_PROCESS: 'SUCCESS_FIAT_WITHDRAW_PROCESS',
	SET_FW_WITHDRAW_BANKS: 'SET_FW_WITHDRAW_BANKS',
	SET_BANK_COUNTRY: 'SET_BANK_COUNTRY',
};

export function set_fw_withdraw_banks(data) {
	return {
		type: ACTIONS.SET_FW_WITHDRAW_BANKS,
		payload: data,
	};
}

export function set_bank_country(data) {
	return {
		type: ACTIONS.SET_BANK_COUNTRY,
		payload: data,
	};
}

export function processFreshFiatWithdraw() {
	return {
		type: ACTIONS.FRESH_FIAT_WITHDAW_PROCESS,
		payload: {},
	};
}

export function processDraftFiatWithdraw(data) {
	return {
		type: ACTIONS.DRAFT_FIAT_WITHDRAW_PROCESS,
		payload: data,
	};
}

export function processReadyFiatWithdraw(data) {
	return {
		type: ACTIONS.READY_FIAT_WITHDRAW_PROCESS,
		payload: data,
	};
}

export function processRequestingFiatWithdraw(data = null) {
	return {
		type: ACTIONS.REQUEST_FIAT_WITHDRAW_PROCESS,
		payload: data,
	};
}

export function processRequestingFailedFiatWithdraw(data = null) {
	return {
		type: ACTIONS.REQUEST_FAILED_FIAT_WITHDRAW_PROCESS,
		payload: data,
	};
}

export function processPendingFiatWithdraw(data = null) {
	return {
		type: ACTIONS.PENDING_FIAT_WITHDRAW_PROCESS,
		payload: data,
	};
}

export function processRejectedFiatWithdraw(data = null) {
	return {
		type: ACTIONS.REJECTED_FIAT_WITHDRAW_PROCESS,
		payload: data,
	};
}

export function processSuccessFiatWithdraw(data = null) {
	return {
		type: ACTIONS.SUCCESS_FIAT_WITHDRAW_PROCESS,
		payload: data,
	};
}

export function requestFiatWithdraw(data) {
	const options = {
		method: 'POST',
		body: JSON.stringify(data),
	};

	return requestAuthenticated(
		'/plugins/withdraw/fiat',
		options,
		null,
		PLUGIN_URL
	);
}

export function requestWithdrawBanks(country = 'NG') {
	const options = {
		method: 'GET',
	};
	return requestAuthenticated(
		`/plugins/withdraw/banks/${country}`,
		options,
		null,
		PLUGIN_URL
	);
}
