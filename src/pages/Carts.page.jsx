import { useEffect, useState } from "react";
import { useHistory, Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import axios from "axios";

const CartsPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [cartsData, setCartsData] = useState([]);
  const [sumToPay, setSumToPay] = useState(0);
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
      .get(`/carts`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then(({ data }) => {
        setCartsData(data);
      })
      .catch((err) => {});

    axios
      .get(`/carts/sumtopay`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then(({ data }) => {
        setSumToPay(data);
      })
      .catch((err) => {});
  }, [isChanged]);

  const handleDelete = async (cartData) => {
    if (window.confirm(`Are you sure you want to delete?`)) {
      try {
        await axios.delete(`/carts/${cartData._id}`, {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        });
        setIsChanged(!isChanged);
      } catch (er) {}
    }
  };

  return (
    <>
      {cartsData.length > 0 ? (
        <>
          <h1 className="my-3 text-center">Your cart</h1>
          <div className="row gap-4 m-4">
            <div className="table-responsive-sm">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th style={{ width: "20%" }}>Image</th>
                    <th style={{ width: "20%" }}>Name</th>
                    <th style={{ width: "20%" }}>Description</th>
                    <th style={{ width: "15%" }}>Category</th>
                    <th style={{ width: "10%" }}>
                      Price <br />
                      <span style={{ fontSize: "13px" }}>$USA</span>
                    </th>
                    <th>Quantity</th>
                    <th style={{ width: "10%" }}>
                      Total Price <br />
                      <span style={{ fontSize: "13px" }}>$USA</span>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartsData.map((cartItem) => (
                    <>
                      <tr key={cartItem._id} style={{ alignItems: "center" }}>
                        <td>
                          {cartItem.flower.img !== "" ? (
                            <img
                              src={cartItem.flower.img}
                              width="130"
                              height="130"
                              alt="user img"
                            />
                          ) : (
                            <p>No image</p>
                          )}
                        </td>
                        <td>{cartItem.flower.name}</td>
                        <td>{cartItem.flower.description}</td>
                        <td>{cartItem.flower.category}</td>
                        <td>{cartItem.flower.price}</td>
                        <td>{cartItem.quantity}</td>
                        <td>{cartItem.flower.price * cartItem.quantity}</td>
                        <td>
                          <a
                            onClick={() => {
                              handleDelete(cartItem);
                            }}
                            title="Delete"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </a>
                        </td>
                      </tr>
                    </>
                  ))}
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        textAlign: "right",
                        backgroundColor: "black",
                        color: "white",
                      }}
                    >
                      Total to pay :
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        backgroundColor: "black",
                        color: "white",
                      }}
                    >
                      {sumToPay.toFixed(2)} $USA
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        backgroundColor: "black",
                        color: "white",
                      }}
                    ></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Link
            className="btn btn-success mb-3 mx-2"
            to={`/paypal/${sumToPay.toFixed(2)}`}
          >
            Buy Now <i class="fab fa-paypal" style={{fontSize: "20px"}}></i>
          </Link>
        </>
      ) : (
        <p className="text-center">Empty cart</p>
      )}
    </>
  );
};

export default CartsPage;
