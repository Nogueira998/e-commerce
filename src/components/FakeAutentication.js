//This is only purpose for demosntrate the workflow and CRUD functionalities
import imgLogo from "../images/logo.png";
import "../css/FakeAutenticator.css";
import { Link } from "react-router-dom";

function FakeAutentication() {
  return (
    <div className="fake">
      <img className="fake__logo" src={imgLogo} alt="logo" />

      <div className="fake__container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input type="text" />

          <h5>Password</h5>
          <input type="password" />
        </form>

        <div>
          <h6>Access restricted to registered employees only.</h6>
        </div>

        <Link to="/restricted">
          <button className="fake__registerButton">Enter</button>
        </Link>
      </div>
    </div>
  );
}

export default FakeAutentication;
