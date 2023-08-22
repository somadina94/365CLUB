import { useState, useRef } from 'react';
import classes from './Numbers.module.css';
import Spinner from '../UI/Spinner';
import AuthAlert from '../alerts/AuthAlert';

const Numbers = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const [result, setResult] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);
  const [played, setPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const oneRef = useRef();
  const twoRef = useRef();
  const threeRef = useRef();
  const fourRef = useRef();
  const fiveRef = useRef();
  const sixRef = useRef();

  const playHandler = (e) => {
    setShowSpinner(true);
    const res = Math.floor(Math.random() * 6) + 1;

    setPlayed(true);
    setIsPlaying(true);
    setTimeout(() => {
      setResult(res);

      if (e.target.textContent * 1 !== res) {
        e.target.classList.add(classes.lost);
        setAlertMsg('You lost....try again');
        setAlertStatus(false);
        setShowAlert(true);
      } else {
        e.target.classList.add(classes.win);
        setAlertStatus(true);
        setAlertMsg('Congratulations!!! You won');
        setShowAlert(true);
      }
      setShowSpinner(false);
      setIsPlaying(false);
    }, 3000);

    setTimeout(() => {
      setShowAlert(false);
    }, 6000);
  };

  const resetHandler = () => {
    setPlayed(false);
    setResult(0);
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
    <section className={classes.numbers}>
      {showAlert && <AuthAlert message={alertMsg} status={alertStatus} />}
      <div className={classes.instruction}>
        <p>Predict the output number</p>
      </div>
      <div className={classes.digits}>
        {showSpinner && <Spinner />}
        {played && <div className={classes.backdrop}></div>}
        <button
          className={`${oneClasses}`}
          onClick={playHandler}
          disabled={isPlaying}
          ref={oneRef}
        >
          1
        </button>
        <button
          className={`${twoClasses}`}
          onClick={playHandler}
          disabled={isPlaying}
          ref={twoRef}
        >
          2
        </button>
        <button
          className={`${threeClasses}`}
          onClick={playHandler}
          disabled={isPlaying}
          ref={threeRef}
        >
          3
        </button>
        <button
          className={`${fourClasses}`}
          onClick={playHandler}
          disabled={isPlaying}
          ref={fourRef}
        >
          4
        </button>
        <button
          className={`${fiveClasses}`}
          onClick={playHandler}
          disabled={isPlaying}
          ref={fiveRef}
        >
          5
        </button>
        <button
          className={`${sixClasses}`}
          onClick={playHandler}
          disabled={isPlaying}
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
  );
};

export default Numbers;
