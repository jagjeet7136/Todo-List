import { useEffect, useState } from "react";
import { CreateTaskButton } from "./task/CreateTaskButton";
import { TaskItem } from "./task/TaskItem";
import axios from "axios";

export const Dashboard = () => {

  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    (async () => {
    try {
      const response = await axios.get("http://localhost:2222/task/getAllTasks");
      setTasks(response.data);
    }
    catch(error) {
      console.log(error);
    }
  }) ();
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
              tasks.map((task)=>(
                <TaskItem 
                key={task.id}
                taskTitle={task.taskTitle}
                notes={task.notes}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};
