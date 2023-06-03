import { CreateTaskButton } from "./task/CreateTaskButton";
import { TaskItem } from "./task/TaskItem";

export const Dashboard = () => {
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
