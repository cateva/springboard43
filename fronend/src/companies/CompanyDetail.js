import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import JobCardList from "../jobs/JobCardList";
import LoadingSpinner from "../common/LoadingSpinner";

/**
 * View details of this company, showing detail on a company
 * 
 * route: /companies/apple 
 */

// will pass in param of company handle (company id)
function CompanyDetail(){
    const { handle } = useParams();
    console.debug("CompanyDetail", "handle=", handle);

    // when company changed (user adds a company filter)
    // pulls all jobs under that company
    const [company, setCompany] = useState(null);

    // re-render company job list from database only when company handle changes
    useEffect(function getCompaniesOnMount(){
        async function getCompany() {
            setCompany(await JoblyApi.getCompany(handle));
        }
        getCompany();
    }, [handle]);

    if (!company) return <LoadingSpinner />;

    return(
        <div className="CompanyDetail col-md-8 offset-md-2">
        <h4>{company.name}</h4>
        <p>{company.description}</p>

        {/* map out all jobs from this company using component JobCardList*/}
        <JobCardList jobs={company.jobs} />
        </div>
    )
}
export default CompanyDetail;