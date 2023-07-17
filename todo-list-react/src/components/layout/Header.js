import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Header.module.css";

export const Header = (props) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const logoutHandler = () => {
    authContext.logout();
    toggleHandlerTwo();
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

  const toggleHandlerTwo = () => {
    if (isActive) {
      setIsActive(false);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const thresholdWidth = 450;

      if (isActive && windowWidth > thresholdWidth) {
        setIsActive(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);

  const headerList = authContext.loggedIn ? (
    <div>
      <Link to="/dashboard" onClick={toggleHandlerTwo}>
        Dashboard
      </Link>
      <Link to="/login" onClick={logoutHandler}>
        Logout
      </Link>

    </div>
  ) : (
    <div>
      <Link to="/register" onClick={toggleHandlerTwo}>
        Sign Up
      </Link>
      <Link to="/login" onClick={toggleHandlerTwo}>
        Login
      </Link>
    </div>
  );

  return (
    <div className={styles.header}>
      <Link to="/" onClick={mainPageHandler}><img src={props.icon} alt="" className={styles.blackIcon}></img></Link>
      <div className={`${styles.headerList} ${styles.displayNone} ${styles[props.textColor]}`}>{headerList}</div>
      <div className={`${styles.toggleMenu} ${styles[props.textColor]}`} onClick={toggleHandler}>
        <span className={styles.toggleMenuOne}></span>
        <span className={styles.toggleMenuTwo}></span>
      </div>
      <div className={`${styles.navbarMenu} ${isActive ? styles.active : ''}`}>
        <div className={` ${styles.navbar}`}>{headerList}</div>
      </div>
    </div>
  );
};