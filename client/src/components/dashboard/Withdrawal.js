import { useState } from 'react';
import useInput from '../../hooks/userInput';
import { FcDepartment, FcCurrencyExchange, FcHome } from 'react-icons/fc';
import { MdPaid } from 'react-icons/md';
import { useCookies } from 'react-cookie';

import classes from './Withdrawal.module.css';
import Spinner from '../UI/Spinner';
import AuthAlert from '../alerts/AuthAlert';
import { withdrawFunds } from '../../api/api';

const Withdrawal = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const { jwt } = useCookies(['jwt'])[0];
  const {
    value: balanceInput,
    enteredValueIsValid: balanceInputIsValid,
    hasError: balanceInputIsInvalid,
    valueInputChangedHandler: balanceInputChangedHandler,
    valueInputBlurHandler: balanceInputBlurHandler,
    reset: balanceInputReset,
  } = useInput((value) => value.trim() !== '');

  const {
    value: walletInput,
    enteredValueIsValid: walletInputIsValid,
    hasError: walletInputIsInvalid,
    valueInputChangedHandler: walletInputChangedHandler,
    valueInputBlurHandler: walletInputBlurHandler,
    reset: walletInputReset,
  } = useInput((value) => value.trim() !== '');

  const {
    value: addressInput,
    enteredValueIsValid: addressInputIsValid,
    hasError: addressInputIsInvalid,
    valueInputChangedHandler: addressInputChangedHandler,
    valueInputBlurHandler: addressInputBlurHandler,
    reset: addressInputReset,
  } = useInput((value) => value.trim() !== '');

  const {
    value: amountInput,
    enteredValueIsValid: amountInputIsValid,
    hasError: amountInputIsInvalid,
    valueInputChangedHandler: amountInputChangedHandler,
    valueInputBlurHandler: amountInputBlurHandler,
    reset: amountInputReset,
  } = useInput((value) => value.trim() !== '');

  let formIsValid = false;
  if (balanceInputIsValid && walletInputIsValid && addressInputIsValid && amountInputIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowSpinner(true);

    const data = {
      account: balanceInput,
      walletType: walletInput,
      walletAddress: addressInput,
      amount: amountInput,
    };

    const res = await withdrawFunds(data, jwt);
    if (res.status === 'success') {
      setAlertMsg(res.message);
      setAlertStatus(true);
      setShowAlert(true);
    } else {
      setAlertMsg(res.message);
      setAlertStatus(false);
      setShowAlert(true);
    }

    balanceInputReset();
    walletInputReset();
    addressInputReset();
    amountInputReset();

    setTimeout(() => {
      setShowAlert(false);
      setShowSpinner(false);
    }, 10000);
  };

  const balanceInputClasses = balanceInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const amountInputClasses = amountInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const walletInputClasses = walletInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const addressInputClasses = addressInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {showSpinner && <Spinner />}
      {showAlert && <AuthAlert message={alertMsg} status={alertStatus} />}
      <div className={balanceInputClasses}>
        <label>Choose balance</label>
        <div className={classes['input-group']}>
          <FcDepartment className={classes.icon} />
          <select
            value={balanceInput}
            onChange={balanceInputChangedHandler}
            onBlur={balanceInputBlurHandler}
          >
            <option>Choose balance</option>
            <option>Main balance</option>
            <option>Bonus balance</option>
          </select>
        </div>
      </div>
      <div className={walletInputClasses}>
        <label>Choose crypto wallet</label>
        <div className={classes['input-group']}>
          <FcCurrencyExchange className={classes.icon} />
          <select
            value={walletInput}
            onChange={walletInputChangedHandler}
            onBlur={walletInputBlurHandler}
          >
            <option>Choose wallet</option>
            <option>BITCOIN</option>
            <option>ETHEREUM</option>
          </select>
        </div>
      </div>
      <div className={addressInputClasses}>
        <label>Wallet address</label>
        <div className={classes['input-group']}>
          <FcHome className={classes.icon} />
          <input
            type="text"
            value={addressInput}
            onChange={addressInputChangedHandler}
            onBlur={addressInputBlurHandler}
          />
        </div>
      </div>
      <div className={amountInputClasses}>
        <label>Amount</label>
        <div className={classes['input-group']}>
          <MdPaid className={classes.icon} />
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
          Send Request
        </button>
      </div>
    </form>
  );
};

export default Withdrawal;
