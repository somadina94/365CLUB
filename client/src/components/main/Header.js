import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaAlignJustify } from 'react-icons/fa';

import classes from './Header.module.css';
import Nav from './Nav';

const Header = () => {
  const menuRef = useRef();

  const toggleMenuHandler = () => {
    menuRef.current.classList.toggle(classes['toggle-nav']);
  };

  const navClasses = `${classes['nav-container']} ${classes['toggle-nav']}`;
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logo}>
        365gainfuldice
      </Link>
      <nav className={navClasses} ref={menuRef}>
        <Nav />
      </nav>
      <FaAlignJustify
        className={classes['menu-icon']}
        onClick={toggleMenuHandler}
      />
    </header>
  );
};

export default Header;
