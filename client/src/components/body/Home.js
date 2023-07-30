import { BsDice3, BsDice5, BsDice6 } from 'react-icons/bs';

import classes from './Home.module.css';

const Home = () => {
  return (
    <div className={classes.home}>
      <h1>
        The odds are in your favor, the more you play, the more you win!!!
      </h1>
      <div className={classes.dices}>
        <BsDice3 className={classes.dice} />
        <BsDice6 className={classes.dice} />
        <BsDice5 className={classes.dice} />
      </div>
    </div>
  );
};

export default Home;
