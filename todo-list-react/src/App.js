import styles from "./App.css";
import { Dashboard } from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from "react-router-dom";
import { AddTask } from "./components/task/AddTask";
import { UpdateTask } from "./components/task/UpdateTask";
import { Landing } from "./components/layout/Landing";
import { Register } from "./components/UserManagement/Register";
import { Login } from "./components/UserManagement/Login";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { useContext } from "react";
import jwt_decode from "jwt-decode";
import { About } from "./components/layout/About";

const PrivateRoute = () => {
  const authContext = useContext(AuthContext);
  const loggedIn = authContext.loggedIn;
  const token = localStorage.getItem("token");
  const isTokenExpiredVal = isTokenExpired(token);
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }
  if (isTokenExpiredVal) {
    authContext.logout();
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

const PublicRoute = () => {
  const authContext = useContext(AuthContext);
  const loggedIn = authContext.loggedIn;
  if (loggedIn) {
    return <Navigate to="/dashboard" />;
  }
  return <Outlet />;
}

const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  try {
    const tokenData = jwt_decode(token);
    if (!tokenData || !tokenData.exp) {
      return true;
    }
    const expirationTime = tokenData.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    return expirationTime < currentTime;
  } catch (error) {
    return true;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className={styles.App}>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route exact path="/" element={<Landing />} />
            </Route>
            <Route element={<PublicRoute />}>
              <Route exact path="/register" element={<Register />} />
            </Route>
            <Route element={<PublicRoute />}>
              <Route exact path="/login" element={<Login />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route exact path="/addTask" element={<AddTask />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route exact path="/updateTask/:id" element={<UpdateTask />} />
            </Route>
            <Route exact path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
