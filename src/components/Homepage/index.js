import React, { Component, useState } from "react";
import { Redirect, NavLink } from "react-router-dom";
import firebase from "./../Firebase/firebase";
import * as Icon from "react-feather";
import Footer from "./footer";
import Header from "./header.js";

export default function Home(props) {
  const [toDashboard, setToDashboard] = useState(false);
  /*
  function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error: error });
      });
  }*/
  if (toDashboard === true) {
    return <Redirect to="/dashboard" />;
  }
  if (firebase.getCurrentUsername()) {
    //User Not Logged In
    //alert("Please login first");
    setToDashboard(true);
    return null;
  }

  return (
    <React.Fragment>
      <Header />
      <main role="main">
        <section
          className="jumbotron text-center"
          style={{ backgroundColor: "#fff" }}
        >
          <div className="container">
            <h1 className="jumbotron-heading">GST Billing Software</h1>
            <p className="lead text-muted">
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don’t simply skip over it entirely.
            </p>
            <p>
              <a href="#" className="btn btn-primary my-2">
                Main call to action
              </a>
              <a href="#" className="btn btn-secondary my-2">
                Secondary action
              </a>
            </p>
          </div>
        </section>
        <div className="py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="card mb-4 shadow-sm">
                  {/*% include icons/placeholder.svg width="100%" height="225" background="#55595c" color="#eceeef" className="card-img-top" text="Thumbnail" %*/}
                  <div className="card-body">
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4 shadow-sm">
                  {/*% include icons/placeholder.svg width="100%" height="225" background="#55595c" color="#eceeef" className="card-img-top" text="Thumbnail" %*/}
                  <div className="card-body">
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4 shadow-sm">
                  {/*% include icons/placeholder.svg width="100%" height="225" background="#55595c" color="#eceeef" className="card-img-top" text="Thumbnail" %*/}
                  <div className="card-body">
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}
