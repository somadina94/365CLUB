import { Link } from 'react-router-dom';

import classes from './FooterNav.module.css';

const FooterNav = () => {
  return (
    <nav className={classes.nav}>
      <Link to="/contact-us">Contact Us</Link>
      <Link to="/terms">Terms and Conditions</Link>
      <Link to="/privacy-policy">Privacy Policy</Link>
      <Link to="/rules">Rules</Link>
    </nav>
  );
};

export default FooterNav;
