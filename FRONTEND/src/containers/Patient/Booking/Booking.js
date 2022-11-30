import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import HomeHeader from '../../Homepage/HomeHeader';
import Footer from '../../Homepage/Footer';
import './Booking.scss';
import { createUserAPI } from '../../../services/userService';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import _ from 'lodash';

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastname: '',
            firstname: '',
            email: '',
            phone: '',
            gender: '',
            address: '',
            password: '',
            password_confirmation: '',
            arrGender: [],
            message: ''
        }
    }

    componentDidMount = async () => {
        this.props.getGenderStart();

    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                arrGender: this.props.genders,
                gender: this.props.genders && this.props.genders.length > 0 ? this.props.genders[0].keyMap : ''
            })
        }
    }

    validateForm = () => {
        let { lastname, firstname, email, phone, gender, address, password, password_confirmation } = this.state;
        let checkArr = ['lastname', 'firstname', 'email', 'phone', 'gender', 'address', 'password', 'password_confirmation'];



        const regexp = /^\d{10,11}$/;
        const checkingResult = regexp.exec(phone);
        if (checkingResult === null) {
            this.setState({
                message: 'Số điện thoại không chính xác. Số điện thoại phải có 10 - 11 chữ số!',
            })
            return false;
        }



        const emailRege = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const emailRegeResult = emailRege.exec(email);
        if (emailRegeResult === null) {
            this.setState({
                message: 'Định dạng Email sai!',
            })
            return false;
        }



        const passnRege = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const passnRegeResult = passnRege.exec(password);
        if (passnRegeResult === null) {
            this.setState({
                message: 'Mật khẩu tối thiếu 08 ký tự, bao gồm số và ký tự!',
            })
            return false;
        }

        if (password !== password_confirmation) {
            this.setState({
                message: 'Mật khẩu chưa khớp, vui lòng nhập lại!',
            })
            return false;
        }

        for (let i = 0; i < checkArr.length; i++) {
            if (!this.state[checkArr[i]]) {
                this.setState({
                    message: 'Chưa nhập đủ các thông tin bắt buộc!',
                })
                return false;
            }
        }

        return true

    }

    onInput = (e, id) => {
        let copyState = this.state;
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })


    }

    registerUser = async () => {
        if (!this.validateForm()) return;

        let data = await createUserAPI({
            email: this.state.email,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            address: this.state.address,
            phonenumber: this.state.phone,
            gender: this.state.gender,
            role_id: 'R3',
            position_id: null,
            image: null,
        })

        if (data.errCode === 1) {
            this.setState({
                message: 'Email đã tồn tại, vui lòng chọn email khác!',
            })
        } else {
            toast.success("Đăng ký tài khoản thành công, xin mời đăng nhập!");

            if (this.props.history) {
                this.props.history.push('/homepage')
            }
        }



    }

    render() {
        let { arrGender, lastname, firstname, email, phone, gender, address, password, password_confirmation, message } = this.state;
        return (
            <>
                <HomeHeader isShow={false} />
                <div className="booking-container">
                    <div className="booking-form-heading">ĐĂNG KÝ HỒ SƠ BỆNH NHÂN</div>
                    <div className="booking-content">
                        <div className="booking-form-content">

                            <div className="row justify-content-center align-items-center">
                                <div className='booking-detail'>(Sau khi đã điền đầy đủ thông tin, Quý khách hàng sẽ có thể sử dụng toàn bộ dịch vụ của MegaHealth)</div>
                            </div>
                            <br></br>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className="form-group ">
                                        <div className='row'>
                                            <div className='col-6'>
                                                <label className="form-label">Họ và chữ lót <i>(có dấu)</i> <span className='red'>*</span></label>
                                                <input name="lastname" type="text" placeholder="Vui lòng nhập họ và chữ lót"
                                                    className="form-control" required
                                                    value={lastname}
                                                    onChange={(e) => this.onInput(e, 'lastname')} />

                                            </div>
                                            <div className='col-6'>
                                                <label className="form-label">Tên <i>(có dấu)</i> <span className='red'>*</span></label>
                                                <input name="firstname" type="text" placeholder="Vui lòng nhập tên"
                                                    className="form-control"
                                                    value={firstname}
                                                    onChange={(e) => this.onInput(e, 'firstname')}
                                                />

                                            </div>
                                        </div>
                                    </div>


                                    <div className='row'>
                                        <div className='col-3'>
                                            <div className="form-group">
                                                <label htmlFor="gender" className="form-label">Giới tính <span className='red'>*</span></label>
                                                <select id="gender" name="gender" className="form-control" value={gender}
                                                    onChange={(e) => this.onInput(e, 'gender')}>
                                                    {arrGender && arrGender.length > 0 && arrGender.map((gender, index) => {
                                                        return (<option value={gender.keyMap} >{gender.value_vi}</option>)
                                                    })}
                                                </select>

                                            </div>
                                        </div>
                                        <div className='col-9'>
                                            <div className="form-group">
                                                <label htmlFor="phone" className="form-label">Số điện thoại <span className='red'>*</span></label>
                                                <input id="phone" name="phone" type="text"
                                                    placeholder="Vui lòng nhập số điện thoại"
                                                    className="form-control"
                                                    value={phone}
                                                    onChange={(e) => this.onInput(e, 'phone')}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address" className="form-label">Địa chỉ <span className='red'>*</span></label>
                                        <input id="address" name="address"
                                            type="text" placeholder="Vui lòng nhập địa chỉ chi tiết"
                                            className="form-control"
                                            value={address}
                                            onChange={(e) => this.onInput(e, 'address')}
                                        />

                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">Email <span className='red'>*</span></label>
                                        <input id="email" name="email" type="text"
                                            placeholder="Vui lòng nhập Email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => this.onInput(e, 'email')}
                                        />

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="form-label">Mật khẩu <span className='red'>*</span></label>
                                        <input id="password" name="password" type="password"
                                            placeholder="Vui lòng nhập mật khẩu"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => this.onInput(e, 'password')} />

                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password_confirmation" className="form-label">Nhập lại mật khẩu <span className='red'>*</span></label>
                                        <input id="password_confirmation" name="password_confirmation"
                                            placeholder="Nhập lại mật khẩu" type="password"
                                            className="form-control"
                                            value={password_confirmation}
                                            onChange={(e) => this.onInput(e, 'password_confirmation')}
                                        />
                                        <span className="form-message" style={{ color: 'red' }}>{message}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='divide-line'></div>
                            <div className="row justify-content-center align-items-center">
                                <button className="form-submit col-6 " onClick={() => this.registerUser()}><i className="fas fa-user-plus"></i> ĐĂNG KÝ</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        createUserStart: (data) => dispatch(actions.createUserStart(data)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Booking));
