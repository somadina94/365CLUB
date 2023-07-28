import { MdSportsScore, MdDateRange, MdCurrencyExchange } from "react-icons/md";
import { BsYinYang } from "react-icons/bs";

import classes from "./HistoryItem.module.css";

const HistoryItem = (props) => {
  const { score, status } = props;
  const stake = props.stake.toFixed(2);

  const date = new Date(props.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return (
    <li className={classes.item}>
      <div className={classes.content}>
        <div className={classes.title}>
          <MdSportsScore className={classes.icon} />
          <span>Score</span>
        </div>
        <span>{score}</span>
      </div>
      <div className={classes.content}>
        <div className={classes.title}>
          <MdDateRange className={classes.icon} />
          <span>Date</span>
        </div>
        <span>{date}</span>
      </div>
      <div className={classes.content}>
        <div className={classes.title}>
          <MdCurrencyExchange className={classes.icon} />
          <span>Stake</span>
        </div>
        <span>{stake}</span>
      </div>
      <div className={classes.content}>
        <div className={classes.title}>
          <BsYinYang className={classes.icon} />
          <span>Status</span>
        </div>
        {status && <span className={classes.won}>Won</span>}
        {!status && <span className={classes.lost}>Lost</span>}
      </div>
    </li>
  );
};

export default HistoryItem;
