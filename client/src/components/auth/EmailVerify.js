import { useLoaderData } from 'react-router-dom';

import classes from './EmailVerify.module.css';
import { verifyEmailAddress } from '../../api/api';

const EmailVerify = () => {
  const res = useLoaderData();
  const message = res.message;
  return <h2 className={classes.verified}>{message}</h2>;
};

export default EmailVerify;

export const loader = ({ params }) => {
  return verifyEmailAddress(params.token);
};
