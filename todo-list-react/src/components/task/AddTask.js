import React, { useState } from "react";
import moment from "moment/moment";

export const AddTask = () => {
  const [enteredTaskTitle, setEnteredTaskTitle] = useState("");
  const [enteredNotes, setEnteredNotes] = useState("");
  const [enteredExpiryDate, setEnteredExpiryDate] = useState("");
  const [enteredReminder, setEnteredReminder] = useState("");

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

  const submitHandler = (event) => {
    event.preventDefault();

    const newTask = {
      title: enteredTaskTitle,
      notes: enteredNotes,
      expiryDate: new Date(enteredExpiryDate),
      reminder: new Date(enteredReminder),
    };

    console.log(newTask);
  };

  return (
    <div>
      <div className="Task">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Task form</h5>
              <hr />
              <form onSubmit={submitHandler}>
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
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Unique Project ID"
                    disabled
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
