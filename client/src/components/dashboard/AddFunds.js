import { useState } from 'react';
import useInput from '../../hooks/userInput';
import { RiExchangeDollarLine } from 'react-icons/ri';
import { useCookies } from 'react-cookie';
import { Helmet } from 'react-helmet-async';

import classes from './AddFunds.module.css';
import Spinner from '../UI/Spinner';
import AuthAlert from '../alerts/AuthAlert';
import { topupCheckout } from '../../api/api';

const AddFunds = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const { jwt } = useCookies(['jwt'])[0];
  const {
    value: amountInput,
    enteredValueIsValid: amountInputIsValid,
    hasError: amountInputIsInvalid,
    valueInputChangedHandler: amountInputChangedHandler,
    valueInputBlurHandler: amountInputBlurHandler,
    reset: amountInputReset,
  } = useInput((value) => value.trim() !== '' && value.trim() > 4.99);

  let formIsValid = false;
  if (amountInputIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowSpinner(true);
    const amount = amountInput;

    const res = await topupCheckout({ amount }, jwt);

    if (res.status === 'success') {
      const url = res.data.charge.hosted_url;
      window.location.href = url;
    } else {
      setAlertMsg(res.message);
      setAlertStatus(false);
      setShowAlert(true);
    }

    amountInputReset();
    setShowSpinner(false);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const amountInputClasses = amountInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Helmet>
        <title>Fund account</title>
        <meta name="description" content="" />
        <link rel="canonical" href="/dashboard/fund-account" />
      </Helmet>
      {showSpinner && <Spinner />}
      {showAlert && <AuthAlert message={alertMsg} status={alertStatus} />}
      <h2>Minimium deposit is $5 USD</h2>
      <div className={amountInputClasses}>
        <label>Amount</label>
        <div className={classes['input-group']}>
          <RiExchangeDollarLine className={classes.icon} />
          <input
            type="number"
            value={amountInput}
            onChange={amountInputChangedHandler}
            onBlur={amountInputBlurHandler}
          />
        </div>
      </div>
      <div className={classes.action}>
        <button type="submit" disabled={!formIsValid}>
          Add
        </button>
      </div>
    </form>
  );
};

export default AddFunds;
