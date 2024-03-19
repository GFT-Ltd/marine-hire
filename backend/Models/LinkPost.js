const mongoose = require("mongoose");

const linkPostSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  applicationDeadline: { type: Date, required: true },
  link: { type: String, required: true },
  postedDate: { type: Date },
  postedBy: { type: String, required: true },
});

module.exports = mongoose.model("LinkPost", linkPostSchema);
