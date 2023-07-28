import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

import classes from "./Nav.module.css";
import { authActions } from "../../store/auth-slice";
import { logOut } from "../../api/api";

const Nav = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const setCookie = useCookies(["jwt"])[1];
  const dispatch = useDispatch();

  const logoutHandler = () => {
    const res = logOut();
    setCookie("jwt", res.token);
    dispatch(authActions.logout());
  };
  return (
    <nav className={classes.nav}>
      <NavLink
        to="/play"
        className={(navData) => (navData.isActive ? classes.active : "")}
      >
        Play
      </NavLink>
      <NavLink
        to="/terms"
        className={(navData) => (navData.isActive ? classes.active : "")}
      >
        Terms of Use
      </NavLink>
      <NavLink
        to="/rules"
        className={(navData) => (navData.isActive ? classes.active : "")}
      >
        Rules
      </NavLink>
      {!isLoggedIn && (
        <NavLink
          to="/signUp"
          className={(navData) => (navData.isActive ? classes.active : "")}
        >
          Sign up
        </NavLink>
      )}
      {!isLoggedIn && (
        <NavLink
          to="/login"
          className={(navData) => (navData.isActive ? classes.active : "")}
        >
          Login
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink
          to="/dashboard"
          className={(navData) => (navData.isActive ? classes.active : "")}
        >
          My account
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink
          onClick={logoutHandler}
          to="/login"
          className={(navData) => (navData.isActive ? classes.active : "")}
        >
          Logout
        </NavLink>
      )}
    </nav>
  );
};

export default Nav;
