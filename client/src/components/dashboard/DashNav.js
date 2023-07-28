import { NavLink } from 'react-router-dom';

import classes from './DashNav.module.css';

const DashNav = () => {
  return (
    <nav className={classes.nav}>
      <NavLink to="details" className={(navData) => (navData.isActive ? classes.active : '')}>
        My Details
      </NavLink>
      <NavLink to="history" className={(navData) => (navData.isActive ? classes.active : '')}>
        View History
      </NavLink>
      <NavLink to="fund-account" className={(navData) => (navData.isActive ? classes.active : '')}>
        Add Funds
      </NavLink>
      <NavLink to="withdraw" className={(navData) => (navData.isActive ? classes.active : '')}>
        Withdraw
      </NavLink>
      <NavLink to="club365" className={(navData) => (navData.isActive ? classes.active : '')}>
        Join 365CLUB
      </NavLink>
      <NavLink
        to="updatePassword"
        className={(navData) => (navData.isActive ? classes.active : '')}
      >
        Update Password
      </NavLink>
      <NavLink
        to="verify-account"
        className={(navData) => (navData.isActive ? classes.active : '')}
      >
        Verify Account
      </NavLink>
    </nav>
  );
};

export default DashNav;
