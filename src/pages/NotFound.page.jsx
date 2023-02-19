import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <h1 className="my-3">Page not found</h1>
      <img className="mt-3"
        src="https://www.lifewire.com/thmb/pGMhoCAF5a56wvVtPAWct8HdUPc=/3000x2000/filters:fill(auto,1)/404-not-found-error-explained-2622936-Final-fde7be1b7e2e499c9f039d97183e7f52.jpg"
        width="300"
        alt="page not found image"
      />
      <br/>
      <NavLink className="btn btn-primary mt-3 mb-3" to="/login">
        Back to login
      </NavLink>
    </>
  );
};

export default NotFoundPage;
