import React, { Component } from "react";

class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingManagers: true,
      managers: [],
    };
  }
  s;
  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", localStorage.jwtToken);
    myHeaders.append("Content-Type", "application/json");
    fetch("/api/user/allManagers", {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((result) =>
        this.setState({
          loadingManagers: false,
          managers: result,
        })
      );
  }

  render() {
    return (
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-warning">Managers</h6>
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
                </tr>
              </thead>
              <tbody>
                {this.state.managers.map((manager) => (
                  <tr>
                    <td>{manager.email}</td>
                    <td>{manager.lastName}</td>
                    <td>{manager.firstName}</td>
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

export default Manager;
