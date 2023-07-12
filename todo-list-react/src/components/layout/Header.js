import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Header.module.css";
import todoIcon from "../../icons/todo-icon.png";

export const Header = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const logoutHandler = () => {
    authContext.logout();
  };

  const mainPageHandler = (event) => {
    if (authContext.loggedIn) {
      event.preventDefault();
      navigate("/dashboard");
    }
  };

  const toggleHandler = () => {
    setIsActive((prevState) => !prevState);
  }

  const headerList = authContext.loggedIn ? (
    <div>
      <li>
        <Link to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="/login" onClick={logoutHandler}>
          Logout
        </Link>
      </li>
    </div>
  ) : (
    <div>
      <li>
        <Link to="/register">
          Sign Up
        </Link>
      </li>
      <li>
        <Link to="/login">
          Login
        </Link>
      </li>
    </div>
  );

  return (
    <div className={styles.header}>
      <Link to="/" onClick={mainPageHandler}><img src={todoIcon} alt=""></img></Link>

      <ul className={`${styles.headerList} ${styles.flex}`}>
        {headerList}
      </ul>
      <div className={styles.toggleMenu} onClick={toggleHandler}>
        <span className={styles.toggleMenuOne}></span>
        <span className={styles.toggleMenuTwo}></span>
      </div>
      <div className={`${styles.navbarMenu} ${isActive ? styles.active : ''}`}>
        {headerList}
      </div>

    </div>
  );
};