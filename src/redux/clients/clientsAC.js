import axios from 'axios';
import * as actionTypes from './clientsTypes';

const apiUrl = process.env.REACT_APP_API_URL;

export const createClient = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.CLIENT_LOADER });
      const response = await axios.post(`${apiUrl}/api/client`, data);
      dispatch({
        type: actionTypes.CREATE_CLIENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CLIENT_FAILURE,
        payload: error.response?.data.message,
      });
    }
  };
};

export const getAllClients = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.CLIENT_LOADER });
      const response = await axios.get(`${apiUrl}/api/clients`);
      dispatch({
        type: actionTypes.GET_CLIENTS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CLIENT_FAILURE,
        payload: error.response?.data.message,
      });
    }
  };
};

export const getSingleClient = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.CLIENT_LOADER });
      const response = await axios.get(`${apiUrl}/api/client/${id}`);
      dispatch({
        type: actionTypes.GET_SINGLE_CLIENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CLIENT_FAILURE,
        payload: error.response?.data.message,
      });
    }
  };
};

export const editClient = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.CLIENT_LOADER });
      const response = await axios.put(`${apiUrl}/api/client/${id}`, data);
      dispatch({
        type: actionTypes.EDIT_CLIENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CLIENT_FAILURE,
        payload: error.response?.data.message,
      });
    }
  };
};

export const deleteClient = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.CLIENT_LOADER });
      const response = await axios.delete(`${apiUrl}/api/client/${id}`);
      dispatch({
        type: actionTypes.DELETE_CLIENT_SUCCESS,
        payload: { message: response.data.message, id },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CLIENT_FAILURE,
        payload: error?.response?.data.message,
      });
    }
  };
};

export const resetClient = (id) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.RESET_CLIENT });
  };
};



export const resetModal = (id) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.RESET_MODAL });
  };
};
