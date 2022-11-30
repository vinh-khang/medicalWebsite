import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import megahealth from '../../assets/images/megahealth.png';
import './Homepage.scss';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <>
                <footer className="footer-section">
                    <div className="container">
                        <div className="footer-content pt-3 pb-3">
                            <div className="row">
                                <div className="col-xl-4 col-lg-4 mb-50">
                                    <div className="footer-widget">
                                        <div className="footer-logo">
                                            <a href="/homepage"><img src={megahealth} className="img-fluid" alt="logo" /></a>
                                        </div>
                                        <div className="footer-text">
                                            <p>Chào mừng bạn đến với website đăng ký khám bệnh theo hẹn <span className='red'>Mega</span><span className='blue'>Health!</span></p>
                                        </div>
                                        <div className="footer-social-icon">
                                            <span>THEO DÕI MEGAHEALTH TẠI:</span>
                                            <a target="_blank" href="https://www.facebook.com/khangcuteisme" ><i className="fab fa-facebook-f facebook-bg"></i></a>
                                            <a target="_blank" href="https://twitter.com/" ><i className="fab fa-twitter twitter-bg"></i></a>
                                            <a target="_blank" href="https://www.youtube.com/" ><i className="fab fa-youtube google-bg"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                                    <div className="footer-widget">
                                        <div className="footer-widget-heading">
                                            <h3>LIÊN KẾT NHANH</h3>
                                        </div>
                                        <ul>
                                            <li><a href="/">Trang chủ</a></li>
                                            <li><a href="/post/INTRO">Giới thiệu</a></li>
                                            <li><a href="/post/PROCEDURE">Quy trình</a></li>
                                            <li><a href="/post/GUIDE">Thắc mắc</a></li>
                                            {/* <li><a href="#">Thắc mắc</a></li> */}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                                    <div className="footer-widget">
                                        <div className="footer-widget-heading">
                                            <h3>LIÊN HỆ</h3>
                                        </div>
                                        {/* <div className="footer-text mb-25">
                                            <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                                        </div> */}
                                        <div className='mb-3'>
                                            <div>
                                                <p><i className="right fas fa-hospital"></i> <b>Bệnh viện ĐA KHOA MEGAHEALTH<sup>®</sup></b></p>
                                                <p className="style_addressLink__YbOjy">215 Hồng Bàng, P.11, Q.5, TP.HCM</p>
                                            </div>
                                        </div>
                                        <div className='mb-3'>
                                            <div>
                                                <span><i className="right fas fa-stethoscope"></i> <b>TƯ VẤN CHUYÊN MÔN: </b></span>
                                                <span><a href="tel:1900-7178" title="Tư vấn chuyên môn">1900-7178</a></span>
                                            </div>
                                        </div>
                                        <div className='mb-3'>
                                            <div>
                                                <span><i className="right fas fa-cog"></i> <b>HỖ TRỢ ĐẶT KHÁM: </b></span>
                                                <span><a href="tel:19002115" title="Hỗ trợ đặt khám">1900.2115</a></span>
                                            </div>
                                        </div>
                                        <div className='mb-3'>
                                            <div>
                                                <span><i className="right fas fa-envelope"></i>khangb1809244@student.ctu.edu.vn</span>
                                                <span></span>
                                            </div>
                                        </div>

                                        {/* <div className="row">
                                            <div className="col-xl-4 col-md-4 mb-30">
                                                <div className="single-cta">
                                                    <i className="fas fa-map-marker-alt"></i>
                                                    <div className="cta-text">
                                                        <h4>Find us</h4>
                                                        <span></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-md-4 mb-30">
                                                <div className="single-cta">
                                                    <i className="fas fa-phone"></i>
                                                    <div className="cta-text">
                                                        <h4>Call us</h4>
                                                        <span>9876543210 0</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-md-4 mb-30">
                                                <div className="single-cta">
                                                    <i className="far fa-envelope-open"></i>
                                                    <div className="cta-text">
                                                        <h4>Mail us</h4>
                                                        <span>mail@info.com</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="copyright-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                                    <div className="copyright-text">
                                        <p>Copyright &copy; 2018, All Right Reserved MegaHealth</p>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                                    {/* <div className="footer-menu">
                                        <ul>
                                            <li><a href="#">Home</a></li>
                                            <li><a href="#">Terms</a></li>
                                            <li><a href="#">Privacy</a></li>
                                            <li><a href="#">Policy</a></li>
                                            <li><a href="#">Contact</a></li>
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
