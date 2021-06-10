import React from "react";
import "../../assets/css/IndividualCustomer.css";
import { Container, Table, Button, Card } from "react-bootstrap";
import Axios from "axios";
class IndividualCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CustomerDetails: [],
    };
  }
  componentDidMount() {
    let id = this.props?.match?.params?.id;
    this.CustomerIndividualDetails(id);
  }
  CustomerIndividualDetails = (id) => {
    Axios.get(`http://localhost:8000/individualCustomerdetails/${id}`).then(
      (response) => {
        this.setState({ CustomerDetails: response?.data });
      }
    );
  };
  render() {
    const user = this.state.CustomerDetails;
    const image = user.profilePicture;
    return (
      <div className="user-information">
        <Container fluid="md">
          <Card>
            <Card.Header className="headerName">
              Customer Individual Details
            </Card.Header>
            {!user.profilePicture ? (
              <img
                id="profile-image"
                src="data:image/jpeg;base64,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"
                alt="profile"
              ></img>
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={
                    require(`../../CustomerServer/images/profileImage/${image}`)
                      .default
                  }
                  alt="profile"
                  width="10%"
                  height="10%"
                  style={{ margin: "1em 0" }}
                ></img>
              </div>
            )}

            <Table bordered style={{ overflow: "scroll" }}>
              <tbody>
                <tr>
                  <td> First Name</td>
                  <td id="table-data">{user.fname}</td>
                </tr>
                <tr>
                  <td> Last Name</td>
                  <td id="table-data">{user.lname}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td id="table-data">{user.status}</td>
                </tr>
                <tr>
                  <td>Occupation</td>
                  <td>{user.occupation}</td>
                </tr>
                <tr>
                  <td>Date of Birth</td>
                  <td>{user.dob}</td>
                </tr>
                <tr>
                  <td>Bio</td>
                  <td id="table-data">{user.bio}</td>
                </tr>
              </tbody>
            </Table>
            <div className="btn-div-table">
              <Button
                id="submit-btn"
                onClick={() => this.props.history.push("/customer-details")}
              >
                Customer Details
              </Button>
              <Button
                id="customerDetails-btn"
                onClick={() => this.props.history.push("/")}
              >
                Customer Forms
              </Button>
            </div>
          </Card>
        </Container>
      </div>
    );
  }
}
export default IndividualCustomer;
