import React from "react";
import { Header } from "./Header";
import styles from "./Landing.module.css";
import icon from "../../icons/newIcon.png";

export const Landing = () => {

    return (
        <div className={styles.landingComp}>
            <Header textColor="greenText" icon={icon} />
            <div className={styles.landing}>
                <div className={styles.landingWrapper}>
                    <h1 className={styles.landingHeading}>Personal To-Do Application
                    </h1>
                    <p className={styles.landingPara}>Hello everyone, this is a task management tool and anyone can use it for some
                        basic operation like addtion, updation, deletion. Further I will add a statistic analysis of your activities
                        in form of charts. I have created this tool by using Spring, React and MySQL.</p>
                </div>
                <img className={styles.landingImage}
                    src="https://cdn.pixabay.com/photo/2023/07/04/07/25/self-consciousness-8105584_1280.jpg" alt=""></img>
            </div>
        </div>
    );
}
