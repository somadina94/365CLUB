import { FcOk } from 'react-icons/fc';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './Club365.module.css';
import { membershipCheckout } from '../../api/api';
import Spinner from '../UI/Spinner';
import AuthAlert from '../alerts/AuthAlert';

const Club365 = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const { jwt } = useCookies(['jwt'])[0];
  const [showSpinner, setShowSpinner] = useState(false);
  const is365Member = useSelector((state) => state.auth.user?.membership);

  const checkoutHandler = async () => {
    setShowSpinner(true);
    const res = await membershipCheckout(jwt);

    if (res.status === 'success') {
      const url = res.data.charge.hosted_url;
      window.location.href = url;
    } else {
      setAlertMsg(res.message);
      setAlertStatus(false);
      setShowAlert(true);
    }
    setShowSpinner(false);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  return (
    <div className={classes.club}>
      {showSpinner && <Spinner />}
      {showAlert && <AuthAlert message={alertMsg} status={alertStatus} />}
      <h2>365Club membership benefits</h2>
      <div className={classes.content}>
        <FcOk className={classes.icon} />
        <p>Be able to stake more than 5credits per game from your main balance.</p>
      </div>
      <div className={classes.content}>
        <FcOk className={classes.icon} />
        <p>
          Become entitled to monthly bonus of 500credits which is equivalent to $500. Bonus credit
          rules apply.
        </p>
      </div>
      <div className={classes.content}>
        <FcOk className={classes.icon} />
        <p>
          Get free amazon giftcards on your birthdays if you have been a member for the past 90days
          before your birthday.
        </p>
      </div>
      <div className={classes.content}>
        <FcOk className={classes.icon} />
        <p>Get 50% discount if you wish to advertise your business on our platform.</p>
      </div>
      <h2>$10 monthly</h2>
      <div className={classes.action}>
        {!is365Member && (
          <button type="button" onClick={checkoutHandler}>
            Join
          </button>
        )}
        {is365Member && (
          <button type="button" disabled={is365Member}>
            Joined
          </button>
        )}
      </div>
    </div>
  );
};

export default Club365;
