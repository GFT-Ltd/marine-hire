import React, { useState, useEffect } from "react";
import NavbarCompany from "../NavbarCompany/NavbarCompany";
import "./CompanyDashboard.css";
import Footer from "../../../Components/Footer/Footer";
import JobPostModal from "./JobModal/JobPostModal";
import image1 from "../../../Assets/job-image-1.png";
import image2 from "../../../Assets/job-image-2.png";
import LinkPostModal from "./LinkModal/LinkPostModal";

function CompanyDashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTwoOpen, setModalTwoOpen] = useState(false);
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
        <div className="job-post-section" id="second-section">
          <div className="row">
            <div className="col-lg-7 col-md-6 col-12 text-section">
              <div>
                Already have a specific application form or link for job
                seekers? Great! Simply click the button to share your custom
                application link. This way, applicants can seamlessly connect
                with your unique hiring process while enjoying the exposure on
                our Maritime Job Portal.
              </div>
              <button className="button-4" onClick={openModalTwo}>
                Provide the Link
              </button>
            </div>
            <div className="col-lg-5 col-md-6 col-12 button-section">
              <img className="job-image-2" src={image2} alt="image-1" />
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
    </div>
  );
}

export default CompanyDashboard;
