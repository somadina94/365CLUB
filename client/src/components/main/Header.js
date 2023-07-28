import { Link } from "react-router-dom";

import classes from "./Header.module.css";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logo}>
        365gainfuldice
      </Link>
      <Nav />
    </header>
  );
};

export default Header;
