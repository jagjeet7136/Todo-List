import React, { useRef, useState } from "react";
import moment from "moment/moment";
import axios from "axios";
import styles from "./AddTask.module.css";
import { Header } from "../layout/Header";
import icon from "../../icons/newIcon.png"
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from "react-datepicker";

export const AddTask = () => {
  const enteredTaskTitle = useRef("");
  const enteredNotes = useRef("");
  const [isFormValid, setIsFormValid] = useState(true);
  const [taskCreated, setTaskCreated] = useState(false);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const useSubmitHandler = (event) => {
    if (!isFormValid) {
      setIsFormValid(true);
    }
    if (taskCreated) {
      setTaskCreated(false);
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
      taskTitle: enteredTaskTitle.current.value,
      notes: enteredNotes.current.value,
      expiryDate: expiryDateTemp,
    };
    console.log(newTask);

    axios
      .post("http://localhost:2222/task", newTask, {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        setTaskCreated(true);
        setMessage("Task Created Successfully");
        enteredTaskTitle.current.value = "";
        enteredNotes.current.value = "";
        setSelectedDate(null);
      })
      .catch((error) => {
        console.log(error);
        let caughtErrorMessage = "Some error occured!";
        if (error.response) {
          if (error.response.data.errors != null && error.response.data.errors.length > 0) {
            caughtErrorMessage = error.response.data.errors[0];
          }
        }
        setIsFormValid(false);
        setMessage(caughtErrorMessage);
      });
  };

  return (<div>
    <Header textColor="greenText" icon={icon} />
    <form className={styles.form} onSubmit={useSubmitHandler}>
      <h1 className={styles.formHeading}>Create task</h1>
      <input type="text" placeholder="Task name" ref={enteredTaskTitle} className={styles.taskName} />
      <textarea placeholder="Task Notes" ref={enteredNotes} className={styles.taskNotes}></textarea>
      <div className={`${styles.dateContainer} ${isFormValid ? styles.dateContainerMargin : styles.dateContainerNoMargin} 
      ${!taskCreated ? styles.dateContainerMargin : styles.dateContainerNoMargin}`}>
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
                    ${taskCreated ? styles.successMsgContainer + " " + styles.active : ""}`}>
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
};
