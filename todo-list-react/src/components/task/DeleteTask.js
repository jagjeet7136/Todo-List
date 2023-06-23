import axios from "axios";
import React, { useState } from "react";

export const DeleteTask = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => {
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    const handleDelete = () => {
        console.log(props.taskId);

        axios
            .delete("http://localhost:2222/task", {
                params: {
                    taskId: props.taskId
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
        <div>
            <button className="btn btn-danger" onClick={openDialog}>Delete</button>
            {isOpen && (
                <div className="delete-dialog">
                    <p>Are you sure you want to delete?</p>
                    <button onClick={handleDelete}>Yes</button>
                    <button onClick={closeDialog}>No</button>
                </div>
            )}
        </div>
    );
}