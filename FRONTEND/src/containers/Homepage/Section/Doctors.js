import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant';
import { withRouter } from 'react-router';
import { getSpecialty } from '../../../services/specialtyService';

class Doctors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topDoctors: [],
            allSpecialty: [],
        }
    }

    componentDidMount = async () => {
        this.props.fetchTopDoctors();
        let specialty = await getSpecialty('ALL');
        console.log(specialty)
        this.setState({
            allSpecialty: specialty.specialty
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            let topDoctors = this.props.topDoctors;
            this.setState({
                topDoctors: topDoctors,
            });
        }
    }

    getDetailedDoctor = (doctor) => {
        this.props.history.push(`/doctor/${doctor.id}`);
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1
        };
        let { topDoctors, allSpecialty } = this.state;
        let { language } = this.props;
        return (
            <div className="doctor-container">

                <div className='doctor-content'>
                    <div className='title-doctor'><FormattedMessage id="homecontent.top_doctor" /></div>
                    <Slider {...settings}>
                        {topDoctors && topDoctors.map((doctor, index) => {
                            let img64 = '';
                            if (doctor.image) {
                                img64 = new Buffer(doctor.image, 'base64').toString('binary');
                            }
                            let name_vi = `${doctor.positionData.value_vi} ${doctor.lastname} ${doctor.firstname}`;
                            let name_en = `${doctor.positionData.value_en} ${doctor.lastname} ${doctor.firstname}`;
                            let speName = '';
                            if (doctor.DoctorDetail) {
                                speName = allSpecialty.find(item =>
                                    item.id === doctor.DoctorDetail.specialty_id
                                )
                            }

                            console.log("Ten chuyen khoa", speName)
                            return (
                                <div key={index} className='slider-child' onClick={() => this.getDetailedDoctor(doctor)}>
                                    <div className='slider-doctor-section'>
                                        <img className='doctor-img'
                                            style={{ backgroundImage: `url(${img64})` }}
                                        />

                                    </div>
                                    <div className='doctor-name'>{language === LANGUAGES.VI ? name_vi : name_en}</div>
                                    <div className='doctor-specialty'>{speName ? speName.specialty_name : ""}</div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        topDoctors: state.admin.topDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctors: () => dispatch(actions.fetchTopDoctorStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctors));
