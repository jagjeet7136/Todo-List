import axios from "axios";
import { useRef, useState } from "react";
import styles from "./Register.module.css";
import todoSmallIcon from "../../icons/afe948043ef84572bdd6b4998c7c9528222.png"
import { Link } from "react-router-dom";

export const Register = () => {
    const userFullName = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isFormValid, setIsFormValid] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = (event) => {
        if (!isFormValid) {
            setIsFormValid(true);
        }
        event.preventDefault();
        const newUser = {
            userFullName: userFullName.current.value,
            email: email.current.value,
            password: password.current.value,
            confirmPassword: confirmPassword.current.value
        }
        axios.post('http://localhost:2222/user', newUser)
            .then(response => {
                console.log('Received user object:', response.data);
                setSuccessMsg("User created Successfully");
            })
            .catch(error => {
                console.error('Error:', error);
                let caughtErrorMessage = "Some error occured!";
                if (error.response.data.errors != null && error.response.data.errors.length > 0) {
                    caughtErrorMessage = error.response.data.errors[0];
                }
                else if (error.response.data.message != null && error.response.data.message.trim().length > 0) {
                    caughtErrorMessage = error.response.data.message;
                }
                setErrorMsg(caughtErrorMessage);
                setIsFormValid(false);
            });

        userFullName.current.value = "";
        email.current.value = "";
        password.current.value = "";
        confirmPassword.current.value = "";
    }

    return (
        <div className={styles.register}>
            <Link to="/"><img src={todoSmallIcon} alt=""></img></Link>
            <form onSubmit={onSubmit} className={styles.registerForm}>
                <h1 className={styles.registerHeading}>Create Account</h1>
                <input type="text" placeholder="Full Name" ref={userFullName} />
                <input type="email" placeholder="Email" ref={email} />
                <div className={styles.passwordContainer}>
                    <input type={showPassword ? "text" : "password"} placeholder="Password" ref={password}
                        className={styles.password} />
                    <span className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "Hide" : "Show"}
                    </span>
                </div>
                <div className={`${styles.confirmPasswordContainer} ${isFormValid ? "" : styles.confirmPasswordContainerMargin}`}>
                    <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" ref={confirmPassword}
                        className={styles.confirmPassword} />
                    <span className={styles.confirmPasswordToggle} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? "Hide" : "Show"}
                    </span>
                </div>
                <div className={isFormValid ? styles.successMsgContainer.active : styles.successMsgContainer}>
                    <span className={styles.successMsg}>{successMsg}</span>
                </div>
                <div className={`${styles.errorMessageContainer}
                 ${!isFormValid ? styles.errorMessageContainer + " " + styles.active : ""}`}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9YISfL4Lm8FJPRneGwEq8_-
                    9Nim7YeuMJMw&usqp=CAU"
                        alt=""></img>
                    <h6 className={styles.errorMessage}>{errorMsg}</h6>
                </div>

                <button type="submit" className={styles.registerButton}>Sign Up</button>
                <h6 className={styles.loginContainer}>Already have an account?&nbsp;&nbsp;<Link to="/login">Log in</Link></h6>
            </form>
            <h6 className={styles.tPContainer}><Link>Terms of use</Link>&nbsp;&nbsp;|&nbsp;&nbsp;<Link>Privacy Policy</Link></h6>
        </div>
    );
}