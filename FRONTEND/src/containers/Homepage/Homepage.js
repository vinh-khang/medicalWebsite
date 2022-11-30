import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import HomePost from './Section/HomePost';
import Doctors from './Section/Doctors';
import Footer from './Footer';

import thongtin from '../../assets/images/thongtin.jpg';
import './Homepage.scss';

class Homepage extends Component {

    render() {
        const { processLogout } = this.props;

        return (
            <div>
                <HomeHeader isShow={true} />
                <Specialty />

                <Doctors />
                <HomePost />
                <img src={thongtin} className="hp-schedule"></img>

                <Footer />
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
