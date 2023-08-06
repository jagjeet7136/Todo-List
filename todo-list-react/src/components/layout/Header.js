import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Header.module.css";

export const Header = (props) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const mainPageHandler = (event) => {
    if (authContext.loggedIn) {
      event.preventDefault();
      navigate("/dashboard");
    }
  };

  const toggleHandler = () => {
    setIsActive((prevState) => !prevState);
  }

  const toggleHandlerTwo = useCallback(() => {  //useCallback for memoising function avoids unnecessary reference change
    if (isActive) {
      setIsActive(false);
    }
  }, [isActive]);

  const logoutHandler = useCallback(() => {
    authContext.logout();
    toggleHandlerTwo();
  }, [toggleHandlerTwo, authContext]);

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

  const userProfileImage = useMemo(() => {
    return authContext.user && authContext.user.imageUrl
      ? authContext.user.imageUrl
      : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
  }, [authContext.user]); //useMemo is for avoiding unnecessary computation, when user in authContext changes then it is recomputed

  const headerList = useMemo(() => {
    return authContext.loggedIn ? (
      <div>
        <Link to="/dashboard" onClick={toggleHandlerTwo}>
          <img src={userProfileImage} alt="user" className={styles.profileImage}></img>
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
  }, [authContext.loggedIn, toggleHandlerTwo, logoutHandler, userProfileImage]);

  return (
    <div className={styles.header}>
      <Link to="/" onClick={mainPageHandler}><img src={props.icon} alt="" className={styles.icon}></img></Link>
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