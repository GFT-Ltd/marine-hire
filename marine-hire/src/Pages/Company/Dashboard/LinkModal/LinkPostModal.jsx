import React, { useState } from "react";
import "./LinkPostModal.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LinkPostModal({ modalTwoOpen, closeModalTwo }) {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    applicationDeadline: "",
    link: "",
  });

  const handleSubmit = async () => {
    // Show confirmation dialog
    const confirmed = window.confirm("Are you sure you want to submit?");

    // Check if user confirmed
    if (confirmed) {
      try {
        const response = await fetch("http://localhost:5000/api/linkposts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to post link");
        }

        setFormData({
          jobTitle: "",
          companyName: "",
          applicationDeadline: "",
          link: "",
        });

        toast.success("Link posted successfully", {
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
        console.error("Error posting link:", error);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const modalDisplay = modalTwoOpen ? "block" : "none";

  return (
    <div className="modal" style={{ display: modalDisplay }}>
      <div className="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Enter link details</h1>
            <button
              type="button"
              className="btn-close"
              onClick={closeModalTwo}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Job Title"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Company Name"
                />
              </div>
              <div className="mb-3">
                <input
                  type="date"
                  className="form-control"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  placeholder="Application Deadline"
                />
              </div>
              <div className="mb-3">
                <input
                  type="url"
                  className="form-control"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="Link"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModalTwo}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Post Link
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

export default LinkPostModal;
