import React from "react";
import "../../assets/css/CustomerForm.css";
import Axios from "axios";
import { Container, Form, Card, Button, Col, Row } from "react-bootstrap";

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editData: [],
      fname: "",
      lname: "",
      dateOfBirth: "",
      status: "",
      bio: "",
      selectedOccupation: "",
      profilePicture: null,
      fnameError: "",
      lnameError: "",
      selectedOccupationError: "",
      statusError: "",
      dateOfBirthError: "",
      bioError: "",
      profilePictureError: "",
      editButton: false,
    };
  }
  onChangeFieldsHandlerCustomer = (e) => {
    if (e.target.id === "fname") {
      let fname = this.state.fnameError;
      fname = "";
      this.setState({
        fname: e.target.value.replace(/ +/g, " "),
        fnameError: fname,
      });
    } else if (e.target.id === "lname") {
      let lname = this.state.lnameError;
      lname = "";
      this.setState({
        lname: e.target.value.replace(/ +/g, " "),
        lnameError: lname,
      });
    } else if (e.target.id === "occupation") {
      let selectOccupation = this.state.selectedOccupationError;
      selectOccupation = "";
      this.setState({
        selectedOccupation: e.target.value,
        selectedOccupationError: selectOccupation,
      });
    } else if (e.target.id === "birthday") {
      let dateOfBirth = this.state.dateOfBirthError;
      dateOfBirth = "";
      this.setState({
        dateOfBirth: e.target.value,
        dateOfBirthError: dateOfBirth,
      });
    } else if (e.target.id === "bio") {
      let biodata = this.state.dateOfBirthError;
      biodata = "";
      this.setState({
        bio: e.target.value,
        bioError: biodata,
      });
    }
  };
  onChangeProfileImage = async (e) => {
    console.log(e);
    let inputFile = e.target.files[0];
    let data = new FormData();
    data.append("inputFile", inputFile);
    this.setState({
      profilePicture: e.target.files[0],
      profilePictureError: "",
    });
  };

  submitForm = () => {
    let isValid = true;
    if (this.state.fname === "") {
      isValid = false;
      this.setState({ fnameError: "Enter first name" });
    }
    if (this.state.lname === "") {
      isValid = false;
      this.setState({ lnameError: "Enter last name" });
    }
    if (this.state.selectedOccupation === "") {
      isValid = false;
      this.setState({ selectedOccupationError: "Select occupation" });
    }
    if (this.state.status === "") {
      isValid = false;
      this.setState({ statusError: "Select status" });
    }
    if (this.state.dateOfBirth === "") {
      isValid = false;
      this.setState({ dateOfBirthError: "Select date of birth" });
    }
    if (this.state.bio === "") {
      isValid = false;
      this.setState({ bioError: "Enter a bio" });
    }
    if (
      this.state.profilePicture === "" ||
      this.state.profilePicture === null
    ) {
      console.log(this.state.profilePicture);
      isValid = false;
      this.setState({ profilePictureError: "Select profile picture" });
    }
    if (isValid) {
      let data = new FormData();
      data.append("fname", this.state.fname);
      data.append("lname", this.state.lname);
      data.append("occupation", this.state.selectedOccupation);
      data.append("dob", this.state.dateOfBirth);
      data.append("status", this.state.status);
      data.append("bio", this.state.bio);
      data.append("profilePicture", this.state.profilePicture);

      Axios.post("http://localhost:8000/insertcustomer", data).then(
        (response) => {
          if (response.status === 200) {
            alert("successfully added user");
            this.setState({
              fname: "",
              lname: "",
              dateOfBirth: "",
              status: "",
              bio: "",
              selectedOccupation: "",
              profilePicture: null,
              fnameError: "",
              lnameError: "",
              selectedOccupationError: "",
              statusError: "",
              dateOfBirthError: "",
              bioError: "",
              profilePictureError: "",
            });
            document.getElementById("myfile").value = "";
            this.props.history.push("/customer-details");
          }
        }
      );
    }
  };
  updateForm = () => {
    let id = sessionStorage.edit_id;
    let data = new FormData();
    data.append("id", id);
    data.append("fname", this.state.fname);
    data.append("lname", this.state.lname);
    data.append("occupation", this.state.selectedOccupation);
    data.append("dob", this.state.dateOfBirth);
    data.append("status", this.state.status);
    data.append("bio", this.state.bio);
    data.append("profilePicture", this.state.profilePicture);
    Axios.put("http://localhost:8000/update", data).then((response) => {
      if (response.status === 200) {
        alert("Updated User");
        this.setState({
          fname: "",
          lname: "",
          dateOfBirth: "",
          status: "",
          bio: "",
          selectedOccupation: "",
          profilePicture: null,
          fnameError: "",
          lnameError: "",
          selectedOccupationError: "",
          statusError: "",
          dateOfBirthError: "",
          bioError: "",
          profilePictureError: "",
          editButton: false,
        });
        document.getElementById("myfile").value = "";
        sessionStorage.clear();
        this.props.history.push("/customer-details");
      }
    });
  };
  componentDidMount() {
    if (sessionStorage.edit_id) {
      this.setState({
        editButton: true,
      });
      this.editForm(sessionStorage.edit_id);
    }
  }
  editForm = (id) => {
    Axios.get(`http://localhost:8000/individualCustomerdetails/${id}`).then(
      (response) => {
        if (response.status === 200) {
          let editData = response?.data;
          this.setState({
            fname: editData.fname,
            lname: editData.lname,
            selectedOccupation: editData.occupation,
            dateOfBirth: editData.dob,
            status: editData.status,
            bio: editData.bio,
            profilePicture: editData.profilePicture,
          });
        }
      }
    );
  };

  render() {
    return (
      <div className="customerForm-main">
        <Container fluid="md">
          <Card style={{ textAlign: "left" }}>
            <Card.Header className="headerName">Customer Form</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    First Name
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      id="fname"
                      type="text"
                      placeholder="First Name"
                      onChange={this.onChangeFieldsHandlerCustomer}
                      value={this.state.fname}
                    />
                    <Form.Text className="errorMessage">
                      {this.state.fnameError}
                    </Form.Text>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Last Name
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      id="lname"
                      type="text"
                      placeholder="Last Name"
                      onChange={this.onChangeFieldsHandlerCustomer}
                      value={this.state.lname}
                    />
                    <Form.Text className="errorMessage">
                      {this.state.lnameError}
                    </Form.Text>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Occupation
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      id="occupation"
                      as="select"
                      onChange={this.onChangeFieldsHandlerCustomer}
                      value={this.state.selectedOccupation}
                    >
                      <option value="">Select Occupation</option>
                      <option value="Business">Business</option>
                      <option value="Employed">Employed</option>
                      <option value="Student">Student</option>
                    </Form.Control>
                    <Form.Text className="errorMessage">
                      {this.state.selectedOccupationError}
                    </Form.Text>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Date of Birth
                  </Form.Label>
                  <Col sm="10">
                    <input
                      type="date"
                      id="birthday"
                      name="birthday"
                      value={this.state.dateOfBirth}
                      onChange={this.onChangeFieldsHandlerCustomer}
                    ></input>
                    <Form.Text className="errorMessage">
                      {this.state.dateOfBirthError}
                    </Form.Text>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Status
                  </Form.Label>
                  <Col sm="10">
                    <Form.Check
                      inline
                      type="radio"
                      label="Active"
                      id="active"
                      checked={this.state.status === "Active"}
                      value={this.state.status}
                      onChange={() =>
                        this.setState({ status: "Active", statusError: "" })
                      }
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Inactive"
                      checked={this.state.status === "Inactive"}
                      value={this.state.status}
                      onChange={() =>
                        this.setState({ status: "Inactive", statusError: "" })
                      }
                    />

                    <Form.Text className="errorMessage">
                      {this.state.statusError}
                    </Form.Text>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Bio
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      as="textarea"
                      placeholder="Bio"
                      style={{ height: "100px" }}
                      id="bio"
                      value={this.state.bio}
                      onChange={this.onChangeFieldsHandlerCustomer}
                    />
                    <Form.Text className="errorMessage">
                      {this.state.bioError}
                    </Form.Text>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Profile Picture
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="file"
                      id="myfile"
                      name="myfile"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={(e) => this.onChangeProfileImage(e)}
                    />
                    <Form.Text className="errorMessage">
                      {this.state.profilePictureError}
                    </Form.Text>
                  </Col>
                </Form.Group>

                {!this.state.editButton ? (
                  <Button
                    id="submit-btn"
                    variant="primary"
                    type="button"
                    onClick={this.submitForm}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    id="submit-btn"
                    variant="primary"
                    type="button"
                    onClick={this.updateForm}
                  >
                    Update Customer
                  </Button>
                )}
                <Button
                  id="customerDetails-btn"
                  variant="primary"
                  type="button"
                  onClick={() => this.props.history.push("/customer-details")}
                >
                  Customer Details
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
export default CustomerForm;
