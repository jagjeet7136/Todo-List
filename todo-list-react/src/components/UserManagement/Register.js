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
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your Account</p>
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="User Full Name"
                                    name="userFullName"
                                    ref={userFullName}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    placeholder="Email Address"
                                    name="email"
                                    ref={email}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Password"
                                    name="password"
                                    ref={password}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    ref={confirmPassword}
                                />
                            </div>
                            <div className={isFormValid ? styles.successMsgContainer.active : styles.successMsgContainer}>
                                <span className={styles.successMsg}>{successMsg}</span>
                            </div>
                            <div className={isFormValid ? styles.errorMsgContainer
                                : styles.errorMsgContainer.active}>
                                <span className={styles.errorMsg}>{errorMsg}</span>
                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}