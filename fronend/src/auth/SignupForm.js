import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";

/** 
 * Signup form.
 * 
 * On submission:
 * - calls sign up function prop
 * - redirects to /companies route
 * 
 * SignupForm > Alert
 * route: /signup
 */

    //0- pass in login function
function SignupForm({ signup }){
    
    //1- define states
    const history = useHistory();
    
    const[formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    });
    
    const[formErrors, setFormErrors] = useState([]);

    console.debug(
      "SignupForm",
      "signup=", typeof signup,
      "formData=", formData,
      "formErrors=", formErrors,
    );

    //2- functions to handle form submission
    // calls signup function prop
    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await signup(formData);
        if (result.success){
    //redirects to /companies route
            history.push("/companies")
        } else {
            setFormErrors(result.errors);
        }
    }

    //3- Update form data 
    function handleChange(evt){
        const{ name, value } = evt.target; 
        setFormData(l => ({
            ...l, [name]: value
        }));
    }



    return (
      <div className="SignupForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h2 className="mb-3">Sign Up</h2>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>First name</label>
                  <input
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }

                <button
                    type="submit"
                    className="btn btn-primary float-right"
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}


export default SignupForm;