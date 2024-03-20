import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarCompany from "../../NavbarCompany/NavbarCompany";
import "./PdfDetailsPage.css";
import { FaDownload } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PdfEditModal from "./PdfEditModal/PdfEditModal";

function PdfDetailsPage() {
  const { id } = useParams();
  const [pdfDetails, setPdfDetails] = useState(null);
  const [showPdfEditModal, setShowPdfEditModal] = useState(false);
  const navigate = useNavigate();

  const fetchPdfDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/upload-pdf/${id}`
      );
      const data = await response.json();
      setPdfDetails(data);
    } catch (error) {
      console.error("Error fetching PDF details:", error);
    }
  };

  useEffect(() => {
    fetchPdfDetails();
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && showPdfEditModal) {
        togglePdfEditModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showPdfEditModal]);

  if (!pdfDetails) {
    return <div>Loading...</div>;
  }

  const downloadPdf = () => {
    const pdfData = pdfDetails[0].pdfFile;
    const blob = new Blob([Uint8Array.from(pdfData.data)], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${pdfDetails[0].jobTitle}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const date = new Date(pdfDetails[0].deadline);
  const formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })} ${date.getFullYear()}`;

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this PDF post?"
    );

    if (confirmation) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/upload-pdf/${id}`,
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
          // Redirect to a different page after successful deletion
          navigate("/jobs-posted");
        } else {
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
        console.error("Error deleting PDF:", error);
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

  const togglePdfEditModal = () => {
    setShowPdfEditModal(!showPdfEditModal);
  };

  const handleUpdatePdfDetails = async (updatedDetails) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/upload-pdf/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedDetails),
        }
      );

      if (response.ok) {
        toast.success("PDF details updated successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // Refetch the updated PDF details
        fetchPdfDetails();
      } else {
        toast.error("Failed to update PDF details. Please try again later.", {
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
      console.error("Error updating PDF details:", error);
      toast.error("Failed to update PDF details. Please try again later.", {
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
      <div className="pdf-details-section">
        <div className="alert details-container" role="alert">
          <div className="row">
            <div className="col-12 visible-pdf-section">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12 detail-field">
                  <br />
                  <strong>Title - </strong>
                  {pdfDetails[0].jobTitle}
                </div>
                <div className="col-lg-6 col-md-6 col-12 detail-field">
                  <br />
                  <strong>Job location - </strong>
                  {pdfDetails[0].jobLocation}
                </div>
                <div className="col-lg-6 col-md-6 col-12 detail-field">
                  <br />
                  <strong>Deadline - </strong>
                  {formattedDate}
                </div>
                <div className="col-lg-6 col-md-6 col-12 detail-field">
                  <br />
                  <div className=" download-button-div">
                    <strong>Download PDF - </strong>
                    <div className="download-button" onClick={downloadPdf}>
                      <FaDownload />
                    </div>
                  </div>
                </div>
              </div>
              <br />
            </div>
            <div className="col-12">
              <button className="delete-button-4" onClick={handleDelete}>
                Delete
              </button>
              <button className="delete-button-4" onClick={togglePdfEditModal}>
                Edit Details
              </button>
            </div>
          </div>
        </div>
      </div>
      {showPdfEditModal && (
        <PdfEditModal
          pdfDetails={pdfDetails[0]}
          onCancel={togglePdfEditModal}
          onUpdate={handleUpdatePdfDetails}
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

export default PdfDetailsPage;
