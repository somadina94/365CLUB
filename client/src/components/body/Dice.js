import { useState, useRef, useEffect } from "react";
import { FaDiceD6 } from "react-icons/fa6";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import {
  BsDice1,
  BsDice2,
  BsDice3,
  BsDice4,
  BsDice5,
  BsDice6,
} from "react-icons/bs";
import { AiOutlineDollar } from "react-icons/ai";

import classes from "./Dice.module.css";
import { playDice } from "../../api/api";
import { playDiceWithBonus } from "../../api/api";
import AuthAlert from "../alerts/AuthAlert";
import { authActions } from "../../store/auth-slice";
import { getMe } from "../../api/api";

const Dice = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertStatus, setAlertStatus] = useState(false);
  const [rollDice, setRollDice] = useState(false);
  const [result, setResult] = useState(0);
  const { jwt } = useCookies(["jwt"])[0];
  const playBtnRef = useRef();
  const stakeRef = useRef();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const mainBalance = useSelector((state) => state.auth.user?.balance);
  const bonusBalance = useSelector((state) => state.auth.user?.bonusBalance);
  const dispatch = useDispatch();
  const [updateUser, setUpdateUser] = useState(false);

  useEffect(() => {
    const request = async () => {
      const res = await getMe(jwt);
      if (res.status === "success") {
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

  const rollHandler = async () => {
    setRollDice(true);
    playBtnRef.current.disabled = true;
    const request = selectedOption === "main" ? playDice : playDiceWithBonus;
    const stake = stakeRef.current.value;
    if (isLoggedIn) {
      const res = await request({ stake }, jwt);

      if (res.status === "success") {
        setUpdateUser(true);
        setResult(res.data.newDice.score);
        setRollDice(false);
        setAlertMsg(res.message);
        if (res.data.newDice.status) {
          setAlertStatus(true);
        } else {
          setAlertStatus(false);
        }
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setUpdateUser(false);
        }, 4000);
      } else {
        setResult(0);
        setRollDice(false);
        setAlertMsg(res.message);
        setAlertStatus(false);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 4000);
      }
    } else {
      setAlertMsg("Unauthorized!!! please login to play");
      setAlertStatus(false);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setRollDice(false);
      }, 4000);
    }
    playBtnRef.current.disabled = false;
  };

  const resetHandler = () => {
    setResult(0);
    setSelectedOption(null);
    stakeRef.current.value = "";
  };

  const diceClasses = rollDice
    ? `${classes.icon} ${classes.rotate}`
    : `${classes.icon}`;

  const btnPlayClasses = `${classes.btn} ${classes.play}`;
  const btnResetClasses = `${classes.btn} ${classes.reset}`;
  return (
    <div className={classes.container}>
      {showAlert && <AuthAlert message={alertMsg} status={alertStatus} />}
      {isLoggedIn && (
        <div className={classes.balance}>
          <div className={classes.details}>
            <h2>Bonus Balance</h2>
            <div className={classes.bonus}>
              <AiOutlineDollar className={classes["credit-logo"]} />
              <span>{bonusBalance.toFixed(2)}</span>
            </div>
          </div>
          <div className={classes.details}>
            <h2>Main Balance</h2>
            <div className={classes.main}>
              <AiOutlineDollar className={classes["credit-logo"]} />
              <span>{mainBalance.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
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
      <div className={classes.selection}>
        <h2>Choose account to stake from</h2>
        <div className={classes.select}>
          <label>
            <input
              type="checkbox"
              name="main"
              checked={selectedOption === "main"}
              onChange={handleCheckChanged}
            />{" "}
            Main balance
          </label>
          <label>
            <input
              type="checkbox"
              name="bonus"
              checked={selectedOption === "bonus"}
              onChange={handleCheckChanged}
            />{" "}
            Bonus balance
          </label>
        </div>
      </div>
      <div className={classes.actions}>
        <button
          ref={playBtnRef}
          onClick={rollHandler}
          className={btnPlayClasses}
          disabled={result !== 0 || selectedOption === null}
        >
          PLAY
        </button>
        <div className={classes.group}>
          <label>STAKE</label>
          <input
            className={classes.stake}
            type="number"
            ref={stakeRef}
            disabled={selectedOption === null}
          />
        </div>
        <button
          onClick={resetHandler}
          className={btnResetClasses}
          disabled={rollDice}
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default Dice;
