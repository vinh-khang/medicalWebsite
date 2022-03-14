import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import Services from './Section/Services';
import Doctors from './Section/Doctors';
// import Navigator from '../../components/Navigator';
// // import { adminMenu } from './menuApp';
import './Homepage.scss';

class Homepage extends Component {

    render() {
        const { processLogout } = this.props;

        return (
            <div>
                <HomeHeader />
                <Specialty />
                <Services />
                <Doctors />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
