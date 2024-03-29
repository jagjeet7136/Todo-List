import { useEffect, useState } from "react";
import { CreateTaskButton } from "./task/CreateTaskButton";
import { TaskItem } from "./task/TaskItem";
import axios from "axios";
import moment from "moment";
import { Header } from "./layout/Header";
import icon from "../icons/newIcon.png";
import styles from "./Dashboard.module.css";

export const Dashboard = () => {

  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== Number(taskId));
    setTasks(updatedTasks);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_COMMON_USER_LOCAL_ENDPOINT, { headers: { Authorization: token } });
        setTasks(response.data);
      }
      catch (error) {
      }
    })();
  }, [token]);

  return (
    <div className={styles.dashboard}>
      <Header textColor="greenText" icon={icon} />
      <div className={styles.dashboardContainer}>
        <h1 className={styles.dashboardHeading}>My Tasks</h1>
        <CreateTaskButton />
        {
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id.toString()}
              taskTitle={task.taskTitle}
              notes={task.notes}
              dueDate={task.expiryDate === null ? "" : moment(new Date(task.expiryDate)).format(
                "DD MMMM YYYY"
              )}
              reminder={task.reminder === null ? "" : moment(new Date(task.reminder)).format(
                "DD MMMM YYYY hh:mm A")}
              onDelete={handleDelete}
            />
          ))
        }
      </div>
    </div>
  );
};