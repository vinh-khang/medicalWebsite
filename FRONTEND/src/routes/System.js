import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserRedux from '../containers/System/Admin/UserRedux';
import DoctorManage from '../containers/System/Doctor/DoctorManage';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ShowSpecialty from '../containers/System/Specialty/ShowSpecialty';
import Header from '../containers/Header/Header';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import ClinicPost from '../containers/System/Clinic/ClinicPost';
import BookingSchedule from '../containers/System/Booking/BookingSchedule';
import Footer from '../containers/Homepage/Footer';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <React.Fragment>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        {this.props.userInfo.role_id === 'R2' ?
                            <Switch>
                                <Route path="/system/doctor-schedule-management" component={ManageSchedule} />
                                <Route path="/system/booking-info" exact component={(BookingSchedule)} />
                                <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                            </Switch>
                            :
                            <Switch>
                                <Route path="/system/user-management" component={UserRedux} />
                                <Route path="/system/doctor-management" component={DoctorManage} />
                                <Route path="/system/doctor-schedule-management" component={ManageSchedule} />
                                <Route path="/system/manage-specialty" component={ManageSpecialty} />
                                <Route path="/system/show-specialty" component={ShowSpecialty} />
                                <Route path="/system/clinic-post-management" exact component={(ClinicPost)} />
                                <Route path="/system/booking-info" exact component={(BookingSchedule)} />
                                <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                            </Switch>}
                    </div>
                </div>{this.props.isLoggedIn && <Footer />}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
