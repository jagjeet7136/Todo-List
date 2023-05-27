import styles from "./App.module.css";
import { Dashboard } from "./components/Dashboard";

function App() {
  return (
    <div className={styles.App}>
      <Dashboard />
    </div>
  );
}

export default App;
