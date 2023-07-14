import axios from "axios";
import { useRef, useState } from "react";
import styles from "./Register.module.css";

export const Register = () => {

    const userFullName = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isFormValid, setIsFormValid] = useState(true);

    const onSubmit = (event) => {
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
                if (!isFormValid) {
                    setIsFormValid(true);
                }
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
            <h1 className={styles.registerHeading}>Create Account</h1>
            <form onSubmit={onSubmit} className={styles.registerForm}>
                <input type="text" required placeholder="Full Name" ref={userFullName} />
                <input type="email" required placeholder="Email" ref={email} />
                <input type="password" required placeholder="Password" ref={password} />
                <input type="password" required placeholder="Confirm Password" ref={confirmPassword} />
                <div className={isFormValid ? styles.successMsgContainer.active : styles.successMsgContainer}>
                    <span className={styles.successMsg}>{successMsg}</span>
                </div>
                <div className={isFormValid ? styles.errorMsgContainer
                    : styles.errorMsgContainer.active}>
                    <span className={styles.errorMsg}>{errorMsg}</span>
                </div>
                <button type="submit" className={styles.registerButton}>Sign Up</button>
            </form>
        </div>
    );
}