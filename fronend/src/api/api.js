import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** 
 * This is for the React components that need to talk to the backend 
 * 
 * API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {

  // the token for interactive with the API will be stored here.
  static token;

  // this request() function will make GET or POST request to database 
  // endpoint: route name
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

      //there are multiple ways to pass an authorization token, this is how you pass it in the header.
      //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    
      //if method === "get", params = data (passed in), else params = {}
    const params = (method === "get")
        ? data
        : {};

    try {
        //IMPORTANT!!!!  boiler plate for all API call
        //Make HTTP request: axios is a promise based library for making HTTP requests. returns a Promise, need to add await

      return (await axios({ url, method, data, params, headers })).data;
    
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

    /** 1- GET current user's username from database. */
    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    
    /** 2- Get list of companies (with filter when available). */
    static async getCompanies(company){
      let res = await this.request("companies", { company })
      return res.companies;
    }



  /** 3- Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** 4- Get list of jobs (with filter when available). */
  static async getJobs(title){
    let res = await this.request("jobs", { title })
    return res.jobs;
  }


  /** 5- Get token for login from username, password. */
  static async login(data){
    let res = await this.request("auth/token", data, "post")
    return res.token;
  }

  /** 6- Signup for site. */
  static async signup(data){
    let res = await this.request(`auth/register`, data, "post")
    return res.token
  }

  /** 7- Save user profile page. */
  static async saveProfile(username, data){
    let res = await this.request(`users/${username}`,data, "patch");
    return res.user;
  }

  /** 8- Apply to a job (????) */
  static async applyToJob( username, id ){
    await this.request(`users/${username}/jobs/${id}`, {}, "post")
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default JoblyApi;