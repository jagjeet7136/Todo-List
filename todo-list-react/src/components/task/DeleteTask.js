import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./DeleteTask.module.css";

export const DeleteTask = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const authContext = useContext(AuthContext);
    const token = localStorage.getItem("token");
    const openDialog = () => {
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    const handleDelete = () => {
        console.log(props.taskId);

        axios
            .delete(`http://localhost:2222/task?taskId=${props.taskId}`, {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                props.onDelete(props.taskId);
            })
            .catch((error) => {
                console.log(authContext);
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