import React from 'react';
import classes from './notFoundPage.module.scss';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className={classes.not__found__container}>
      <div className={classes.not__found__container__text}>
        <h1>404</h1>
        <h2>Not found page</h2>
      </div>
      <div>
        <Link to='/'>Go back </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
