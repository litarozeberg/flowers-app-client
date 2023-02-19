import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authActions } from "../store/auth";

const NavBarComponent = () => {
  const isAdmin = useSelector((state) => state.authSlice.isAdmin);
  const loggedIn = useSelector((state) => state.authSlice.loggedIn);
  const email = useSelector((state) => state.authSlice.email);
  const imgpath = useSelector((state) => state.authSlice.img);

  const history = useHistory();
  const dispatch = useDispatch();

  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    axios
      .get("/login",  {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then(({ data }) => {
        setUsersData(data);
      })
      .catch((err) => {});
  }, [loggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(authActions.logout());
    history.push("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid w-100">
          <img
            src="../images/flowers-app-logo.jfif"
            width="50"
            alt="flowers-app-logo"
          />
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {loggedIn ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/home"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/about"
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    {isAdmin ? (
                      <>
                        <NavLink
                          className="nav-link"
                          aria-current="page"
                          to="/newflower"
                        >
                          New Flower
                        </NavLink>
                      </>
                    ) : null}
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/allflowers"
                    >
                      All Flowers
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/myflowers"
                    >
                      My flowers
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/preferedflowers"
                    >
                      My preferred flowers
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/profile"
                    >
                      Profile
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          {loggedIn ? (
            <>
              <div style={{ fontSize: "12px", color: "white" }}>
                {imgpath !== "" ? (
                  <img
                    src={imgpath}
                    width="50"
                    height="50"
                    title={email}
                    alt="user img"
                  />
                ) : (
                  <img
                    src="../images/user_image.jpg"
                    width="50"
                    height="50"
                    title={email}
                    alt="user img"
                  />
                )}
                <NavLink to="/carts"><i class="fa-solid fa-cart-shopping mx-2" title="View cart" style={{fontSize: "20px"}}></i></NavLink>
              </div>
              <button
                className="btn btn-outline-primary"
                style={{ marginLeft: "15px", fontSize: "12px" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : null}
        </div>
      </nav>
      <br />
      <br />
      <br />
    </>
  );
};
export default NavBarComponent;
