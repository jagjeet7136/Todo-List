import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment/moment";
import { createTask } from "../../actions/projectActions";
import axios from "axios";
import { GET_ERRORS } from "../../actions/types";
import styles from "./AddTask.module.css";

export const AddTask = (props) => {
  const enteredTaskTitle = useRef("");
  const enteredNotes = useRef("");
  const enteredExpiryDate = useRef();
  const enteredReminder = useRef();
  const [isFormValid, setIsFormValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // const titleChangeHandler = (event) => {
  //   setEnteredTaskTitle(event.target.value);
  // };

  // const notesChangeHandler = (event) => {
  //   setEnteredNotes(event.target.value);
  // };

  // const expiryDateChangeHandler = (event) => {
  //   setEnteredExpiryDate(event.target.value);
  // };

  // const reminderChangeHandler = (event) => {
  //   setEnteredReminder(event.target.value);
  // };

  const useSubmitHandler = (event) => {
    event.preventDefault();

    const newTask = {
      taskTitle: enteredTaskTitle.current.value,
      notes: enteredNotes.current.value,
      expiryDate: new Date(enteredExpiryDate.current.value),
      reminder: new Date(enteredReminder.current.value),
    };

    axios
      .post("http://localhost:2222/task", newTask)
      .then((res) => {
        console.log(res.data);
        if (!isFormValid) {
          setIsFormValid(true);
        }
      })
      .catch((error) => {
        console.log(error);
        let caughtErrorMessage = error.response.data.errors[0];
        if (caughtErrorMessage.includes("taskTitle")) {
          caughtErrorMessage = "task name is required!";
        } else if (caughtErrorMessage.includes("username")) {
          caughtErrorMessage = "username is required!";
        } else {
          caughtErrorMessage = "some error occured!";
        }
        setIsFormValid(false);
        setErrorMessage(caughtErrorMessage);
        console.log(error.response.data.errors);
      });
    enteredTaskTitle.current.value = "";
    enteredNotes.current.value = "";
  };

  return (
    <div>
      <div className="Task">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Task form</h5>
              <hr />
              <form onSubmit={useSubmitHandler}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg "
                    placeholder="Task Name"
                    name="taskTitle"
                    ref={enteredTaskTitle}
                  />
                </div>

                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Task Notes"
                    name="notes"
                    ref={enteredNotes}
                  ></textarea>
                </div>
                <h6>Expiry Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="expiryDate"
                    ref={enteredExpiryDate}
                  />
                </div>
                <h6>Reminder</h6>
                <div className="form-group">
                  <input
                    type="datetime-local"
                    className="form-control form-control-lg"
                    name="reminder"
                    ref={enteredReminder}
                  />
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

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
