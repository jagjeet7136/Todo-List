import React from "react";
import { useNavigate } from "react-router-dom";

export const UpdateTaskButton = (props) => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/updateTask/${props.id}`, { state: { props } });
    };

    return (
        <React.Fragment>
            <button
                className="btn btn-lg btn-primary"
                onClick={handleClick}>Update Project
            </button>
        </React.Fragment>
    );
}