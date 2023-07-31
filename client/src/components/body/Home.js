import { BsDice3, BsDice5, BsDice6 } from 'react-icons/bs';
import { Helmet } from 'react-helmet-async';

import classes from './Home.module.css';

const Home = () => {
  return (
    <div className={classes.home}>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Welcome to the best dice game" />
        <link rel="canonical" href="/" />
      </Helmet>
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
