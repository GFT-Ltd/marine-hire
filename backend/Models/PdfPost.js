const mongoose = require("mongoose");

const pdfPostSchema = new mongoose.Schema({
  pdfFile: Buffer, // Change the data type to Buffer
  jobTitle: String,
  deadline: Date,
  jobLocation: String,
  postedDate: { type: Date },
  postedBy: { type: String, required: true },
});

const PdfPost = mongoose.model("PdfPost", pdfPostSchema);

module.exports = PdfPost;
