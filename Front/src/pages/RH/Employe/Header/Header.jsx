// src/components/Header.jsx
import React from "react";
import { useSidebar } from "../../../../components/SidebarContext";

export default function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="app-header navbar navbar-expand bg-body">
      <div className="container-fluid">
        {/* Start Navbar Links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a 
              className="nav-link" 
              href="#" 
              role="button"
              onClick={(e) => {
                e.preventDefault();
                toggleSidebar();
              }}
            >
              <i className="bi bi-list"></i>
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="#" className="nav-link">Home</a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="#" className="nav-link">Contact</a>
          </li>
        </ul>
        {/* End Navbar Links */}

        {/* Start Right Navbar Links */}
        <ul className="navbar-nav ms-auto">
          {/* Navbar Search */}
          <li className="nav-item">
            <a className="nav-link" data-widget="navbar-search" href="#" role="button">
              <i className="bi bi-search"></i>
            </a>
          </li>

          {/* Messages Dropdown */}
          <li className="nav-item dropdown">
            <a className="nav-link" data-bs-toggle="dropdown" href="#">
              <i className="bi bi-chat-text"></i>
              <span className="navbar-badge badge text-bg-danger">3</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
              <a href="#" className="dropdown-item d-flex">
                <img src="/assets/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 rounded-circle me-3" />
                <div className="flex-grow-1">
                  <h3 className="dropdown-item-title">
                    Brad Diesel
                    <span className="float-end fs-7 text-danger"><i className="bi bi-star-fill"></i></span>
                  </h3>
                  <p className="fs-7">Call me whenever you can...</p>
                  <p className="fs-7 text-secondary"><i className="bi bi-clock-fill me-1"></i> 4 Hours Ago</p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
            </div>
          </li>

          {/* Notifications Dropdown */}
          <li className="nav-item dropdown">
            <a className="nav-link" data-bs-toggle="dropdown" href="#">
              <i className="bi bi-bell-fill"></i>
              <span className="navbar-badge badge text-bg-warning">15</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
              <span className="dropdown-item dropdown-header">15 Notifications</span>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <i className="bi bi-envelope me-2"></i> 4 new messages
                <span className="float-end text-secondary fs-7">3 mins</span>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
            </div>
          </li>

          {/* Fullscreen Toggle */}
          <li className="nav-item">
            <a className="nav-link" href="#" data-lte-toggle="fullscreen">
              <i data-lte-icon="maximize" className="bi bi-arrows-fullscreen"></i>
              <i data-lte-icon="minimize" className="bi bi-fullscreen-exit" style={{ display: "none" }}></i>
            </a>
          </li>

          {/* User Menu Dropdown */}
          <li className="nav-item dropdown user-menu">
            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <img src="/assets/img/user2-160x160.jpg" className="user-image rounded-circle shadow" alt="User Image" />
              <span className="d-none d-md-inline">Alexander Pierce</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
              <li className="user-header text-bg-primary">
                <img src="/assets/img/user2-160x160.jpg" className="rounded-circle shadow" alt="User Image" />
                <p>
                  Alexander Pierce - Web Developer
                  <small>Member since Nov. 2023</small>
                </p>
              </li>
              <li className="user-body">
                <div className="row">
                  <div className="col-4 text-center"><a href="#">Followers</a></div>
                  <div className="col-4 text-center"><a href="#">Sales</a></div>
                  <div className="col-4 text-center"><a href="#">Friends</a></div>
                </div>
              </li>
              <li className="user-footer">
                <a href="#" className="btn btn-default btn-flat">Profile</a>
                <a href="#" className="btn btn-default btn-flat float-end">Sign out</a>
              </li>
            </ul>
          </li>
        </ul>
        {/* End Right Navbar Links */}
      </div>
    </nav>
  );
}

