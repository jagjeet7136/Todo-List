import { useEffect, useState } from "react";
import { CreateTaskButton } from "./task/CreateTaskButton";
import { TaskItem } from "./task/TaskItem";
import axios from "axios";
import moment from "moment";

export const Dashboard = () => {

  const [tasks, setTasks] = useState([]);

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== Number(taskId));
    setTasks(updatedTasks);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:2222/task/getAllTasks");
        setTasks(response.data);
        console.log(response);
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
