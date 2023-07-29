import { FcCopyright } from 'react-icons/fc';

import classes from './Footer.module.css';
import FooterNav from './FooterNav';

const Footer = () => {
  const date = new Date(Date.now()).getFullYear();
  console.log(date);
  return (
    <footer className={classes.footer}>
      <FooterNav />
      <div className={classes.copyright}>
        <p>
          <FcCopyright className={classes.icon} />
          opyright All Rights Reserved 365gainfuldice.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
