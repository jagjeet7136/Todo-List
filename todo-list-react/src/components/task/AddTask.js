import React, { useRef, useState } from "react";
import moment from "moment/moment";
import axios from "axios";
import styles from "./AddTask.module.css";

export const AddTask = (props) => {
  const enteredTaskTitle = useRef("");
  const enteredNotes = useRef("");
  const enteredExpiryDate = useRef();
  const enteredReminder = useRef();
  const [isFormValid, setIsFormValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [taskTitleErrorClass, setTasktTitleErrorClass] = useState(false);

  const useSubmitHandler = (event) => {
    event.preventDefault();

    let expiryDateTemp = enteredExpiryDate.current.value;
    let reminderDateTemp = enteredReminder.current.value;

    if (expiryDateTemp === null || expiryDateTemp.trim() === "") {
      expiryDateTemp = "";
    } else {
      expiryDateTemp = moment(new Date(enteredExpiryDate.current.value)).format(
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
      taskTitle: enteredTaskTitle.current.value,
      notes: enteredNotes.current.value,
      expiryDate: expiryDateTemp,
      reminder: reminderDateTemp,
    };

    axios
      .post("http://localhost:2222/task", newTask)
      .then((res) => {
        if (!isFormValid) {
          setIsFormValid(true);
        }
        setTasktTitleErrorClass(false);
      })
      .catch((error) => {
        let caughtErrorMessage = "Some error occured!";
        console.log(error);
        if (error.response.status === 401) {
          caughtErrorMessage = "Unauthorised"
        }
        else if (error.response.data.errors != null && error.response.data.errors.length > 0) {
          caughtErrorMessage = error.response.data.errors[0];
        }
        else if (error.response.data.message != null && error.response.data.message.trim().length > 0) {
          caughtErrorMessage = error.response.data.message;
        }

        setIsFormValid(false);
        setErrorMessage(caughtErrorMessage);
      });
    enteredTaskTitle.current.value = "";
    enteredNotes.current.value = "";
    enteredExpiryDate.current.value = null;
    enteredReminder.current.value = null;
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
                    className={`form-control form-control-lg ${taskTitleErrorClass ? styles.taskTitleError : ""}`}
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
