import { useEffect } from "react";
import { CreateTaskButton } from "./task/CreateTaskButton";
import { TaskItem } from "./task/TaskItem";
import axios from "axios";

export const Dashboard = () => {

  const tasks = null;
  useEffect(()=>{
    (async () => {
    try {
      const response = await axios.get("http://localhost:2222/task/getAllTasks");
      console.log(response.data);
    }
    catch(error) {
      console.log(error);
    }
  }) ();
  });

  return (
    <div className="projects">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Projects</h1>
            <br />
            <CreateTaskButton />
            <br />
            <hr />
            <TaskItem />
            <TaskItem />
          </div>
        </div>
      </div>
    </div>
  );
};
