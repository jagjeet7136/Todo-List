import React, { useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export const Login = () => {
    const authContext = useContext(AuthContext);
    const username = useRef("");
    const password = useRef("");

    const handleLogin = (e) => {
        e.preventDefault();
        const loginObject = {
            username: username.current.value,
            password: password.current.value
        }
        axios
            .post("http://localhost:2222/user/login", loginObject)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {

            });

    };


    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Log In</h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    placeholder="Email Address"
                                    name="email"
                                    ref={username}
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
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}