import { Fragment } from 'react';
import { useRouteError } from 'react-router-dom';

import Footer from '../main/Footer';
import Header from '../main/Header';
import classes from './ErrorModal.module.css';

const ErrorModal = () => {
  const data = useRouteError();
  const message = data.message;

  return (
    <Fragment>
      <Header />
      <section className={classes.error}>
        <p>{message}</p>
      </section>
      <Footer />
    </Fragment>
  );
};

export default ErrorModal;
