import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDoctorSchedule } from '../../../services/userService';
import { getSpecialty } from '../../../services/specialtyService';
import NumberFormat from 'react-number-format';
import { withRouter } from 'react-router';
import './DoctorSchedule.scss';


class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDays: [],
            schedule: [],
            toDay: '',
            specialty: '',
            isLogin: '',
            isLoginEmail: '',
            isToday: true
        }
    }

    async componentDidMount() {
        let arrDays = []
        for (let i = 0; i < 7; i++) {
            let day = {};
            if (i === 0) {
                let today = moment(new Date()).format('DD/MM');
                day.label_vi = `Hôm nay - ${today}`;
                day.label_en = `Today - ${today}`;
                day.value = moment(new Date()).add(i, 'days').startOf('days').valueOf();
                arrDays.push(day);
            } else {
                day.label_vi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                day.label_en = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                day.value = moment(new Date()).add(i, 'days').startOf('days').valueOf();
                arrDays.push(day);
            }
        }

        this.setState({
            arrDays: arrDays,
            toDay: arrDays[0].value,

        })

        if (sessionStorage.getItem("isLoginEmail")) {
            this.setState({
                isLogin: true,
                isLoginEmail: sessionStorage.getItem("isLoginEmail"),
            })
        }

        let specialty = await getSpecialty(this.props.specialtyId);
        this.setState({
            specialty: specialty.specialty
        })
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (prevProps.specialtyId !== this.props.specialtyId) {
            let specialty = await getSpecialty(this.props.specialtyId);
            this.setState({
                specialty: specialty.specialty
            })


        }
    }

    onChangeSelect = async (e) => {
        if (this.props.doctorId && e.target.value != this.state.toDay) {
            let id = this.props.doctorId;
            let schedule = await getDoctorSchedule(id, e.target.value);
            this.setState({
                schedule: schedule.existedSchedule,
                isToday: false
            })
        } else {
            this.setState({
                schedule: [],
                isToday: true,
            })
        }
    }

    bookMedicalService = async (data) => {
        if (sessionStorage.getItem("isLoginEmail")) {
            await this.setState({
                isLogin: true,
                isLoginEmail: sessionStorage.getItem("isLoginEmail"),
            })
        }

        if (this.props.history && this.state.isLogin) {
            this.props.history.push('/booking', data);
        } else {
            toast.error("Vui lòng đăng nhập để đặt khám!");
            this.props.openForm();
        }
    }

    render() {
        let { arrDays, schedule, specialty, isToday } = this.state;
        let { language } = this.props;
        return (
            <div className='doctor-schedule-container'>
                <div className='right-booking'>
                    <div className='right-booking-info'> THÔNG TIN CHI TIẾT ĐẶT KHÁM</div>
                    <div className='row'>
                        <div className='col-5'><i className="fas fa-hospital"></i> Phòng khám: <div className='right-booking-price'> {schedule.length > 0 ? schedule[0].room : '...'}</div></div>
                        <div className='col-5'><i className="fas fa-tags"></i> Giá khám: <span><div className='right-booking-price'>
                            <NumberFormat value={specialty ? specialty.specialty_price : 0} displayType={'text'} thousandSeparator={true} prefix={''} /> VNĐ
                        </div></span></div>

                    </div>

                    <div>Chọn: Ngày muốn đăng ký, sau đó chọn khung giờ.</div>

                </div>
                <div className='left-schedule'>
                    <div className='select-date-schedule'>
                        <div className='calendar-title'>LỊCH KHÁM</div>
                        <select
                            onChange={(e) => this.onChangeSelect(e)}
                            className='select-transform'
                        >
                            {arrDays && arrDays.length > 0
                                && arrDays.map((day, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={day.value}
                                        >{language === LANGUAGES.VI ? day.label_vi : day.label_en}</option>
                                    )
                                })}

                        </select>
                    </div>
                    <div className='select-date-time'>
                        {schedule && schedule.length > 0
                            && !isToday && schedule.map((time, index) => {
                                return (<button
                                    className='select-date-time-btn'
                                    onClick={() => this.bookMedicalService({ ...time, ...specialty })}>{time.scheduleData.value_en}
                                </button>)

                            })}
                        {isToday && <div>Đặt lịch khám trước 01 ngày trong 01 phút với MegaHealth!</div>}
                        {schedule && schedule.length === 0 && !isToday && <div className='red'>Bác sĩ không có lịch khám vào ngày này, vui lòng chọn ngày khác!</div>}

                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule));
