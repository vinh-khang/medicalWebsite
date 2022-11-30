import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'

import Login from './Auth/Login';
import DetailDoctor from './Patient/Doctor/DetailDoctor';
import Homepage from './Homepage/Homepage';
import System from '../routes/System';
import Booking from './Patient/Booking/Booking';
import BookingInfo from './Patient/Booking/BookingInfo';
import PatientLogin from './Patient/Login/PatientLogin';
import ManageSchedule from './System/Doctor/ManageSchedule';
import ClinicPost from './System/Clinic/ClinicPost';
import Post from './Patient/Post/Post';
import SpecialtyDetailed from './Patient/Specialty/SpecialtyDetailed';
import AllDoctor from './Patient/Doctor/AllDoctor';
import Profile from './Patient/Profile/Profile';
import _ from 'lodash';
import { CustomToastCloseButton } from '../components/CustomToast';
import './commonStyle.scss';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    componentDidUpdate = () => {
        if (history.action === "POP") {
            history.replace(history.location.pathname, path.HOME);
        }
    }

    render() {
        let { userInfo } = this.props;
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <span className="content-container">
                            <Switch>
                                <Route path={path.HOME} exact component={(Homepage)} />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                <Route path={path.HOMEPAGE} exact component={(Homepage)} />
                                <Route path="/doctor/:id" exact component={(DetailDoctor)} />
                                <Route path="/booking" exact component={(BookingInfo)} />
                                <Route path="/user-login" exact component={(PatientLogin)} />
                                <Route path="/user-register" exact component={(Booking)} />
                                <Route path="/post/:type" exact component={(Post)} />
                                <Route path="/specialty-detail/:id" exact component={(SpecialtyDetailed)} />
                                <Route path="/all-doctors" exact component={(AllDoctor)} />
                                <Route path="/profile" exact component={(Profile)} />
                            </Switch>
                        </span>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);