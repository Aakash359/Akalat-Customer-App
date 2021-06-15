import { GET_NETWORK_INFO_SUCCESS, GET_NETWORK_INFO_FAILED, UPDATE_LANGUAGE_SUCCESS, UPDATE_LANGUAGE_FAILED } from "../Types/Type"

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_NETWORK_INFO_SUCCESS:
            return { ...state, isNetworkAvailable: action.payload }

        case GET_NETWORK_INFO_FAILED:
            return { ...state, isNetworkAvailableFailed: true }

        case UPDATE_LANGUAGE_SUCCESS:
            return { ...state, isLanguageUpdated: true, updatedLanguage: action.payload }

        case UPDATE_LANGUAGE_FAILED:
            return { ...state, isLanguageUpdated: false }

        default:
            return state;
    }
}