import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    img: ""
  });
  const [userImg, setUserImg] = useState({});

  const handleTextChange = (ev) => {
    let newUserData = JSON.parse(JSON.stringify(userData));
    newUserData[ev.target.id] = ev.target.value;
    setUserData(newUserData);
  };

  const handleImgChange = (ev) => {
    if (ev.target.files.length) {
      setUserImg(ev.target.files[0]);
    }
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    document.getElementById("name_err_msg").innerHTML = "";
    document.getElementById("email_err_msg").innerHTML = "";
    document.getElementById("pw_err_msg").innerHTML = "";

    let name_err = "";
    let email_err = "";
    let pw_err = "";

    if (userData.name.length < 2) {
      name_err =
        "<span class='text-danger'>Full name needs contain at least 2 characters</span>";
    }
    if (userData.email.length < 7 || userData.email.includes(".") === false) {
      email_err = "<span class='text-danger'>Invalid email</span>";
    }
    if (userData.password.length < 8) {
      pw_err =
        "<span class='text-danger'>Password needs contain at least 8 characters</span>";
    }

    document.getElementById("name_err_msg").innerHTML = name_err;
    document.getElementById("email_err_msg").innerHTML = email_err;
    document.getElementById("pw_err_msg").innerHTML = pw_err;

    if (name_err === "" && email_err === "" && pw_err === "") {
      try {
        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("email", userData.email);
        formData.append("password", userData.password);
        formData.append("userimg", userImg);
        await axios.post("/register", formData);
        toast.info("Please check our email, to confirm your email🙏", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (err) {
        toast.error(err.response.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h1 className="my-3">Register</h1>
      <div className="mb-3 form-floating">
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Full name"
          onChange={handleTextChange}
          value={userData.name}
        />
        <label htmlFor="name" className="form-label">
          Full name
        </label>
        <div id="name_err_msg"></div>
      </div>

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

      <div className="mb-3">
        <label htmlFor="toyimg" className="form-label">
          File input
        </label>
        <input
          className="form-control"
          type="file"
          id="toyimg"
          onChange={handleImgChange}
        />
      </div>
      <button className="btn btn-primary my-3">Save</button>

      <p>
        <Link
          to="/login"
          style={{
            textDecoration: "underline",
          }}
        >
          Already have user? Sign In here
        </Link>
      </p>
    </form>
  );
};

export default RegisterPage;
