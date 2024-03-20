import React from "react";
import { Link } from "react-router-dom";
import "./PdfCard.css";

function PdfCard({ pdfPosts }) {
  const date = new Date(pdfPosts[0].postedDate);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  return (
    <div>
      <Link
        to={{
          pathname: `/pdf-details/${pdfPosts[0]._id}`,
          state: { pdfPosts: pdfPosts },
        }}
        className="link-job-details-page"
      >
        <div className="pdf-card">
          <div className="pdf-card-content">
            <h4>{pdfPosts[0].jobTitle}</h4>
            <h5>{formattedDate}</h5>
            <p>JD attached</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PdfCard;
