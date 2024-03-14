// JobLinkEditModal.jsx
import React, { useState } from "react";
import "./JobLinkEditModal.css";

function JobLinkEditModal({ linkPost, onCancel, onUpdate }) {
  const [updatedLinkPost, setUpdatedLinkPost] = useState(linkPost);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedLinkPost({ ...updatedLinkPost, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedLinkPost);
  };

  return (
    <div className="job-link-edit-modal">
      <div className="job-link-edit-modal-content">
        <div className="job-link-edit-modal-close">
          <span className="link-edit-post-title">Edit Link</span>
          <span className="cross-button" onClick={onCancel}>
            &times;
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                className="form-control"
                type="text"
                name="jobTitle"
                value={updatedLinkPost.jobTitle}
                onChange={handleChange}
                placeholder="Job Title"
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                type="text"
                name="companyName"
                value={updatedLinkPost.companyName}
                onChange={handleChange}
                placeholder="Company Name"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="link"
                value={updatedLinkPost.link}
                onChange={handleChange}
                placeholder="Link"
              />
            </div>
            <div className="col-md-6">
              <input
                type="date"
                className="form-control"
                name="applicationDeadline"
                value={updatedLinkPost.applicationDeadline}
                onChange={handleChange}
                placeholder="Application Deadline"
              />
            </div>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default JobLinkEditModal;
