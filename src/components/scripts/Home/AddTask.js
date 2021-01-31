import React, { Component } from "react";
import axios from "axios";
import Navbar from "../../reusable/Navbar";
import { Select, MenuItem, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import "./style.css";

class AddTask extends Component {
  constructor() {
    super();
    this.state = {
      last_name: "",
      first_name: "",
      email: "",
      states: "",
      city: "",
      pincode: "",
      errors: null,
    };
  }
  _onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleChange = (e) => {
    const { states } = this.state;
    this.setState({
      states: e.target.value,
    });
  };

  submit = async (e) => {
    e.preventDefault();

    const { first_name, last_name, email, states, city, pincode } = this.state;
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regexp.test(email)) {
      this.setState({ errors: "Please Enter Valid Email id" });
    } else if (pincode.length > 6) {
      this.setState({ errors: "Pincode should not be greater than 5" });
    } else {
      await axios
        .get(
          `https://c0ri699qs5.execute-api.us-east-1.amazonaws.com/v1/add?param1=${email}&param2=${first_name}&param3=${last_name}&param4=${pincode}&param5=${city}&param6=${states}`
        )
        .then((res) => {
          if (res) {
            console.log(res);
            alert("Task Added Successfully ");
            this.props.history.push("/");
          } else {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handlecancel = () => {
    this.props.history.push("/");
  };

  onHandleSearch = (e) => {
    let query = e.target.value;

    if (query.length === 0) {
      this.setState({
        finalResult: null,
      });
    }
    this.setState({
      searchQuery: query,
    });

    let filteredArray = this.state.productbyCat.filter((val) => {
      let contentQuery = val.productTitle.toLowerCase();
      let contentQueryprice = val.totalPrice;
      // console.log(contentQueryabc);
      // eslint-disable-next-line eqeqeq
      return contentQuery.indexOf(query) !== -1 || contentQueryprice == query;
    });
    console.log(filteredArray);

    this.setState({
      finalResult: filteredArray,
    });
  };

  render() {
    const { first_name, last_name, email, city, pincode, errors } = this.state;
    return (
      <div>
        <Navbar />
        <br />
        {errors !== null ? <Alert severity="error">{errors}</Alert> : null}
        <form onSubmit={this.submit}>
          <div className="row ml-5">
            <div className="col-md-3 text-color">
              First Name
              <br />
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="first_name"
                value={first_name}
                onChange={this._onHandleChange}
                required
              />
            </div>
            <div className="col-md-3 text-color">
              Last Name <br />
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="last_name"
                value={last_name}
                onChange={this._onHandleChange}
                required
              />
            </div>
            <div className="col-md-3 text-color">
              Email <br />
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="email"
                name="email"
                value={email}
                onChange={this._onHandleChange}
                required
              />
            </div>
          </div>
          <div className="row ml-5 mt-3">
            <div className="col-md-3 text-color">
              State <br />
              <Select
                onChange={this.handleChange}
                className="statebox"
                variant="outlined"
              >
                <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                <MenuItem value="Goa">Goa</MenuItem>
                <MenuItem value="Gujrat">Gujrat</MenuItem>
                <MenuItem value="Delhi">Delhi</MenuItem>
              </Select>
            </div>
            <div className="col-md-3 text-color">
              City <br />
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="city"
                value={city}
                onChange={this._onHandleChange}
                required
              />
            </div>
            <div className="col-md-3 text-color">
              Pincode <br />
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="number"
                name="pincode"
                value={pincode}
                onChange={this._onHandleChange}
                required
              />
            </div>
          </div>
          <div className="buttons">
            <button
              className="custom-button button_add"
              variant="outlined"
              type="submit"
            >
              Add
            </button>
            <button
              className="custom-button btn_cancel"
              onClick={this.handlecancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default AddTask;
