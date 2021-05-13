import * as actionTypes from './providersTypes';
import { CLIENT_LOADER } from '../clients/clientsTypes';
const defaultState = {
  providers: [],
  provider: {},
  checkedProviders: [],
  editedProviders: [],
  providerLoading: false,
  providerSuccessMessage: null,
  providerError: null,
  editProviderSuccess: false,
  deleteProvidersuccess: false,
};

const providersReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case actionTypes.PROVIDER_LOADER: {
      return {
        ...state,
        providerLoading: true,
        providerSuccessMessage: null,
        providerError: null,
        editProviderSuccess: false,
        deleteProvidersuccess: false,
      };
    }

    case CLIENT_LOADER: {
      return {
        ...state,
        providerSuccessMessage: null,
        providerError: null,
      };
    }

    case actionTypes.PROVIDER_FAILURE: {
      return {
        ...state,
        providerError: payload || 'Something wrong',
        providerLoading: false,
      };
    }

    case actionTypes.CREATE_PROVIDER_SUCCESS: {
      return {
        ...state,
        providerLoading: false,
        providerSuccessMessage: payload.message,
        providers: [...state.providers, payload.provider],
      };
    }
    case actionTypes.GET_PROVIDERS_SUCCESS: {
      return {
        ...state,
        providerLoading: false,
        providers: payload,
      };
    }

    case actionTypes.GET_SINGLE_PROVIDER_SUCCESS: {
      return {
        ...state,
        providerLoading: false,
        provider: payload,
      };
    }

    case actionTypes.EDIT_PROVIDER_SUCCESS: {
      const editedProviders = [...state.providers];
      const editetProviderIndex = editedProviders.findIndex(
        (provider) => provider._id === payload.provider._id
      );
      editedProviders[editetProviderIndex] = payload?.provider;

      return {
        ...state,
        providerLoading: false,
        providerSuccessMessage: payload.message,
        providers: editedProviders,
        editProviderSuccess: true,
      };
    }

    case actionTypes.DELETE_PROVIDER_SUCCESS: {
      const providersData = [...state.providers];
      const filteredProviders = providersData.filter(
        (provider) => provider._id !== payload.id
      );
      return {
        ...state,
        providerLoading: false,
        providerSuccessMessage: payload.message,
        providers: filteredProviders,
        deleteProvidersuccess: true,
      };
    }

    case actionTypes.GET_CHECKED_PROVIDERS: {
      return {
        ...state,
        checkedProviders: [...payload],
        providerLoading: false,
      };
    }

    case actionTypes.EDIT_CHECKED_PROVIDERS: {
      return {
        ...state,
        providerLoading: false,
        editedProviders: [...payload],
      };
    }

    case actionTypes.RESET_CONFIRM: {
      return {
        ...state,
        editProviderSuccess: false,
        deleteProvidersuccess: false,
      };
    }

    default:
      return state;
  }
};

export default providersReducer;
