import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import HomeHeader from '../../Homepage/HomeHeader';
import Footer from '../../Homepage/Footer';
import ProfileTable from '../Profile/ProfileTable';
import moment from 'moment';
import { getDoctorById, getAllUsers, getUserByEmail, createBookingSchedule } from '../../../services/userService';
import { LANGUAGES, ADMIN_ACTION, CommonUtils } from '../../../utils';
import NumberFormat from 'react-number-format';
import { FormControl, FormLabel, Radio, FormControlLabel, RadioGroup, touchRippleClasses } from '@mui/material';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './Booking.scss';
import payment from '../../../assets/images/payment.jpg';
import _, { set } from 'lodash';
import { toast } from 'react-toastify';

class BookingInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passMess: '',
            doctor: '',
            user: '',
            data: '',
            isOpen: false,
            payment: 'KB',
            isOpen2: false
        }
    }

    componentDidMount = async () => {
        if (sessionStorage.getItem("isLoginEmail")) {
            let doctor = await getDoctorById(this.props.location.state.doctor_id);
            let user = await getUserByEmail(sessionStorage.getItem("isLoginEmail"));
            let data = this.props.location.state;
            if (typeof data === 'string' || data instanceof String) {
                this.props.history.push('/homepage')
            }
            this.setState({
                doctor: doctor.doctors,
                user: user.user,
                data: data
            })
        } else {
            if (this.props.history) {
                this.props.history.push('/homepage')
            }
        }
    }


    componentDidUpdate = async (prevProps, prevState, snapshot) => {

    }

    backHome = () => {
        if (this.props.history) {
            this.props.history.push('/homepage')
        }
    }

    selectPayment = (e) => {
        this.setState({
            payment: e.target.value
        })
    }

    openModal = () => {
        let { doctor, user, data, payment } = this.state;
        if (!payment) {
            toast.error("Chưa chọn phương thức thanh toán")
        }
        if (!data || !user || !doctor) {
            this.props.history.push('/homepage')
        }
        this.setState({
            isOpen: !this.state.isOpen
        })

    }

    openModalSuccess = () => {
        this.setState({
            isOpen2: !this.state.isOpen2
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
                price: data.specialty_price,
                payment: this.state.payment,
                room: data.room
            })

            if (message.errCode !== 0) {
                toast.error(message.errMessage);
                if (this.props.history) {
                    this.props.history.push(`/doctor/${data.doctor_id}`)
                }
            } else {
                this.openModal();
                this.openModalSuccess();
            }

        }


    }

    backPage = (id) => {
        if (this.props.history) {
            this.props.history.push(`/doctor/${id}`)
        }
    }

    viewAppointment = () => {
        if (this.props.history) {
            this.props.history.push(`/profile`)
        }
    }

    render() {
        let { doctor, user, data } = this.state;
        return (
            <>
                <HomeHeader isShow={false} />
                <div className='row booking-infor-container'>
                    <h3 className="booking-infor-form-heading"><i className="fas fa-calendar-check"></i> TIẾN HÀNH ĐẶT KHÁM</h3>
                    <div className="booking-infor-content">
                        <div className="booking-infor-form-content row">
                            {/* <div className='booking-infor-text'>TIẾN HÀNH ĐẶT KHÁM</div> */}
                            <div className='divide-line '></div>
                            <div className="left-booking-infor">
                                <div className='booking-infor-text-2'>1. THÔNG TIN BỆNH NHÂN</div>
                                {user &&
                                    <ProfileTable
                                        userInfor={user}
                                    />
                                }
                                <br></br>
                                <div className="timeline_content">
                                    <div className="ct_inside">
                                        <div>Người bệnh không BHYT sẽ đến trực tiếp phòng khám trước giờ hẹn 15-30 phút để khám bệnh .</div>
                                    </div>
                                </div>
                            </div>
                            <div className='right-booking-infor'>
                                <div className='booking-infor-text-2'>2. THÔNG TIN ĐẶT KHÁM</div>
                                <div className='booking-infor-title'><i className="fas fa-notes-medical"></i> Thông tin đặt khám</div>
                                <div className='booking-infor-table'>
                                    <table id="booking-infor">
                                        <thead>
                                            <tr>
                                                <th>Chuyên khoa</th>
                                                <td>{data.specialty_name}</td>
                                            </tr>
                                            <tr>
                                                <th>Ngày khám</th>
                                                <td className='blue-weight'><b>{moment(data.date).format("DD-MM-YYYY")}</b></td>
                                            </tr>
                                            <tr>
                                                <th>Thời gian</th>
                                                <td className='blue-weight'><b>{data.scheduleData ? data.scheduleData.value_en : ''}</b></td>
                                            </tr>
                                            <tr>
                                                <th> Bác sĩ</th>
                                                <td>{doctor.lastname} {doctor.firstname}</td>
                                            </tr>
                                            <tr>
                                                <th> Số phòng</th>
                                                <td>{data ? data.room : '...'}</td>
                                            </tr>
                                            <tr>
                                                <th>Số tiền</th>
                                                <td> <NumberFormat value={data.specialty_price} displayType={'text'} thousandSeparator={true} prefix={''} /> VNĐ</td>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <br></br>
                                <div className='booking-infor-text-2'>3. CHỌN HÌNH THỨC THANH TOÁN</div>
                                <FormControl className='booking-infor-radio'>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="KB"
                                        name="radio-buttons-group"
                                        className='booking-infor-radio'
                                        onChange={(e) => this.selectPayment(e)}
                                    >
                                        <FormControlLabel value="KB" control={<Radio />} selected label="Thanh toán bằng thẻ Khám bệnh" />
                                        <FormControlLabel value="VS" control={<Radio />} label="Thanh toán bằng Thẻ quốc tế Visa, Master, JSB" />
                                        <FormControlLabel value="AT" control={<Radio />} label="Thanh toán bằng thẻ ATM nội địa/Internet Banking" />
                                        <FormControlLabel value="MM" control={<Radio />} label="Thanh toán bằng Ví Momo" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                        <div className='divide-line'></div>
                        <div className="col-12 row">
                            <div className='col-6'></div>
                            <div className="btn-space col-6 row">
                                <button className="btn-back" onClick={() => this.backPage(doctor.id)}>Quay về</button>
                                <button className="btn-booking" onClick={() => this.openModal()}> Đăng ký khám <i className="fas fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>

                </div>
                <Modal
                    isOpen={this.state.isOpen}
                    toggle={() => { this.openModal() }}
                    size="lg"
                    centered={true}
                    className='accept-booking-modal'
                >
                    <ModalHeader
                        toggle={() => { this.openModal() }}
                        centered={true}
                        className='accept-booking-modal-header'>
                        <i className="fas fa-credit-card"></i> Xác nhận thanh toán
                    </ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-row">
                                        <div className='accept-booking-form'>
                                            <div className='flex-img'>
                                                <img className='img-payment' src={payment} ></img>
                                            </div>
                                            <br></br>
                                            <div className='row'>
                                                <div className='accept-price'>Xác nhận đặt khám với số tiền <NumberFormat value={data.specialty_price} displayType={'text'} thousandSeparator={true} prefix={''} /> VNĐ</div>
                                            </div>
                                            <br></br>
                                            <div className='accept-noti'>Sau khi đặt khám thành công phiếu khám điện tử sẽ được gửi ngay qua email và trên phần mềm.</div>

                                            <div className='divide-line'></div>
                                            <div className="col-12">
                                                <div className="btn-space row">
                                                    <button className="btn-back" onClick={() => this.openModal()}>Quay về</button>
                                                    <button className="btn-booking" onClick={() => this.saveBooking()}> Đồng ý</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>

                </Modal>

                <Modal
                    isOpen={this.state.isOpen2}
                    size="lg"
                    centered={true}
                    className='accept-booking-modal-success'
                >
                    <ModalBody>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-row">
                                        <div className='accept-booking-form'>
                                            <div className='flex-success'>
                                                <i className="fas fa-check-circle"></i>
                                            </div>
                                            <br></br>
                                            <div className='row'>
                                                <div className='accept-price'>Xác nhận đăng ký lịch khám thành công!</div>
                                            </div>
                                            <br></br>
                                            <div className='accept-thanks'>Cảm ơn Quý khách đã sử dụng dịch vụ của MegaHealth</div>
                                            <div className='divide-line'></div>
                                            <div className="col-12">
                                                <div className="btn-space row">
                                                    <button className="btn-profile" onClick={() => this.viewAppointment()}>Xem phiếu khám</button>
                                                    <button className="btn-home" onClick={() => this.backHome()}>Về trang chủ</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>

                </Modal>
                <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingInfo);
