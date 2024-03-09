// models/JobListing.js
const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  industrySector: { type: String },
  companyDescription: { type: String },
  companyWebsite: { type: String },
  contactEmail: { type: String },
  companyAddress: { type: String },
  city: { type: String },
  pincode: { type: String },
  country: { type: String },
  jobTitle: { type: String, required: true },
  positionType: { type: String, required: true },
  jobLocation: { type: String, required: true },
  jobDescription: { type: String, required: true },
  qualifications: { type: String },
  experienceLevel: { type: String },
  positionsAvailable: { type: Number, required: true },
  applicationDeadline: { type: Date, required: true },
  responsibilities: { type: String },
  requiredSkills: { type: String },
  salaryBenefits: {
    salaryRange: { type: String },
    perks: { type: String },
    officeDays: { type: Number }
  },
  otherInfo: { type: String }
});

module.exports = mongoose.model('JobListing', jobListingSchema);
