import styles from "./App.css";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AddTask } from "./components/task/AddTask";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Header />
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/addTask" element={<AddTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
