import React, { useContext, useState } from "react";
import "./JobCard.css";
import UserContext from "../auth/UserContext";

/**
 * JobCardList -> JobCard
 * 
 * Is rendered by JobCardList to show a "card" for each job.
 *
 * Receives apply func prop from parent, which is called on apply.
 */

function JobCard({id, title, salary, equity, companyName}){
    console.debug("JobCard");

    const { hasAppliedToJob, applyToJob } = useContext(UserContext); // get object stored in context and stored in state
    const [ applied, setApplied ] = useState(); //true or false

    // when id or hasAppliedToJob state change
    // fires event setApplied(hasAppliedToJob(id)); ?????
    React.useEffect(function updateAppliedStatus() {
        console.debug("JobCard useEffect updateAppliedStatus", "id=", id);
    
        setApplied(hasAppliedToJob(id));
      }, [id, hasAppliedToJob]);
    

    // when user click apply for a job
    async function handleApply(evt){
        if (hasAppliedToJob(id)) return; // if there id is stored in the context object
        applyToJob(id); // set state hasAppliedToJob = id
        setApplied(true); //setApplied = true
    }


    return(
        // renders HTML with each job info
        <div className="JobCard card"> {applied}
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <p>{companyName}</p>
          {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
          {equity !== undefined && <div><small>Equity: {equity}</small></div>}
          <button
              className="btn btn-danger font-weight-bold text-uppercase float-right"
              onClick={handleApply}
              disabled={applied}
          >
            {applied ? "Applied" : "Apply"}
          </button>
        </div>
      </div>
  );
}

/** Render integer salary like '$1,250,343' */

function formatSalary(salary) {
    const digitsRev = [];
    const salaryStr = salary.toString();
  
    for (let i = salaryStr.length - 1; i >= 0; i--) {
      digitsRev.push(salaryStr[i]);
      if (i > 0 && i % 3 === 0) digitsRev.push(",");
    }

    return digitsRev.reverse().join("");
  }

export default JobCard;