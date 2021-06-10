const express = require("express");
const mongoose = require("mongoose");
const app = express();
const CustomerDataModel = require("./models/CustomerData");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(express.json());
app.use(cors());
// app.use(express.static("images"));
app.use(fileUpload());

mongoose.connect("mongodb://localhost:27017/Customer", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.post("/insertcustomer", async (req, res) => {
  const uploadProfilePicture = req.files.profilePicture;

  uploadProfilePicture.mv(
    "images/profileImage/" + uploadProfilePicture.name,
    function (err) {
      if (err) {
        res.json({ status: "file not found" });
      }
    }
  );
  const fname = req.body.fname;
  const lname = req.body.lname;
  const occupation = req.body.occupation;
  const dob = req.body.dob;
  const bio = req.body.bio;
  const profilePicture = uploadProfilePicture.name;
  const status = req.body.status;
  const data = new CustomerDataModel({
    fname: fname,
    lname: lname,
    occupation: occupation,
    dob: dob,
    status: status,
    bio: bio,
    profilePicture: profilePicture,
  });
  try {
    await data.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
});

app.put("/update", async (req, res) => {
  const id = req.body.id;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const occupation = req.body.occupation;
  const dob = req.body.dob;
  const bio = req.body.bio;

  const status = req.body.status;

  if (req.files) {
    const uploadProfilePicture = req.files.profilePicture;
    uploadProfilePicture.mv(
      "images/profileImage/" + uploadProfilePicture.name,
      function (err) {
        if (err) {
          res.json({ status: "file not found" });
        }
      }
    );
    const profilePicture = uploadProfilePicture.name;
    const data = new CustomerDataModel({
      fname: fname,
      lname: lname,
      occupation: occupation,
      dob: dob,
      status: status,
      bio: bio,
      profilePicture: profilePicture,
    });

    try {
      await CustomerDataModel.findById(id, (err, updatedCustomer) => {
        updatedCustomer.fname = fname;
        updatedCustomer.lname = lname;
        updatedCustomer.occupation = occupation;
        updatedCustomer.dob = dob;
        updatedCustomer.bio = bio;
        updatedCustomer.profilePicture = profilePicture;
        updatedCustomer.status = status;
        updatedCustomer.profilePicture = profilePicture;
        updatedCustomer.save();
        res.send("updated");
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    const data = new CustomerDataModel({
      fname: fname,
      lname: lname,
      occupation: occupation,
      dob: dob,
      status: status,
      bio: bio,
    });
    try {
      await CustomerDataModel.findById(id, (err, updatedCustomer) => {
        updatedCustomer.fname = fname;
        updatedCustomer.lname = lname;
        updatedCustomer.occupation = occupation;
        updatedCustomer.dob = dob;
        updatedCustomer.bio = bio;
        updatedCustomer.status = status;
        updatedCustomer.save();
        res.send("updated");
      });
    } catch (err) {
      console.log(err);
    }
  }
});

app.get("/customerdetails", async (req, res) => {
  CustomerDataModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.get("/individualCustomerdetails/:id", async (req, res) => {
  const id = req.params.id;
  CustomerDataModel.findById(id, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await CustomerDataModel?.findByIdAndRemove(id)?.exec();
    res.send("deleted");
  } catch (err) {
    console.log(err);
  }
});

app.listen(8000, () => {
  console.log("server running");
});
