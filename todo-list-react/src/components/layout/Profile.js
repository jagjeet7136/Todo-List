import React, { useContext, useState } from "react";
import { Header } from "./Header";
import icon from "../../icons/newIcon.png";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Profile.module.css";
import axios from "axios";

export const Profile = () => {
    const authContext = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
    const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const [profileImage, setProfileImage] = useState(
        authContext.user.imageUrl !== null
            ? authContext.user.imageUrl
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
    );
    console.log(profileImage);

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);

            const authToken = authContext.token; // Replace this with the actual token
            uploadProfileImage(formData, authToken);
        };
    }

    const uploadProfileImage = async (formData, authToken) => {
        try {
            const response = await axios.post(process.env.REACT_APP_UPLOAD_USER_IMAGE_LOCAL_ENDPOINT, formData, {
                headers: {
                    Authorization: `${authToken}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.status === 200) {
                console.log(response.data);
                if (errorMessage.trim() !== "") {
                    setErrorMessage("");
                }
                setProfileImage(response.data);
                storedUser.imageUrl = response.data;
                localStorage.setItem("user", JSON.stringify(storedUser));
                authContext.setUserFunction(storedUser);

            } else {
                console.error("Failed to upload profile image");
                setErrorMessage("some error occured");
            }
        } catch (error) {
            console.error("Error uploading profile image:", error);
            if (error.response != null) {
                if (error.response.data != null) {
                    if (error.response.data.errors != null && error.response.data.errors.length > 0) {
                        if (error.response.data.errors[0].includes("File limit exceeded")) {
                            setErrorMessage("Max limit is 1 MB!");
                        }
                        else {
                            setErrorMessage("Some error occured");
                        }
                    }
                }
            }
        }
    };

    const deleteProfileImage = () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete the profile picture?"
        );

        if (confirmDelete) {
            deleteProfileImageBackend(authContext.token);
            setProfileImage(
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
            );
            storedUser.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
            localStorage.setItem("user", JSON.stringify(storedUser));
            authContext.setUserFunction(storedUser);
        }
    };

    const deleteProfileImageBackend = async (authToken) => {
        try {
            const response = await axios.delete(process.env.REACT_APP_PROFILE_PICTURE_DELETE, {
                headers: {
                    Authorization: `${authToken}`
                }
            });

            if (response.status === 200) {
            } else {
                console.error("Failed to upload profile image");
                setErrorMessage("Cannot delete picture");
            }
        } catch (error) {
            setErrorMessage("Cannot delete picture");
        }
    }

    return (
        <div className={styles.profile}>
            <Header textColor="greenText" icon={icon} />
            <div className={styles.profileContainer}>
                <img
                    id={styles.profilePicture}
                    src={profileImage}
                    alt="Profile"
                />
                <span className={errorMessage.trim() === "" ? "" : styles.errorMessage}>{errorMessage}</span>
                <label htmlFor={styles.fileInput} id={styles.customFileButton}>
                    Change Picture
                </label>
                <input
                    type="file"
                    id={styles.fileInput}
                    className={styles.fileInput}
                    onChange={handleImageChange}
                />
                <button className={styles.deleteButton} onClick={deleteProfileImage}>
                    Delete Picture
                </button>
            </div>
        </div>
    );
};