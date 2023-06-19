import React from "react";
import { useLocation } from "react-router-dom";

export const UpdateTask = () => {
    const location = useLocation();
    const taskProps = location.state.task;
    console.log(taskProps);

    return (<div className="project">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h5 className="display-4 text-center">Update Project form</h5>
                    <hr />
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg " placeholder="Project Name" />
                        </div>

                        <div className="form-group">
                            <textarea className="form-control form-control-lg" placeholder="Project Notes"></textarea>
                        </div>
                        <h6>Due Date</h6>
                        <div className="form-group">
                            <input type="date" className="form-control form-control-lg" name="start_date" />
                        </div>
                        <h6>Reminder Date</h6>
                        <div className="form-group">
                            <input type="date" className="form-control form-control-lg" name="end_date" />
                        </div>

                        <input type="submit" className="btn btn-primary btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}