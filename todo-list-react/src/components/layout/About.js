import { Header } from "./Header";
import React from "react";
import styles from "./About.module.css";
import { Link } from "react-router-dom";

export const About = () => {
    return (
        <React.Fragment>
            <Header />
            <div className={styles.about}>
                <h1 className={styles.aboutHeading}>About and Information</h1>
                <hr className={styles.aboutHr}></hr>
                <div className={styles.aboutContainer}>
                    <p className={styles.aboutParaOne}>Hi, I am Jagjeet Singh, A Full-Stack Developer from India. I have created this
                        project with Spring Boot, React and MySQL to practice my development skills. This application allows user to login
                        and signup, further it allows to add, delete and update tasks with user friendly and minimal user interface.</p>
                    <div className={styles.aboutInformation}>
                        <h3 className={styles.aboutInfo}>Information</h3>
                        <p className={styles.aboutParaTwo}>There are no certain terms of use for this application. This application is
                            entirely open source, therefore, anyone can download, add, update the code according to their need from
                            <Link to="https://github.com/jagjeet7136/Todo-List" target="_blank" rel="noopener noreferrer"
                                className={styles.githubLink}> HERE</Link>. Also developers can raise PR request if they are interested to
                            collaborate and contribute to open source project. Moreover, It is strictly advided to use any random passwords
                            not which you use in your daily life.</p>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );
}