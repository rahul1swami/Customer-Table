import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CustomerForm from "../src/view/CustomerForm/CustomerForm";
import CustomerDetails from "../src/view/CustomerDetails/CustomerDetails";
import IndividualCustomer from "../src/view/IndividualCustomer/IndividualCustomer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={CustomerForm} />
          <Route exact path="/customer-details" component={CustomerDetails} />
          <Route
            exact
            path="/individual-customer/:id"
            component={IndividualCustomer}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
