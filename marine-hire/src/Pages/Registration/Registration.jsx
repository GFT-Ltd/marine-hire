import React from "react";
import "./Registration.css";
import { Link } from "react-router-dom";

function Registration() {
  return (
    <div className="registration">
      <div className="form-div">
        <h3>Register</h3>
        <div>
          <form className="form-tag">
            <div class="mb-3 form-check">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="option1"
                />
                <label class="form-check-label" for="inlineRadio1">
                  Admin
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="option2"
                />
                <label class="form-check-label" for="inlineRadio2">
                  Applicant
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio3"
                  value="option3"
                />
                <label class="form-check-label" for="inlineRadio3">
                  Company
                </label>
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputFirstName" class="form-label">
                First name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputFirstName"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputLastName" class="form-label">
                Last name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputLastName"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="form-button-div">
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          <div className="login-info">
            <p>Already registered? </p>
            <Link to="/login" className="login-link"> Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
