import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment/moment";
import { createTask } from "../../actions/projectActions";
import axios from "axios";
import { GET_ERRORS } from "../../actions/types";
import styles from "./AddTask.module.css";

export const AddTask = (props) => {
  const [enteredTaskTitle, setEnteredTaskTitle] = useState("");
  const [enteredNotes, setEnteredNotes] = useState("");
  const [enteredExpiryDate, setEnteredExpiryDate] = useState("");
  const [enteredReminder, setEnteredReminder] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  let [errorMessage, setErrorMessage] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTaskTitle(event.target.value);
  };

  const notesChangeHandler = (event) => {
    setEnteredNotes(event.target.value);
  };

  const expiryDateChangeHandler = (event) => {
    setEnteredExpiryDate(event.target.value);
  };

  const reminderChangeHandler = (event) => {
    setEnteredReminder(event.target.value);
  };

  const useSubmitHandler = (event) => {
    event.preventDefault();

    const newTask = {
      taskTitle: enteredTaskTitle,
      notes: enteredNotes,
      expiryDate: new Date(enteredExpiryDate),
      reminder: new Date(enteredReminder),
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
        errorMessage = error.response.data.errors[0];
        setIsFormValid(false);
        setErrorMessage(errorMessage);
        console.log(errorMessage);
      });
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
                    value={enteredTaskTitle}
                    onChange={titleChangeHandler}
                  />
                </div>

                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Task Notes"
                    name="notes"
                    value={enteredNotes}
                    onChange={notesChangeHandler}
                  ></textarea>
                </div>
                <h6>Expiry Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="expiryDate"
                    value={enteredExpiryDate}
                    onChange={expiryDateChangeHandler}
                  />
                </div>
                <h6>Reminder</h6>
                <div className="form-group">
                  <input
                    type="datetime-local"
                    className="form-control form-control-lg"
                    name="reminder"
                    value={enteredReminder}
                    onChange={reminderChangeHandler}
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
