import { useState } from 'react';
import useInput from '../../hooks/userInput';
import { BsFillEnvelopeAtFill } from 'react-icons/bs';

import classes from './ForgotPassword.module.css';
import Spinner from '../UI/Spinner';
import { forgotPassword } from '../../api/api';
import AuthAlert from '../alerts/AuthAlert';

const ForgotPassword = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const {
    value: emailInput,
    enteredValueIsValid: emailInputIsValid,
    hasError: emailInputIsInvalid,
    valueInputChangedHandler: emailInputChangedHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    reset: emailInputReset,
  } = useInput((value) => value.trim().includes('@'));

  let formIsValid = false;
  if (emailInputIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowSpinner(true);

    const res = await forgotPassword({ email: emailInput });

    if (res.status === 'success') {
      setAlertMsg(res.message);
      setAlertStatus(true);
      setShowAlert(true);
    } else {
      setAlertMsg(res.message);
      setAlertStatus(false);
      setShowAlert(true);
    }

    emailInputReset();
    setTimeout(() => {
      setShowAlert(false);
      setShowSpinner(false);
    }, 4000);
  };

  const emailInputClasses = emailInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {showAlert && <AuthAlert message={alertMsg} status={alertStatus} />}
      {showSpinner && <Spinner />}
      <h2>Enter your emaill address and click proceed</h2>
      <div className={emailInputClasses}>
        <label>Email address</label>
        <div className={classes['input-group']}>
          <BsFillEnvelopeAtFill className={classes.icon} />
          <input
            type="email"
            value={emailInput}
            onChange={emailInputChangedHandler}
            onBlur={emailInputBlurHandler}
          />
          {emailInputIsInvalid && <span>Please enter a valid email.</span>}
        </div>
      </div>
      <div className={classes.action}>
        <button type="submit" disabled={!formIsValid}>
          Send Reset Email
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
