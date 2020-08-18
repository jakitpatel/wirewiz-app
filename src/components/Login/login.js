import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
//import * as Icon from "react-feather";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {Login_Url} from './../../const';

import "./login.css";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const dispatch = useDispatch();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const userCred = {
        username: email,
        password: password
      };

      let res = await axios.post(Login_Url, userCred);
      console.log(res.data);
      console.log(res.data.name);
      console.log(res.data.session_token);
      dispatch({
        type:'UPDATEUSER',
        payload:{
          session_token : res.data.session_token,
          session_id : res.data.session_id,  
          id  : res.data.id, 
          name: res.data.name,
          first_name : res.data.first_name,
          last_name  : res.data.last_name,
          email : res.data.email,
          is_sys_admin : res.data.is_sys_admin,
          host : res.data.host,
          CUSTOMER_CREATOR : true, //res.data.CUSTOMER_CREATOR
          CUSTOMER_VIEWER : true, //res.data.CUSTOMER_VIEWER
          CUSTOMER_ENABLER : true, //res.data.CUSTOMER_ENABLER
          CUSTOMER_MODIFIER : true //res.data.CUSTOMER_MODIFIER
        }
      });
      setRedirectToDashboard(true);
    } catch (error) {
      console.log(error.response);
      if (401 === error.response.status) {
          // handle error: inform user, go to login, etc
          let res = error.response.data;
          alert(res.error.message);
      } else {
        alert(error);
      }
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
                <label>UID</label>
                <input
                  type="text"
                  name="email"
                  autoFocus
                  placeholder="UserId"
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
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      handleLogin(e);
                    }
                  }}
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
