import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import DoctorManage from '../containers/System/Admin/Doctor/DoctorManage';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ShowSpecialty from '../containers/System/Specialty/ShowSpecialty';
import Header from '../containers/Header/Header';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import ClinicIntro from '../containers/System/Clinic/ClinicIntro';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <React.Fragment>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/crud-user" component={UserManage} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-doctor" component={DoctorManage} />
                            <Route path="/system/manage-schedule" component={ManageSchedule} />
                            <Route path="/system/manage-specialty" component={ManageSpecialty} />
                            <Route path="/system/show-specialty" component={ShowSpecialty} />
                            <Route path="/system/clinic-intro" exact component={(ClinicIntro)} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
