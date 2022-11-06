import React, {useState} from "react";
import "./SearchForm.css";

/** 
 * SearchForm: 
 * Appears on CompanyList and JobList 
 * so that these can be filtered down.
 * 
 * 
 * Make companies list have a search box, 
 * which filters companies to those matching the search 
 * (remember: there’s a backend endpoint for this!). 
 * Do this filtering in the backend
 * 
 * a sub component of { CompanyList, JobList } -> SearchForm
 **/

// props passed in is an API call function: JoblyApi.getCompanies(name);
function SearchForm({ searchFor }) {
    console.debug("SearchForm", "searchFor=", typeof searchFor);
    
    /** 1- set state */
    const [searchTerm, setSearchTerm] = useState("");

    /** 2- handle search form */
    function handleSubmit(evt){
        evt.preventDefault();
        //.trim() removes whitespace from both ends of a string and returns a new string, without modifying the original string.
        //take care of accidentally trying to search for just spaces
        searchFor(searchTerm.trim() || undefined);
        
        setSearchTerm(searchTerm.trim());
    }

    /** 3- Update form fields */
    function handleChange(evt) {
    setSearchTerm(evt.target.value);
    }


  return (
    <div className="SearchForm mb-4">
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
            className="form-control form-control-lg flex-grow-1"
            name="searchTerm"
            placeholder="Enter search term.."
            value={searchTerm}
            onChange={handleChange}
        />
        <button type="submit" className="btn btn-lg btn-primary">
          Submit
        </button>
      </form>
    </div>
);
}

export default SearchForm;
