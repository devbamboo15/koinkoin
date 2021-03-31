import { ACTIONS } from '../actions/fiatWithdrawAction';
import _ from 'lodash';
// import {BASE_CURRENCY} from '../config/constants';

const INITIAL_STATE = {
	fetched: false,
	fetching: false,
	error: null,
	data: {},
	status: ACTIONS.FRESH_FIAT_WITHDAW_PROCESS,
	banks: {},
	country: null,
};

export default function reducer(state = INITIAL_STATE, action) {
	var data = {};
	if (ACTIONS[action.type] && action.payload) {
		data = _.assign(state.data, action.payload);
	} else if (ACTIONS[action.type]) {
		data = state.data;
	}

	switch (action.type) {
		case ACTIONS.FRESH_FIAT_WITHDAW_PROCESS:
			return {
				...state,
				fetched: false,
				fetching: false,
				data: {},
				status: ACTIONS.FRESH_FIAT_WITHDAW_PROCESS,
			};
		case ACTIONS.DRAFT_FIAT_WITHDRAW_PROCESS:
			console.log(
				'Maxkyu log redux draft step,',
				ACTIONS.DRAFT_FIAT_WITHDRAW_PROCESS
			);
			return {
				...state,
				fetched: false,
				fetching: false,
				data: data,
				status: ACTIONS.DRAFT_FIAT_WITHDRAW_PROCESS,
			};
		case ACTIONS.READY_FIAT_WITHDRAW_PROCESS:
			console.log(
				'Maxkyu log redux ready step,',
				ACTIONS.READY_FIAT_WITHDRAW_PROCESS
			);
			return {
				...state,
				fetched: false,
				fetching: false,
				data: data,
				status: ACTIONS.READY_FIAT_WITHDRAW_PROCESS,
			};
		case ACTIONS.REQUEST_FIAT_WITHDRAW_PROCESS:
			return {
				...state,
				fetched: false,
				fetching: true,
				data: data,
				status: ACTIONS.REQUEST_FIAT_WITHDRAW_PROCESS,
			};
		case ACTIONS.PENDING_FIAT_WITHDRAW_PROCESS:
			return {
				...state,
				fetched: true,
				fetching: false,
				data: data,
				status: ACTIONS.PENDING_FIAT_WITHDRAW_PROCESS,
			};
		case ACTIONS.REQUEST_FAILED_FIAT_WITHDRAW_PROCESS:
			return {
				...state,
				fetched: true,
				fetching: false,
				data: data,
				status: ACTIONS.REQUEST_FAILED_FIAT_WITHDRAW_PROCESS,
			};
		case ACTIONS.REJECTED_FIAT_WITHDRAW_PROCESS:
			return {
				...state,
				fetched: true,
				fetching: false,
				data: data,
				status: ACTIONS.REJECTED_FIAT_WITHDRAW_PROCESS,
			};
		case ACTIONS.SUCCESS_FIAT_WITHDRAW_PROCESS:
			return {
				...state,
				fetched: true,
				fetching: false,
				data: data,
				status: ACTIONS.SUCCESS_FIAT_WITHDRAW_PROCESS,
			};
		case ACTIONS.SET_FW_WITHDRAW_BANKS:
			return { ...state, banks: action.payload };
		case ACTIONS.SET_BANK_COUNTRY:
			console.log('Maxkyu log state country', action.payload);
			return { ...state, country: action.payload };
		default:
			return state;
	}
}
