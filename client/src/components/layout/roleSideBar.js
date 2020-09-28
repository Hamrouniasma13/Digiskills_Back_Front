import React from "react";
import {
  AdminMenuItems,
  LearnerMenuItems,
  ManagerMenuItems,
  TrainingManagerMenuItems,
} from "./menuItems";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Menu } from "@material-ui/core";

function selectMenuItem(userRole) {
  switch (userRole) {
    case "Admin":
      return AdminMenuItems;
      break;

    case "Learner":
      return LearnerMenuItems;
      break;
    case "Manager":
      return ManagerMenuItems;
      break;
    case "Training Manager":
      return TrainingManagerMenuItems;
      break;
    default:
      return AdminMenuItems;
  }
}

const roleSideBar = ({ userRole }) => {
  const menuItems = selectMenuItem(userRole);

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
          <div class="sidebar-brand-text mx-3">
            Digiskills <br />
            Espace {userRole}
          </div>
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

        {menuItems.map((menu) => (
          <li class="nav-item">
            <a
              class="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target={"#" + menu.class}
              aria-expanded="true"
              aria-controls={menu.class}
            >
              <i class={menu.icons}></i>
              <span>{menu.name} </span>
            </a>
            <div
              id={menu.class}
              class="collapse"
              aria-labelledby={menu.label}
              data-parent="#accordionSidebar"
            >
              <div class="bg-white py-2 collapse-inner rounded">
                <h6 class="collapse-header">{menu.name} </h6>
                {menu.items.map((it) => (
                  <Link class="collapse-item" to={it.href}>
                    {it.name}
                  </Link>
                ))}
                {/* <Link class="collapse-item" to="/dashboard/add-training">
                  Ajouter
                </Link>
                <Link class="collapse-item" to="/dashboard/addcourses">
                  Ajouter Course
                </Link>
                <Link class="collapse-item" to="/dashboard/courses">
                  Liste des cours
                </Link> */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default roleSideBar;
