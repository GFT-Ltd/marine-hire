import React, { useState } from "react";
import "./JobEditModal.css";

function JobEditModal({ job, onSave, onCancel }) {
  const [updatedJob, setUpdatedJob] = useState(job);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedJob({ ...updatedJob, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedJob);
  };

  return (
    <div className="job-edit-modal">
      <div className="job-edit-modal-content">
        <div className="job-edit-modal-close">
          <span className="edit-post-title">Edit Post</span>
          <span className="cross-button" onClick={onCancel}>
            &times;
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="companyName"
                value={updatedJob.companyName}
                onChange={handleChange}
                placeholder="Company Name"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="industrySector"
                value={updatedJob.industrySector}
                onChange={handleChange}
                placeholder="Industry Sector"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="companyDescription"
                value={updatedJob.companyDescription}
                onChange={handleChange}
                placeholder="Company Description"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="companyWebsite"
                value={updatedJob.companyWebsite}
                onChange={handleChange}
                placeholder="Company Website"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="contactEmail"
                value={updatedJob.contactEmail}
                onChange={handleChange}
                placeholder="Contact Email"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="companyAddress"
                value={updatedJob.companyAddress}
                onChange={handleChange}
                placeholder="Company Address"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="city"
                value={updatedJob.city}
                onChange={handleChange}
                placeholder="City"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="pincode"
                value={updatedJob.pincode}
                onChange={handleChange}
                placeholder="Pincode"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="country"
                value={updatedJob.country}
                onChange={handleChange}
                placeholder="Country"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="jobTitle"
                value={updatedJob.jobTitle}
                onChange={handleChange}
                placeholder="Job Title"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="positionType"
                value={updatedJob.positionType}
                onChange={handleChange}
                placeholder="Position Type"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="jobLocation"
                value={updatedJob.jobLocation}
                onChange={handleChange}
                placeholder="Job Location"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="jobDescription"
                value={updatedJob.jobDescription}
                onChange={handleChange}
                placeholder="Job Description"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="qualifications"
                value={updatedJob.qualifications}
                onChange={handleChange}
                placeholder="Qualifications"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="experienceLevel"
                value={updatedJob.experienceLevel}
                onChange={handleChange}
                placeholder="Experience Level"
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                name="positionsAvailable"
                value={updatedJob.positionsAvailable}
                onChange={handleChange}
                placeholder="Positions Available"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="date"
                className="form-control"
                name="applicationDeadline"
                value={updatedJob.applicationDeadline}
                onChange={handleChange}
                placeholder="Application Deadline"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="responsibilities"
                value={updatedJob.responsibilities}
                onChange={handleChange}
                placeholder="Responsibilities"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="requiredSkills"
                value={updatedJob.requiredSkills}
                onChange={handleChange}
                placeholder="Required Skills"
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                name="salaryRange"
                value={updatedJob.salaryRange}
                onChange={handleChange}
                placeholder="Salary Range"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="perks"
                value={updatedJob.perks}
                onChange={handleChange}
                placeholder="Perks"
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                name="officeDays"
                value={updatedJob.officeDays}
                onChange={handleChange}
                placeholder="Office days"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="otherInfo"
                value={updatedJob.otherInfo}
                onChange={handleChange}
                placeholder="Other Info."
              />
            </div>
          </div>
          {/* Add more input fields similarly */}
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobEditModal;
