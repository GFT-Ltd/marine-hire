import React from "react";
import { Link } from "react-router-dom";
import "./JobCard.css";

function JobCard({ job }) {
  const date = new Date(job.postedDate);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  return (
    <div>
      <Link
        to={{
          pathname: `/job/${job._id}`,
          state: { job: job },
        }}
        className="link-job-details-page"
      >
        <div className="job-card">
          <div className="job-card-content">
            <h4>{job.jobTitle}</h4>
            <h5>{formattedDate}</h5>
            <p>{job.positionType}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default JobCard;
