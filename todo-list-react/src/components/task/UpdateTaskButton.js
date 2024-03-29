import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateTaskButton.module.css";

export const UpdateTaskButton = (props) => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/updateTask/${props.id}`, { state: { props } });
    };

    return (
        <React.Fragment>
            <button
                className={styles.updateTaskButton}
                onClick={handleClick}>Update Project
            </button>
        </React.Fragment>
    );
}