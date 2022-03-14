import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import doctor from '../../../assets/images/doctors/bs1.jpg';
import { FormattedMessage } from 'react-intl';

class Doctors extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        return (
            <div className="section-container">

                <div className='section-content'>
                    <div className='title-section'>BÁC SĨ NỔI BẬT TRONG TUẦN</div>
                    <Slider {...settings}>
                        <div className='slider-child'>
                            <div className='slider-doctor-section'>
                                <img className='doctor-img' src={doctor} />

                            </div>
                            <div className='doctor-name'>Nguyễn Vĩnh Khang</div>
                            <div className='doctor-specialty'>Da liễu</div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-doctor-section'>
                                <img className='doctor-img' src={doctor} />
                            </div>
                            <div className='slider-title'></div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-doctor-section'>
                                <img className='doctor-img' src={doctor} />
                            </div>
                            <div className='slider-title'></div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-doctor-section'>
                                <img className='doctor-img' src={doctor} />
                            </div>
                            <div className='slider-title'></div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-doctor-section'>
                                <img className='doctor-img' src={doctor} />
                            </div>
                            <div className='slider-title'></div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-doctor-section'>
                                <img className='doctor-img' src={doctor} />
                            </div>
                            <div className='slider-title'></div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-doctor-section'>
                                <img className='doctor-img' src={doctor} />
                            </div>
                            <div className='slider-title'></div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-doctor-section'>
                                <img className='doctor-img' src={doctor} />
                            </div>
                            <div className='slider-title'></div>
                        </div>

                    </Slider>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctors);
