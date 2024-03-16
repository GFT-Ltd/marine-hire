import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarCompany from "../../NavbarCompany/NavbarCompany";
import "./JobLinkDetailsPage.css";
import JobLinkEditModal from "./JobLinkEditModal/JobLinkEditModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function JobLinkDetailsPage() {
  const { id } = useParams();
  const [linkPost, setLinkPost] = useState(null);
  const [showLinkEditModal, setShowLinkEditModal] = useState(false);
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && showLinkEditModal) {
        toggleLinkEditModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showLinkEditModal]);

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
          // Redirect to link posts page after successful deletion
          navigate("/jobs-posted");
        } else {
          console.error("Error deleting link post:", response.statusText);
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
        console.error("Error deleting link post:", error);
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

  const toggleLinkEditModal = () => {
    console.log(showLinkEditModal);
    setShowLinkEditModal(!showLinkEditModal);
  };

  const handleUpdateLinkPost = async (updatedLinkPost) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/linkposts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedLinkPost),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setLinkPost(data);
        toggleLinkEditModal();
        toast.success("Updated successfully", {
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
        console.error("Error updating link post:", response.statusText);
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
      console.error("Error updating link post:", error);
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
    <div className="job-link-details-page">
      <NavbarCompany />
      <div className="link-details-section">
        <div className="alert details-container" role="alert">
          <div className="row">
            <div className="col-12 visible-link-section">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12 detail-field">
                  <br />
                  <strong>Title - </strong>
                  {linkPost.jobTitle}
                </div>
                <div className="col-lg-6 col-md-6 col-12 detail-field">
                  <br />
                  <strong>Company name - </strong>
                  {linkPost.companyName}
                </div>
                <div className="col-lg-6 col-md-6 col-12 detail-field">
                  <br />
                  <strong>Deadline - </strong>
                  {formattedDate}
                </div>
                <div className="col-lg-6 col-md-6 col-12 detail-field">
                  <br />
                  <strong>URL - </strong>
                  {linkPost.link}
                </div>
              </div>
              <br />
            </div>
            <div className="col-12">
              <button className="delete-button-4" onClick={handleDelete}>
                Delete
              </button>
              <button className="delete-button-4" onClick={toggleLinkEditModal}>
                Edit Details
              </button>
            </div>
          </div>
        </div>
      </div>
      {showLinkEditModal && (
        <JobLinkEditModal
          linkPost={linkPost}
          onCancel={toggleLinkEditModal}
          onUpdate={handleUpdateLinkPost}
        />
      )}
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

export default JobLinkDetailsPage;
