// import React from "react";
// import "./PdfModal.css";

// function PdfModal({ modalThreeOpen, closeModalThree }) {
//   const modalDisplay = modalThreeOpen ? "block" : "none";
//   return (
//     <>
//       <div className="modal" style={{ display: modalDisplay }}>
//         <div className="modal-dialog modal-lg modal-dialog-scrollable modal-fullscreen-md-down">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5">Upload PDF and Enter details</h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 onClick={closeModalThree}
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <div className="upload-pdf-section">
//                 <div className="upload-input-div">
//                   <input className="pdf-input" type="file" />
//                   <p>
//                     Drag 'n' drop a PDF file here, or click to select a file
//                   </p>
//                 </div>
//               </div>
//               <div className="upload-text-section"></div>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-outline-danger"
//                 onClick={closeModalThree}
//               >
//                 Close
//               </button>
//               <button type="button" className="btn btn-outline-primary">
//                 Next
//               </button>
//               {/* <button type="button" className="btn btn-outline-primary">
//                 Post PDF
//               </button> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default PdfModal;

// import React, { useState } from "react";
// import "./PdfModal.css";

// function PdfModal({ modalThreeOpen, closeModalThree }) {
//   const [pdfUploaded, setPdfUploaded] = useState(false);
//   const [jobTitle, setJobTitle] = useState("");
//   const [deadline, setDeadline] = useState("");

//   const modalDisplay = modalThreeOpen ? "block" : "none";

//   const handlePdfUpload = (event) => {
//     // Logic to handle PDF upload
//     setPdfUploaded(true);
//   };

//   const handleJobTitleChange = (event) => {
//     setJobTitle(event.target.value);
//   };

//   const handleDeadlineChange = (event) => {
//     setDeadline(event.target.value);
//   };

