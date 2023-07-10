import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Header.module.css";
import todoIcon from "../../icons/todo-icon.png";

export const Header = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    authContext.logout();
  };

  const mainPageHandler = (event) => {
    if (authContext.loggedIn) {
      event.preventDefault();
      navigate("/dashboard");
    }
  };

  return (
    <div className={styles.header}>
      <Link to="/" onClick={mainPageHandler}><img src={todoIcon} alt=""></img></Link>

      <ul className={styles.headerList}>
        {authContext.loggedIn ? <>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login" onClick={logoutHandler}>
              Logout
            </Link>
          </li></>
          : <>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </>}
      </ul>
    </div>
  );
};