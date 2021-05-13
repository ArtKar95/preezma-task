import { useEffect, useState } from 'react';
import classes from './confirm.module.scss';
import { Modal } from 'react-bootstrap';
import { CheckSquare, XSquare } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProvider,
  editProvider,
  resetConfirm,
} from '../../redux/providers/providersAC';
import { deleteClient } from '../../redux/clients/clientsAC';

const Confirm = ({ handleClose, type, handleCloseModal }) => {
  const { provider, deleteProvidersuccess, editProviderSuccess } = useSelector(
    (state) => state.providersReducer
  );
  const { client } = useSelector((state) => state.clientsReducer);
  const { deleteClientSuccess } = useSelector((state) => state.clientsReducer);

  const dispatch = useDispatch();
  const [providerEdit, setProviderEdit] = useState({ name: '' });
  const [providerErrors, setProviderErrors] = useState({
    name: null,
  });

  useEffect(() => {
    if (deleteClientSuccess) {
      handleClose();
      handleCloseModal();
      dispatch(resetConfirm());
    }
    if (deleteProvidersuccess || editProviderSuccess) {
      handleClose();
      dispatch(resetConfirm());
    }
  }, [
    deleteClientSuccess,
    deleteProvidersuccess,
    editProviderSuccess,
    handleClose,
    handleCloseModal,
    dispatch,
  ]);

  useEffect(() => {
    if (type === 'EditProvider') {
      setProviderEdit(provider);
    }
  }, [type, provider]);

  const handleClick = () => {
    if (type === 'DeleteProvider') {
      dispatch(deleteProvider(provider._id));
    } else if (type === 'EditProvider') {
      let providerErrorMessage = null;
      if (providerEdit.name.trim().length < 3) {
        providerErrorMessage = "Provider's name can not be less than 3 simbols";

        setProviderErrors({
          name: providerErrorMessage,
        });
      } else {
        dispatch(editProvider(providerEdit));
        setProviderEdit({ ...providerEdit, name: '' });
      }
    } else {
      dispatch(deleteClient(client._id));
    }
    // handleClose();
  };

  const handleChange = ({ target: { value } }) => {
    setProviderEdit({ ...providerEdit, name: value });
    setProviderErrors({ name: null });
  };

  return (
    <>
      <Modal
        show={true}
        className={classes.confirm__container}
        backdrop='static'
      >
        <Modal.Header closeButton onClick={handleClose}>
          {type === 'EditProvider' ? (
            <Modal.Title>Edit provider</Modal.Title>
          ) : (
            <Modal.Title>Are you sure</Modal.Title>
          )}
        </Modal.Header>
        {type === 'EditProvider' && (
          <Modal.Body>
            <input
              type='text'
              placeholder='Provider'
              className={`${!!providerErrors.name ? classes.invalid : ''} ${
                classes.input
              }`}
              value={providerEdit.name || ''}
              onChange={handleChange}
            />
            {providerErrors ? (
              <p className='text-danger'>{providerErrors.name}</p>
            ) : (
              ''
            )}
          </Modal.Body>
        )}
        <Modal.Footer>
          <CheckSquare
            color='green'
            size={30}
            className={classes.icon}
            onClick={handleClick}
          />
          <XSquare size={30} onClick={handleClose} className={classes.icon} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Confirm;
