import React, { useState, useEffect } from "react";
import NavbarCompany from "../NavbarCompany/NavbarCompany";
import "./CompanyDashboard.css";
import Footer from "../../../Components/Footer/Footer";
import JobPostModal from "./JobModal/JobPostModal";
import image1 from "../../../Assets/job-image-1.png";
import LinkPostModal from "./LinkModal/LinkPostModal";
import { useNavigate } from "react-router-dom";
import PdfModal from "./PdfModal/PdfModal";

function CompanyDashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTwoOpen, setModalTwoOpen] = useState(false);
  const [modalThreeOpen, setModalThreeOpen] = useState(false);
  const [isPageBlurred, setIsPageBlurred] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    setIsPageBlurred(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsPageBlurred(false);
  };

  const openModalTwo = () => {
    setModalTwoOpen(true);
    setIsPageBlurred(true);
  };

  const closeModalTwo = () => {
    setModalTwoOpen(false);
    setIsPageBlurred(false);
  };

  const openModalThree = () => {
    setModalThreeOpen(true);
    setIsPageBlurred(true);
  };

  const closeModalThree = () => {
    setModalThreeOpen(false);
    setIsPageBlurred(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && modalOpen) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && modalTwoOpen) {
        closeModalTwo();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalTwoOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && modalThreeOpen) {
        closeModalThree();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalThreeOpen]);

  const navigate = useNavigate();

  const goToPostedJobsPage = () => {
    navigate("/jobs-posted");
  };

  const goToPdfUpload = () => {
    navigate("/pdf-upload");
  };

  return (
    <div>
      <NavbarCompany />
      <div className={isPageBlurred ? "blur-background" : "company-dashboard"}>
        <div className="job-post-section">
          <div className="row">
            <div className="col-lg-5 col-md-6 col-12 button-section">
              <img className="job-image-1" src={image1} alt="image-1" />
            </div>
            <div className="col-lg-7 col-md-6 col-12 text-section">
              <div>
                To share exciting job opportunities with the maritime community,
                please fill out the form below. Provide comprehensive details
                about your company and the available positions to attract the
                right talent.
              </div>
              <button className="button-4" onClick={openModal}>
                Fill the form
              </button>
            </div>
          </div>
        </div>
        <div className="job-post-section-two" id="second-section">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12 text-section sub-section-one">
              <h3>Link Upload</h3>
              <div>
                If you prefer applicants to submit their details directly
                through your custom application link, click here.
              </div>
              <button className="button-4" onClick={openModalTwo}>
                Provide the Link
              </button>
            </div>
            <div className="col-lg-6 col-md-6 col-12 text-section sub-section-two">
              {/* <img className="job-image-2" src={image2} alt="image-1" /> */}
              <h3>PDF Upload</h3>
              <div>
                If you wish to upload job details in PDF format, please click
                here to proceed with the submission process.
              </div>
              <button
                className="button-4 pdf-upload-button"
                onClick={openModalThree}
              >
                Upload PDF
              </button>
            </div>
          </div>
        </div>
        <div className="job-card-section">
          <div className="card">
            Explore your posted jobs effortlessly.
            <br />
            Click here to view comprehensive details and manage your job
            listings with ease.
            <div className="click-button">
              <button className="button-4" onClick={goToPostedJobsPage}>
                Posted Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <JobPostModal modalOpen={modalOpen} closeModal={closeModal} />
      <LinkPostModal
        modalTwoOpen={modalTwoOpen}
        closeModalTwo={closeModalTwo}
      />
      <PdfModal
        modalThreeOpen={modalThreeOpen}
        closeModalThree={closeModalThree}
      />
    </div>
  );
}

export default CompanyDashboard;
