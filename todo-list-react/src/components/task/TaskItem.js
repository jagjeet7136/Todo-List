import { UpdateTaskButton } from "./UpdateTaskButton";

export const TaskItem = (props) => {
  return (
    <div className="container">
      <div className="card card-body bg-light mb-3">
        <div className="row">

          <div className="col-lg-6 col-md-4 col-8">
            <h3>{props.taskTitle}</h3>
            <p>{props.notes}</p>
          </div>

          <div className="col-2">
            <span className="mx-auto">{props.dueDate}</span>
            <span className="mx-auto">{props.reminder}</span>
          </div>

          <div className="col-md-4 d-none d-lg-block">
            <ul className="list-group">

              <li className="list-group-item update">
                <UpdateTaskButton task={props} />
              </li>

              <a href="">
                <li className="list-group-item delete">
                  <i className="fa fa-minus-circle pr-1">Delete Project</i>
                </li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
