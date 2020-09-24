import React, { Component } from "react";
import { Link } from "react-router-dom";

export class SideBar extends Component {
  render() {
    return (
      <div>
        <ul
          class="navbar-nav bg-gradient-warning sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          <a
            class="sidebar-brand d-flex align-items-center justify-content-center"
            href="index.html"
          >
            <div class="sidebar-brand-text mx-3">Digiskills </div>
          </a>

          <hr class="sidebar-divider my-0" />

          <li class="nav-item active">
            <a class="nav-link" href="/dashboard">
              <i class="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <hr class="sidebar-divider" />
          <div class="sidebar-heading">Interface</div>
          <li class="nav-item">
            <a
              class="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              <i class="fas fa-fw fa-folder"></i>
              <span>Formation </span>
            </a>
            <div
              id="collapseTwo"
              class="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div class="bg-white py-2 collapse-inner rounded">
                <h6 class="collapse-header">Formations : </h6>
                <Link class="collapse-item" to="/trainings">
                  Liste
                </Link>
                <Link class="collapse-item" to="/add-training">
                  Ajouter
                </Link>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <a
              class="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapseUtilities"
              aria-expanded="true"
              aria-controls="collapseUtilities"
            >
              <i class="fas fa-fw fa-wrench"></i>
              <span>Cours</span>
            </a>
            <div
              id="collapseUtilities"
              class="collapse"
              aria-labelledby="headingUtilities"
              data-parent="#accordionSidebar"
            >
              <div class="bg-white py-2 collapse-inner rounded">
                <h6 class="collapse-header">les cours:</h6>
                <Link class="collapse-item" to="/courses">
                  Liste
                </Link>
                <Link class="collapse-item" to="/addcourses">
                  Ajouter
                </Link>
                {/* <a class="collapse-item" href="utilities-animation.html">
                  Animations
                </a>
                <a class="collapse-item" href="utilities-other.html">
                  Other
                </a> */}
              </div>
            </div>
          </li>
          <hr class="sidebar-divider" />

          <div class="sidebar-heading"></div>
          <li class="nav-item">
            <a
              class="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapsePages"
              aria-expanded="true"
              aria-controls="collapsePages"
            >
              <i class="fas fa-fw fa-folder"></i>
              <span>Utilisateur</span>
            </a>
            <div
              id="collapsePages"
              class="collapse"
              aria-labelledby="headingPages"
              data-parent="#accordionSidebar"
            >
              <div class="bg-white py-2 collapse-inner rounded">
                <h6 class="collapse-header">Login Screens:</h6>
                {/* <a class="collapse-item" href="login.html">
                  Login
                </a> */}
                <Link class="collapse-item" to="/register">
                  Ajouter
                </Link>
                <Link class="collapse-item" to="/profiles">
                  Profiles
                </Link>
                {/* <div class="collapse-divider"></div>
                <h6 class="collapse-header">Other Pages:</h6>
                <a class="collapse-item" href="404.html">
                  404 Page
                </a>
                <a class="collapse-item" href="blank.html">
                  Blank Page
                </a> */}
              </div>
            </div>
          </li>
          {/* <li class="nav-item">
            <Link class="nav-link" to="/color">
              {" "}
              <i class="fas fa-fw fa-chart-area"></i>Colors
            </Link> */}
          {/* <a class="nav-link" href="charts.html"> 
                            <i class="fas fa-fw fa-chart-area"></i> 
                            <span>Charts</span></a> */}
          {/* </li> */}
          {/* <li class="nav-item">
            <Link class="nav-link" to="/table">
              {" "}
              <i class="fas fa-fw fa-table"></i>Tables
            </Link>
            {/* <a class="nav-link" href="tables.html"> 
                            <i class="fas fa-fw fa-table"></i> 
                            <span>Tables</span></a> */}
          {/* </li> */}
          <hr class="sidebar-divider d-none d-md-block" />
          <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle"></button>
          </div>
        </ul>
      </div>
    );
  }
}

export default SideBar;
