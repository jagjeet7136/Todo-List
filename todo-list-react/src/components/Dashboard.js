import { TaskItem } from "./task/TaskItem";

export const Dashboard = () => {
  return (
    <div className="projects">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Projects</h1>
            <br />
            <a href="ProjectForm.html" className="btn btn-lg btn-info">
              Create a Project
            </a>
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
