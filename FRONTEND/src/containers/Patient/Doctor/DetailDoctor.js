import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import HomeHeader from '../../Homepage/HomeHeader';
import { LANGUAGES, ADMIN_ACTION, CommonUtils } from '../../../utils';
import './DetailedDoctor.scss';
import DoctorSchedule from './DoctorSchedule';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: null,
        }
    }

    componentDidMount = () => {
        this.props.getDoctorIDStart(this.props.match.params.id);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.doctor !== this.props.doctor) {
            this.setState({
                doctor: this.props.doctor,
            })
        }
    }

    render() {
        let { doctor } = this.state;
        let doctor_name = '';
        let image = '';
        if (doctor && doctor.positionData && doctor.image) {
            doctor_name = `${doctor.positionData.value_vi} ${doctor.lastname} ${doctor.firstname}`;
            image = new Buffer(doctor.image, 'base64').toString('binary');
        }

        return (
            <>
                <HomeHeader isShow={false} />
                <div className="detailed-doctor-container">
                    <div className='detailed-doctor-content'>
                        <div className='detailed-doctor-infor'>
                            <div className='detailed-doctor-img' style={{ backgroundImage: `url(${image})` }}>

                            </div>
                            <div className='detailed-doctor-desc'>
                                <div className='detaild-doctor-name'>
                                    {
                                        <span>
                                            {doctor_name}
                                        </span>
                                    }
                                </div>
                                <div className='detaild-doctor-text'>
                                    {doctor && doctor.DetailedInformation
                                        && doctor.DetailedInformation.description &&
                                        (
                                            <span>
                                                {doctor.DetailedInformation.description}
                                            </span>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='booking-doctor'>
                            <DoctorSchedule
                                doctorId={doctor} />
                        </div>
                        <div className='detailed-doctor-markdown'>
                            {doctor && doctor.DetailedInformation
                                && doctor.DetailedInformation.contentHTML &&
                                (
                                    <span>
                                        <div dangerouslySetInnerHTML={{ __html: doctor.DetailedInformation.contentHTML }}></div>
                                    </span>
                                )
                            }
                        </div>
                        <div className='detailed-doctor-comment'></div>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
