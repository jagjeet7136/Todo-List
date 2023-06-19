import styles from "./App.css";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AddTask } from "./components/task/AddTask";
import { UpdateTask } from "./components/task/UpdateTask";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Header />
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/addTask" element={<AddTask />} />
          <Route exact path="/updateTask/:id" element={<UpdateTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
