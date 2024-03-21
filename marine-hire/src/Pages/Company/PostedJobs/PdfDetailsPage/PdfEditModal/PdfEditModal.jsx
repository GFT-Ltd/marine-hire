import React, { useState } from "react";
import "./PdfEditModal.css";

function PdfEditModal({ pdfDetails, onCancel, onUpdate }) {
  const [updatedDetails, setUpdatedDetails] = useState({
    jobTitle: pdfDetails.jobTitle,
    deadline: pdfDetails.deadline,
    jobLocation: pdfDetails.jobLocation,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const handleSubmit = () => {
    onUpdate(updatedDetails);
    onCancel();
  };

  return (
    <div className="job-pdf-edit-modal">
      <div className="job-pdf-edit-modal-content">
        <div className="job-pdf-edit-modal-close">
          <span className="pdf-edit-post-title">Edit PDF Details</span>
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
                placeholder="Job Title"
                value={updatedDetails.jobTitle}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                type="text"
                name="jobLocation"
                placeholder="Job Location"
                value={updatedDetails.jobLocation}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                className="form-control"
                type="date"
                name="deadline"
                value={updatedDetails.deadline}
                onChange={handleChange}
              />
            </div>
          </div>
          <p><strong>Note - </strong>To modify the PDF, reupload it and delete the current version.</p>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default PdfEditModal;
