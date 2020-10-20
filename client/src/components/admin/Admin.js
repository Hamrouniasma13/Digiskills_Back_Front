import React, { Component } from "react";
import Moment from "react-moment";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingAdmins: true,
      admins: [],
    };
  }

  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", localStorage.jwtToken);
    myHeaders.append("Content-Type", "application/json");
    fetch("/api/user/allAdmins", {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((result) =>
        this.setState({
            loadingAdmins: false,
            admins: result,
        }),
        
      );
  }

  onDeleteClick(id) {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", localStorage.jwtToken);
    myHeaders.append("Content-Type", "application/json");
    fetch(`/api/user/removeUser/${id}`, {
      method: "delete",
      headers: myHeaders,
    }).then((res) => res.json());
  }

  render() {
    return (
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-warning">ADMINS</h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table
              class="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Nom</th>
                  <th>Prenom</th>
                  
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.admins.map((admin) => (
                  <tr>
                    <td>{admin.email}</td>
                    <td>{admin.lastName}</td>
                    <td>{admin.firstName}</td>
                   
                    <td>
                      <button
                        onClick={this.onDeleteClick.bind(this, admin._id)}
                        className="btn btn-danger btn-circle"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
