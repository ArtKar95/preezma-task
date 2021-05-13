import * as actionTypes from './clientsTypes';
import { RESET_CONFIRM, PROVIDER_LOADER } from '../providers/providersTypes';

const defaultState = {
  clients: [],
  client: {},
  clientLoading: false,
  clientSuccessMessage: null,
  clientError: null,
  editClientSuccess: false,
  createClientSuccess: false,
  deleteClientSuccess: false,
};

const clientsReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case actionTypes.CLIENT_LOADER: {
      return {
        ...state,
        clientLoading: true,
        clientSuccessMessage: null,
        clientError: null,
        editClientSuccess: false,
        createClientSuccess: false,
        deleteClientSuccess: false,
      };
    }
    case PROVIDER_LOADER: {
      return {
        ...state,
        clientSuccessMessage: null,
        clientError: null,
      };
    }

    case actionTypes.CLIENT_FAILURE: {
      return {
        ...state,
        clientLoading: false,
        clientError: payload || 'Something wrong',
      };
    }

    case actionTypes.CREATE_CLIENT_SUCCESS: {
      return {
        ...state,
        clientLoading: false,
        clientSuccessMessage: payload.message,
        clients: [...state.clients, payload.client],
        createClientSuccess: true,
      };
    }
    case actionTypes.GET_CLIENTS_SUCCESS: {
      return {
        ...state,
        clientLoading: false,
        clients: payload,
      };
    }

    case actionTypes.GET_SINGLE_CLIENT_SUCCESS: {
      return {
        ...state,
        clientLoading: false,
        client: payload,
      };
    }

    case actionTypes.EDIT_CLIENT_SUCCESS: {
      const editedCliens = [...state.clients];
      const editetClientIndex = editedCliens.findIndex(
        (client) => client._id === payload.client._id
      );
      editedCliens[editetClientIndex] = payload?.client;

      return {
        ...state,
        clientLoading: false,
        clientSuccessMessage: payload.message,
        clients: editedCliens,
        editClientSuccess: true,
      };
    }

    case actionTypes.DELETE_CLIENT_SUCCESS: {
      const clientsData = [...state.clients];
      const filteredClients = clientsData.filter(
        (client) => client._id !== payload.id
      );

      return {
        ...state,
        clientLoading: false,
        deleteClientSuccess: true,
        clientSuccessMessage: payload.message,
        clients: filteredClients,
      };
    }

    case actionTypes.RESET_CLIENT: {
      return {
        ...state,
        client: {},
      };
    }
    case actionTypes.RESET_MODAL: {
      return {
        ...state,
        editClientSuccess: false,
        createClientSuccess: false,
        deleteClientSuccess: false,
      };
    }

    case RESET_CONFIRM: {
      return {
        ...state,
        deleteClientSuccess: false,
      };
    }
    default:
      return state;
  }
};

export default clientsReducer;
