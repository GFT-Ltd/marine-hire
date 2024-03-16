// import React, { useCallback, useState } from "react";
// import NavbarCompany from "../NavbarCompany/NavbarCompany";
// import { useDropzone } from "react-dropzone";
// import { getDocument } from "pdfjs-dist/build/pdf"; // Corrected import

// function PdfUpload() {
//   const [pdfText, setPdfText] = useState("");

//   const onDrop = useCallback((acceptedFiles) => {
//     const file = acceptedFiles[0];
//     const reader = new FileReader();

//     reader.onload = async () => {
//       const arrayBuffer = reader.result;
//       const pdfData = new Uint8Array(arrayBuffer);

//       try {
//         const pdf = await getDocument(pdfData).promise; // Updated usage
//         let text = "";

//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const content = await page.getTextContent();
//           text += content.items.map((item) => item.str).join(" ");
//         }

//         setPdfText(text);
//       } catch (error) {
//         console.error("Error parsing PDF:", error);
//         setPdfText("Error parsing PDF");
//       }
//     };

//     reader.readAsArrayBuffer(file);
//   }, []);

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   return (
//     <div>
//       <NavbarCompany />
//       <div {...getRootProps()} style={dropzoneStyles}>
//         <input {...getInputProps()} />
//         <p>Drag 'n' drop a PDF file here, or click to select a file</p>
//       </div>
//       {pdfText && (
//         <div>
//           <h2>Extracted Data:</h2>
//           <pre>{pdfText}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

// const dropzoneStyles = {
//   border: "2px dashed #ccc",
//   borderRadius: "4px",
//   padding: "20px",
//   textAlign: "center",
//   margin: "20px auto",
//   maxWidth: "400px",
// };

// export default PdfUpload;

import React, { useState } from "react";
import NavbarCompany from "../NavbarCompany/NavbarCompany";

function PdfUpload() {
  const [pdfText, setPdfText] = useState("");
  const [error, setError] = useState("");

  const handleFileUpload = async (file) => {
    try {
      const reader = new FileReader();

      reader.onload = async () => {
        const base64Data = reader.result.split(",")[1];

        try {
          const response = await fetch("http://localhost:5000/parse-pdf", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ pdfData: base64Data }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          setPdfText(data.extractedData);
          setError("");
        } catch (error) {
          console.error("Error uploading PDF:", error);
          setError("Error uploading PDF. Please try again later.");
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error reading the file:", error);
      setError("Error reading the file. Please try again.");
    }
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    handleFileUpload(file);
  };

  return (
    <div>
      <NavbarCompany />
      <div style={dropzoneStyles}>
        <input type="file" onChange={handleInputChange} />
        <p>Drag 'n' drop a PDF file here, or click to select a file</p>
      </div>
      {pdfText && (
        <div>
          <h2>Extracted Data:</h2>
          <pre>{pdfText}</pre>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

const dropzoneStyles = {
  border: "2px dashed #ccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  margin: "20px auto",
  maxWidth: "400px",
};

export default PdfUpload;
