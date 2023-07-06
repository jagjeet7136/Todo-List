import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

export const Header = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const logoutHandler = () => {
    authContext.logout();
  }

  const mainPageHandler = (event) => {

    const currentUrl = location.pathname;
    const isDashboardPage = currentUrl.includes("/dashboard");
    if (authContext.loggedIn) {
      event.preventDefault();
      // navigate("/dashboard");
    }
    else {

      console.log("executed");
      return;
    }


  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={mainPageHandler}>
          Task Management Tool
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            {authContext.loggedIn ? (<><li className="nav-item">
              <Link className="nav-link" to="/login" onClick={logoutHandler}>
                Logout
              </Link>
            </li></>) : (<><li className="nav-item">
              <Link className="nav-link" to="/register">
                Sign Up
              </Link>
            </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li></>)}

          </ul>
        </div>
      </div>
    </nav>
  );
};
