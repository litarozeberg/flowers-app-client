import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const AboutPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
    if (jwtPayload.exp <= Date.now() / 1000) {
      localStorage.removeItem("token");
      dispatch(authActions.logout());
      history.push("/login");
    }
  }, []);

  return (
    <>
      <h1 className="my-3">About the Flowers</h1>
      <h3>A bit istory ...</h3>
      <p className="p-about mt-3">
        A little about us Our company offers a huge variety of types of flowers
        in a variety of colors for every purpose and event. At Lilac Flowers you
        can meet a professional team that lives the world of flowers every day,
        we will adjust the flower arrangement according to your specific
        requirements. Our company specializes in all types of flower
        arrangements, including weaving and arranging flowers, bridal bouquets,
        car decoration and building a complete design program with flowers for
        all types of events, including private and business events. In the heart
        of the city of Yavne lies a charming little shop - Lilac Flowers. The
        store is run with love and hospitality by beautiful Lilac and Reut,
      </p>

      <h3 className="mt-4 my-1">Let's see ...</h3>
      <div className="row">
        <div className="col-md-4 col-sm-6 col-xs-12 mr-3 mt-3">
          <iframe
            className="video"
            height="300"
            src="https://www.youtube.com/embed/AmcSghrsd9E"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="col-md-4 col-sm-6 col-xs-12 mr-3 mt-3">
          <iframe
            className="video"
            height="300"
            src="https://www.youtube.com/embed/pZVdQLn_E5w"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-12 mr-3 mt-3">
          <iframe
            className="video"
            height="300"
            src="https://www.youtube.com/embed/QiipqlxtuD8"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
