import styles from "./Dashboard.module.css";
export const Dashboard = () => {
  return (
    <div>
      <h1 className={styles.dashboard_heading}>TDL</h1>
      <div className={styles.dashboard_menu}></div>
    </div>
  );
};
