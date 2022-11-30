import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CommonUtils, ADMIN_ACTION } from '../../../../utils';
import * as actions from '../../../../store/actions';
import './MenuAdmin.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { getDoctorById } from '../../../../services/userService';
import { getSpecialty } from '../../../../services/specialtyService';
// import './MenuJS.js';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class MenuAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {


        }
    }

    async componentDidMount() {

    }



    render() {

        return (
            <React.Fragment>
                <aside className="sidebar position-fixed top-0 left-0 overflow-auto h-100 float-left" id="show-side-navigation1">
                    <i className="uil-bars close-aside d-md-none d-lg-none" data-close="show-side-navigation1"></i>
                    <div className="sidebar-header d-flex justify-content-center align-items-center px-3 py-4">
                        {/* <img
                            className="rounded-pill img-fluid"
                            width="65"
                            src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907008/medium/1501685726/enhance"
                            alt=""

                        /> */}
                        <div className="ms-2">
                            <h5 className="fs-6 mb-0">
                                <a className="text-decoration-none" href="#">Jone Doe</a>
                            </h5>
                            <p className="mt-1 mb-0">Lorem ipsum dolor sit amet consectetur.</p>
                        </div>
                    </div>

                    <div className="search position-relative text-center px-4 py-3 mt-2">
                        <input type="text" className="form-control w-100 border-0 bg-transparent" placeholder="Search here" />
                        <i className="fa fa-search position-absolute d-block fs-6"></i>
                    </div>

                    <ul className="categories list-unstyled">
                        <li className="has-dropdown">
                            <i className="uil-estate fa-fw"></i><a href="#"> Dashboard</a>
                            <ul className="sidebar-dropdown list-unstyled">
                                <li><a href="#">Lorem ipsum</a></li>
                                <li><a href="#">ipsum dolor</a></li>
                                <li><a href="#">dolor ipsum</a></li>
                                <li><a href="#">amet consectetur</a></li>
                                <li><a href="#">ipsum dolor sit</a></li>
                            </ul>
                        </li>
                        <li className="">
                            <i className="uil-folder"></i><a href="#"> File manager</a>
                        </li>
                        <li className="has-dropdown">
                            <i className="uil-calendar-alt"></i><a href="#"> Calender</a>
                            <ul className="sidebar-dropdown list-unstyled">
                                <li><a href="#">Lorem ipsum</a></li>
                                <li><a href="#">ipsum dolor</a></li>
                                <li><a href="#">dolor ipsum</a></li>
                                <li><a href="#">amet consectetur</a></li>
                                <li><a href="#">ipsum dolor sit</a></li>
                            </ul>
                        </li>
                        <li className="has-dropdown">
                            <i className="uil-envelope-download fa-fw"></i><a href="#"> Mailbox</a>
                            <ul className="sidebar-dropdown list-unstyled">
                                <li><a href="#">Lorem ipsum</a></li>
                                <li><a href="#">ipsum dolor</a></li>
                                <li><a href="#">dolor ipsum</a></li>
                                <li><a href="#">amet consectetur</a></li>
                                <li><a href="#">ipsum dolor sit</a></li>
                            </ul>
                        </li>
                        <li className="has-dropdown">
                            <i className="uil-shopping-cart-alt"></i><a href="#"> Ecommerce</a>
                            <ul className="sidebar-dropdown list-unstyled">
                                <li><a href="#">Lorem ipsum</a></li>
                                <li><a href="#">ipsum dolor</a></li>
                                <li><a href="#">dolor ipsum</a></li>
                                <li><a href="#">amet consectetur</a></li>
                                <li><a href="#">ipsum dolor sit</a></li>
                            </ul>
                        </li>
                        <li className="has-dropdown">
                            <i className="uil-bag"></i><a href="#"> Projects</a>
                            <ul className="sidebar-dropdown list-unstyled">
                                <li><a href="#">Lorem ipsum</a></li>
                                <li><a href="#">ipsum dolor</a></li>
                                <li><a href="#">dolor ipsum</a></li>
                                <li><a href="#">amet consectetur</a></li>
                                <li><a href="#">ipsum dolor sit</a></li>
                            </ul>
                        </li>
                        <li className="">
                            <i className="uil-setting"></i><a href="#"> Settings</a>
                            <ul className="sidebar-dropdown list-unstyled">
                                <li><a href="#">Lorem ipsum</a></li>
                                <li><a href="#">ipsum dolor</a></li>
                                <li><a href="#">dolor ipsum</a></li>
                                <li><a href="#">amet consectetur</a></li>
                                <li><a href="#">ipsum dolor sit</a></li>
                            </ul>
                        </li>
                        <li className="has-dropdown">
                            <i className="uil-chart-pie-alt"></i><a href="#"> Components</a>
                            <ul className="sidebar-dropdown list-unstyled">
                                <li><a href="#">Lorem ipsum</a></li>
                                <li><a href="#">ipsum dolor</a></li>
                                <li><a href="#">dolor ipsum</a></li>
                                <li><a href="#">amet consectetur</a></li>
                                <li><a href="#">ipsum dolor sit</a></li>
                            </ul>
                        </li>
                        <li className="has-dropdown">
                            <i className="uil-panel-add"></i><a href="#"> Charts</a>
                            <ul className="sidebar-dropdown list-unstyled">
                                <li><a href="#">Lorem ipsum</a></li>
                                <li><a href="#">ipsum dolor</a></li>
                                <li><a href="#">dolor ipsum</a></li>
                                <li><a href="#">amet consectetur</a></li>
                                <li><a href="#">ipsum dolor sit</a></li>
                            </ul>
                        </li>
                        <li className="">
                            <i className="uil-map-marker"></i><a href="#"> Maps</a>
                        </li>
                    </ul>
                </aside>

                <section id="wrapper">
                    <nav className="navbar navbar-expand-md">
                        <div className="container-fluid mx-2">
                            <div className="navbar-header">
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggle-navbar" aria-controls="toggle-navbar" aria-expanded="false" aria-label="Toggle navigation">
                                    <i className="uil-bars text-white"></i>
                                </button>
                                <a className="navbar-brand" href="#">admin<span className="main-color">kit</span></a>
                            </div>
                            <div className="collapse navbar-collapse" id="toggle-navbar">
                                <ul className="navbar-nav ms-auto">
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Settings
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li>
                                                <a className="dropdown-item" href="#">My account</a>
                                            </li>
                                            <li><a className="dropdown-item" href="#">My inbox</a>
                                            </li>
                                            <li><a className="dropdown-item" href="#">Help</a>
                                            </li>
                                            <li><div className="dropdown-divider" /></li>
                                            <li><a className="dropdown-item" href="#">Log out</a></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#"><i className="uil-comments-alt"></i><span>23</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#"><i className="uil-bell"></i><span>98</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            <i data-show="show-side-navigation1" className="uil-bars show-side-btn"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    {/* <div className="p-4">
                        <div className="welcome">
                            <div className="content rounded-3 p-3">
                                <h1 className="fs-3">Welcome to Dashboard</h1>
                                <p className="mb-0">Hello Jone Doe, welcome to your awesome dashboard!</p>
                            </div>
                        </div>

                        <section className="statistics mt-4">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
                                        <i className="uil-envelope-shield fs-2 text-center bg-primary rounded-circle"></i>
                                        <div className="ms-3">
                                            <div className="d-flex align-items-center">
                                                <h3 className="mb-0">1,245</h3> <span className="d-block ms-2">Emails</span>
                                            </div>
                                            <p className="fs-normal mb-0">Lorem ipsum dolor sit amet</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
                                        <i className="uil-file fs-2 text-center bg-danger rounded-circle"></i>
                                        <div className="ms-3">
                                            <div className="d-flex align-items-center">
                                                <h3 className="mb-0">34</h3> <span className="d-block ms-2">Projects</span>
                                            </div>
                                            <p className="fs-normal mb-0">Lorem ipsum dolor sit amet</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="box d-flex rounded-2 align-items-center p-3">
                                        <i className="uil-users-alt fs-2 text-center bg-success rounded-circle"></i>
                                        <div className="ms-3">
                                            <div className="d-flex align-items-center">
                                                <h3 className="mb-0">5,245</h3> <span className="d-block ms-2">Users</span>
                                            </div>
                                            <p className="fs-normal mb-0">Lorem ipsum dolor sit amet</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="charts mt-4">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="chart-container rounded-2 p-3">
                                        <h3 className="fs-6 mb-3">Chart title number one</h3>
                                        <canvas id="myChart"></canvas>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="chart-container rounded-2 p-3">
                                        <h3 className="fs-6 mb-3">Chart title number two</h3>
                                        <canvas id="myChart2"></canvas>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="admins mt-4">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="box">
                                        <!-- <h4>Admins:</h4> -->
                                        <div className="admin d-flex align-items-center rounded-2 p-3 mb-4">
                                            <div className="img">
                                                <img className="img-fluid rounded-pill"
                                                    width="75" height="75"
                                                    src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148906966/small/1501685402/enhance"
                                                    alt="admin">
                                            </div>
                                            <div className="ms-3">
                                                <h3 className="fs-5 mb-1">Joge Lucky</h3>
                                                <p className="mb-0">Lorem ipsum dolor sit amet consectetur elit.</p>
                                            </div>
                                        </div>
                                        <div className="admin d-flex align-items-center rounded-2 p-3 mb-4">
                                            <div className="img">
                                                <img className="img-fluid rounded-pill"
                                                    width="75" height="75"
                                                    src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907137/small/1501685404/enhance"
                                                    alt="admin">
                                            </div>
                                            <div className="ms-3">
                                                <h3 className="fs-5 mb-1">Joge Lucky</h3>
                                                <p className="mb-0">Lorem ipsum dolor sit amet consectetur elit.</p>
                                            </div>
                                        </div>
                                        <div className="admin d-flex align-items-center rounded-2 p-3">
                                            <div className="img">
                                                <img className="img-fluid rounded-pill"
                                                    width="75" height="75"
                                                    src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907019/small/1501685403/enhance"
                                                    alt="admin">
                                            </div>
                                            <div className="ms-3">
                                                <h3 className="fs-5 mb-1">Joge Lucky</h3>
                                                <p className="mb-0">Lorem ipsum dolor sit amet consectetur elit.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="box">
                                        <!-- <h4>Moderators:</h4> -->
                                        <div className="admin d-flex align-items-center rounded-2 p-3 mb-4">
                                            <div className="img">
                                                <img className="img-fluid rounded-pill"
                                                    width="75" height="75"
                                                    src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907114/small/1501685404/enhance"
                                                    alt="admin">
                                            </div>
                                            <div className="ms-3">
                                                <h3 className="fs-5 mb-1">Joge Lucky</h3>
                                                <p className="mb-0">Lorem ipsum dolor sit amet consectetur elit.</p>
                                            </div>
                                        </div>
                                        <div className="admin d-flex align-items-center rounded-2 p-3 mb-4">
                                            <div className="img">
                                                <img className="img-fluid rounded-pill"
                                                    width="75" height="75"
                                                    src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907086/small/1501685404/enhance"
                                                    alt="admin">
                                            </div>
                                            <div className="ms-3">
                                                <h3 className="fs-5 mb-1">Joge Lucky</h3>
                                                <p className="mb-0">Lorem ipsum dolor sit amet consectetur elit.</p>
                                            </div>
                                        </div>
                                        <div className="admin d-flex align-items-center rounded-2 p-3">
                                            <div className="img">
                                                <img className="img-fluid rounded-pill"
                                                    width="75" height="75"
                                                    src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907008/medium/1501685726/enhance"
                                                    alt="admin">
                                            </div>
                                            <div className="ms-3">
                                                <h3 className="fs-5 mb-1">Joge Lucky</h3>
                                                <p className="mb-0">Lorem ipsum dolor sit amet consectetur elit.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="statis mt-4 text-center">
                            <div className="row">
                                <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                                    <div className="box bg-primary p-3">
                                        <i className="uil-eye"></i>
                                        <h3>5,154</h3>
                                        <p className="lead">Page views</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                                    <div className="box bg-danger p-3">
                                        <i className="uil-user"></i>
                                        <h3>245</h3>
                                        <p className="lead">User registered</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
                                    <div className="box bg-warning p-3">
                                        <i className="uil-shopping-cart"></i>
                                        <h3>5,154</h3>
                                        <p className="lead">Product sales</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    <div className="box bg-success p-3">
                                        <i className="uil-feedback"></i>
                                        <h3>5,154</h3>
                                        <p className="lead">Transactions</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="charts mt-4">
                            <div className="chart-container p-3">
                                <h3 className="fs-6 mb-3">Chart title number three</h3>
                                <div style="height: 300px">
                                    <canvas id="chart3" width="100%"></canvas>
                                </div>
                            </div>
                        </section>
                    </div> */}
                </section>

            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuAdmin);
