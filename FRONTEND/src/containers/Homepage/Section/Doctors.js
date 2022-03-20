import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant';

class Doctors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topDoctors: [],
        }
    }

    componentDidMount = () => {
        this.props.fetchTopDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            let topDoctors = this.props.topDoctors;
            this.setState({
                topDoctors: topDoctors,
            });
            console.log('vo roi');
        }
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1
        };
        let { topDoctors } = this.state;
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
                            return (
                                <div key={index} className='slider-child'>
                                    <div className='slider-doctor-section'>
                                        <img className='doctor-img'
                                            style={{ backgroundImage: `url(${img64})` }}
                                        />

                                    </div>
                                    <div className='doctor-name'>{language === LANGUAGES.VI ? name_vi : name_en}</div>
                                    <div className='doctor-specialty'>Da liễu</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctors);
