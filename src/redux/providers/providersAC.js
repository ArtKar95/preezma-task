import axios from 'axios';
import * as actionTypes from './providersTypes';

const apiUrl = process.env.REACT_APP_API_URL;

export const createProvider = (name) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.PROVIDER_LOADER });
      const response = await axios.post(`${apiUrl}/api/provider`, name);
      dispatch({
        type: actionTypes.CREATE_PROVIDER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROVIDER_FAILURE,
        payload: error.response?.data.message,
      });
    }
  };
};

export const getAllProviders = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.PROVIDER_LOADER });
      const response = await axios.get(`${apiUrl}/api/provider`);
      dispatch({
        type: actionTypes.GET_PROVIDERS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROVIDER_FAILURE,
        payload: error.response?.data.message,
      });
    }
  };
};

export const getSingleProvider = (id) => {
  return async (dispatch) => {
    try {
      // dispatch({ type: actionTypes.PROVIDER_LOADER });
      const response = await axios.get(`${apiUrl}/api/provider/${id}`);
      dispatch({
        type: actionTypes.GET_SINGLE_PROVIDER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROVIDER_FAILURE,
        payload: error.response?.data.message,
      });
    }
  };
};

export const editProvider = (provider) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.PROVIDER_LOADER });
      const response = await axios.put(
        `${apiUrl}/api/provider/${provider._id}`,
        provider
      );
      dispatch({
        type: actionTypes.EDIT_PROVIDER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROVIDER_FAILURE,
        payload: error.response?.data.message,
      });
    }
  };
};

export const deleteProvider = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.PROVIDER_LOADER });
      const response = await axios.delete(`${apiUrl}/api/provider/${id}`);
      dispatch({
        type: actionTypes.DELETE_PROVIDER_SUCCESS,
        payload: { message: response.data.message, id },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROVIDER_FAILURE,
        payload: error.response?.data.message,
      });
    }
  };
};

export const getCheckedProviders = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GET_CHECKED_PROVIDERS,
      payload: data,
    });
  };
};

export const editCheckedProviders = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.EDIT_CHECKED_PROVIDERS,
      payload: data,
    });
  };
};

export const resetConfirm = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.RESET_CONFIRM,
    });
  };
};
