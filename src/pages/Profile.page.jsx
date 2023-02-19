import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import axios from "axios";

const ProfilePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    img: "",
    isAdmin: false
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
    if (jwtPayload.exp <= Date.now() / 1000) {
      localStorage.removeItem("token");
      dispatch(authActions.logout());
      history.push("/login");
    }

    axios
      .get(`/profile`, {
        headers: { Authorization: `${localStorage.getItem("token")}` }
      })
      .then(({ data }) => {
        setUserData(data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <div className="text-center">
      <h1 className="my-3">Your profile</h1>
        <div className="row">
          <div className="col-12">
          {userData.img !== "" ? (
                  <img
                    src={userData.img}
                    width="250"
                    alt="user img"
                  />
                ) : (
                  <img
                    src="../images/user_image.jpg"
                    width="250"
                    alt="user img"
                  />
                )}
            <p className="p-user-profile"><strong>Name:</strong> {userData.name}</p>
            <p className="p-user-profile"><strong>Email:</strong> {userData.email}</p>
            <p className="p-user-profile">
             
                {userData.isAdmin ? (
                  <>
                    <strong>Admin: </strong><i className="fa-solid fa-check"></i>
                  </>
                ) : (
                  <>
                    <strong>Admin: </strong><i className="fa-solid fa-circle-xmark"></i>
                  </>
                )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
