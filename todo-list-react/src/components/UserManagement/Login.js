import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./Login.module.css";
import todoSmallIcon from "../../icons/afe948043ef84572bdd6b4998c7c9528222.png";

export const Login = () => {
    const authContext = useContext(AuthContext);
    const username = useRef("");
    const password = useRef("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMsg] = useState("");
    const [isFormValid, setIsFormValid] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        if (!isFormValid) {
            setIsFormValid(true);
        }
        e.preventDefault();
        const loginObject = {
            username: username.current.value,
            password: password.current.value
        }
        axios
            .post("http://localhost:2222/user/login", loginObject)
            .then((res) => {
                authContext.login(res.data.token);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("loggedIn", "true");
                navigate('/dashboard');
            })
            .catch((error) => {
                setIsFormValid(false);
                setErrorMsg("Some error occured");
                if (error.response) {
                    if (error.response.status === 401) {
                        setErrorMsg("Wrong email or password");
                    }
                }
                console.log(error);
            });
    };

    return (
        <div className={styles.login}>
            <Link to="/"><img src={todoSmallIcon} alt=""></img></Link>
            <form onSubmit={handleLogin} className={styles.loginForm}>
                <h1 className={styles.loginHeading}>Login</h1>
                <input type="email" placeholder="Email" ref={username} className={styles.username} />
                <div className={`${styles.passwordContainer} ${isFormValid ? styles.passwordContainerMargin : ""}`} >
                    <input type={showPassword ? "text" : "password"} placeholder="Password" ref={password}
                        className={styles.password} />
                    <span className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "Hide" : "Show"}
                    </span>
                </div>
                <div className={`${styles.errorMessageContainer}
                 ${!isFormValid ? styles.errorMessageContainer + " " + styles.active : ""}`}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9YISfL4Lm8FJPRneGwEq8_-
                    9Nim7YeuMJMw&usqp=CAU"
                        alt=""></img>
                    <h6 className={styles.errorMessage}>{errorMessage}</h6>
                </div>
                <button type="submit" className={styles.loginButton}>Login</button>
                <h6 className={styles.loginContainer}>Don't have an account?&nbsp;&nbsp;<Link to="/register">Sign Up</Link></h6>
            </form>
            <h6 className={styles.tPContainer}><Link>Terms of use</Link>&nbsp;&nbsp;|&nbsp;&nbsp;<Link>Privacy Policy</Link></h6>
        </div>
    );
}