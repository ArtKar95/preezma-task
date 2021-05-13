import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import ClientList from './components/clientslist/ClientsList';
import Loader from './components/loader/Loader';
import { useEffect } from 'react';

function App() {
  const { clientLoading, clientSuccessMessage, clientError } = useSelector(
    (state) => state.clientsReducer
  );

  const { providerLoading, providerSuccessMessage, providerError } =
    useSelector((state) => state.providersReducer);

  useEffect(() => {
    if (clientSuccessMessage) {
      toast.success(clientSuccessMessage);
    }
    if (clientError) {
      toast.error(clientError);
    }
    if (providerSuccessMessage) {
      toast.success(providerSuccessMessage);
    }
    if (providerError) {
      toast.error(providerError);
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
        {/* <Route path="*" exact component={NotFoundPage} /> */}
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
