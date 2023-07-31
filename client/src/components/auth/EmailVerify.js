import { Fragment } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import classes from './EmailVerify.module.css';
import { verifyEmailAddress } from '../../api/api';

const EmailVerify = () => {
  const res = useLoaderData();
  const message = res.message;
  return (
    <Fragment>
      <Helmet>
        <title>Email verification</title>
        <meta name="description" content="" />
        <link rel="canonical" href="/verify-email/:token" />
      </Helmet>
      <h2 className={classes.verified}>{message}</h2>;
    </Fragment>
  );
};

export default EmailVerify;

export const loader = ({ params }) => {
  return verifyEmailAddress(params.token);
};
