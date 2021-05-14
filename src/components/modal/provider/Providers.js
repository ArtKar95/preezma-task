import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './../modal.module.scss';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { Trash, PencilSquare } from 'react-bootstrap-icons';
import Confirm from '../../confirm/Confirm';
import {
  getAllProviders,
  createProvider,
  getSingleProvider,
  getCheckedProviders,
  editCheckedProviders,
} from '../../../redux/providers/providersAC';

function ProvidersBlock() {
  const dispatch = useDispatch();
  const { providers } = useSelector((state) => state.providersReducer);
  const { client } = useSelector((state) => state.clientsReducer);

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [provider, setProvider] = useState({ name: '' });
  const [providerErrors, setProviderErrors] = useState({
    name: null,
  });
  const [checkedProvidersData, setcheckedProvidersData] = useState([]);
  const [checkedProvidersEdit, setCheckedProvidersEdit] = useState();

  useEffect(() => {
    setCheckedProvidersEdit(client?.providers);
  }, [client, client.providers]);

  useEffect(() => {
    dispatch(getAllProviders());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(
      getCheckedProviders(
        providers.filter((el) => checkedProvidersData.includes(el._id))
      )
    );
  }, [checkedProvidersData, providers, dispatch]);

  useEffect(() => {
    dispatch(
      editCheckedProviders(
        providers.filter((el) => checkedProvidersEdit?.includes(el._id))
      )
    );
  }, [checkedProvidersEdit, providers, dispatch]);

  const takeCheckedProviders = (id) => {
    let checkedProviders = new Set(checkedProvidersData);
    checkedProviders.has(id)
      ? checkedProviders.delete(id)
      : checkedProviders.add(id);
    setcheckedProvidersData([...checkedProviders]);

    let checkedProvidersEditData = new Set(checkedProvidersEdit);
    checkedProvidersEditData.has(id)
      ? checkedProvidersEditData.delete(id)
      : checkedProvidersEditData.add(id);
    setCheckedProvidersEdit([...checkedProvidersEditData]);
  };

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (id) => {
    setShowEdit(true);
    dispatch(getSingleProvider(id));
  };
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    setShowDelete(true);
    dispatch(getSingleProvider(id));
  };

  const handleCreateProvider = (provider) => {
    let providerErrorMessage = null;
    if (provider.name.trim().length < 3) {
      providerErrorMessage = "Provider's name can not be less than 3 simbols";

      setProviderErrors({
        name: providerErrorMessage,
      });
    } else {
      dispatch(createProvider(provider));
      setProvider({ name: '' });
    }
  };

  const handleChange = ({ target: { value } }) => {
    setProvider({ name: value });
    setProviderErrors({ name: null });
  };

  return (
    <>
      <Row className={classes.modal__container__row}>
        <Form.Label
          column
          sm={1}
          className={classes.modal__container__row__label}
        >
          Providers:
        </Form.Label>
        <Col lg={5}>
          <Form.Control
            type='text'
            placeholder='Providers'
            className={`${!!providerErrors.name ? classes.invalid : ''} mr-1`}
            name='providers'
            value={provider.name}
            onChange={handleChange}
          />
          <Form.Text className='text-danger'>{providerErrors.name}</Form.Text>
        </Col>
        <Button
          variant='outline-success'
          size='md'
          className={classes.modal__container__row__button}
          onClick={() => handleCreateProvider(provider)}
        >
          Add Provider
        </Button>
      </Row>

      <Row className={classes.modal__container__row}>
        <Col lg={5} className={classes.modal__container__row__providers__block}>
          {providers.map((item) => {
            return (
              <div key={item._id}>
                <span>
                  <input
                    type='checkbox'
                    name=''
                    onChange={() => takeCheckedProviders(item._id)}
                    checked={
                      checkedProvidersEdit?.includes(item._id) ? true : false
                    }
                  />
                </span>

                <span>{item.name}</span>
                <span>
                  <PencilSquare
                    color='blue'
                    onClick={() => handleShowEdit(item._id)}
                    className={classes.icon}
                  />

                  <Trash
                    color='red'
                    onClick={() => handleShowDelete(item._id)}
                    className={classes.icon}
                  />
                </span>
              </div>
            );
          })}
        </Col>
      </Row>
      {showEdit && (
        <Confirm handleClose={handleCloseEdit} type='EditProvider' />
      )}
      {showDelete && (
        <Confirm handleClose={handleCloseDelete} type='DeleteProvider' />
      )}
    </>
  );
}

export default ProvidersBlock;
