/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import * as APPURL from '../../config/url'
import { useSelector } from 'react-redux'
import DashboardTab from '../../components/Partials/User/DashboardTab'
import Helmet from '../../components/SEO/helmet'

export default function Profile() {
    const { app, auth } = useSelector((state) => state)

    return (
        <div className="header-container-fluid">
            <Helmet title="Profile" metaDescription="" />
            <DashboardTab user={auth}>
                <span class="surtitle">Your account</span>
                <h1 class="h2 mb-0">Settings</h1>
            </DashboardTab>
            
            <div class="slice slice-sm bg-section-secondary">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-9">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row row-grid align-items-center">
                                                <div class="col-lg-8">
                                                    <div class="media align-items-center">
                                                        <span class="avatar bg-danger text-white rounded-circle mr-3">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="1em"
                                                                height="1em"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                class="feather feather-bell">
                                                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                                                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                                            </svg>
                                                        </span>
                                                        <div class="media-body">
                                                            <h5 class="mb-0">
                                                                Free Account
                                                            </h5>
                                                            <p class="text-muted lh-150 text-sm mb-0">
                                                                Your account
                                                                will auto-renew
                                                                on January 1st,
                                                                2021
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-auto flex-fill mt-4 mt-sm-0 text-sm-right d-none d-lg-block">
                                                    <a
                                                        href="#"
                                                        class="btn btn-sm btn-neutral rounded-pill">
                                                        Manage
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 class="mb-3">
                                            General information
                                        </h5>
                                        <form>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            First name
                                                        </label>{' '}
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            Last name
                                                        </label>{' '}
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            placeholder="Also your last name"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row align-items-center">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            Birthday
                                                        </label>{' '}
                                                        <input
                                                            type="text"
                                                            class="form-control flatpickr-input"
                                                            data-toggle="date"
                                                            placeholder="Select your birth date"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            Gender
                                                        </label>{' '}
                                                        <select class="custom-select">
                                                            <option
                                                                disabled="disabled"
                                                                selected="selected">
                                                                Select option
                                                            </option>
                                                            <option value="1">
                                                                Female
                                                            </option>
                                                            <option value="2">
                                                                Male
                                                            </option>
                                                            <option value="2">
                                                                Rather not say
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            Email
                                                        </label>{' '}
                                                        <input
                                                            class="form-control"
                                                            type="email"
                                                            placeholder="name@exmaple.com"
                                                        />{' '}
                                                        <small class="form-text text-muted mt-2">
                                                            This is the main
                                                            email address that
                                                            we'll send
                                                            notifications.
                                                        </small>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            Phone
                                                        </label>{' '}
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            placeholder="+40-777 245 549"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mt-3">
                                                <button
                                                    type="button"
                                                    class="btn btn-sm btn-primary">
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <hr />
                                    <div>
                                        <h5 class="mb-3">
                                            Contact information
                                        </h5>
                                        <form>
                                            <div class="row">
                                                <div class="col-sm-9">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            Address
                                                        </label>{' '}
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            placeholder="Enter your home address"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            Number
                                                        </label>{' '}
                                                        <input
                                                            class="form-control"
                                                            type="tel"
                                                            placeholder="No."
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-4">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            City
                                                        </label>{' '}
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            placeholder="City"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-sm-4">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            Country
                                                        </label>{' '}
                                                        <select
                                                            class="form-control select2-hidden-accessible"
                                                            data-toggle="select"
                                                            title="Country"
                                                            data-live-search="true"
                                                            data-live-search-placeholder="Country"
                                                            data-select2-id="1"
                                                            tabindex="-1"
                                                            aria-hidden="true">
                                                            <option data-select2-id="3">
                                                                Romania
                                                            </option>
                                                            <option>
                                                                United Stated
                                                            </option>
                                                            <option>
                                                                France
                                                            </option>
                                                            <option>
                                                                Greece
                                                            </option>
                                                            <option>
                                                                Italy
                                                            </option>
                                                            <option>
                                                                Norway
                                                            </option>
                                                        </select>
                                                        <span
                                                            class="select2 select2-container select2-container--default"
                                                            dir="ltr"
                                                            data-select2-id="2"
                                                            style={{
                                                                width:
                                                                    '209.984px',
                                                            }}>
                                                            <span class="selection">
                                                                <span
                                                                    class="select2-selection select2-selection--single"
                                                                    role="combobox"
                                                                    aria-haspopup="true"
                                                                    aria-expanded="false"
                                                                    title="Country"
                                                                    tabindex="0"
                                                                    aria-disabled="false"
                                                                    aria-labelledby="select2-n37s-container">
                                                                    <span
                                                                        class="select2-selection__rendered"
                                                                        id="select2-n37s-container"
                                                                        role="textbox"
                                                                        aria-readonly="true"
                                                                        title="Romania">
                                                                        Romania
                                                                    </span>
                                                                    <span
                                                                        class="select2-selection__arrow"
                                                                        role="presentation">
                                                                        <b role="presentation"></b>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                            <span
                                                                class="dropdown-wrapper"
                                                                aria-hidden="true"></span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4">
                                                    <div class="form-group">
                                                        <label class="form-control-label">
                                                            ZIP
                                                        </label>{' '}
                                                        <input
                                                            class="form-control"
                                                            type="tel"
                                                            placeholder="ZIP"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mt-3">
                                                <button
                                                    type="button"
                                                    class="btn btn-sm btn-primary">
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <hr />
                                    <div>
                                        <div class="page-inner-header mb-4">
                                            <h5 class="mb-1">Delete account</h5>
                                            <p class="text-muted mb-0">
                                                Once you delete your account,
                                                there is no going back. Please
                                                be certain.
                                            </p>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-8">
                                                <button
                                                    type="button"
                                                    class="btn btn-danger"
                                                    data-toggle="modal"
                                                    data-target="#modal_account_deactivate">
                                                    Delete your account
                                                </button>
                                            </div>
                                        </div>
                                        <div
                                            class="modal fade"
                                            id="modal_account_deactivate"
                                            tabindex="-1"
                                            role="dialog"
                                            aria-labelledby="modal_account_deactivate"
                                            aria-hidden="true">
                                            <div
                                                class="modal-dialog modal-dialog-centered"
                                                role="document">
                                                <div class="modal-content">
                                                    <div class="modal-body">
                                                        <div class="pt-5 text-center">
                                                            <div class="icon text-danger">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    stroke-width="2"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    class="feather feather-user-x">
                                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                                    <circle
                                                                        cx="8.5"
                                                                        cy="7"
                                                                        r="4"></circle>
                                                                    <line
                                                                        x1="18"
                                                                        y1="8"
                                                                        x2="23"
                                                                        y2="13"></line>
                                                                    <line
                                                                        x1="23"
                                                                        y1="8"
                                                                        x2="18"
                                                                        y2="13"></line>
                                                                </svg>
                                                            </div>
                                                            <h4 class="h5 mt-5 mb-3">
                                                                Extremely
                                                                important
                                                            </h4>
                                                            <p>
                                                                We will
                                                                immediately
                                                                delete all of
                                                                your personal
                                                                data from our
                                                                database. This
                                                                action can not
                                                                be undone. Are
                                                                you sure you
                                                                want to do this?
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button
                                                            type="button"
                                                            class="btn btn-sm btn-link text-danger btn-zoom--hover font-weight-600">
                                                            Delete
                                                        </button>{' '}
                                                        <button
                                                            type="button"
                                                            class="btn btn-sm btn-secondary"
                                                            data-dismiss="modal">
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
