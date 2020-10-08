import React, { Component } from 'react'

import { Link } from "react-router-dom";
import CourseItemss from "./CourseItemss"
class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loadingCourses: true,
          courses: [],
        };
      }

    componentDidMount() {
      var myHeaders = new Headers();
                      myHeaders.append("x-auth-token", localStorage.jwtToken);
                      myHeaders.append("Content-Type", "application/json");
                      fetch(
                        "/api/course/allCourses",
                        {
                          method: "GET",
                          headers: myHeaders,
                        }
                      )
                        .then((res) => res.json())
                        .then((res) =>
                          this.setState({
                            courses: res,
                            loadingCourses: false,
                          })
                        );
                    }

    

    render() {
      

       
                let coursesItems = this.state.courses.map(course =>
                    (
                        <CourseItemss key={course._id} course={course} />
                    ))
           
        
        return (
            <div className="courses">
                <div className="container">
                    <div class="row">
                        <div className="col-md-12">
                            <div>
                                <Link to="/addcourses" className="btn btn-lg btn-info">
                                    Ajouter des cours
                                </Link>
                            </div>
                            <h1 className="display-4 text-center">
                            Cours
                            </h1>
                            <p className="lead text-center">
                                Choisir votre cours                                 
                            </p>
                            {coursesItems}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Courses