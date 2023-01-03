import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useAuth();
  const logoutUser = () => {
    const user = localStorage.removeItem("user");
    dispatch({ type: "logout", payload: user });
  };
  console.log(user);
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light position-sticky top-0 w-100">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Todos
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {user && (
                <>
                  <li className="nav-item">
                    <p className="text-purple nav-link">{user.email}</p>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-danger" onClick={logoutUser}>
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!user && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      Signup
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
