import React from "react";
import { Link } from "react-router-dom";

export const CreateTaskButton = () => {
  return (
    <React.Fragment>
      <Link to="/addTask" className="btn btn-lg btn-info">
        Create a Project
      </Link>
    </React.Fragment>
  );
};
