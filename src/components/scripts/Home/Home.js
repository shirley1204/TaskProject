import React, { Component } from "react";
import Navbar from "../../reusable/Navbar";
import { withRouter } from "react-router-dom";
import "./style.css";

import axios from "axios";
import {
  Card,
  CardContent,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  TableHead,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      tasksdata: [],

      loading: true,
      last_name: "",
      first_name: "",
      email: "",
      states: "",
      city: "",
      pincode: "",
      open: false,
      deleteName: "",
      deleteEmail: "",
      errors: null,
      finalResult: null,
      searchQuery: "",
    };
  }

  componentDidMount() {
    axios
      .get("https://j5ej5u32gg.execute-api.us-east-1.amazonaws.com/v1/fetch")
      .then((res) => {
        this.setState({ tasksdata: res.data.data, loading: false });
      });
  }
  add = () => {
    this.props.history.push("/addtask");
  };

  _onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onEdit = (data) => {
    this.props.history.push({
      pathname: "/edittask",
      state: { detail: data },
    });
    console.log(data);
  };
  onDeleteRequest = (data) => {
    const Name = data.first_name + " " + data.last_name;
    console.log(Name);
    this.setState({
      open: true,
      deleteName: Name,
      deleteEmail: data.email,
    });
  };
  handleDelete = (eid) => {
    console.log(eid);
    axios
      .get(
        `https://k6j938wg66.execute-api.us-east-1.amazonaws.com/v1/delete?param1=${eid}`
      )
      .then((res) => {
        if (res) {
          console.log(res);
          alert("Task Deleted Successfully ");

          window.location.reload(true);
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleClose = () => {
    this.setState({ open: false });
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

    let filteredArray = this.state.tasksdata.filter((val) => {
      let contentQuerycity = val.city.toLowerCase();
      let contentQueryfm = val.first_name.toLowerCase();
      let contentQuerylm = val.last_name.toLowerCase();
      let contentQueryemail = val.email.toLowerCase();
      let contentQuerystates = val.states.toLowerCase();
      let contentQuerypincode = val.pincode;
      // console.log(contentQueryabc);
      // eslint-disable-next-line eqeqeq
      return (
        contentQuerycity.indexOf(query) !== -1 ||
        contentQueryfm.indexOf(query) !== -1 ||
        contentQuerylm.indexOf(query) !== -1 ||
        contentQueryemail.indexOf(query) !== -1 ||
        contentQuerystates.indexOf(query) !== -1 ||
        contentQuerypincode == query
      );
    });
    console.log(filteredArray);

    this.setState({
      finalResult: filteredArray,
    });
  };

  render() {
    const { loading, tasksdata, open } = this.state;
    const { deleteName, deleteEmail, finalResult } = this.state;

    console.log(tasksdata);

    let data;
    if (loading === true) {
      data = <CircularProgress />;
    } else {
      data = (
        <>
          <Card>
            <br />
            <div className="row">
              <div className="col-md-3">
                <Button onClick={this.add} className="recordbutton">
                  <AddIcon /> Add record
                </Button>
              </div>
              <div className="col-md-3 offset-6">
                <form>
                  <input
                    className="Searchbar"
                    placeholder="Search"
                    value={this.state.searchQuery}
                    onChange={this.onHandleSearch}
                  />
                </form>
              </div>
            </div>
            <CardContent>
              {finalResult ? (
                <React.Fragment>
                  <TableBody>
                    {finalResult.map((row, index) => (
                      <TableRow key={row.email}>
                        <TableCell component="th" scope="row" align="center">
                          {index + 1}{" "}
                        </TableCell>
                        <TableCell align="center">{row.first_name} </TableCell>
                        <TableCell align="center">{row.last_name} </TableCell>
                        <TableCell align="center">{row.email} </TableCell>
                        <TableCell align="center">{row.states} </TableCell>
                        <TableCell align="center">{row.city} </TableCell>
                        <TableCell align="center">{row.pincode} </TableCell>
                        <TableCell>
                          <Button
                            className="custom-button edit_button"
                            variant="outlined"
                            onClick={this.onEdit.bind(this, row)}
                          >
                            Edit
                          </Button>
                          <Button
                            className="custom-button delete_button"
                            variant="outlined"
                            onClick={this.onDeleteRequest.bind(this, row)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </React.Fragment>
              ) : (
                <>
                  <div>
                    <TableContainer component={Paper}>
                      <Table className="" aria-label="simple table">
                        <TableHead className="tablehead">
                          <TableRow>
                            <TableCell align="center" className="text-white">
                              #{" "}
                            </TableCell>
                            <TableCell align="center" className="text-white">
                              First Name
                            </TableCell>
                            <TableCell align="center" className="text-white">
                              Last Name
                            </TableCell>
                            <TableCell align="center" className="text-white">
                              Email
                            </TableCell>
                            <TableCell align="center" className="text-white">
                              State
                            </TableCell>
                            <TableCell align="center" className="text-white">
                              City
                            </TableCell>
                            <TableCell align="center" className="text-white">
                              Pincode
                            </TableCell>
                            <TableCell align="center" className="text-white">
                              Action
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {tasksdata.map((row, index) => (
                            <TableRow key={row.email}>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {index + 1}{" "}
                              </TableCell>
                              <TableCell align="center">
                                {row.first_name}{" "}
                              </TableCell>
                              <TableCell align="center">
                                {row.last_name}{" "}
                              </TableCell>
                              <TableCell align="center">{row.email} </TableCell>
                              <TableCell align="center">
                                {row.states}{" "}
                              </TableCell>
                              <TableCell align="center">{row.city} </TableCell>
                              <TableCell align="center">
                                {row.pincode}{" "}
                              </TableCell>
                              <TableCell align="center">
                                <Button
                                  className="custom-button edit_button"
                                  variant="outlined"
                                  onClick={this.onEdit.bind(this, row)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  className="custom-button delete_button"
                                  variant="outlined"
                                  onClick={this.onDeleteRequest.bind(this, row)}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>

                  <div id="deletebox">
                    <Dialog
                      open={open}
                      onClose={this.handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title delete_title">
                        Are You Sure to Delete {deleteName}
                      </DialogTitle>
                      <DialogContent>
                        <DialogActions>
                          <Button
                            variant="contained"
                            onClick={this.handleDelete.bind(this, deleteEmail)}
                            color="primary"
                          >
                            Delete
                          </Button>
                          <Button
                            variant="contained"
                            onClick={this.handleClose}
                            color="primary"
                            autoFocus
                          >
                            Cancel
                          </Button>
                        </DialogActions>
                      </DialogContent>
                    </Dialog>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </>
      );
    }

    return (
      <>
        <Navbar />
        {data}
      </>
    );
  }
}

export default withRouter(Home);
