import { useState, useRef, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineDollar } from 'react-icons/ai';

import classes from './PlayNumbers.module.css';
import Spinner from '../UI/Spinner';
import AuthAlert from '../alerts/AuthAlert';
import { getMe } from '../../api/api';
import { authActions } from '../../store/auth-slice';
import { playNumbers, playNumbersWithBonus } from '../../api/api';

const PlayNumbers = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const [result, setResult] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);
  const [played, setPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { jwt } = useCookies(['jwt'])[0];
  const mainBalance = useSelector((state) => state.auth.user?.balance);
  const bonusBalance = useSelector((state) => state.auth.user?.bonusBalance);
  const [updateUser, setUpdateUser] = useState(false);
  const [stake, setStake] = useState('');
  const dispatch = useDispatch();
  const oneRef = useRef();
  const twoRef = useRef();
  const threeRef = useRef();
  const fourRef = useRef();
  const fiveRef = useRef();
  const sixRef = useRef();
  const stakeRef = useRef();

  const stakeChangedHandler = () => {
    setStake(stakeRef.current.value);
  };

  useEffect(() => {
    const request = async () => {
      const res = await getMe(jwt);
      if (res.status === 'success') {
        dispatch(authActions.refreshUser({ user: res.data.user }));
      }
    };
    if (updateUser) request();
  }, [jwt, dispatch, updateUser]);

  const handleCheckChanged = (event) => {
    if (event.target.checked) {
      setSelectedOption(event.target.name);
    } else {
      setSelectedOption(null);
    }
  };

  const playHandler = async (e) => {
    setShowSpinner(true);
    setPlayed(true);
    setIsPlaying(true);
    const request =
      selectedOption === 'main' ? playNumbers : playNumbersWithBonus;
    const data = {
      predicted: e.target.textContent,
      stake: stakeRef.current.value,
    };

    const res = await request(data, jwt);

    if (res.status === 'success') {
      setUpdateUser(true);
      setResult(res.data.number.result);
      setAlertMsg(res.message);
      if (res.data.number.status) {
        setAlertStatus(true);
      } else {
        setAlertStatus(false);
      }
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setUpdateUser(false);
        setShowSpinner(false);
        setSelectedOption(null);
        stakeRef.current.value = '';
      }, 4000);
    } else {
      setResult(0);
      setAlertMsg(res.message);
      setAlertStatus(false);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setShowSpinner(false);
        setSelectedOption(null);
        stakeRef.current.value = '';
      }, 4000);
    }

    // setTimeout(() => {
    //   setResult(res);

    //   if (e.target.textContent * 1 !== res) {
    //     e.target.classList.add(classes.lost);
    //     setAlertMsg('You lost....try again');
    //     setAlertStatus(false);
    //     setShowAlert(true);
    //   } else {
    //     e.target.classList.add(classes.win);
    //     setAlertStatus(true);
    //     setAlertMsg('Congratulations!!! You won');
    //     setShowAlert(true);
    //   }
    //   setShowSpinner(false);
    //   setIsPlaying(false);
    // }, 3000);

    // setTimeout(() => {
    //   setShowAlert(false);
    // }, 6000);
  };

  const resetHandler = () => {
    setPlayed(false);
    setResult(0);
    setSelectedOption(null);
    stakeRef.current.value = '';
    oneRef.current.classList.remove(classes.lost);
    twoRef.current.classList.remove(classes.lost);
    threeRef.current.classList.remove(classes.lost);
    fourRef.current.classList.remove(classes.lost);
    fiveRef.current.classList.remove(classes.lost);
    sixRef.current.classList.remove(classes.lost);
  };

  const oneClasses =
    result === 1 ? `${classes.digit} ${classes.win}` : classes.digit;
  const twoClasses =
    result === 2 ? `${classes.digit} ${classes.win}` : classes.digit;
  const threeClasses =
    result === 3 ? `${classes.digit} ${classes.win}` : classes.digit;
  const fourClasses =
    result === 4 ? `${classes.digit} ${classes.win}` : classes.digit;
  const fiveClasses =
    result === 5 ? `${classes.digit} ${classes.win}` : classes.digit;
  const sixClasses =
    result === 6 ? `${classes.digit} ${classes.win}` : classes.digit;

  return (
    <div className={classes.container}>
      <div className={classes.balance}>
        <div className={classes.details}>
          <h2>Bonus Balance</h2>
          <div className={classes.bonus}>
            <AiOutlineDollar className={classes['credit-logo']} />
            <span>{bonusBalance.toFixed(2)}</span>
          </div>
        </div>
        <div className={classes.details}>
          <h2>Main Balance</h2>
          <div className={classes.main}>
            <AiOutlineDollar className={classes['credit-logo']} />
            <span>{mainBalance.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <section className={classes.numbers}>
        {showAlert && <AuthAlert message={alertMsg} status={alertStatus} />}
        <div className={classes.selection}>
          <h2>Choose account to stake from</h2>
          <div className={classes.select}>
            <label>
              <input
                type="checkbox"
                name="main"
                checked={selectedOption === 'main'}
                onChange={handleCheckChanged}
              />{' '}
              Main balance
            </label>
            <label>
              <input
                type="checkbox"
                name="bonus"
                checked={selectedOption === 'bonus'}
                onChange={handleCheckChanged}
              />{' '}
              Bonus balance
            </label>
          </div>
        </div>
        <div className={classes['stake-container']}>
          <div className={classes.group}>
            <label>STAKE</label>
            <input
              className={classes.stake}
              type="number"
              ref={stakeRef}
              onChange={stakeChangedHandler}
              disabled={selectedOption === null}
            />
          </div>
        </div>
        <div className={classes.digits}>
          {showSpinner && <Spinner />}
          {played && <div className={classes.backdrop}></div>}
          <button
            className={`${oneClasses}`}
            onClick={playHandler}
            disabled={isPlaying || stake === ''}
            ref={oneRef}
          >
            1
          </button>
          <button
            className={`${twoClasses}`}
            onClick={playHandler}
            disabled={isPlaying || stake === ''}
            ref={twoRef}
          >
            2
          </button>
          <button
            className={`${threeClasses}`}
            onClick={playHandler}
            disabled={isPlaying || stake === ''}
            ref={threeRef}
          >
            3
          </button>
          <button
            className={`${fourClasses}`}
            onClick={playHandler}
            disabled={isPlaying || stake === ''}
            ref={fourRef}
          >
            4
          </button>
          <button
            className={`${fiveClasses}`}
            onClick={playHandler}
            disabled={isPlaying || stake === ''}
            ref={fiveRef}
          >
            5
          </button>
          <button
            className={`${sixClasses}`}
            onClick={playHandler}
            disabled={isPlaying || stake === ''}
            ref={sixRef}
          >
            6
          </button>
        </div>
        <div className={classes.actions}>
          <button
            type="button"
            onClick={resetHandler}
            disabled={!played || isPlaying}
          >
            Reset
          </button>
        </div>
      </section>
    </div>
  );
};

export default PlayNumbers;
