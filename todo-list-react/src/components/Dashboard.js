import { useContext, useEffect, useState } from "react";
import { CreateTaskButton } from "./task/CreateTaskButton";
import { TaskItem } from "./task/TaskItem";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";

export const Dashboard = () => {

  const [tasks, setTasks] = useState([]);
  const authContext = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== Number(taskId));
    setTasks(updatedTasks);
  };

  useEffect(() => {
    (async () => {
      try {
        console.log(token);
        const response = await axios.get("http://localhost:2222/user", { headers: { Authorization: token } });
        setTasks(response.data);
      }
      catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="projects">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">My Tasks</h1>
            <br />
            <CreateTaskButton />
            <br />
            <hr />
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
      </div>
    </div>
  );
};
