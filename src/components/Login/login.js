import React, { useState } from "react";
import firebase from "./../Firebase/firebase";
import { NavLink, Redirect } from "react-router-dom";
//import * as Icon from "react-feather";
import "./login.css";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await firebase.login(email, password);
      setRedirectToDashboard(true);
    } catch (error) {
      alert(error);
    }
  }

  if (redirectToDashboard === true) {
    console.log("Redirect to Dashboard");
    return <Redirect to="/dashboard" />;
  }
  return (
    <React.Fragment>
      <div className="form-container">
        <div className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal text-center">Sign In</h1>
          {error ? <div>{error.message}</div> : null}
          <div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  autoFocus
                  placeholder="Email"
                  value={email}
                  className="form-control"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  className="form-control"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <button
                  type="button"
                  style={{ width: "100%" }}
                  onClick={handleLogin}
                  className="btn btn-primary"
                >
                  Sign In
                </button>
              </div>
              {/*}
              <div className="form-group">
                <NavLink exact to="/Signup">
                  <button style={{ width: "100%" }} className="btn btn-primary">
                    Sign Up
                  </button>
                </NavLink>
              </div>
              */}
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Login;
