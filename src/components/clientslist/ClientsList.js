import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './clientslist.module.scss';
import { Table } from 'react-bootstrap';
import ClientModal from '../modal/Modal';
import {
  getAllClients,
  getSingleClient,
  resetClient,
} from '../../redux/clients/clientsAC';
import { getAllProviders } from '../../redux/providers/providersAC';

const ClientList = () => {
  const dispatch = useDispatch();
  const { clients } = useSelector((state) => state.clientsReducer);
  const { providers } = useSelector((state) => state.providersReducer);

  const [show, setShow] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    dispatch(getAllProviders());
    dispatch(getAllClients());
    // eslint-disable-next-line
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    dispatch(resetClient());
  };
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (id) => {
    setShowEditModal(true);
    dispatch(getSingleClient(id));
  };

  return (
    <div className={classes.clientlist__container}>
      <h2>List of clients</h2>
      <Table bordered hover className={classes.clientlist__container__table}>
        <thead>
          <tr className={classes.clientlist__container__table__head}>
            <td colSpan='5'>
              <div>
                <span>Clients</span>
                <button onClick={handleShow}>New client</button>
              </div>
            </td>
          </tr>
          <tr className={classes.clientlist__container__table__titles}>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Providers</th>
            <th></th>
          </tr>
        </thead>

        {clients?.map((item, i) => {
          return (
            <tbody key={item._id}>
              <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  {providers
                    ?.filter((el) => item.providers.includes(el._id))
                    .map((i) => [`${i.name},`])
                    .join(' ')
                    .slice(0, -1)}
                </td>
                <td className={classes.edit}>
                  <span onClick={() => handleShowEditModal(item._id)}>
                    Edit
                  </span>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>

      {show && <ClientModal handleClose={handleClose} />}
      {showEditModal && (
        <ClientModal handleClose={handleCloseEditModal} type='Edit' />
      )}
    </div>
  );
};

export default ClientList;
