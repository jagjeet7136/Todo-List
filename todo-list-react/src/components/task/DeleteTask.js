import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

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
                console.log(authContext.token);
                props.onDelete(props.taskId);
            })
            .catch((error) => {
                console.log(authContext);
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