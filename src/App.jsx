import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthGuardRoute from "./guard/AuthGuardRoute";
import NavbarComponent from "./components/Navbar.component";
import FooterComponent from "./components/Footer.component";
import RegisterPage from "./pages/Register.page";
import ForgetPasswordPage from "./pages/ForgetPassword.page";
import ResetPasswordPage from "./pages/ResetPassword.page";
import LoginPage from "./pages/Login.page";
import CartsPage from "./pages/Carts.page";
import PayPalPage from "./pages/PayPal.page";
import HomePage from "./pages/Home.page";
import AboutPage from "./pages/About.page";
import NewFlowerPage from "./pages/NewFlower.page";
import AllFlowersPage from "./pages/AllFlowers.page";
import MyFlowersPage from "./pages/MyFlowers.page";
import EditFlowerPage from "./pages/EditFlower.page";
import PreferedFlowersPage from "./pages/PreferedFlowers.page";
import ProfilePage from "./pages/Profile.page";
import NotFoundPage from "./pages/NotFound.page";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../node_modules/react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <NavbarComponent/>
    <div className="container">
      <ToastContainer />
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/register" component={RegisterPage} />
        <Route path="/forgetpassword" component={ForgetPasswordPage} />
        <Route path="/resetpassword/:token" component={ResetPasswordPage} />
        <Route path="/login" component={LoginPage} />
        <AuthGuardRoute path="/carts" component={CartsPage} />
        <Route path="/paypal/:stp" component={PayPalPage} />
        <AuthGuardRoute path="/home" component={HomePage} />
        <AuthGuardRoute path="/about" component={AboutPage} />
        <AuthGuardRoute path="/newFlower" component={NewFlowerPage} />
        <AuthGuardRoute path="/allflowers" component={AllFlowersPage} />
        <AuthGuardRoute path="/myflowers" exact component={MyFlowersPage} />
        <AuthGuardRoute path="/myflowers/:id" component={EditFlowerPage} />
        <AuthGuardRoute path="/preferedflowers" exact component={PreferedFlowersPage} />
        <AuthGuardRoute path="/profile" exact component={ProfilePage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </div>
    <FooterComponent/>
    </>
  );
}

export default App;