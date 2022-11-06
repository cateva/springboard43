import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/LoadingSpinner";


/**
 * /companies: List all companies
 * 
 * first load: all companies from API
 * re-load: filtered companies on SearchForm submission 
 * 
 * Components -> { CompanyCard, SearchForm }
 */

function CompanyList(){
    console.debug("CompanyList");

    const [companies, setCompanies] = useState(null);

    //useEffect(call back function, array of dependencies to rerender this function)
    // when [], only runs when component re-renders

    // company state changes (when user search a company name)
    // pulls a list of company with that name from database
    useEffect(function getCompaniesOnMount(){
        console.debug("CompanyList useEffect getCompaniesOnMount");
        search();   //runs search() function when page re-renders, page re-renders when companies state changes, thats when searchForm is submitted 
    }, []); 

    async function search(name){
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }; 

    if (!companies) return <LoadingSpinner />

    return (
        <div className="CompanyList col-md-8 offset-md-2">
        {/* when SearchForm submitted, state changes, page re-rendered */}
        <SearchForm searchFor={search} />
        {companies.length
        
        ? (<div className="CompanyList-list">
            
            {/* renders each company info */}
            
            {companies.map(c => (
            <CompanyCard
                key={c.handle}
                handle={c.handle}
                name={c.name}
                description={c.description}
                logoUrl={c.logoUrl}
            />))}</div>)

        : (<p className="lead">Sorry, no results were found!</p>)
        
        }
        </div>
    );
}


export default CompanyList; 