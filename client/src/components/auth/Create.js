import { Fragment, useEffect, useState, useRef } from 'react';
import useInput from '../../hooks/userInput';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

import { FcGlobe, FcAddressBook } from 'react-icons/fc';
import {
  BsFillPersonFill,
  BsFillEnvelopeAtFill,
  BsFillKeyFill,
  BsEyeFill,
  BsEyeSlashFill,
} from 'react-icons/bs';

import classes from './Create.module.css';
import Spinner from '../UI/Spinner';
import { authActions } from '../../store/auth-slice';
import { createAccount } from '../../api/api';
import AuthAlert from '../alerts/AuthAlert';

const Create = () => {
  const referrerRef = useRef();
  const [countries, setCountries] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setconfirmPasswordType] = useState('password');
  const [showSpinner, setShowSpinner] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setCookie = useCookies(['jwt'])[1];
  const {
    value: firstNameInput,
    enteredValueIsValid: firstNameInputIsValid,
    hasError: firstNameInputIsInvalid,
    valueInputChangedHandler: firstNameInputChangedHandler,
    valueInputBlurHandler: firstNameInputBlurHandler,
    reset: firstNameInputReset,
  } = useInput((value) => value.trim() !== '');

  const {
    value: lastNameInput,
    enteredValueIsValid: lastNameInputIsValid,
    hasError: lastNameInputIsInvalid,
    valueInputChangedHandler: lastNameInputChangedHandler,
    valueInputBlurHandler: lastNameInputBlurHandler,
    reset: lastNameInputReset,
  } = useInput((value) => value.trim() !== '');

  const {
    value: emailInput,
    enteredValueIsValid: emailInputIsValid,
    hasError: emailInputIsInvalid,
    valueInputChangedHandler: emailInputChangedHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    reset: emailInputReset,
  } = useInput((value) => value.trim().includes('@'));

  const {
    value: passwordInput,
    enteredValueIsValid: passwordInputIsValid,
    hasError: passwordInputIsInvalid,
    valueInputChangedHandler: passwordInputChangedHandler,
    valueInputBlurHandler: passwordInputBlurHandler,
    reset: passwordInputReset,
  } = useInput((value) => value.trim() !== '');

  const {
    value: confirmPasswordInput,
    enteredValueIsValid: confirmPasswordInputIsValid,
    hasError: confirmPasswordInputIsInvalid,
    valueInputChangedHandler: confirmPasswordInputChangedHandler,
    valueInputBlurHandler: confirmPasswordInputBlurHandler,
    reset: confirmPasswordInputReset,
  } = useInput((value) => value.trim() !== '');

  const {
    value: countryInput,
    enteredValueIsValid: countryInputIsValid,
    hasError: countryInputIsInvalid,
    valueInputChangedHandler: countryInputChangedHandler,
    valueInputBlurHandler: countryInputBlurHandler,
    reset: countryInputReset,
  } = useInput((value) => value.trim() !== 'Choose country');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://restcountries.com/v3.1/all');
      const data = res.data.map((el) => el.name.common);
      data.sort();
      setCountries(data);
    };
    fetchData();
  }, []);

  let formIsValid = false;

  if (
    firstNameInputIsValid &&
    lastNameInputIsValid &&
    emailInputIsValid &&
    passwordInputIsValid &&
    confirmPasswordInputIsValid &&
    countryInputIsValid
  ) {
    formIsValid = true;
  }

  const switchEyeIcon = () => {
    setShowPassword((initialstate) => !initialstate);
  };

  const switchEyeIcon2 = () => {
    setShowConfirmPassword((initialstate) => !initialstate);
  };

  const switchType = (val) => {
    setPasswordType(val);
  };

  const switchType2 = (val) => {
    setconfirmPasswordType(val);
  };

  const passwordActionSee = () => {
    switchEyeIcon();
    switchType('text');
  };

  const passwordActionSee2 = () => {
    switchEyeIcon2();
    switchType2('text');
  };
  const passwordActionBlind = () => {
    switchEyeIcon();
    switchType('password');
  };

  const passwordActionBlind2 = () => {
    switchEyeIcon2();
    switchType2('password');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowSpinner(true);
    const data = {
      name: firstNameInput + ' ' + lastNameInput,
      email: emailInput,
      country: countryInput,
      password: passwordInput,
      passwordConfirm: confirmPasswordInput,
      referrerEmail: referrerRef.current.value,
    };

    const res = await createAccount(data);

    if (res.status === 'success') {
      dispatch(authActions.login({ user: res.data.user }));
      setCookie('jwt', res.token);
      setAlertMsg(res.message);
      setAlertStatus(true);
      setShowAlert(true);
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);
    } else {
      setAlertMsg(res.message);
      setAlertStatus(false);
      setShowAlert(true);
    }

    setShowSpinner(false);
    firstNameInputReset();
    lastNameInputReset();
    emailInputReset();
    passwordInputReset();
    countryInputReset();
    confirmPasswordInputReset();
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const firstNameInputClasses = firstNameInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const lastNameInputClasses = lastNameInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const emailInputClasses = emailInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const countryInputClasses = countryInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const passwordInputClasses = passwordInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const confirmPasswordInputClasses = confirmPasswordInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  return (
    <Fragment>
      <Helmet>
        <title>Create account</title>
        <meta
          name="description"
          content="Create an account now and get 50 credits to start playing with."
        />
        <link rel="canonical" href="/signUp" />
      </Helmet>
      {showAlert && <AuthAlert message={alertMsg} status={alertStatus} />}
      <form className={classes.form} onSubmit={submitHandler}>
        {showSpinner && <Spinner />}
        <div className={firstNameInputClasses}>
          <label>First name</label>
          <div className={classes['input-group']}>
            <BsFillPersonFill className={classes.icon} />
            <input
              type="text"
              value={firstNameInput}
              onChange={firstNameInputChangedHandler}
              onBlur={firstNameInputBlurHandler}
            />
          </div>
        </div>
        <div className={lastNameInputClasses}>
          <label>Last name</label>
          <div className={classes['input-group']}>
            <BsFillPersonFill className={classes.icon} />
            <input
              type="text"
              value={lastNameInput}
              onChange={lastNameInputChangedHandler}
              onBlur={lastNameInputBlurHandler}
            />
          </div>
        </div>
        <div className={countryInputClasses}>
          <label>Country</label>
          <div className={classes['input-group']}>
            <FcGlobe className={classes.icon} />
            <select
              value={countryInput}
              onChange={countryInputChangedHandler}
              onBlur={countryInputBlurHandler}
            >
              <option>Choose country</option>
              {countries?.map((el) => (
                <option key={el}>{el}</option>
              ))}
            </select>
          </div>
        </div>
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
          </div>
        </div>
        <div className={passwordInputClasses}>
          <label>Password</label>
          <div className={classes['input-group']}>
            <BsFillKeyFill className={classes.icon} />
            <input
              type={passwordType}
              value={passwordInput}
              onChange={passwordInputChangedHandler}
              onBlur={passwordInputBlurHandler}
            />
            {!showPassword && (
              <BsEyeFill
                className={classes.icon}
                onClick={passwordActionSee}
                style={{ cursor: 'pointer' }}
              />
            )}
            {showPassword && (
              <BsEyeSlashFill
                className={classes.icon}
                onClick={passwordActionBlind}
                style={{ cursor: 'pointer' }}
              />
            )}
          </div>
        </div>
        <div className={confirmPasswordInputClasses}>
          <label>Confirm password</label>
          <div className={classes['input-group']}>
            <BsFillKeyFill className={classes.icon} />
            <input
              type={confirmPasswordType}
              value={confirmPasswordInput}
              onChange={confirmPasswordInputChangedHandler}
              onBlur={confirmPasswordInputBlurHandler}
            />
            {!showConfirmPassword && (
              <BsEyeFill
                className={classes.icon}
                onClick={passwordActionSee2}
                style={{ cursor: 'pointer' }}
              />
            )}
            {showConfirmPassword && (
              <BsEyeSlashFill
                className={classes.icon}
                onClick={passwordActionBlind2}
                style={{ cursor: 'pointer' }}
              />
            )}
          </div>
        </div>
        <div className={classes.group}>
          <label>Referrer's email(optional)</label>
          <div className={classes['input-group']}>
            <FcAddressBook className={classes.icon} />
            <input type="email" ref={referrerRef} />
          </div>
        </div>
        <div className={classes.action}>
          <button type="submit" disabled={!formIsValid}>
            Create account
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Create;
