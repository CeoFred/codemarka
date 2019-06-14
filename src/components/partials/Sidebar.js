import React, { Component } from "react";
import Nav from "./Nav";
import ChatList from "./ChatList";
import InnerChat from "./InnerChat";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="pcoded-navbar">
        <div className="nav-list">
          <div className="pcoded-inner-navbar main-menu">
            <div className="pcoded-navigation-label">Navigation</div>
            <ul className="pcoded-item pcoded-left-item">
              <li className="pcoded-hasmenu active pcoded-trigger">
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-home" />
                  </span>
                  <span className="pcoded-mtext">Admin</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className="active">
                    <a href="index-2.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">Apps</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="dashboard-crm.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Organizations</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="dashboard-crm.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Users</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="dashboard-crm.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Features</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="dashboard-analytics.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Subscriptions</span>
                      <span className="pcoded-badge label label-info ">
                        NEW
                      </span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="pcoded-hasmenu">
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-sidebar" />
                  </span>
                  <span className="pcoded-mtext">Page layouts</span>
                  <span className="pcoded-badge label label-warning">NEW</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className=" pcoded-hasmenu">
                    <a
                      href="javascript:void(0)"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Vertical</span>
                    </a>
                    <ul className="pcoded-submenu">
                      <li className="">
                        <a
                          href="menu-static.html"
                          className="waves-effect waves-dark"
                        >
                          <span className="pcoded-mtext">Static Layout</span>
                        </a>
                      </li>
                      <li className="">
                        <a
                          href="menu-header-fixed.html"
                          className="waves-effect waves-dark"
                        >
                          <span className="pcoded-mtext">Header Fixed</span>
                        </a>
                      </li>
                      <li className="">
                        <a
                          href="menu-compact.html"
                          className="waves-effect waves-dark"
                        >
                          <span className="pcoded-mtext">Compact</span>
                        </a>
                      </li>
                      <li className="">
                        <a
                          href="menu-sidebar.html"
                          className="waves-effect waves-dark"
                        >
                          <span className="pcoded-mtext">Sidebar Fixed</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className=" pcoded-hasmenu">
                    <a
                      href="javascript:void(0)"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Horizontal</span>
                    </a>
                    <ul className="pcoded-submenu">
                      <li className="">
                        <a
                          href="menu-horizontal-static.html"
                          target="_blank"
                          className="waves-effect waves-dark"
                        >
                          <span className="pcoded-mtext">Static Layout</span>
                        </a>
                      </li>
                      <li className="">
                        <a
                          href="menu-horizontal-fixed.html"
                          target="_blank"
                          className="waves-effect waves-dark"
                        >
                          <span className="pcoded-mtext">Fixed layout</span>
                        </a>
                      </li>
                      <li className="">
                        <a
                          href="menu-horizontal-icon.html"
                          target="_blank"
                          className="waves-effect waves-dark"
                        >
                          <span className="pcoded-mtext">Static With Icon</span>
                        </a>
                      </li>
                      <li className="">
                        <a
                          href="menu-horizontal-icon-fixed.html"
                          target="_blank"
                          className="waves-effect waves-dark"
                        >
                          <span className="pcoded-mtext">Fixed With Icon</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="">
                    <a
                      href="menu-bottom.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Bottom Menu</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="">
                <a href="navbar-light.html" className="waves-effect waves-dark">
                  <span className="pcoded-micon">
                    <i className="feather icon-menu" />
                  </span>
                  <span className="pcoded-mtext">Navigation</span>
                </a>
              </li>
              <li className="pcoded-hasmenu">
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-layers" />
                  </span>
                  <span className="pcoded-mtext">Widget</span>
                  <span className="pcoded-badge label label-danger">100+</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className="">
                    <a
                      href="widget-statistic.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Statistic</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="widget-data.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Data</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="widget-chart.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Chart Widget</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="pcoded-navigation-label">UI Element</div>
            <ul className="pcoded-item pcoded-left-item">
              <li className="pcoded-hasmenu">
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-box" />
                  </span>
                  <span className="pcoded-mtext">Basic</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className="">
                    <a href="alert.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">Alert</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="breadcrumb.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Breadcrumbs</span>
                    </a>
                  </li>
                  <li className="">
                    <a href="button.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">Button</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="box-shadow.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Box-Shadow</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="accordion.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Accordion</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="generic-class.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Generic Class</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a href="tabs.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">Tabs</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a href="color.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">Color</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="label-badge.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Label Badge</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="progress-bar.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Progress Bar</span>
                    </a>
                  </li>

                  <li className=" ">
                    <a href="list.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">List</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a href="tooltip.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">Tooltip And Popover</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="typography.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Typography</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a href="other.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">Other</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="pcoded-hasmenu">
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-gitlab" />
                  </span>
                  <span className="pcoded-mtext">Advance</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className=" ">
                    <a
                      href="draggable.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Draggable</span>
                    </a>
                  </li>

                  <li className=" ">
                    <a href="modal.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">Modal</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="notification.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Notifications</span>
                    </a>
                  </li>

                  <li className=" ">
                    <a href="rating.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">Rating</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="range-slider.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Range Slider</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a href="slider.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">Slider</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="syntax-highlighter.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Syntax Highlighter</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a href="tour.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">Tour</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a href="treeview.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">Tree View</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a href="nestable.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">Nestable</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a href="toolbar.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">Toolbar</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="pcoded-hasmenu">
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-package" />
                  </span>
                  <span className="pcoded-mtext">Extra</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className=" ">
                    <a
                      href="session-timeout.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Session Timeout</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="session-idle-timeout.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Session Idle Timeout</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a href="offline.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">Offline</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className=" ">
                <a href="animation.html" className="waves-effect waves-dark">
                  <span className="pcoded-micon">
                    <i className="feather icon-aperture rotate-refresh" />
                  </span>
                  <span className="pcoded-mtext">Animations</span>
                </a>
              </li>

              <li className="pcoded-hasmenu">
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-command" />
                  </span>
                  <span className="pcoded-mtext">Icons</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className=" ">
                    <a
                      href="icon-font-awesome.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Font Awesome</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="icon-themify.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Themify</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="icon-simple-line.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Simple Line Icon</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="pcoded-navigation-label">Forms</div>
            <ul className="pcoded-item pcoded-left-item">
              <li className="pcoded-hasmenu">
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-clipboard" />
                  </span>
                  <span className="pcoded-mtext">Form</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className=" ">
                    <a
                      href="form-elements-component.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Components</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="form-elements-add-on.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Add-On</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="form-elements-advance.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Advance</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="form-validation.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Validation</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className=" ">
                <a href="form-picker.html" className="waves-effect waves-dark">
                  <span className="pcoded-micon">
                    <i className="feather icon-edit-1" />
                  </span>
                  <span className="pcoded-mtext">Form Picker</span>
                  <span className="pcoded-badge label label-warning">NEW</span>
                </a>
              </li>
              <li className=" ">
                <a href="form-select.html" className="waves-effect waves-dark">
                  <span className="pcoded-micon">
                    <i className="feather icon-feather" />
                  </span>
                  <span className="pcoded-mtext">Form Select</span>
                </a>
              </li>
              <li className=" ">
                <a href="form-masking.html" className="waves-effect waves-dark">
                  <span className="pcoded-micon">
                    <i className="feather icon-shield" />
                  </span>
                  <span className="pcoded-mtext">Form Masking</span>
                </a>
              </li>
              <li className=" ">
                <a href="form-wizard.html" className="waves-effect waves-dark">
                  <span className="pcoded-micon">
                    <i className="feather icon-tv" />
                  </span>
                  <span className="pcoded-mtext">Form Wizard</span>
                </a>
              </li>
            </ul>
            <div className="pcoded-navigation-label">Tables</div>
            <ul className="pcoded-item pcoded-left-item">
              <li className="pcoded-hasmenu">
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-credit-card" />
                  </span>
                  <span className="pcoded-mtext">Bootstrap Table</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className=" ">
                    <a
                      href="bs-basic-table.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Basic Table</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="bs-table-sizing.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Sizing Table</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="bs-table-border.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Border Table</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="bs-table-styling.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Styling Table</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="pcoded-hasmenu">
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-inbox" />
                  </span>
                  <span className="pcoded-mtext">Data Table</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className=" ">
                    <a href="dt-basic.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">Basic Initialization</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="dt-advance.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">
                        Advance Initialization
                      </span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="dt-styling.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Styling</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a href="dt-api.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">API</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a href="dt-ajax.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">Ajax</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="dt-server-side.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Server Side</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="dt-plugin.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Plug-In</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="dt-data-sources.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Data Sources</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="pcoded-hasmenu">
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-server" />
                  </span>
                  <span className="pcoded-mtext">DT Extensions</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className=" ">
                    <a
                      href="dt-ext-autofill.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">AutoFill</span>
                    </a>
                  </li>
                  <li className="pcoded-hasmenu">
                    <a
                      href="javascript:void(0)"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Button</span>
                    </a>
                    <ul className="pcoded-submenu">
                      <li className=" ">
                        <a
                          href="dt-ext-basic-buttons.html"
                          className="waves-effect waves-dark"
                        >
                          <span className="pcoded-mtext">Basic Button</span>
                        </a>
                      </li>
                      <li className=" ">
                        <a
                          href="dt-ext-buttons-html-5-data-export.html"
                          className="waves-effect waves-dark"
                        >
                          <span className="pcoded-mtext">Data Export</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className=" ">
                    <a
                      href="dt-ext-col-reorder.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Col Reorder</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="dt-ext-fixed-columns.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Fixed Columns</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="dt-ext-fixed-header.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Fixed Header</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="dt-ext-key-table.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Key Table</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="dt-ext-responsive.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Responsive</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="dt-ext-row-reorder.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Row Reorder</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="dt-ext-scroller.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Scroller</span>
                    </a>
                  </li>
                  <li className=" ">
                    <a
                      href="dt-ext-select.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Select Table</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className=" ">
                <a href="foo-table.html" className="waves-effect waves-dark">
                  <span className="pcoded-micon">
                    <i className="feather icon-hash" />
                  </span>
                  <span className="pcoded-mtext">FooTable</span>
                </a>
              </li>
              <li className="pcoded-hasmenu ">
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-airplay" />
                  </span>
                  <span className="pcoded-mtext">Handson Table</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className="">
                    <a
                      href="handson-appearance.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Appearance</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="handson-data-operation.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Data Operation</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="handson-rows-cols.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Rows Columns</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="handson-columns-only.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Columns Only</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="handson-cell-features.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Cell Features</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="handson-cell-types.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Cell Types</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="handson-integrations.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Integrations</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="handson-rows-only.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Rows Only</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="handson-utilities.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Utilities</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="">
                <a
                  href="editable-table.html"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-edit" />
                  </span>
                  <span className="pcoded-mtext">Editable Table</span>
                </a>
              </li>
            </ul>
            <div className="pcoded-navigation-label">Chart And Maps</div>
            <ul className="pcoded-item pcoded-left-item">
              <li className="pcoded-hasmenu ">
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-pie-chart" />
                  </span>
                  <span className="pcoded-mtext">Charts</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className="">
                    <a
                      href="chart-google.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Google Chart</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="chart-chartjs.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">ChartJs</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="chart-list.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">List Chart</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="chart-float.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Float Chart</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="chart-knob.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Knob chart</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="chart-morris.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Morris Chart</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="chart-nvd3.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Nvd3 Chart</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="chart-peity.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Peity Chart</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="chart-radial.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Radial Chart</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="chart-rickshaw.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Rickshaw Chart</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="chart-sparkline.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Sparkline Chart</span>
                    </a>
                  </li>
                  <li className="">
                    <a href="chart-c3.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">C3 Chart</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="pcoded-hasmenu ">
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-map" />
                  </span>
                  <span className="pcoded-mtext">Maps</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className="">
                    <a
                      href="map-google.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Google Maps</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="map-vector.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Vector Maps</span>
                    </a>
                  </li>
                  <li className="">
                    <a href="map-api.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">
                        Google Map Search API
                      </span>
                    </a>
                  </li>
                  <li className="">
                    <a href="location.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">Location</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="pcoded-navigation-label">Pages</div>
            <ul className="pcoded-item pcoded-left-item">
              <li className="pcoded-hasmenu ">
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-unlock" />
                  </span>
                  <span className="pcoded-mtext">Authentication</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className="">
                    <a
                      href="auth-sign-in-social.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Login</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="auth-sign-up-social.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Registration</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="auth-reset-password.html"
                      target="_blank"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Forgot Password</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="auth-lock-screen.html"
                      target="_blank"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Lock Screen</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="pcoded-hasmenu ">
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-sliders" />
                  </span>
                  <span className="pcoded-mtext">Maintenance</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className="">
                    <a href="error.html" className="waves-effect waves-dark">
                      <span className="pcoded-mtext">Error</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="comming-soon.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Comming Soon</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="offline-ui.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Offline UI</span>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="pcoded-hasmenu ">
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-mail" />
                  </span>
                  <span className="pcoded-mtext">Email</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className="">
                    <a
                      href="email-compose.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Compose Email</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="email-inbox.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Inbox</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="email-read.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Read Mail</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="pcoded-navigation-label">App</div>
            <ul className="pcoded-item pcoded-left-item">
              <li className="">
                <a href="todo.html" className="waves-effect waves-dark">
                  <span className="pcoded-micon">
                    <i className="feather icon-bookmark" />
                  </span>
                  <span className="pcoded-mtext">To-Do</span>
                </a>
              </li>
            </ul>
            <div className="pcoded-navigation-label">Extension</div>
            <ul className="pcoded-item pcoded-left-item">
              <li className="pcoded-hasmenu ">
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-file-plus" />
                  </span>
                  <span className="pcoded-mtext">Editor</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className="">
                    <a
                      href="ck-editor.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">CK-Editor</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="wysiwyg-editor.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">WYSIWYG Editor</span>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="pcoded-hasmenu ">
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-calendar" />
                  </span>
                  <span className="pcoded-mtext">Event Calendar</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className="">
                    <a
                      href="event-full-calender.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Full Calendar</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="event-clndr.html"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">CLNDER</span>
                      <span className="pcoded-badge label label-info">NEW</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="">
                <a href="image-crop.html" className="waves-effect waves-dark">
                  <span className="pcoded-micon">
                    <i className="feather icon-scissors" />
                    <b>IC</b>
                  </span>
                  <span className="pcoded-mtext">Image Cropper</span>
                </a>
              </li>
              <li className="">
                <a href="file-upload.html" className="waves-effect waves-dark">
                  <span className="pcoded-micon">
                    <i className="feather icon-upload-cloud" />
                  </span>
                  <span className="pcoded-mtext">File Upload</span>
                </a>
              </li>
              <li className="">
                <a href="change-loges.html" className="waves-effect waves-dark">
                  <span className="pcoded-micon">
                    <i className="feather icon-briefcase" />
                  </span>
                  <span className="pcoded-mtext">Change Loges</span>
                  <span className="pcoded-badge label label-warning">1.0</span>
                </a>
              </li>
            </ul>
            <div className="pcoded-navigation-label">Other</div>
            <ul className="pcoded-item pcoded-left-item">
              <li className="pcoded-hasmenu ">
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-list" />
                  </span>
                  <span className="pcoded-mtext">Menu Levels</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className="">
                    <a
                      href="javascript:void(0)"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Menu Level 2.1</span>
                    </a>
                  </li>
                  <li className="pcoded-hasmenu ">
                    <a
                      href="javascript:void(0)"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Menu Level 2.2</span>
                    </a>
                    <ul className="pcoded-submenu">
                      <li className="">
                        <a
                          href="javascript:void(0)"
                          className="waves-effect waves-dark"
                        >
                          <span className="pcoded-mtext">Menu Level 3.1</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="">
                    <a
                      href="javascript:void(0)"
                      className="waves-effect waves-dark"
                    >
                      <span className="pcoded-mtext">Menu Level 2.3</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="">
                <a
                  href="javascript:void(0)"
                  className="disabled waves-effect waves-dark"
                >
                  <span className="pcoded-micon">
                    <i className="feather icon-power" />
                    <b>D</b>
                  </span>
                  <span className="pcoded-mtext">Disabled Menu</span>
                </a>
              </li>
              <li className="">
                <a href="sample-page.html" className="waves-effect waves-dark">
                  <span className="pcoded-micon">
                    <i className="feather icon-watch" />
                  </span>
                  <span className="pcoded-mtext">Sample Page</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Sidebar;
