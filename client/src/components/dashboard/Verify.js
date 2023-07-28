import { useRef, useState, useEffect } from 'react';
import { FcCamera } from 'react-icons/fc';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';

import classes from './Verify.module.css';
import selfieSample from '../../images/photo.jpg';
import selfieWithIdSample from '../../images/photo-id.jpg';
import idFrontSample from '../../images/id-front.jpg';
import idBackSample from '../../images/idback.jpg';
import Spinner from '../UI/Spinner';
import { uploadPhotos } from '../../api/api';
import AuthAlert from '../alerts/AuthAlert';
import { getMe } from '../../api/api';
import { authActions } from '../../store/auth-slice';

const Verify = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const selfieRef = useRef();
  const selfieWithIdRef = useRef();
  const idFrontRef = useRef();
  const idBackRef = useRef();
  const setReload = useState(false)[1];
  const { jwt } = useCookies(['jwt'])[0];
  const userIdVerifiedStatus = useSelector((state) => state.auth.user.IdVerified);
  const [updateUser, setUpdateUser] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const request = async () => {
      const res = await getMe(jwt);
      if (res.status === 'success') {
        dispatch(authActions.refreshUser({ user: res.data.user }));
      }
    };
    if (updateUser) request();
  }, [jwt, dispatch, updateUser]);

  let formIsValid = false;
  if (
    selfieRef.current?.files?.length > 0 &&
    selfieWithIdRef.current?.files?.length > 0 &&
    idFrontRef.current?.files?.length > 0 &&
    idBackRef.current?.files?.length > 0
  ) {
    formIsValid = true;
  }

  const handleChange = () => {
    setReload((prevState) => !prevState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowSpinner(true);
    const form = new FormData();
    const selfie = selfieRef.current.files[0];
    const selfieWithId = selfieWithIdRef.current.files[0];
    const idFront = idFrontRef.current.files[0];
    const idBack = idBackRef.current.files[0];

    form.append('selfie', selfie, 'selfie');
    form.append('selfieWithId', selfieWithId, 'selfieWithId');
    form.append('idFront', idFront, 'idFront');
    form.append('idBack', idBack, 'idBack');

    const res = await uploadPhotos(form, jwt);

    if (res.status === 'success') {
      setUpdateUser(true);
      setAlertMsg(res.message);
      setAlertStatus(true);
      setShowAlert(true);
    } else {
      setAlertMsg(res.message);
      setAlertStatus(false);
      setShowAlert(true);
    }

    setTimeout(() => {
      setShowAlert(false);
      setShowSpinner(false);
      setUpdateUser(false);
    }, 3000);
  };

  if (userIdVerifiedStatus === 'verified') {
    return <h2 className={classes.verified}>Verified!!!</h2>;
  }

  if (userIdVerifiedStatus === 'processing') {
    return (
      <div className={classes.processing}>
        <h2>Processing...</h2>
        <p>It usually takes us 1 to 5 working days to verify Identity data. Please be patient with us </p>
      </div>
    );
  }

  return (
    <form className={classes.form} onSubmit={submitHandler} onChange={handleChange}>
      {showSpinner && <Spinner />}
      {showAlert && <AuthAlert message={alertMsg} status={alertStatus} />}
      <h2>Photos on the right are samples of required documents</h2>
      <div className={classes.group}>
        <label>Clear Selfie</label>
        <div className={classes['input-group']}>
          <FcCamera className={classes.icon} />
          <input ref={selfieRef} capture="camera" accept="image/*" type="file" />
          <div className={classes.sample}>
            <img src={selfieSample} alt="sample" />
          </div>
        </div>
      </div>
      <div className={classes.group}>
        <label>Clear selfie with Id front</label>
        <div className={classes['input-group']}>
          <FcCamera className={classes.icon} />
          <input ref={selfieWithIdRef} capture="camera" accept="image/*" type="file" />
          <div className={classes.sample}>
            <img src={selfieWithIdSample} alt="sample" />
          </div>
        </div>
      </div>
      <div className={classes.group}>
        <label>Clear photo of Id frontside</label>
        <div className={classes['input-group']}>
          <FcCamera className={classes.icon} />
          <input ref={idFrontRef} capture="camera" accept="image/*" type="file" />
          <div className={classes.sample}>
            <img src={idFrontSample} alt="sample" />
          </div>
        </div>
      </div>
      <div className={classes.group}>
        <label>Clear photo of Id backside</label>
        <div className={classes['input-group']}>
          <FcCamera className={classes.icon} />
          <input ref={idBackRef} capture="camera" accept="image/*" type="file" />
          <div className={classes.sample}>
            <img src={idBackSample} alt="sample" />
          </div>
        </div>
      </div>
      <div className={classes.action}>
        <button type="submit" disabled={!formIsValid}>
          Upload data
        </button>
      </div>
    </form>
  );
};

export default Verify;
