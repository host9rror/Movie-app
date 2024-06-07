import { NavLink } from "react-router-dom";
import css from './Navigation.module.css'; 

const AppBar = () => {
  return (
    <header>
      <nav className={css.nav}> 
        <NavLink className={css.navLink} to="/">Home</NavLink> 
        <NavLink className={css.navLink} to="/movies">Movies</NavLink> 
      </nav>
    </header>
  );
};

export default AppBar;