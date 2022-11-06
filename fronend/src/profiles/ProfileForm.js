import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import JoblyApi from "../api/api";
import UserContext from "../auth/UserContext";

/** 
 * Profile editing form.
 * 
 * A feature where the logged-in user can edit their profile. 
 * When a user saves changes here, those are reflected elsewhere in the app.
 * 
 * Retrieve user login information from UserContext
 * 
 * On submission:
 * - calls the API to save
 * - triggers user reloading throughout the site.
 * 
 * Confirmation of a successful save is a simple <Alert>
 * 
 * ProfileForm > Alert
 * route: /profile
*/

function ProfileForm(){
    
    //1- define states
    const{ currentUser, setCurrentUser } = useContext(UserContext);
    const[formData, setFormData] = useState({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      username: currentUser.username,
      password: "",
    });
    const [saveConfirmed, setSaveConfirmed] = useState(false);
    const[formErrors, setFormErrors] = useState([]);

    console.debug(
      "ProfileForm",
      "currentUser=", currentUser,
      "formData=", formData,
      "formErrors=", formErrors,
      "saveConfirmed=", saveConfirmed,
    );

    //2- functions to handle form submission
    // calls login function prop
    async function handleSubmit(evt){
        evt.preventDefault();

        let profileData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }

        let username = formData.username;
        let updatedUser;

        try{
          updatedUser = await JoblyApi.saveProfile(username, profileData);
         } catch (errors){
          debugger; 
          setFormErrors(errors);
          return;
         }

        // 3- confirm submission, clear password data
        setFormData(f => ({ ...f, password: "" }));
        setFormErrors([]);
        setSaveConfirmed(true);

        // trigger reloading of user information throughout the site
        setCurrentUser(updatedUser);
    }

    //4- Update form data 
    function handleChange(evt){
        const{ name, value } = evt.target; 
        setFormData(l => ({
            ...l, [name]: value
        }));
        setFormErrors([]);
    }



    return (
      <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3>Profile</h3>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Username</label>
              <p className="form-control-plaintext">{formData.username}</p>
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
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
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Confirm password to make changes:</label>
              <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
              />
            </div>

            {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                : null}

            {saveConfirmed
                ?
                <Alert type="success" messages={["Updated successfully."]} />
                : null}

            <button
                className="btn btn-primary btn-block mt-4"
                onClick={handleSubmit}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
);
}


export default ProfileForm;