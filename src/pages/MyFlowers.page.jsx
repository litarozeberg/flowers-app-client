import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import axios from "axios";

const MyFlowersPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.authSlice.isAdmin);
  const [filtername, setFiltername] = useState("");
  const [filterdescription, setFilterdescription] = useState("");
  const [filtercategory, setFiltercategory] = useState("");
  const [flowers, setFlowers] = useState([]);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
    if (jwtPayload.exp <= Date.now() / 1000) {
      localStorage.removeItem("token");
      dispatch(authActions.logout());
      history.push("/login");
    }

    axios
      .get(`/flowers/my-flowers`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then(({ data }) => {
        setFlowers(data);
      })
      .catch((err) => {});
  }, [isChanged]);

  const handleSetToPrefered = async (flowerData) => {
    try {
      await axios.put(
        `/flowers/settoprefered/${flowerData._id}`,
        {
          name: flowerData.name,
          description: flowerData.description,
          category: flowerData.category,
          price: flowerData.price,
          img: flowerData.img,
          isPrefered: flowerData.isPrefered,
        },
        { headers: { Authorization: `${localStorage.getItem("token")}` } }
      );
      setIsChanged(!isChanged);
    } catch (er) {}
  };
  const handleDelete = async (flowerData) => {
    if (window.confirm(`Are you sure you want to delete ${flowerData.name}?`)) {
      try {
        await axios.delete(`/flowers/${flowerData._id}`, {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        });
        setIsChanged(!isChanged);
      } catch (er) {}
    }
  };

  return (
    <>
      <h1 className="my-3">My flowers</h1>
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
                  {flowerItem.img !== "" ? (
                    <img
                      src={flowerItem.img}
                      className="card-img-top py-2"
                      alt={flowerItem.name}
                    />
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

                    <a
                      onClick={() => {
                        handleSetToPrefered(flowerItem);
                      }}
                      className="btn btn-warning mx-1"
                      title="Set prefered"
                    >
                      {flowerItem.isPrefered ? (
                        <i
                          className="fa-solid fa-heart"
                          style={{ color: "red" }}
                        ></i>
                      ) : (
                        <i
                          className="fa-solid fa-heart"
                          style={{ color: "black" }}
                        ></i>
                      )}
                    </a>

                    {isAdmin ? (
                      <>
                        <Link
                          to={`/myflowers/${flowerItem._id}`}
                          className="btn btn-warning mx-1"
                          title="Edit"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <a
                          onClick={() => {
                            handleDelete(flowerItem);
                          }}
                          className="btn btn-warning mx-1"
                          title="Delete"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </a>
                      </>
                    ) : null}
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <p className="text-center">No flowers</p>
      )}
    </>
  );
};
export default MyFlowersPage;
