import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** 
 *
 * check for a valid current user 
 *  If no user is present, redirects to login form.
 */

function PrivateRoute({ exact, path, children}){
    const{ currentUser } = useContext(UserContext); 
    console.debug(
        "PrivateRoute",
        "exact=", exact,
        "path=", path,
        "currentUser=", currentUser,
    );

    if (!currentUser) {
        return <Redirect to="/login" />;
      }

      return (
        <Route exact={exact} path={path}>
          {children}
        </Route>
    );

}

export default PrivateRoute;