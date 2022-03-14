import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import service from '../../../assets/images/services/service1.jpg';
import { FormattedMessage } from 'react-intl';

class Services extends Component {
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
            slidesToShow: 4,
            slidesToScroll: 1
        };
        return (
            <div className="section-container">

                <div className='section-content'>
                    <div className='title-section'>DỊCH VỤ</div>
                    <Slider {...settings}>
                        <div className='slider-child'>
                            <div className='slider-section'>
                                <img className='services-img' src={service} />
                            </div>
                            <div className='slider-title'>AAAA</div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-section'>
                                <img className='services-img' src={service} />
                            </div>
                            <div className='slider-title'></div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-section'>
                                <img className='services-img' src={service} />
                            </div>
                            <div className='slider-title'></div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-section'>
                                <img className='services-img' src={service} />
                            </div>
                            <div className='slider-title'></div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-section'>
                                <img className='services-img' src={service} />
                            </div>
                            <div className='slider-title'></div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-section'>
                                <img className='services-img' src={service} />
                            </div>
                            <div className='slider-title'></div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-section'>
                                <img className='services-img' src={service} />
                            </div>
                            <div className='slider-title'></div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-section'>
                                <img className='services-img' src={service} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Services);
