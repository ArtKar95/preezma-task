import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Switch, Route } from 'react-router-dom';
import ClientList from './components/clientslist/ClientsList';
import Loader from './components/loader/Loader';
import NotFoundPage from './components/notFoundPage/NotFoundPage';

function App() {
  const { clientLoading, clientSuccessMessage, clientError } = useSelector(
    (state) => state.clientsReducer
  );

  const { providerLoading, providerSuccessMessage, providerError } =
    useSelector((state) => state.providersReducer);

  useEffect(() => {
    const successMessage = clientSuccessMessage || providerSuccessMessage;
    if (successMessage) {
      toast.success(successMessage);
    }
    const errorMessage = clientError || providerError;
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [
    clientSuccessMessage,
    clientError,
    providerSuccessMessage,
    providerError,
  ]);

  return (
    <>
      <Switch>
        <Route path='/' exact component={ClientList} />
        <Route path='*' exact component={NotFoundPage} />
      </Switch>

      <ToastContainer
        position='bottom-left'
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {(clientLoading || providerLoading) && <Loader />}
    </>
  );
}

export default App;
