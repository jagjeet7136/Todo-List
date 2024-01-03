import React, { useContext, useState, useRef } from "react";
import { Header } from "./Header";
import icon from "../../icons/newIcon.png";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Profile.module.css";
import axios from "axios";
import formStyles from "../UserManagement/Register.module.css";
import { Link } from "react-router-dom";

export const Profile = () => {
  let firstName, lastName, emailAddress;
  const [updateClicked, setUpdateClicked] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);
  const oldPassword = useRef();
  const newPassword = useRef();
  const confirmPassword = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const authContext = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const storedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [profileImage, setProfileImage] = useState(
    authContext.user && authContext.user.imageUrl !== null
      ? authContext.user.imageUrl
      : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
  );

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const authToken = authContext.token; // Replace this with the actual token
      uploadProfileImage(formData, authToken);
    }
  };

  const uploadProfileImage = async (formData, authToken) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_UPLOAD_USER_IMAGE_LOCAL_ENDPOINT,
        formData,
        {
          headers: {
            Authorization: `${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
          if (
            error.response.data.errors != null &&
            error.response.data.errors.length > 0
          ) {
            if (error.response.data.errors[0].includes("File limit exceeded")) {
              setErrorMessage("Max limit is 1 MB!");
            } else {
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
    }
  };

  const deleteProfileImageBackend = async (authToken) => {
    try {
      const response = await axios.delete(
        process.env.REACT_APP_DELETE_USER_IMAGE_LOCAL_ENDPOINT,
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setProfileImage(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
        );
        storedUser.imageUrl =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
        localStorage.setItem("user", JSON.stringify(storedUser));
        authContext.setUserFunction(storedUser);
      } else {
        setErrorMessage("Cannot delete picture");
      }
    } catch (error) {
      setErrorMessage("Cannot delete picture");
    }
  };

  const fetchUserDetails = () => {
    firstName = storedUser.userFullName;
    emailAddress = storedUser.username;
  };

  const handleFormDisplay = () => {
    if (displayPassword) {
      setDisplayPassword(false);
    } else setDisplayPassword(true);
  };

  const handleProfileDisplay = () => {
    document.getElementsByTagName("input").disabled = false;
  };
  const handleUpdateClick = () => {
    setUpdateClicked(true);
    // Perform your password update logic here
  };
  fetchUserDetails();

  const updatePassword = () => {
    const passwords = {
      oldPassword: oldPassword.current.value,
      newPassword: newPassword.current.value,
      confirmPassword: confirmPassword.current.value,
    };
    axios
      .patch(process.env.REACT_APP_USERUPDATE_LOCAL_ENDPOINT, passwords, {
        headers: {
          Authorization: `${authContext.token}`,
        },
      })
      .then((response) => {
        alert("Password Updated Successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Error");
      });
  };

  return (
    <>
      <div className={styles.profile}>
        <Header textColor="greenText" icon={icon} />
        <div className={styles.container}>
          <div className={styles.options}>
            <div className={styles.profileContainer}>
              <img
                id={styles.profilePicture}
                src={profileImage}
                alt="Profile"
              />
              <span
                className={
                  errorMessage.trim() === "" ? "" : styles.errorMessage
                }
              >
                {errorMessage}
              </span>
              <div className={styles.profileBtnContainer}>
                <label htmlFor={styles.fileInput} id={styles.customFileButton}>
                  Change
                </label>
                <input
                  type="file"
                  id={styles.fileInput}
                  className={styles.fileInput}
                  onChange={handleImageChange}
                />

                <button
                  className={styles.deleteButton}
                  onClick={deleteProfileImage}
                >
                  Delete
                </button>
              </div>

              <div className={styles.profileNav}>
                <hr />
                <Link onClick={() => handleFormDisplay()}>Account Details</Link>
                <Link onClick={() => handleFormDisplay()}>Change Password</Link>
                <Link>Logout</Link>
              </div>
            </div>
          </div>

          {!displayPassword ? null : (
            <div className={styles.changePassword}>
              <h3>Change Password</h3>
              <hr />
              <form className={styles.formcontainer}>
                <div className={formStyles.passwordContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Old Password"
                    ref={oldPassword}
                    className={`${formStyles.password} ${
                      updateClicked ? formStyles.border1px : ""
                    }`}
                  />
                  <span
                    className={formStyles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>
                <div className={formStyles.passwordContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    ref={newPassword}
                    className={`${formStyles.password} ${
                      updateClicked ? formStyles.border1px : ""
                    }`}
                  />
                  <span
                    className={formStyles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>
                <div className={formStyles.passwordContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    ref={confirmPassword}
                    className={`${formStyles.password} ${
                      updateClicked ? formStyles.border1px : ""
                    }`}
                  />
                  <span
                    className={formStyles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>
                <div className={styles.submitBtnContainer}>
                  <button id={styles.submitFileButton} onClick={updatePassword}>
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}
          {displayPassword ? null : (
            <div className={styles.details}>
              <h3>Account Details</h3>
              <hr />
              <form className={styles.formcontainer}>
                <div className={styles.formdata}>
                  <label htmlFor="email">Email Address: </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={emailAddress}
                  />
                </div>

                <div className={styles.formdata}>
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder={firstName.split(" ", 1)[0]}
                    disabled
                  />
                </div>

                <div className={styles.formdata}>
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder={firstName.split(" ").pop()}
                    disabled
                  />
                </div>
                <div className={styles.formdata}>
                  <label htmlFor="lastName">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="********"
                    disabled
                  />
                </div>
              </form>
              <div className={styles.submitBtnContainer}>
                <button
                  id={styles.submitFileButton}
                  onClick={() => {
                    handleProfileDisplay();
                  }}
                >
                  Edit Profile
                </button>
                <button
                  id={styles.submitFileButton}
                  onClick={console.log("test")}
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
