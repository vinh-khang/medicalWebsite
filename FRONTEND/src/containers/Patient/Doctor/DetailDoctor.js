import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import HomeHeader from '../../Homepage/HomeHeader';
import { LANGUAGES, ADMIN_ACTION, CommonUtils } from '../../../utils';
import './DetailedDoctor.scss';
import DoctorSchedule from './DoctorSchedule';
import { getSpecialty } from '../../../services/specialtyService';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: null,
            doctorID: null,
            specialty: '',
        }
    }

    componentDidMount = async () => {
        await this.props.getDoctorIDStart(this.props.match.params.id);
        this.setState({
            doctorID: this.props.match.params.id,
        })

    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (prevProps.doctor !== this.props.doctor) {
            this.setState({
                doctor: this.props.doctor,
            })

        }

        if (prevState.doctor !== this.state.doctor) {
            if (this.state.doctor) {
                let specialty = await getSpecialty(this.state.doctor.DoctorDetail.specialty_id);
                this.setState({
                    specialty: specialty.specialty
                })

            }
        }
    }

    render() {
        let { doctor, specialty, doctorID } = this.state;
        let doctor_name = '';
        let image = '';
        if (doctor && doctor.positionData && doctor.image) {
            doctor_name = `${doctor.positionData.value_vi} ${doctor.lastname} ${doctor.firstname}`;
            image = new Buffer(doctor.image, 'base64').toString('binary');
        }

        console.log(specialty)
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
                                    {
                                        <div className='detaild-doctor-spe'>
                                            <i className="fa fa-plus-square"></i> {specialty ? specialty.specialty_name : ''}
                                        </div>
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
                                doctorId={doctorID}
                                specialtyId={specialty ? specialty.id : 0} />
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
