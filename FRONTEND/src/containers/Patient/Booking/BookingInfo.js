import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import HomeHeader from '../../Homepage/HomeHeader';
import moment from 'moment';
import { getDoctorById, getAllUsers, getUserByEmail, createBookingSchedule } from '../../../services/userService';
import { LANGUAGES, ADMIN_ACTION, CommonUtils } from '../../../utils';
import NumberFormat from 'react-number-format';
import './Booking.scss';
import _ from 'lodash';

class BookingInfo extends Component {
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
            passMess: '',
            doctor: '',
            user: ''
        }
    }

    componentDidMount = async () => {
        this.props.getGenderStart();
        let doctor = await getDoctorById(this.props.location.state.doctor_id);
        let user = await getUserByEmail(sessionStorage.getItem("isLoginEmail"));
        this.setState({
            doctor: doctor.doctors,
            user: user.user
        })

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
        for (let i = 0; i < checkArr.length; i++) {
            if (!this.state[checkArr[i]]) {
                this.setState({
                    passMess: 'Chưa nhập đủ các thông tin bắt buộc!',
                })
                return false;
            }
        }

        if (password !== password_confirmation) {
            this.setState({
                passMess: 'Mật khẩu chưa khớp, vui lòng nhập lại!',
            })
            return false;
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

    saveBooking = async () => {
        let data = this.props.location.state;
        if (this.state.user.id && data.doctor_id) {
            let message = await createBookingSchedule({
                status_id: 'S1',
                doctor_id: data.doctor_id,
                patient_id: this.state.user.id,
                date: data.date,
                time_type: data.time_type,
            })
        }

    }

    render() {
        let { arrGender, lastname, firstname, email, phone, gender, address, password, password_confirmation, passMess, doctor, user } = this.state;
        let data = this.props.location.state;
        console.log(user);
        console.log(data.doctor_id)
        // console.log(this.state.data.doctor_id)
        console.log(arrGender)
        let genderOne = arrGender && arrGender.length > 0 && arrGender.find((gender) => {
            return user.gender === gender.keyMap
        })
        console.log(genderOne)
        return (
            <>
                <HomeHeader isShow={false} />
                <div className="booking-infor-container">
                    <div className="booking-infor-content">
                        <div className="booking-infor-form-content">
                            <h3 className="booking-infor-form-heading">TIẾN HÀNH ĐẶT KHÁM</h3>
                            <div className='booking-infor-text'>VUI LÒNG XÁC NHẬN THÔNG TIN</div>
                            <div className='divide-line '></div>
                            <div className='booking-infor-text-2'>1. THÔNG TIN KHÁM</div>
                            <div className='booking-infor-table'>
                                <table id="booking-infor">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '300px' }}>Chuyên khoa</th>
                                            <th>Ngày khám</th>
                                            <th>Thời gian</th>
                                            <th>Bác sĩ</th>
                                            <th>Số tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{data.specialty_name}</td>
                                            <td>{moment(data.date).format("DD-MM-YYYY")}</td>
                                            <td>{data.scheduleData.value_vi}</td>
                                            <td>{doctor.firstname}</td>
                                            <td> <NumberFormat value={data.specialty_price} displayType={'text'} thousandSeparator={true} prefix={''} /> VNĐ{ }</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                            <div className='booking-infor-text-2'>2. THÔNG TIN BỆNH NHÂN</div>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className="form-group ">
                                        <div className='row booking-user-infor'>
                                            <div className='col-6'>
                                                <div><b>Họ và tên: </b>{user.lastname} {user.firstname}</div>
                                                <div><b>Số điện thoại: </b>{user.phonenumber}</div>
                                                <div><b>Giới tính: </b>{genderOne ? genderOne.value_vi : ''}</div>
                                            </div>
                                            <div className='col-6'>
                                                <div><b>Email: </b>{user.email}</div>

                                                <div><b>Địa chỉ: </b>{user.address}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row col-12">
                                <div className='col-12'></div>
                                <button className="form-submit col-3 " onClick={() => this.saveBooking()}>ĐĂNG KÝ</button>
                                <button className="form-submit col-3 " onClick={() => this.registerUser()}>QUAY VỀ</button>
                            </div>
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingInfo);
