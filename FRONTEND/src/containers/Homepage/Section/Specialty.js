import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import icon from '../../../assets/images/icon/icon1.png';
// import * as actions from "../../store/actions";
import { FormattedMessage } from 'react-intl';
import './Specialty.scss';

class Specialty extends Component {
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
            slidesToShow: 6,
            slidesToScroll: 1
        };
        return (
            <div className="specialty-container">

                <div className='specialty-content'>
                    <div className='title-section'>CHUYÊN KHOA</div>
                    <Slider {...settings}>
                        <div className='slider-child'>
                            <div className='slider-icon'>
                                <img className='icon-img' src={icon} />
                            </div>
                            <div className='slider-title'>AAAA</div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-icon'></div>
                            <div className='slider-title'></div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-icon'></div>
                            <div className='slider-title'></div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-icon'></div>
                            <div className='slider-title'></div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-icon'></div>
                            <div className='slider-title'></div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-icon'></div>
                            <div className='slider-title'></div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-icon'></div>
                            <div className='slider-title'></div>
                        </div>
                        <div className='slider-child'>
                            <div className='slider-icon'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
