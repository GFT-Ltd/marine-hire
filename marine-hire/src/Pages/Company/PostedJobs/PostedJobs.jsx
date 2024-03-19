import React, { useState, useEffect } from "react";
import NavbarCompany from "../NavbarCompany/NavbarCompany";
import "./PostedJobs.css";
import JobCard from "./JobCard/JobCard";
import JobLinkCard from "./JobLinkCard/JobLinkCard";

function PostedJobs() {
  const [jobListings, setJobListings] = useState([]);
  const [linkPosts, setLinkPosts] = useState([]);

  // Fetch job listings from backend when component mounts
  useEffect(() => {
    fetchJobListings();
  }, []);

  // Fetch link posts from backend when component mounts
  useEffect(() => {
    fetchLinkPosts();
  }, []);

  // const fetchJobListings = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/api/joblistings");
  //     let data = await response.json();

  //     // Sort jobListings array by postedDate in descending order
  //     data = data.sort(
  //       (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
  //     );

  //     setJobListings(data);
  //   } catch (error) {
  //     console.error("Error fetching job listings:", error);
  //   }
  // };

  // const fetchLinkPosts = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/api/linkposts");
  //     let data = await response.json();

  //     setLinkPosts(data);
  //   } catch (error) {
  //     console.error("Error fetching link posts:", error);
  //   }
  // };

  const fetchJobListings = async () => {
    try {
      const userDataString = localStorage.getItem("user");
      const userData = JSON.parse(userDataString);
      const email = userData?.email;

      if (!email) {
        console.error("User email not found in local storage");
        return;
      }

      const response = await fetch("http://localhost:5000/api/joblistings", {
        headers: {
          email: email,
        },
      });
      const data = await response.json();

      setJobListings(data);
    } catch (error) {
      console.error("Error fetching job listings:", error);
    }
  };

  const fetchLinkPosts = async () => {
    try {
      const userDataString = localStorage.getItem("user");
      const userData = JSON.parse(userDataString);
      const email = userData?.email;
      console.log("current user : ", email);

      if (!email) {
        console.error("User email not found in local storage");
        return;
      }

      const response = await fetch("http://localhost:5000/api/linkposts", {
        headers: {
          email: email,
        },
      });
      const data = await response.json();

      setLinkPosts(data);
    } catch (error) {
      console.error("Error fetching link posts:", error);
    }
  };

  return (
    <div className="posted-jobs">
      <NavbarCompany />
      <div className="jobs-card-section">
        <div className="row">
          <div className="col-12 jobs-title-section">
            <h1>Jobs Created</h1>
          </div>
          {jobListings.map((job) => (
            <div
              key={job._id}
              className="col-lg-4 col-md-6 col-12 job-card-item"
            >
              <JobCard job={job} />
            </div>
          ))}
          {linkPosts.map((linkPost) => (
            <div
              key={linkPost._id}
              className="col-lg-4 col-md-6 col-12 job-card-item"
            >
              <JobLinkCard linkPost={linkPost} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostedJobs;
