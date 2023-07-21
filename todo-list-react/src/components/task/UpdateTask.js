import React, { useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import styles from "./AddTask.module.css";
import moment from "moment";
import axios from "axios";
import { Header } from "../layout/Header";
import icon from "../../icons/newIcon.png";
import ReactDatePicker from "react-datepicker";

export const UpdateTask = () => {
    const enteredTaskTitle = useRef("");
    const enteredNotes = useRef("");
    const [isFormValid, setIsFormValid] = useState(true);
    const location = useLocation();
    const taskProps = location.state?.props;
    const [message, setMessage] = useState("");
    const [taskUpdated, setTaskUpdated] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    if (!taskProps) {
        return <Navigate to="/dashboard" />;
    }
    const token = localStorage.getItem("token");

    const onSubmitHandler = (event) => {
        if (!isFormValid) {
            setIsFormValid(true);
        }
        if (taskUpdated) {
            setTaskUpdated(false);
        }
        event.preventDefault();
        let expiryDateTemp = selectedDate;

        if (!expiryDateTemp) {
            expiryDateTemp = "";
        } else {
            expiryDateTemp = moment(new Date(selectedDate)).format(
                "DD-MM-YYYY"
            );
        }
        const newTask = {
            id: taskProps.id,
            taskTitle: enteredTaskTitle.current.value,
            notes: enteredNotes.current.value,
            expiryDate: expiryDateTemp,
        };

        axios
            .patch("http://localhost:2222/task", newTask, { headers: { Authorization: token } })
            .then((res) => {
                setTaskUpdated(true);
                setMessage("Task Updated Successfully");
                enteredTaskTitle.current.value = "";
                enteredNotes.current.value = "";
                setSelectedDate(null);
            })
            .catch((error) => {
                let caughtErrorMessage = "Some error occured!";
                if (error.response && error.response.data && error.response.data.message) {
                    caughtErrorMessage = error.response.data.message.toLowerCase();
                    if (caughtErrorMessage.includes("nothing")) {
                        caughtErrorMessage = "No field updated!";
                    }
                }
                setIsFormValid(false);
                setMessage(caughtErrorMessage);
            });

    }

    return (<div>
        <Header textColor="greenText" icon={icon} />
        <form className={styles.form} onSubmit={onSubmitHandler}>
            <h1 className={styles.formHeading}>Update task</h1>
            <input type="text" placeholder="Task name" ref={enteredTaskTitle} className={styles.taskName} />
            <textarea placeholder="Task Notes" ref={enteredNotes} className={styles.taskNotes}></textarea>
            <div className={`${styles.dateContainer} ${isFormValid ? styles.dateContainerMargin : styles.dateContainerNoMargin} 
          ${!taskUpdated ? styles.dateContainerMargin : styles.dateContainerNoMargin}`}>
                <ReactDatePicker
                    className={styles.formDate}
                    selected={selectedDate}
                    onChange={handleDateChange}
                    placeholderText="Expiry date"
                    dateFormat="dd-MM-yyyy"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    value={selectedDate ? selectedDate.toLocaleDateString('en-GB') : ''}
                />
                <span className={styles.calendarIcon}>&#128197;</span>
            </div>
            <div className={`${styles.successMsgContainer}
                        ${taskUpdated ? styles.successMsgContainer + " " + styles.active : ""}`}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLXFtnDBVOuZqvGW2E-Px5DdU8XU9nSoE9dg&usqp=CAU" alt=""></img>
                <h6 className={styles.successMsg}>{message}</h6>
            </div>
            <div className={`${styles.errorMessageContainer}
                     ${!isFormValid ? styles.errorMessageContainer + " " + styles.active : ""}`}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9YISfL4Lm8FJPRneGwEq8_-
                        9Nim7YeuMJMw&usqp=CAU"
                    alt=""></img>
                <h6 className={styles.errorMessage}>{message}</h6>
            </div>
            <input
                type="submit"
                className={styles.formButton}
            />
        </form>
    </div>);
}