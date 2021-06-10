const mongoose = require("mongoose");

const CustomerDataSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  bio: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
});

const CustomerData = mongoose.model("customerData", CustomerDataSchema);

module.exports = CustomerData;
