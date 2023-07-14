import styles from "./Landing.module.css";

export const Landing = () => {

    return (
        <div className={styles.landing}>
            <div className={styles.landingWrapper}>
                <h1 className={styles.landingHeading}>Personal To-Do Application
                </h1>
                <p className={styles.landingPara}>Hello everyone, this is a task management tool and anyone can use it for some
                    basic operation like addtion, updation, deletion. Further I will add a statistic analysis of your activities
                    in form of charts. I have created this tool by using Spring, React and MySQL.</p>
            </div>
            <img className={styles.landingImage}
                src="https://cdn.pixabay.com/photo/2023/01/31/19/52/dog-7758887_640.jpg" alt=""></img>
        </div>
    );
}
