import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import HomeHeader from '../../Homepage/HomeHeader';
import { LANGUAGES, ADMIN_ACTION, CommonUtils } from '../../../utils';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = async () => {


    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {

    }

    render() {
        let { time } = this.props.location.state.date;
        return (
            <>
                <HomeHeader isShow={false} />
                <div className="detailed-doctor-container">

                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
