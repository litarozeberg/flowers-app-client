import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ForgetPasswordPage = () => {
  const [userData, setUserData] = useState({
    email: "",
  });

  const handleTextChange = (ev) => {
    let newUserData = JSON.parse(JSON.stringify(userData));
    newUserData[ev.target.id] = ev.target.value;
    setUserData(newUserData);
  };
  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/forgetPassword", userData);
    } catch (err) {}
    toast.info("Please check your email, to reset your password", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3 my-3 form-floating">
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
      </div>
      <button className="btn btn-primary my-2">Send</button>
    </form>
  );
};

export default ForgetPasswordPage;