import React, { useState, useEffect } from "react";
import Search from "../common/SearchForm";
import JoblyApi from "../api/api";
import JobCardList from "../jobs/JobCardList";
import LoadingSpinner from "../common/LoadingSpinner";

/**
 * Show list of jobs
 * 
 * JobList -> JobCardList -> JobCard
 * 
 * /jobs
 * 
 * List all jobs
 */

// will pass in param of company handle (company id)
function JobList(){
    console.debug("JobList");

    const[ jobs, setJobs ] = useState(null);

    // on mount - loads jobs from API when page loads
    useEffect(function getAllJobsOnMount(){
        console.debug("JobList useEffect getAllJobsOnMount");
        search();
    }, [])

    // API pull, update jobs state
    async function search(title){
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs); 
    }

    if (!jobs) return <LoadingSpinner />;

    return(
        <div className="JobList col-md-8 offset-md-2">
        {/* when search form submit, reloads jobs from API with filter */}
        <Search searchFor={search} />

        {jobs.length
            ? <JobCardList jobs={jobs} />
            : <p className="lead">Sorry, no results were found!</p>}


        </div>
    )
}
export default JobList;