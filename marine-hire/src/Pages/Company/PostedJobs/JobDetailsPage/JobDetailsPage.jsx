import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./JobDetailsPage.css";
import NavbarCompany from "../../NavbarCompany/NavbarCompany";
import JobEditModal from "./JobEditModal/JobEditModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/joblistings/${id}`
        );
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && showEditModal) {
        toggleEditModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showEditModal]);

  if (!job) {
    return <div>Loading...</div>;
  }

  const date = new Date(job.applicationDeadline);
  const formattedDeadlineDate = `${date.getDate()} ${date.toLocaleString(
    "default",
    {
      month: "long",
    }
  )} ${date.getFullYear()}`;

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/joblistings/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          toast.success("Deleted successfully", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate("/jobs-posted");
        } else {
          console.error("Failed to delete job:", response.statusText);
          toast.error("Failed to delete job. Please try again later.", {
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
      } catch (error) {
        console.error("Failed to delete job:", error);
        toast.error("Failed to delete job. Please try again later.", {
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
    }
  };

  const toggleEditModal = () => {
    console.log(showEditModal);
    setShowEditModal(!showEditModal);
  };

  const handleSave = async (updatedJob) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/joblistings/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedJob),
        }
      );
      if (response.ok) {
        setJob(updatedJob);
        toggleEditModal();
        toast.success("Job updated successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        console.error("Failed to update job:", response.statusText);
        toast.error("Failed to update job. Please try again later.", {
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
    } catch (error) {
      console.error("Failed to update job:", error);
      toast.error("Failed to update job. Please try again later.", {
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
  };

  return (
    <div className="job-details-page">
      <NavbarCompany />
      <div className="details-content-section">
        <div
          className={`alert details-container details-card ${
            showDetails ? "show-details" : ""
          }`}
          role="alert"
        >
          <div className="row">
            <div className="col-12 visible-section">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12  detail-field">
                  <br />
                  <strong>Title - </strong>
                  {job.jobTitle}
                </div>
                <div className="col-lg-6 col-md-6 col-12 detail-field">
                  <br />
                  <strong>Position - </strong>
                  {job.positionType}
                </div>
                <div className="col-lg-6 col-md-6 col-12 detail-field">
                  <br />
                  <strong>Location - </strong>
                  {job.jobLocation}
                </div>
                <div className="col-lg-6 col-md-6 col-12 detail-field">
                  <br />
                  <strong>Deadline - </strong>
                  {formattedDeadlineDate}
                </div>
                <div className="col-lg-6 col-md-6 col-12 detail-field">
                  <br />
                  <strong>Experience - </strong>
                  {job.experienceLevel}
                </div>
                <div className="col-lg-6 col-md-6 col-12 detail-field">
                  <br />
                  <strong>Positions available - </strong>
                  {job.positionsAvailable}
                </div>
              </div>
              <br />
            </div>
            <div className="col-12 hidden-section">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12 hidden-detail-field hidden-first-row">
                  <br />
                  <strong>Company name - </strong>
                  {job.companyName}
                </div>
                <div className="col-lg-6 col-md-6 col-12  hidden-detail-field hidden-first-row">
                  <br />
                  <strong>Industry sector - </strong>
                  {job.industrySector}
                </div>
                <div className="col-lg-6 col-md-6 col-12  hidden-detail-field">
                  <br />
                  <strong>City - </strong>
                  {job.city}
                </div>
                <div className="col-lg-6 col-md-6 col-12  hidden-detail-field">
                  <br />
                  <strong>Company Description - </strong>
                  {job.companyDescription}
                </div>
                <div className="col-lg-6 col-md-6 col-12  hidden-detail-field">
                  <br />
                  <strong>Company Website - </strong>
                  {job.companyWebsite}
                </div>
                <div className="col-lg-6 col-md-6 col-12 hidden-detail-field">
                  <br />
                  <strong>Company email - </strong>
                  {job.contactEmail}
                </div>
                <div className="col-lg-6 col-md-6 col-12  hidden-detail-field">
                  <br />
                  <strong>Pincode - </strong>
                  {job.pincode}
                </div>
                <div className="col-lg-6 col-md-6 col-12  hidden-detail-field">
                  <br />
                  <strong>Address - </strong>
                  {job.companyAddress}
                </div>
                <div className="col-lg-6 col-md-6 col-12  hidden-detail-field">
                  <br />
                  <strong>Country - </strong>
                  {job.country}
                </div>
                <div className="col-lg-6 col-md-6 col-12 hidden-detail-field">
                  <br />
                  <strong>Job Description - </strong>
                  {job.jobDescription}
                </div>
                <div className="col-lg-6 col-md-6 col-12  hidden-detail-field">
                  <br />
                  <strong>Qualifications - </strong>
                  {job.qualifications}
                </div>
                <div className="col-lg-6 col-md-6 col-12  hidden-detail-field">
                  <br />
                  <strong>Responsibilities - </strong>
                  {job.responsibilities}
                </div>
                <div className="col-lg-6 col-md-6 col-12  hidden-detail-field">
                  <br />
                  <strong>Skills required - </strong>
                  {job.requiredSkills}
                </div>
                <div className="col-lg-6 col-md-6 col-12  hidden-detail-field">
                  <br />
                  <strong>Salary (₹) - </strong>
                  {job.salaryRange}
                </div>
                <div className="col-lg-6 col-md-6 col-12 hidden-detail-field">
                  <br />
                  <strong>Perks - </strong>
                  {job.perks}
                </div>
                <div className="col-lg-6 col-md-6 col-12  hidden-detail-field">
                  <br />
                  <strong>Office days - </strong>
                  {job.officeDays}
                </div>
                <div className="col-lg-6 col-md-6 col-12  hidden-detail-field">
                  <br />
                  <strong>Other info. - </strong>
                  {job.otherInfo}
                </div>
              </div>
              <br />
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-12 hidden-detail-field">
                  <button className="delete-button-4" onClick={handleDelete}>
                    Delete
                  </button>
                  <button className="delete-button-4" onClick={toggleEditModal}>
                    Edit Details
                  </button>
                </div>
                <div className="col-12 d-flex ms-auto flex-row-reverse">
                  <div className="btn-conteiner" onClick={toggleDetails}>
                    <p className="btn-content">
                      <span className="icon-arrow">
                        <svg
                          version="1.1"
                          viewBox="0 0 66 43"
                          height="30px"
                          width="30px"
                        >
                          <g
                            fill-rule="evenodd"
                            fill="none"
                            stroke-width="1"
                            stroke="none"
                            id="arrow"
                          >
                            <path
                              fill="#9ee5fa"
                              d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                              id="arrow-icon-one"
                            ></path>
                            <path
                              fill="#9ee5fa"
                              d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                              id="arrow-icon-two"
                            ></path>
                            <path
                              fill="#9ee5fa"
                              d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                              id="arrow-icon-three"
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showEditModal && (
          <JobEditModal
            job={job}
            onSave={handleSave}
            onCancel={toggleEditModal}
          />
        )}
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

export default JobDetailsPage;
