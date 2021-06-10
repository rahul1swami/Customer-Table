import React from "react";
import "../../assets/css/CustomerDetails.css";
import { Table, Container, Button, Card } from "react-bootstrap";
import Axios from "axios";

class CustomerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CustomerDetails: [],
    };
  }
  handleCustomerRemove = (id) => {
    Axios.delete(`http://localhost:8000/delete/${id}`).then((result) => {
      if (result.status === 200) {
        alert("successfully Deleted");
        this.CustomerDetails();
      }
    });
  };
  handleCustomerEdit = (id) => {
    sessionStorage.setItem("edit_id", id);
    this.props.history.push("/");
  };
  componentDidMount() {
    this.CustomerDetails();
  }
  CustomerDetails = () => {
    Axios.get("http://localhost:8000/customerdetails").then((response) => {
      this.setState({ CustomerDetails: response?.data });
    });
    sessionStorage.clear();
  };
  render() {
    return (
      <div className="main-div">
        <Container fluid="md">
          <Card style={{ textAlign: "left" }}>
            <Card.Header className="headerName">Customer Form</Card.Header>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Index</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Status</th>
                  <th>Occupation</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.CustomerDetails.map((customer, index) => (
                  <tr key={index}>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        this.props.history.push(
                          "/individual-customer/" + customer._id
                        )
                      }
                    >
                      {index + 1}
                    </td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        this.props.history.push(
                          "/individual-customer/" + customer._id
                        )
                      }
                    >
                      {customer.fname}
                    </td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        this.props.history.push(
                          "/individual-customer/" + customer._id
                        )
                      }
                    >
                      {customer.lname}
                    </td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        this.props.history.push(
                          "/individual-customer/" + customer._id
                        )
                      }
                    >
                      {customer.status}
                    </td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        this.props.history.push(
                          "/individual-customer/" + customer._id
                        )
                      }
                    >
                      {customer.occupation}
                    </td>
                    <td>
                      <div className="edit-icon">
                        <div>
                          <img
                            style={{ cursor: "pointer" }}
                            alt="edit"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAA1klEQVRIS8WTvRHCMAxGXzagYg8KBmASYBAoYABqKmAHtqBhBEZgAzjdOXdOTv6RTA61Tt77ZMkdE1c3MZ9WwS4EPKaCtggEfgjgPaBKvIIlcAfmUXJV4hHMgDcwlkgHIhmUVbABTsAKeEaSswYXk0Ug8EuIJx3EkkfrkGN4zxLJAnjlVr2mAw0uzBsgZ9kqCa7AWiFUwUszaIbnBD+BpwQp+BaQM1NpM/goBBc81cFY4IbXCJrgpS0y3XXrS3bLSg/NDe5/rN0ii2jA/IvAkrb47eQz+AL6iyUZyr1/fAAAAABJRU5ErkJggg=="
                            onClick={() => {
                              this.handleCustomerEdit(customer._id);
                            }}
                          />
                        </div>
                        <div>
                          <i
                            style={{ cursor: "pointer" }}
                            className="fa fa-trash w3-large"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you wish to delete this Customer?"
                                )
                              )
                                this.handleCustomerRemove(customer._id);
                            }}
                          ></i>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="btn-div-table">
              <Button
                id="customerDetails-btn"
                onClick={() => this.props.history.push("/")}
              >
                Add New Customer
              </Button>
            </div>
          </Card>
        </Container>
      </div>
    );
  }
}
export default CustomerDetails;
