import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import axios from "axios";

const PreferedFlowersPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [filtername, setFiltername] = useState("");
  const [filterdescription, setFilterdescription] = useState("");
  const [filtercategory, setFiltercategory] = useState("");
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
    if (jwtPayload.exp <= Date.now() / 1000) {
      localStorage.removeItem("token");
      dispatch(authActions.logout());
      history.push("/login");
    }

    axios
      .get(`/flowers/preferedflowers`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then(({ data }) => {
        setFlowers(data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <h1 className="my-3">My preferred flowers</h1>

      {flowers.length > 0 ? (
        <>
          <div className="my-4">
            <div className="form-floating">
              <input
                type="search"
                className="form-control search"
                id="filtername"
                placeholder="Name"
                onChange={(e) => setFiltername(e.target.value.toLowerCase())}
              />
              <label htmlFor="filtername" className="form-label">
                Search by name
              </label>
            </div>
            <div className="form-floating my-3">
              <input
                type="search"
                className="form-control search"
                id="filterdescription"
                placeholder="Description"
                onChange={(e) =>
                  setFilterdescription(e.target.value.toLowerCase())
                }
              />
              <label htmlFor="filterdescription" className="form-label">
                Search by description
              </label>
            </div>
            <div className="form-floating my-3">
              <input
                type="search"
                className="form-control search"
                id="filtercategory"
                placeholder="Description"
                onChange={(e) =>
                  setFiltercategory(e.target.value.toLowerCase())
                }
              />
              <label htmlFor="filtercategory" className="form-label">
                Search by category
              </label>
            </div>
          </div>

          <div className="row gap-4 m-4">
            {flowers
              .filter(
                (flowerItem) =>
                flowerItem.name.toLowerCase().includes(filtername) &&
                flowerItem.description
                    .toLowerCase()
                    .includes(filterdescription) &&
                    flowerItem.category.toLowerCase().includes(filtercategory)
              )
              .map((flowerItem) => (
                <div
                  className="card col-md-6 col-12"
                  key={flowerItem._id}
                  style={{ width: "18rem" }}
                >
                  {flowerItem.img != "" ? (
                    <>
                      <img
                        src={flowerItem.img}
                        className="card-img-top py-2"
                        alt={flowerItem.name}
                      />
                    </>
                  ) : (
                    <div>No image</div>
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{flowerItem.name}</h5>
                    <p className="card-text">
                      <small>{flowerItem.description}</small>
                      <br />
                      <strong>Category:</strong> {flowerItem.category}
                      <br />
                      <strong>Price:</strong> {flowerItem.price} $USA
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <p className="text-center">No preferred flowers</p>
      )}
    </>
  );
};
export default PreferedFlowersPage;
