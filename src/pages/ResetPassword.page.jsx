import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useHistory } from "react-router-dom";

const ResetPasswordPage = () => {
  const history = useHistory();
  const { token } = useParams();
  const [userData, setUserData] = useState({
    password: "",
  });
  const handleTextChange = (ev) => {
    let newUserData = JSON.parse(JSON.stringify(userData));
    newUserData[ev.target.id] = ev.target.value;
    setUserData(newUserData);
  };
  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    try {
      if (token) {
        await axios.post(`/resetPassword/${token}`, userData);
        toast.success("Password changed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        history.push("/login");
      } else {
        toast.error("Invalid link", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
    } catch (err) {}
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3 form-floating mt-5 mb-1">
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="New password"
          onChange={handleTextChange}
          value={userData.password}
        />
        <label htmlFor="password" className="form-label">
          New password
        </label>
      </div>
      <button className="btn btn-primary mb-3">Send</button>
    </form>
  );
};
export default ResetPasswordPage;