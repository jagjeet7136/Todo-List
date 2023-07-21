import React from "react";
import { Link } from "react-router-dom";
import styles from "./CreateTaskButton.module.css";

export const CreateTaskButton = () => {
  return (
    <React.Fragment>
      <Link to="/addTask" className={styles.createTaskButton}>
        Create Task
      </Link>
    </React.Fragment>
  );
};
