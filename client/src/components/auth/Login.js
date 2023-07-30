import { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useInput from '../../hooks/userInput';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {
  BsFillEnvelopeAtFill,
  BsKeyFill,
  BsEyeFill,
  BsEyeSlashFill,
} from 'react-icons/bs';
import { Helmet } from 'react-helmet-async';

import classes from './Login.module.css';
import { logIn } from '../../api/api';
import { authActions } from '../../store/auth-slice';
import AuthAlert from '../alerts/AuthAlert';
import Spinner from '../UI/Spinner';

const Login = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [showSpinner, setShowSpinner] = useState(false);
  const dispatch = useDispatch();
  const setCookie = useCookies(['jwt'])[1];
  const navigate = useNavigate();

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

  const switchEyeIcon = () => {
    setShowPassword((initialstate) => !initialstate);
  };

  const switchType = (val) => {
    setPasswordType(val);
  };

  const passwordActionSee = () => {
    switchEyeIcon();
    switchType('text');
  };
  const passwordActioBlind = () => {
    switchEyeIcon();
    switchType('password');
  };

  let formIsValid = false;

  if (emailInputIsValid && passwordInputIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowSpinner(true);

    const loginData = {
      email: emailInput,
      password: passwordInput,
    };

    const res = await logIn(loginData);

    if (res.status === 'success') {
      dispatch(authActions.login({ user: res.data.user }));
      setCookie('jwt', res.token);
      setAlertMsg(res.message);
      setAlertStatus(true);
      setShowAlert(true);
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 3000);
    } else {
      setAlertMsg(res.message);
      setAlertStatus(false);
      setShowAlert(true);
    }

    passwordInputReset();
    emailInputReset();
    setTimeout(() => {
      setShowAlert(false);
      setShowSpinner(false);
    }, 3000);
  };

  const emailInputClasses = emailInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const passwordInputClasses = passwordInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;
  return (
    <Fragment>
      <Helmet>
        <title>Login</title>
        <meta
          name="description"
          content="Login to your account to play and win big."
        />
        <link rel="canonical" href="/Login" />
      </Helmet>
      <form className={classes.form} onSubmit={submitHandler}>
        {showAlert && <AuthAlert message={alertMsg} status={alertStatus} />}
        {showSpinner && <Spinner />}
        <div className={emailInputClasses}>
          <label htmlFor="email">Email address</label>
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
          <label htmlFor="password">Password</label>
          <div className={classes['input-group']}>
            <BsKeyFill className={classes.icon} />
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
                onClick={passwordActioBlind}
                style={{ cursor: 'pointer' }}
              />
            )}
          </div>
          <Link to="/forgotPassword">Forgot password?</Link>
        </div>
        <div className={classes.action}>
          <button type="submit" disabled={!formIsValid}>
            Login
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
