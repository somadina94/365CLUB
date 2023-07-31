import { useState } from 'react';
import {
  FcContacts,
  FcAddressBook,
  FcApproval,
  FcAcceptDatabase,
  FcApprove,
  FcConferenceCall,
} from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Helmet } from 'react-helmet-async';

import classes from './Details.module.css';
import { Link } from 'react-router-dom';
import Spinner from '../UI/Spinner';
import { resendEmailVerify } from '../../api/api';
import AuthAlert from '../alerts/AuthAlert';

const Details = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const { jwt } = useCookies(['jwt'])[0];
  const user = useSelector((state) => state.auth.user);
  const emailStatus = user.emailVerified ? 'Verified' : 'Unverified';
  const statusClasses = user.emailVerified
    ? classes.verified
    : classes.unverified;
  const idStatus =
    user.IdVerified === 'unverified'
      ? 'Unverified'
      : user.IdVerified === 'processing'
      ? 'Processing'
      : user.IdVerified === 'verified'
      ? 'Verified'
      : '';
  const idStatusClasses =
    user.IdVerified === 'verified'
      ? classes.verified
      : user.IdVerified === 'unverified'
      ? classes.unverified
      : user.IdVerified === 'processing'
      ? classes.processing
      : '';
  const membershipStatus = user.membership ? '365CLUB' : 'Regular';
  const membershipClasses = user.membership
    ? classes.verified
    : classes.unverified;
  const accountStatus = user.active ? 'Active' : 'Blocked';

  const resendEmailVerifyHandler = async () => {
    setShowSpinner(true);

    const res = await resendEmailVerify(jwt);

    if (res.status === 'success') {
      setAlertMsg(res.message);
      setAlertStatus(true);
      setShowAlert(true);
    } else {
      setAlertMsg(res.message);
      setAlertStatus(false);
      setShowAlert(true);
    }
    setShowSpinner(false);
    setTimeout(() => {
      setShowAlert(false);
    }, 6000);
  };

  return (
    <div className={classes.details}>
      <Helmet>
        <title>Account details</title>
        <meta name="description" content="" />
        <link rel="canonical" href="/dashboard/details" />
      </Helmet>
      {showSpinner && <Spinner />}
      {showAlert && <AuthAlert message={alertMsg} status={alertStatus} />}
      <div className={classes.content}>
        <div className={classes.title}>
          <FcContacts className={classes.icon} />
          <span>Name</span>
        </div>
        <span>{user.name}</span>
      </div>
      <div className={classes.content}>
        <div className={classes.title}>
          <FcApproval className={classes.icon} />
          <span>Account Status</span>
        </div>
        <span>{accountStatus}</span>
      </div>
      <div className={classes.content}>
        <div className={classes.title}>
          <FcAddressBook className={classes.icon} />
          <span>Email</span>
        </div>
        <span>{user.email}</span>
      </div>
      <div className={classes.content}>
        <div className={classes.title}>
          <FcAcceptDatabase className={classes.icon} />
          <span>Email status</span>
        </div>
        <span className={statusClasses}>{emailStatus}</span>
        {!user.emailVerified && (
          <button
            className={classes.btn}
            type="button"
            onClick={resendEmailVerifyHandler}
          >
            Resend verification email
          </button>
        )}
      </div>
      <div className={classes.content}>
        <div className={classes.title}>
          <FcApprove className={classes.icon} />
          <span>Identity Status</span>
        </div>
        <span className={idStatusClasses}>{idStatus}</span>
        {user.IdVerified === 'unverified' && (
          <Link to="/dashboard/verify-account">Verify</Link>
        )}
      </div>
      <div className={classes.content}>
        <div className={classes.title}>
          <FcConferenceCall className={classes.icon} />
          <span>Membership</span>
        </div>
        <span className={membershipClasses}>{membershipStatus}</span>
        {!user.membership && <Link to="/dashboard/club365">Join 365Club</Link>}
      </div>
    </div>
  );
};

export default Details;
