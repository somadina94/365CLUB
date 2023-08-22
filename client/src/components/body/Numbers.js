import { useState } from 'react';
import classes from './Numbers.module.css';
import Spinner from '../UI/Spinner';

const Numbers = () => {
  const [result, setResult] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);

  const playHandler = (e) => {
    setShowSpinner(true);
    const res = Math.floor(Math.random() * 6) + 1;
    setResult(res);

    setTimeout(() => {
      if (e.target.textContent !== res) {
        e.target.classList.add(classes.lost);
      } else {
        e.target.classList.add(classes.win);
      }
      setShowSpinner(false);
    }, 3000);
  };

  return (
    <section className={classes.numbers}>
      <div className={classes.instruction}>
        <p>Predict the output number</p>
      </div>
      <div className={classes.digits}>
        {showSpinner && <Spinner />}
        <button className={classes.digit} onClick={playHandler}>
          1
        </button>
        <button className={classes.digit} onClick={playHandler}>
          2
        </button>
        <button className={classes.digit} onClick={playHandler}>
          3
        </button>
        <button className={classes.digit} onClick={playHandler}>
          4
        </button>
        <button className={classes.digit} onClick={playHandler}>
          5
        </button>
        <button className={classes.digit} onClick={playHandler}>
          6
        </button>
      </div>
      <div className={classes.actions}>
        <button type="button">Reset</button>
      </div>
    </section>
  );
};

export default Numbers;
