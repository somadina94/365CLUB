import { useState, useRef } from 'react';
import { FaDiceD6 } from 'react-icons/fa6';
import {
  BsDice1,
  BsDice2,
  BsDice3,
  BsDice4,
  BsDice5,
  BsDice6,
} from 'react-icons/bs';
import { Helmet } from 'react-helmet-async';

import classes from './DiceDemo.module.css';
import AuthAlert from '../alerts/AuthAlert';

const DiceDemo = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const [rollDice, setRollDice] = useState(false);
  const [result, setResult] = useState(0);
  const playBtnRef = useRef();

  const rollHandler = () => {
    setRollDice(true);
    const res = Math.floor(Math.random() * 6) + 1;
    playBtnRef.current.disabled = true;
    setTimeout(() => {
      setResult(res);
      setShowAlert(true);
      if (res === 3 || res === 6 || res === 5) {
        setAlertMsg(`Congratulations you won!!!`);
        setAlertStatus(true);
      } else {
        setAlertMsg('Sorry you lost...try again');
        setAlertStatus(false);
      }
      setRollDice(false);
    }, 2000);

    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  const resetHandler = () => {
    setResult(0);
  };

  const diceClasses = rollDice
    ? `${classes.icon} ${classes.rotate}`
    : `${classes.icon}`;
  return (
    <div>
      <Helmet>
        <title>Dice Demo</title>
        <meta name="description" content="" />
        <link rel="canonical" href="/dice-demo" />
      </Helmet>
      {showAlert && <AuthAlert message={alertMsg} status={alertStatus} />}
      <div className={classes.dice}>
        {result === 0 && <FaDiceD6 className={diceClasses} />}
        {result === 1 && (
          <BsDice1 className={`${classes.icon} ${classes.lost}`} />
        )}
        {result === 2 && (
          <BsDice2 className={`${classes.icon} ${classes.lost}`} />
        )}
        {result === 3 && (
          <BsDice3 className={`${classes.icon} ${classes.won}`} />
        )}
        {result === 4 && (
          <BsDice4 className={`${classes.icon} ${classes.lost}`} />
        )}
        {result === 5 && (
          <BsDice5 className={`${classes.icon} ${classes.won}`} />
        )}
        {result === 6 && (
          <BsDice6 className={`${classes.icon} ${classes.won}`} />
        )}
      </div>
      <div className={classes.actions}>
        <button
          ref={playBtnRef}
          onClick={rollHandler}
          className={classes.btn}
          disabled={result !== 0}
        >
          PLAY
        </button>
        <button
          onClick={resetHandler}
          className={classes.btn}
          disabled={rollDice}
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default DiceDemo;
