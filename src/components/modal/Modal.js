import React, { useEffect, useState } from 'react';
import classes from './modal.module.scss';
import { Button, Modal, Form, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  createClient,
  editClient,
  resetModal,
} from '../../redux/clients/clientsAC';
import ProvidersBlock from './provider/Providers';
import Confirm from '../confirm/Confirm';

function ClientModal({ handleClose, type = 'Add' }) {
  const dispatch = useDispatch();
  const { client, createClientSuccess, editClientSuccess } = useSelector(
    (state) => state.clientsReducer
  );
  const { checkedProviders, editedProviders } = useSelector(
    (state) => state.providersReducer
  );

  useEffect(() => {
    if (createClientSuccess || editClientSuccess) {
      handleClose();
      dispatch(resetModal());
    }
  }, [createClientSuccess, editClientSuccess, dispatch, handleClose]);

  const [show, setShow] = useState(false);

  const handleCloseConfirm = () => setShow(false);
  const handleShowConfirm = () => {
    setShow(true);
  };

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    providers: [],
  });

  useEffect(() => {
    if (type === 'Edit') {
      setValues({
        name: client.name,
        email: client.email,
        phone: client.phone,
        providers: client.providers,
      });
    } else {
      setValues({
        name: '',
        email: '',
        phone: '',
        providers: [],
      });
    }
  }, [type, client]);

  const [errors, setErrors] = useState({
    name: null,
    email: null,
    phone: null,
  });

  const handleChange = ({ target: { name, value } }) => {
    setValues({
      ...values,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: null,
    });
  };

  const handleSend = () => {
    const { name, email, phone } = values;

    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phonRe = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

    let valid = true;
    let emailMessage = null;
    let nameMessage = null;
    let phoneMessage = null;

    if (!email) {
      emailMessage = 'Email is required';
      valid = false;
    } else if (re.test(email) === false) {
      emailMessage = `${email} isn't valid email`;
      valid = false;
    }

    if (!name.trim()) {
      nameMessage = 'Name is required';
      valid = false;
    }

    if (!phone) {
      phoneMessage = 'Phone number is required';
      valid = false;
    } else if (phonRe.test(phone) === false) {
      phoneMessage = `Wrong phone number`;
      valid = false;
    }

    setErrors({
      name: nameMessage,
      email: emailMessage,
      phone: phoneMessage,
    });

    if (valid) {
      dispatch(createClient({ ...values, providers: checkedProviders }));
    }
  };

  const handleEdit = (id, values) => {
    dispatch(editClient(id, { ...values, providers: editedProviders }));
  };

  return (
    <>
      <Modal
        show={true}
        backdrop='static'
        keyboard={false}
        size='lg'
        className={classes.modal__container}
      >
        <Modal.Header>
          <Modal.Title>
            {type === 'Edit' ? 'Edit client' : 'New client'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row}>
              <Row className={classes.modal__container__row}>
                <Form.Label
                  column
                  sm={1}
                  className={classes.modal__container__row__label}
                >
                  Name:
                </Form.Label>
                <Col lg={7}>
                  <Form.Control
                    type='text'
                    name='name'
                    value={values.name || ''}
                    placeholder='Name'
                    onChange={handleChange}
                    className={!!errors.name ? classes.invalid : ''}
                  />
                  <Form.Text className='text-danger'>{errors.name}</Form.Text>
                </Col>
              </Row>
              <Row className={classes.modal__container__row}>
                <Form.Label
                  column
                  sm={1}
                  className={classes.modal__container__row__label}
                >
                  Email:
                </Form.Label>
                <Col lg={7}>
                  <Form.Control
                    type='email'
                    name='email'
                    value={values.email || ''}
                    placeholder='email@example.com'
                    onChange={handleChange}
                    className={!!errors.email ? classes.invalid : ''}
                  />
                  <Form.Text className='text-danger'>{errors.email}</Form.Text>
                </Col>
              </Row>
              <Row className={classes.modal__container__row}>
                <Form.Label
                  column
                  sm={1}
                  className={classes.modal__container__row__label}
                >
                  Phone:
                </Form.Label>
                <Col lg={7}>
                  <Form.Control
                    type='tel'
                    name='phone'
                    value={values.phone || ''}
                    placeholder='37412345678'
                    onChange={handleChange}
                    className={!!errors.phone ? classes.invalid : ''}
                  />
                  <Form.Text className='text-danger'>{errors.phone}</Form.Text>
                </Col>
              </Row>
              <ProvidersBlock />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {type === 'Edit' && (
            <Button
              style={{ marginRight: 'auto' }}
              variant='danger'
              onClick={handleShowConfirm}
            >
              Delete Client
            </Button>
          )}
          <Button variant='outline-secondary' onClick={handleClose}>
            Cancel
          </Button>
          {type === 'Edit' ? (
            <Button
              variant='outline-info'
              onClick={() => handleEdit(client?._id, values)}
            >
              Save client
            </Button>
          ) : (
            <Button variant='outline-success' onClick={handleSend}>
              Add client
            </Button>
          )}
        </Modal.Footer>
        {show && (
          <Confirm
            handleClose={handleCloseConfirm}
            type='DeleteClient'
            handleCloseModal={handleClose}
          />
        )}
      </Modal>
    </>
  );
}

export default ClientModal;
