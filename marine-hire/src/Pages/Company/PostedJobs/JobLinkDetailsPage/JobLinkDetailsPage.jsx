import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarCompany from "../../NavbarCompany/NavbarCompany";
import "./JobLinkDetailsPage.css";

function JobLinkDetailsPage() {
  const { id } = useParams();
  const [linkPost, setLinkPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch linkPost details from backend
    const fetchLinkPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/linkposts/${id}`
        );
        const data = await response.json();
        setLinkPost(data);
      } catch (error) {
        console.error("Error fetching link post details:", error);
      }
    };

    fetchLinkPost();
  }, [id]);

  if (!linkPost) {
    return <div>Loading...</div>;
  }

  const date = new Date(linkPost.applicationDeadline);
  const formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })} ${date.getFullYear()}`;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this link post?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/linkposts/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          // Redirect to link posts page after successful deletion
          navigate("/jobs-posted");
        } else {
          console.error("Error deleting link post:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting link post:", error);
      }
    }
  };

  return (
    <div className="job-link-details-page">
      <NavbarCompany />
      <div className="link-details-section">
        <div className="alert alert-secondary" role="alert">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12 detail-field">
              Title - {linkPost.jobTitle}
            </div>
            <div className="col-lg-6 col-md-6 col-12 detail-field">
              Company name - {linkPost.companyName}
            </div>
            <div className="col-lg-6 col-md-6 col-12 detail-field">
              Deadline - {formattedDate}
            </div>
            <div className="col-lg-6 col-md-6 col-12 detail-field">
              URL - {linkPost.link}
            </div>
            <div className="col-12">
              <button className="delete-button-4" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobLinkDetailsPage;
