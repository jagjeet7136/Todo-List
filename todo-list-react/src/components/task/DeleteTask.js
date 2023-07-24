import axios from "axios";
import React, { useState } from "react";
import styles from "./DeleteTask.module.css";

export const DeleteTask = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const token = localStorage.getItem("token");
    const deleteTaskEndpoint = process.env.REACT_APP_COMMON_TASK_ENDPOINT;

    const openDialog = () => {
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    const handleDelete = () => {
        axios
            .delete(`${deleteTaskEndpoint}/?taskId=${props.taskId}`, {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                props.onDelete(props.taskId);
            })
            .catch((error) => {
                console.log(error);
            });

        closeDialog();
    };

    return (
        <div className={styles.deleteTask}>
            <button className={styles.deleteButton} onClick={openDialog}>Delete</button>
            {isOpen && (
                <div className={styles.deleteDialog}>
                    <p className={styles.deleteDialogPara}>Are you sure you want to delete?</p>
                    <div className={styles.deleteDialogButtons}>
                        <button onClick={handleDelete}>Yes</button>
                        <button onClick={closeDialog}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}