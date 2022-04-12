import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import moment from 'moment';
import localization from 'moment/locale/vi';
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
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (prevProps.doctorId !== this.props.doctorId) {
            let id = this.props.doctorId;
            let schedule = await getDoctorSchedule(id, +this.state.toDay);
            let specialty = await getSpecialty(this.props.specialtyId);
            this.setState({
                schedule: schedule.existedSchedule,
                specialty: specialty.specialty ? specialty.specialty : 0
            })
        }
    }

    onChangeSelect = async (e) => {
        if (this.props.doctorId && e.target.value) {
            let id = this.props.doctorId;
            let schedule = await getDoctorSchedule(id, e.target.value);
            this.setState({
                schedule: schedule.existedSchedule,
            })
        }
    }

    bookMedicalService = (data) => {
        if (this.props.history) {
            this.props.history.push('/booking', data);
        }
    }

    render() {
        let { arrDays, schedule, specialty, toDay, doctorId } = this.state;
        let { language } = this.props;
        return (
            <div className='doctor-schedule-container'>
                <div className='right-booking'>
                    <div className='right-booking-info'> THÔNG TIN CHI TIẾT ĐẶT KHÁM</div>
                    <div>Giá khám: </div>
                    <div className='right-booking-price'>
                        <NumberFormat value={specialty.specialty_price} displayType={'text'} thousandSeparator={true} prefix={''} /> VNĐ
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
                        {schedule && schedule.length > 0 && schedule.map((time, index) => {
                            console.log(time)
                            return (
                                <button
                                    className='select-date-time-btn'
                                    onClick={() => this.bookMedicalService({ ...time, ...specialty })}>{time.scheduleData.value_en}</button>
                            )
                        })}
                        {schedule && schedule.length === 0 && <div>Không có lịch hẹn, vui lòng chọn ngày khác!</div>}
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
