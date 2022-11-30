import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import HomeHeader from '../../Homepage/HomeHeader';
import Footer from '../../Homepage/Footer';
import { LANGUAGES, ADMIN_ACTION, CommonUtils } from '../../../utils';
import { Button, UncontrolledCollapse, Card, CardBody } from 'reactstrap';
import quytrinh from '../../../assets/images/quytrinh.jpg';
import './AllDoctor.scss';
import { getDoctorBySpecialty } from '../../../services/userService';
import { getAllDoctor } from '../../../services/userService';
import ListDoctor from './ListDoctor';

class AllDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: null,
            specialtyID: null,
            specialty: '',
            isLogin: '',
            isLoginEmail: ''

        }
    }

    componentDidMount = async () => {
        let doctor = await getDoctorBySpecialty('ALL');
        this.setState({
            specialtyID: this.props.match.params.id,
            doctor: doctor.data
        })
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
    }

    render() {
        let { specialty, doctor } = this.state;
        return (
            <>
                <HomeHeader isShow={false} />
                <div className='specialty-detail-container'>

                    <div className='specialty-detail-banner' style={{ backgroundImage: `url(${quytrinh})` }}>
                        <div className='specialty-detail-title'>
                            TẤT CẢ BÁC SĨ<br />
                            {specialty.specialty_name}
                        </div>
                    </div>

                    {doctor &&
                        <ListDoctor
                            doctorInfor={doctor}
                        />
                    }
                </div>
                <Footer />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        doctor: state.user.doctor,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDoctorIDStart: (id) => dispatch(actions.getDoctorIDStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDoctor);