//   return (
//     <>
//       <div className="modal" style={{ display: modalDisplay }}>
//         <div className="modal-dialog modal-lg modal-dialog-scrollable modal-fullscreen-md-down">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5">Upload PDF and Enter details</h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 onClick={closeModalThree}
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               {pdfUploaded ? (
//                 <div className="upload-text-section">
//                   <form>
//                     <div className="mb-3">
//                       <label htmlFor="jobTitle" className="form-label">
//                         Job Title
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="jobTitle"
//                         value={jobTitle}
//                         onChange={handleJobTitleChange}
//                         required
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="deadline" className="form-label">
//                         Deadline
//                       </label>
//                       <input
//                         type="date"
//                         className="form-control"
//                         id="deadline"
//                         value={deadline}
//                         onChange={handleDeadlineChange}
//                         required
//                       />
//                     </div>
//                   </form>
//                 </div>
//               ) : (
//                 <div className="upload-pdf-section">
//                   <div className="upload-input-div">
//                     <input
//                       className="pdf-input"
//                       type="file"
//                       onChange={handlePdfUpload}
//                     />
//                     <p>
//                       Drag 'n' drop a PDF file here, or click to select a file
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-outline-danger"
//                 onClick={closeModalThree}
//               >
//                 Close
//               </button>
//               {pdfUploaded ? (
//                 <button type="button" className="btn btn-outline-primary">
//                   Post PDF
//                 </button>
//               ) : (
//                 <button type="button" className="btn btn-outline-primary">
//                   Next
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default PdfModal;

// import React, { useState } from "react";
// import "./PdfModal.css";
// import axios from "axios";
// import { PDFDocument } from "pdf-lib";
// import JSZip from "jszip";

// function PdfModal({ modalThreeOpen, closeModalThree }) {
//   const [pdfUploaded, setPdfUploaded] = useState(false);
//   const [jobTitle, setJobTitle] = useState("");
//   const [deadline, setDeadline] = useState("");
//   const [jobLocation, setJobLocation] = useState("");
//   const [showForm, setShowForm] = useState(false);

//   const modalDisplay = modalThreeOpen ? "block" : "none";

//   const handlePdfUpload = async (event) => {
//     const file = event.target.files[0];
//     const pdfBytes = await file.arrayBuffer();
//     const pdfDoc = await PDFDocument.load(pdfBytes);

//     // Compress the PDF
//     const compressedPdfBytes = await pdfDoc.save();

//     // Create a blob from the compressed PDF
//     const compressedPdfBlob = new Blob([compressedPdfBytes], {
//       type: "application/pdf",
//     });

//     // Create FormData to send with axios
//     const formData = new FormData();
//     formData.append("pdf", compressedPdfBlob);
//     formData.append("jobTitle", jobTitle);
//     formData.append("deadline", deadline);
//     formData.append("jobLocation", jobLocation);

//     try {
//       // Send FormData to backend API
//       await axios.post("http://localhost:5000/api/upload-pdf", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setPdfUploaded(true);
//     } catch (error) {
//       console.error("Error uploading PDF:", error);
//       // Handle error
//     }
//   };

//   const handleJobTitleChange = (event) => {
//     setJobTitle(event.target.value);
//   };

//   const handleDeadlineChange = (event) => {
//     setDeadline(event.target.value);
//   };

//   const handleJobLocationChange = (event) => {
//     setJobLocation(event.target.value);
//   };

//   const handleNext = () => {
//     if (pdfUploaded) {
//       // If PDF is uploaded, show the form
//       setShowForm(true);
//     } else {
//       // Handle next logic when PDF is not uploaded (if needed)
//     }
//   };

//   return (
//     <>
//       <div className="modal" style={{ display: modalDisplay }}>
//         <div className="modal-dialog modal-lg modal-dialog-scrollable modal-fullscreen-md-down">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5">Upload PDF and Enter details</h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 onClick={closeModalThree}
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               {!showForm && (
//                 <div className="upload-pdf-section">
//                   <div className="upload-input-div">
//                     <input
//                       className="pdf-input form-control"
//                       type="file"
//                       name="pdf"
//                       onChange={handlePdfUpload}
//                     />
//                     <p>
//                       Drag 'n' drop a PDF file here, or click to select a file
//                     </p>
//                   </div>
//                 </div>
//               )}
//               {showForm && (
//                 <div className="upload-text-section">
//                   <form onSubmit={handlePdfUpload}>
//                     <div className="mb-3">
//                       <label htmlFor="jobTitle" className="form-label">
//                         Job Title
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="jobTitle"
//                         value={jobTitle}
//                         onChange={handleJobTitleChange}
//                         required
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="deadline" className="form-label">
//                         Application Deadline
//                       </label>
//                       <input
//                         type="date"
//                         className="form-control"
//                         id="deadline"
//                         value={deadline}
//                         onChange={handleDeadlineChange}
//                         required
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="jobLocation" className="form-label">
//                         Job Location
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="jobLocation"
//                         value={jobLocation}
//                         onChange={handleJobLocationChange}
//                         required
//                       />
//                     </div>
//                   </form>
//                 </div>
//               )}
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-outline-danger"
//                 onClick={closeModalThree}
//               >
//                 Close
//               </button>
//               {!showForm && (
//                 <button
//                   type="button"
//                   className="btn btn-outline-primary"
//                   onClick={handleNext}
//                 >
//                   Next
//                 </button>
//               )}
//               {showForm && (
//                 <button type="button" className="btn btn-outline-primary">
//                   Post PDF
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default PdfModal;

import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PdfModal.css";

function PdfModal({ modalThreeOpen, closeModalThree }) {
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [postedDate, setPostedDate] = useState(new Date());

  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  const [postedBy, setPostedBy] = useState(userData?.email);

  const modalDisplay = modalThreeOpen ? "block" : "none";

  const handlePdfUpload = async (event) => {
    const file = event.target.files[0];
    setPdfUploaded(file);
  };

  const handleSubmit = async () => {
    if (!pdfUploaded) {
      console.error("No file selected");
      return;
    }

    // Ask for confirmation
    const isConfirmed = window.confirm("Are you sure you want to submit?");
    if (!isConfirmed) {
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdfUploaded);
    formData.append("jobTitle", jobTitle);
    formData.append("deadline", deadline);
    formData.append("jobLocation", jobLocation);
    formData.append("postedDate", postedDate);
    formData.append("postedBy", postedBy);

    try {
      await axios.post("http://localhost:5000/api/upload-pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // closeModalThree();
      setJobTitle("");
      setDeadline("");
      setJobLocation("");
      setPdfUploaded(false);
      toast.success("PDF posted successfully", {
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
      console.error("Error posting PDF:", error);
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
  };

  const handleNext = () => {
    if (pdfUploaded) {
      // If PDF is uploaded, show the form
      setShowForm(true);
    } else {
      // Handle next logic when PDF is not uploaded (if needed)
    }
  };

  return (
    <div className="modal" style={{ display: modalDisplay }}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable modal-fullscreen-md-down">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Upload PDF and Enter details</h1>
            <button
              type="button"
              className="btn-close"
              onClick={closeModalThree}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {!showForm && (
              <div className="upload-pdf-section">
                <div className="upload-input-div">
                  <input
                    className="pdf-input form-control"
                    type="file"
                    name="pdf"
                    onChange={handlePdfUpload}
                  />
                  <p>
                    Drag 'n' drop a PDF file here, or click to select a file
                  </p>
                </div>
              </div>
            )}
            {showForm && pdfUploaded && (
              <div className="upload-text-section">
                <form>
                  <div className="mb-3">
                    <label htmlFor="jobTitle" className="form-label">
                      Job Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="jobTitle"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="deadline" className="form-label">
                      Application Deadline
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="deadline"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="jobLocation" className="form-label">
                      Job Location
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="jobLocation"
                      value={jobLocation}
                      onChange={(e) => setJobLocation(e.target.value)}
                      required
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={closeModalThree}
            >
              Close
            </button>
            {!showForm && (
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleNext}
              >
                Next
              </button>
            )}
            {showForm && pdfUploaded && (
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
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

export default PdfModal;
