import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";


/**
 * Homepage — just a simple welcome message
 * 
 * Shows welcome message or login/register buttons.
 * 
 */

function Homepage(){
    //if currentUser passed in (from where ?????)
    const {currentUser } = useContext(UserContext);
    console.debug("Homepage", "currentUser=", currentUser);


    return (
        <div className="Homepage">
        <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">Jobly</h1>
        <p className="lead">All the jobs in one, convenient place.</p>
        
        {currentUser
        ? <h2>Welcome Back, {currentUser.firstName || currentUser.username}!</h2>
        : (<p>
            <Link className="btn btn-primary font-weight-bold mr-3" to="/login">
            Log in</Link>
            <Link className="btn btn-primary font-weight-bold" to="/signup">
            Sign up</Link></p>)}
        </div>
      </div>
    )
}


export default Homepage; 