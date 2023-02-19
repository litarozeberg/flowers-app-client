import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useHistory, Link } from "react-router-dom";

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleTextChange = (ev) => {
    let newUserData = JSON.parse(JSON.stringify(userData));
    newUserData[ev.target.id] = ev.target.value;
    setUserData(newUserData);
  };
  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    document.getElementById("email_err_msg").innerHTML = "";
    document.getElementById("pw_err_msg").innerHTML = "";

    let email_err = "";
    let pw_err = "";

    if (userData.email.length < 7 || userData.email.includes(".") === false) {
      email_err = "<span class='text-danger'>Invalid email</span>";
    }
    if (userData.password.length < 8) {
      pw_err =
        "<span class='text-danger'>Password needs contain at least 8 characters</span>";
    }

    document.getElementById("email_err_msg").innerHTML = email_err;
    document.getElementById("pw_err_msg").innerHTML = pw_err;

    if (email_err === "" && pw_err === "") {
      try {
        const { data } = await axios.post("/login", userData);
        localStorage.setItem("token", data.token);
        dispatch(authActions.login());
        history.push("/home");
      } catch (err) {
        toast.error(err.response.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h1 className="my-3">Login</h1>
      <div className="mb-3 form-floating">
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Email"
          onChange={handleTextChange}
          value={userData.email}
        />
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <div id="email_err_msg"></div>
      </div>
      <div className="mb-3 form-floating">
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          onChange={handleTextChange}
          value={userData.password}
        />
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div id="pw_err_msg"></div>
      </div>

      <button className="btn btn-primary my-3">Login</button>

      <Link className="mx-3" to={`/forgetpassword`}>
        Forget password
      </Link>

      <p>
        <Link
          to="/register"
          style={{
            textDecoration: "underline",
          }}
        >
          New user? Sign Up here
        </Link>
      </p>
    </form>
  );
};

export default LoginPage;
