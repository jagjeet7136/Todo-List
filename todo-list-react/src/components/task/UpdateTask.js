import React, { useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import styles from "./UpdateTask.module.css";
import moment from "moment";
import axios from "axios";

export const UpdateTask = () => {
    const enteredTaskTitle = useRef("");
    const enteredNotes = useRef("");
    const enteredDueDate = useRef();
    const enteredReminder = useRef();
    const [isFormValid, setIsFormValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation();
    const taskProps = location.state?.props;
    if (!taskProps) {
        return <Navigate to="/dashboard" />;
    }
    const token = localStorage.getItem("token");

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let expiryDateTemp = enteredDueDate.current.value;
        let reminderDateTemp = enteredReminder.current.value;

        if (expiryDateTemp === null || expiryDateTemp.trim() === "") {
            expiryDateTemp = "";
        } else {
            expiryDateTemp = moment(new Date(enteredDueDate.current.value)).format(
                "DD-MM-YYYY"
            );
        }

        if (reminderDateTemp === null || reminderDateTemp.trim() === "") {
            reminderDateTemp = "";
        } else {
            reminderDateTemp = moment(new Date(enteredReminder.current.value)).format(
                "DD-MM-YYYY HH:MM:SS"
            );
        }

        const newTask = {
            id: taskProps.id,
            taskTitle: enteredTaskTitle.current.value,
            notes: enteredNotes.current.value,
            expiryDate: expiryDateTemp,
            reminder: reminderDateTemp,
        };

        axios
            .patch("http://localhost:2222/task", newTask, { headers: { Authorization: token } })
            .then((res) => {
                if (!isFormValid) {
                    setIsFormValid(true);
                }
            })
            .catch((error) => {
                console.log(error);
                let caughtErrorMessage = "Some error occured!";
                if (error.response != null && error.response.data != null && error.response.data.message != null) {
                    caughtErrorMessage = error.response.data.message.toLowerCase();
                    if (caughtErrorMessage.includes("nothing")) {
                        caughtErrorMessage = "no field is updated!";
                    }
                }
                setIsFormValid(false);
                setErrorMessage(caughtErrorMessage);
            });
        enteredTaskTitle.current.value = "";
        enteredNotes.current.value = "";
        enteredDueDate.current.value = null;
        enteredReminder.current.value = null;

    }

    return (<div className="project">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h5 className="display-4 text-center">Update Project form</h5>
                    <hr />
                    <form onSubmit={onSubmitHandler}>
                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg " placeholder="Task Name" ref={enteredTaskTitle} />
                        </div>

                        <div className="form-group">
                            <textarea className="form-control form-control-lg" placeholder="Task Notes" ref={enteredNotes}></textarea>
                        </div>
                        <h6>Due Date</h6>
                        <div className="form-group">
                            <input type="date" className="form-control form-control-lg" name="due_date" ref={enteredDueDate} />
                        </div>
                        <h6>Reminder Date</h6>
                        <div className="form-group">
                            <input type="date" className="form-control form-control-lg" name="reminder" ref={enteredReminder} />
                        </div>

                        <div
                            className={
                                isFormValid
                                    ? styles.errorMsgContainer
                                    : styles.errorMsgContainer.active
                            }
                        >
                            <span className={styles.errorMsg}>{errorMessage}</span>
                        </div>

                        <input type="submit" className="btn btn-primary btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}