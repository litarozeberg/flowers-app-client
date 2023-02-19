import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import axios from "axios";
import { toast } from "react-toastify";

const EditFlowerPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [flowerData, setFlowerData] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    isPrefered: false,
  });
  const [flowerImg, setFlowerImg] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
    if (jwtPayload.exp <= Date.now() / 1000) {
      localStorage.removeItem("token");
      dispatch(authActions.logout());
      history.push("/login");
    }

      axios
      .get(`/flowers/${id}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then(({ data }) => {
        setFlowerData(data);
        setFlowerImg(data);
      })
      .catch((err) => {});
  }, []);

  const handleTextChange = (ev) => {
    let newFlowerData = JSON.parse(JSON.stringify(flowerData));
    newFlowerData[ev.target.id] = ev.target.value;
    setFlowerData(newFlowerData);
  };

  const handleImgChange = (ev) => {
    if (ev.target.files.length) {
      setFlowerImg(ev.target.files[0]);
    }
  };
  
  const handleSubmit = async (ev) => {
    ev.preventDefault();

    document.getElementById("name_err_msg").innerHTML = "";
    document.getElementById("desc_err_msg").innerHTML = "";
    document.getElementById("cat_err_msg").innerHTML = "";
    document.getElementById("price_err_msg").innerHTML = "";

    let name_err = "";
    let desc_err = "";
    let cat_err = "";
    let price_err = "";

    if (flowerData.name.length < 2) {
      name_err =
        "<span class='text-danger'>Name needs contain at least 2 characters</span>";
    }
    if (flowerData.description.length < 2) {
      desc_err =
        "<span class='text-danger'>Description needs to contain at least 2 characters</span>";
    }
    if (flowerData.category.length < 3) {
      cat_err =
        "<span class='text-danger'>Category needs to contain at least 3 characters</span>";
    }
    if (flowerData.price <= 0) {
      price_err =
        "<span class='text-danger'>Price needs contain needs to be positive</span>";
    }

    document.getElementById("name_err_msg").innerHTML = name_err;
    document.getElementById("desc_err_msg").innerHTML = desc_err;
    document.getElementById("cat_err_msg").innerHTML = cat_err;
    document.getElementById("price_err_msg").innerHTML = price_err;

    if (name_err === "" && desc_err === "" && cat_err === "" && price_err === "") {
      try {
        const formData = new FormData();
        formData.append("name", flowerData.name);
        formData.append("description", flowerData.description);
        formData.append("category", flowerData.category);
        formData.append("price", flowerData.price);
        if (document.getElementById("flowerimg").files.length > 0)
          formData.append("flowerimg", flowerImg);
        formData.append("isPrefered", flowerData.isPrefered);

        await axios.put(`/flowers/${id}`, formData, {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        });
        history.push("/myflowers");
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
    <form onSubmit={handleSubmit}>
      <h1 className="my-3">Edit flower</h1>
      <div className="mb-3 form-floating">
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Name"
          value={flowerData.name}
          onChange={handleTextChange}
        />
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <div id="name_err_msg"></div>
      </div>
      <div className="mb-3 form-floating">
        <textarea
          type="text"
          className="form-control"
          id="description"
          placeholder="Description"
          onChange={handleTextChange}
          value={flowerData.description}
        ></textarea>
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <div id="desc_err_msg"></div>
      </div>
      <div className="mb-3 form-floating">
        <input
          type="text"
          className="form-control"
          id="category"
          placeholder="Category"
          onChange={handleTextChange}
          value={flowerData.category}
        />
        <label htmlFor="category" className="form-label">
          Category:
        </label>
        <div id="cat_err_msg"></div>
      </div>
      <div className="mb-3 form-floating">
        <input
          type="number"
          className="form-control"
          id="price"
          placeholder="Price $USA"
          onChange={handleTextChange}
          value={flowerData.price}
        />
        <label htmlFor="price" className="form-label">
          Price $USA:
        </label>
        <div id="price_err_msg"></div>
      </div>
      <div className="mb-3">
        <label htmlFor="flowerimg" className="form-label">
          Image
        </label>
        <input
          className="form-control"
          type="file"
          id="flowerimg"
          onChange={handleImgChange}
        />
      </div>
      <button className="btn btn-primary my-3">Save</button>
      <Link className="btn btn-secondary my-3 mx-2" to="/myflowers">
        Cancel
      </Link>
    </form>
  );
};

export default EditFlowerPage;
