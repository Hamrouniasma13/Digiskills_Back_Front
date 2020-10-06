import React, { Component } from "react";

class Learner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingLearners: true,
      learners: [],
    };
  }
  s;
  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", localStorage.jwtToken);
    myHeaders.append("Content-Type", "application/json");
    fetch("/api/user/allLearners", {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then(
        (result) =>
          this.setState({
            loadingLearners: false,
            learners: result,
          }),
        console.log("ok")
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
          <h6 class="m-0 font-weight-bold text-warning">Apprenant</h6>
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
                {this.state.learners.map((learner) => (
                  <tr>
                    <td>{learner.email}</td>
                    <td>{learner.lastName}</td>
                    <td>{learner.firstName}</td>
                    <td>
                      <button
                        onClick={this.onDeleteClick.bind(this, learner._id)}
                        className="btn btn-danger btn-circle"
                      >
                        <i class="fas fa-trash"></i>
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

export default Learner;
