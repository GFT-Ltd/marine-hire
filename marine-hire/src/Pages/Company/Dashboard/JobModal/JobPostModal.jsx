import React, { useState, useEffect } from "react";
import "./JobPostModal.css"; // Import CSS file for styling
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function JobPostModal({ modalOpen, closeModal }) {
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    industrySector: "",
    companyDescription: "",
    companyWebsite: "",
    contactEmail: "",
    companyAddress: "",
    city: "",
    pincode: "",
    country: "",
  });

  const [jobListing, setJobListing] = useState({
    jobTitle: "",
    positionType: "",
    jobLocation: "",
    jobDescription: "",
    qualifications: "",
    experienceLevel: "",
    positionsAvailable: 0,
    applicationDeadline: "",
    responsibilities: "",
    requiredSkills: "",
  });

  const [salaryBenefits, setSalaryBenefits] = useState({
    salaryRange: 0,
    perks: "",
    officeDays: 0,
  });

  const [otherInfo, setOtherInfo] = useState("");
  const [postedDate, setPostedDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPostedDate(new Date());
    }, 1000); // Update every second

    // Clean up the interval
    return () => clearInterval(intervalId);
  }, []);

  const handleCompanyInfoChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo({ ...companyInfo, [name]: value });
  };

  const handleJobListingChange = (e) => {
    const { name, value } = e.target;
    setJobListing({ ...jobListing, [name]: value });
  };

  const handleSalaryBenefitsChange = (e) => {
    const { name, value } = e.target;
    setSalaryBenefits({ ...salaryBenefits, [name]: value });
  };

  const handleOtherInfoChange = (e) => {
    setOtherInfo(e.target.value);
  };

  const handleSubmit = async () => {
    // Show confirmation dialog
    const confirmed = window.confirm("Are you sure you want to submit?");

    // Check if user confirmed
    if (confirmed) {
      try {
        const response = await fetch("http://localhost:5000/api/joblistings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...companyInfo,
            ...jobListing,
            ...salaryBenefits,
            otherInfo,
            postedDate,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to post job listing");
        }

        setCompanyInfo({
          companyName: "",
          industrySector: "",
          companyDescription: "",
          companyWebsite: "",
          contactEmail: "",
          companyAddress: "",
          city: "",
          pincode: "",
          country: "",
        });
        setJobListing({
          jobTitle: "",
          positionType: "",
          jobLocation: "",
          jobDescription: "",
          qualifications: "",
          experienceLevel: "",
          positionsAvailable: 0,
          applicationDeadline: "",
          responsibilities: "",
          requiredSkills: "",
        });
        setSalaryBenefits({
          salaryRange: 0,
          perks: "",
          officeDays: 0,
        });
        setOtherInfo("");

        toast.success("Job listing posted successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (error) {
        console.error("Error posting job listing:", error);
        toast.error("Failed to post job listing. Please try again later.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      // User clicked "Cancel", do nothing
    }
  };

  const modalDisplay = modalOpen ? "block" : "none";

  return (
    <div className="modal" style={{ display: modalDisplay }}>
      <div className="modal-dialog modal-xl modal-dialog-scrollable modal-fullscreen-md-down">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Enter job details</h1>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="section">
              <h2>Company Information</h2>
              <div className="row mb-3">
                <div className="col-md-4 col-12">
                  <input
                    type="text"
                    className="form-control"
                    name="companyName"
                    value={companyInfo.companyName}
                    onChange={handleCompanyInfoChange}
                    placeholder="Company Name"
                  />
                </div>
                <div className="col-md-4 col-12">
                  <input
                    type="text"
                    className="form-control"
                    name="industrySector"
                    value={companyInfo.industrySector}
                    onChange={handleCompanyInfoChange}
                    placeholder="Industry Sector"
                  />
                </div>
                <div className="col-md-4 col-12">
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={companyInfo.city}
                    onChange={handleCompanyInfoChange}
                    placeholder="City"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4 col-12">
                  <textarea
                    className="form-control"
                    name="companyDescription"
                    value={companyInfo.companyDescription}
                    onChange={handleCompanyInfoChange}
                    placeholder="Company Description"
                  />
                </div>
                <div className="col-md-4 col-12">
                  <input
                    type="url"
                    className="form-control"
                    name="companyWebsite"
                    value={companyInfo.companyWebsite}
                    onChange={handleCompanyInfoChange}
                    placeholder="Company Website"
                  />
                </div>
                <div className="col-md-4 col-12">
                  <input
                    type="text"
                    className="form-control"
                    name="pincode"
                    value={companyInfo.pincode}
                    onChange={handleCompanyInfoChange}
                    placeholder="Pincode/Zip Code"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4 col-12">
                  <input
                    type="email"
                    className="form-control"
                    name="contactEmail"
                    value={companyInfo.contactEmail}
                    onChange={handleCompanyInfoChange}
                    placeholder="Contact Email"
                  />
                </div>
                <div className="col-md-4 col-12">
                  <input
                    type="text"
                    className="form-control"
                    name="companyAddress"
                    value={companyInfo.companyAddress}
                    onChange={handleCompanyInfoChange}
                    placeholder="Company Address"
                  />
                </div>
                <div className="col-md-4 col-12">
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    value={companyInfo.country}
                    onChange={handleCompanyInfoChange}
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>
            <div className="section">
              <h2>Job Listing Details</h2>
              <div className="row mb-3">
                <div className="col-md-6 col-12">
                  <input
                    type="text"
                    className="form-control"
                    name="jobTitle"
                    value={jobListing.jobTitle}
                    onChange={handleJobListingChange}
                    placeholder="Job Title"
                  />
                </div>
                <div className="col-md-6 col-12">
                  <select
                    className="form-control"
                    name="positionType"
                    value={jobListing.positionType}
                    onChange={handleJobListingChange}
                  >
                    <option value="">Select Position Type</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 col-12">
                  <input
                    type="text"
                    className="form-control"
                    name="jobLocation"
                    value={jobListing.jobLocation}
                    onChange={handleJobListingChange}
                    placeholder="Job Location"
                  />
                </div>
                <div className="col-md-6 col-12">
                  <input
                    type="text"
                    className="form-control"
                    name="jobDescription"
                    value={jobListing.jobDescription}
                    onChange={handleJobListingChange}
                    placeholder="Job Description"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 col-12">
                  <textarea
                    className="form-control"
                    name="qualifications"
                    value={jobListing.qualifications}
                    onChange={handleJobListingChange}
                    placeholder="Required Qualifications and Certifications"
                  />
                </div>
                <div className="col-md-6 col-12">
                  <select
                    className="form-control"
                    name="experienceLevel"
                    value={jobListing.experienceLevel}
                    onChange={handleJobListingChange}
                  >
                    <option value="">Select Experience Level</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid-Level">Mid-Level</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 col-12">
                  <input
                    type="number"
                    className="form-control"
                    name="positionsAvailable"
                    value={jobListing.positionsAvailable}
                    onChange={handleJobListingChange}
                    placeholder="Number of Positions Available"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <h6>Application deadline</h6>
                <div className="col">
                  <input
                    type="date"
                    className="form-control"
                    name="applicationDeadline"
                    value={jobListing.applicationDeadline}
                    onChange={handleJobListingChange}
                    placeholder="Application Deadline (e.g., YYYY-MM-DD)"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <textarea
                    className="form-control"
                    name="responsibilities"
                    value={jobListing.responsibilities}
                    onChange={handleJobListingChange}
                    placeholder="Key Responsibilities"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <textarea
                    className="form-control"
                    name="requiredSkills"
                    value={jobListing.requiredSkills}
                    onChange={handleJobListingChange}
                    placeholder="Skills Required"
                  />
                </div>
              </div>
            </div>
            <div className="section">
              <h2>Salary and Benefits</h2>
              <div className="row mb-3">
                <div className="col-md-6 col-12">
                  <input
                    type="number"
                    className="form-control"
                    name="salaryRange"
                    value={salaryBenefits.salaryRange}
                    onChange={handleSalaryBenefitsChange}
                    placeholder="Salary Range"
                  />
                </div>
                <div className="col-md-6 col-12">
                  <textarea
                    className="form-control"
                    name="perks"
                    value={salaryBenefits.perks}
                    onChange={handleSalaryBenefitsChange}
                    placeholder="Any Perks"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 col-12">
                  <input
                    type="number"
                    className="form-control"
                    name="officeDays"
                    value={salaryBenefits.officeDays}
                    onChange={handleSalaryBenefitsChange}
                    placeholder="Office Days"
                  />
                </div>
                {/* Add more rows for additional salary and benefits inputs */}
              </div>
            </div>
            <div className="section">
              <h2>Other Information</h2>
              <div className="row mb-3">
                <div className="col">
                  <textarea
                    className="form-control"
                    value={otherInfo}
                    onChange={handleOtherInfoChange}
                    placeholder="Other Information"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Post Job
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default JobPostModal;
