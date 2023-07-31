import { useLoaderData } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Helmet } from 'react-helmet-async';

import classes from './History.module.css';
import HistoryItem from './HistoryItem';
import { getPlayerHistory } from '../../api/api';

const History = () => {
  const res = useLoaderData();
  const [...history] = res.data.history;

  history.sort((a, b) => {
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  });
  return (
    <ul className={classes.history}>
      <Helmet>
        <title>Game history</title>
        <meta name="description" content="" />
        <link rel="canonical" href="/dashboard/history" />
      </Helmet>
      {history.map((el) => (
        <HistoryItem
          key={el._id}
          score={el.score}
          stake={el.stake}
          date={el.createdAt}
          status={el.status}
        />
      ))}
    </ul>
  );
};

export default History;

export const loader = () => {
  const cookies = new Cookies();
  const jwt = cookies.get('jwt');
  return getPlayerHistory(jwt);
};
