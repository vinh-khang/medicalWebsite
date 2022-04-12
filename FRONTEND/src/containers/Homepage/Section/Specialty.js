import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import icon from '../../../assets/images/icon/icon1.png';
import { getSpecialty } from '../../../services/specialtyService';

// import * as actions from "../../store/actions";
import { FormattedMessage } from 'react-intl';
import './Specialty.scss';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialtyArr: []
        }
    }

    componentDidMount = async () => {
        let specialty = await getSpecialty('ALL');
        this.setState({
            specialtyArr: specialty.specialty
        })
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 1
        };

        let { specialtyArr } = this.state;
        console.log(specialtyArr);
        return (
            <div className="specialty-homepage-container">
                <div className='specialty-content'>
                    <div className='title-section'>CHUYÊN KHOA</div>
                    <Slider {...settings}>
                        {specialtyArr && specialtyArr.map((item, index) => {
                            return (
                                <div className='slider-child' key={index}>
                                    <div className='slider-icon'>
                                        <div className='icon-img'
                                            style={{
                                                backgroundImage: `url(${new Buffer(item.specialty_image, 'base64')})`,
                                            }}
                                        />
                                    </div>
                                    <div className='slider-title'>{item.specialty_name}</div>
                                </div>
                            )
                        }
                        )
                        }

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
