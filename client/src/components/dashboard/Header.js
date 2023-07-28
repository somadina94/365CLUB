import DashNav from "./DashNav";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <DashNav />
    </header>
  );
};

export default Header;
