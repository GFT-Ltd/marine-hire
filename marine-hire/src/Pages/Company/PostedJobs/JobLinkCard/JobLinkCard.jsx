import React from "react";
import { Link } from "react-router-dom";
import "./JobLinkCard.css";

function JobLinkCard({ linkPost }) {
  const date = new Date(linkPost.postedDate);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;
  return (
    <div>
      <Link
        to={{
          pathname: `/job-link/${linkPost._id}`,
          state: { linkPost: linkPost },
        }}
        className="link-job-details-page"
      >
        <div className="job-card">
          <div className="job-card-content">
            <h4>{linkPost.jobTitle}</h4>
            <h5>{formattedDate}</h5>
            <p>URL attached</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default JobLinkCard;
