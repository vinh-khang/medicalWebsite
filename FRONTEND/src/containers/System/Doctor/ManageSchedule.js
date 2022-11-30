import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import './ManageSchedule.scss';
import moment from 'moment';
import { ListGroup, ListGroupItem } from 'reactstrap';
import localization from 'moment/locale/vi';
import { toast } from "react-toastify";
import _ from 'lodash';
import { saveBulkSchedule, getDoctorSchedule, deleteScheduleInfo } from '../../../services/userService';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            allDoctors: [],
            currentDate: null,
            allTime: [],
            room: 0,
            schedule: [],
            doctor: null,
            doctorLogin: false
        }
    }

    async componentDidMount() {
        let userInfo = this.props.userInfo;
        this.props.getTimeRangeStart();
        if (userInfo && !_.isEmpty(userInfo)) {
            if (userInfo.role_id === 'R2') {
                let doctor = {
                    label: `${userInfo.lastname} ${userInfo.firstname}`,
                    value: userInfo.id
                };

                this.setState({
                    selectedOption: doctor,
                    doctorLogin: true
                })
            } else {
                this.props.fetchAllDoctorsStart();
            }
        }


    }

    handleConvertName = (data) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((doctor, index) => {
                let obj = {};
                let name_vi = `${doctor.id} - ${doctor.lastname} ${doctor.firstname}`;
                let name_en = `${doctor.id} - ${doctor.firstname} ${doctor.lastname}`;
                obj.label = language === LANGUAGES.VI ? name_vi : name_en;
                obj.value = doctor.id;
                result.push(obj)
            })
        }

        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let allDoctors = this.handleConvertName(this.props.allDoctors);
            this.setState({
                allDoctors: allDoctors,
                selectedOption: null,
            })
        }

        if (prevProps.language !== this.props.language) {
            let allDoctors = this.handleConvertName(this.props.allDoctors);
            this.setState({
                allDoctors: allDoctors,
                selectedOption: null,
            })
        }

        if (prevProps.allTime !== this.props.allTime) {
            let data = this.props.allTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }

            this.setState({
                allTime: this.props.allTime,
            })
        }

    }

    handleChangeSelect = async (selectedOption) => {
        let { allTime } = this.state;
        if (allTime && allTime.length > 0) {
            allTime = allTime.map((time, index) => {
                time.isSelected = false;
                return time;
            })
        }
        this.setState({
            selectedOption: selectedOption,
            currentDate: null,
            schedule: [],
            room: 0
        });

    }


    handleChangeDate = async (date) => {
        let { selectedOption, allTime } = this.state;
        if (allTime && allTime.length > 0) {
            allTime = allTime.map((time, index) => {
                time.isSelected = false;
                return time;
            })
        }

        let day = moment(new Date(date[0])).startOf('days').valueOf();
        if (day === moment(new Date()).startOf('days').valueOf()) {
            toast.error('Ngày không hợp lệ!');
            this.setState({
                currentDate: null,
                schedule: [],
                room: 0
            })
            return;
        }

        if (selectedOption && day) {
            let schedule = await getDoctorSchedule(selectedOption.value, day);
            if (allTime && allTime.length > 0) {
                allTime = allTime.map((time, index) => {
                    schedule.existedSchedule.map((sche, index) => {
                        if (sche.time_type === time.keyMap) {
                            time.isSelected = true;
                        }
                        return time;
                    })

                    return time;

                })
            }

            this.setState({
                allTime: allTime,
                schedule: schedule.existedSchedule,
                currentDate: date[0],
                room: schedule.existedSchedule[0] ? schedule.existedSchedule[0].room : 0
            })

        }



    }

    handleClickBtn = (selectedTime) => {
        let { allTime } = this.state;
        if (allTime && allTime.length > 0) {
            allTime = allTime.map((time, index) => {
                if (selectedTime.id === time.id) time.isSelected = !time.isSelected;
                return time;
            })
        }

        this.setState({
            allTime: allTime,
        })
    }

    saveScheduleInfo = async () => {
        let { selectedOption, currentDate, allTime, room } = this.state;
        let result = [];
        if (!selectedOption) {
            toast.error('Doctor is empty!');
            return;
        }
        let formatedDate = null;

        if (!currentDate) {
            toast.error('Date is not selected!');
            return;
        } else {
            formatedDate = new Date(currentDate).getTime();
            if (!formatedDate) {
                toast.error('Min Date is wrong!!!');
                return;
            }
        }

        if (allTime && allTime.length > 0) {
            let selectedTime = allTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((time, index) => {
                    let object = {};
                    object.doctor_id = selectedOption.value;
                    object.room = room;
                    object.date = formatedDate;
                    object.time_type = time.keyMap;
                    result.push(object);
                })
            }

        }

        if (result && result.length > 0) {
            let res = await saveBulkSchedule({
                arrSchedule: result
            })

            let day = [currentDate]
            this.handleChangeDate(day);
            toast.success('Add schedule successfully!!!')
        } else {
            toast.error('Time range is not selected!');
            return;
        }
    }

    handleOnInput = (e, type) => {
        this.setState({
            room: e.target.value
        })
    }

    deleteScheduleInfo = async (id) => {
        let { currentDate } = this.state;
        await deleteScheduleInfo(id);
        let day = [currentDate]
        this.handleChangeDate(day);
    }

    render() {
        let { selectedOption, allDoctors, currentDate, allTime, room, schedule, doctor, doctorLogin } = this.state;


        return (
            <React.Fragment>
                <div className="manage-schedule-container">
                    <div className='manage-schedule-title text-center'>
                        <i className="fas fa-calendar-alt"></i><FormattedMessage id="doctor-manage.manage-schedule" /></div>
                    <div className="manage-schedule-content col-12">
                        <div className='manage-schedule row '>
                            <div className='doctor-search col-6'>
                                <label><FormattedMessage id="doctor-manage.doctor-name" /></label>
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChangeSelect}
                                    options={allDoctors}
                                    isDisabled={doctorLogin}
                                />

                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="doctor-manage.date-schedule" /></label>
                                <DatePicker
                                    onChange={this.handleChangeDate}
                                    className='form-control'
                                    minDate={new Date()}
                                    value={currentDate}
                                />
                            </div>
                            <div className='col-2'>
                                <label><FormattedMessage id="doctor-manage.room-schedule" /></label>
                                <input
                                    type="number" className="form-control"
                                    value={room} onChange={(e) => { this.handleOnInput(e, 'room') }}
                                    placeholder="Nhập số phòng" />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='time-range col-6'>
                                <label><FormattedMessage id="doctor-manage.time-schedule" /></label>
                                <br></br>
                                {allTime && allTime.length > 0 && (
                                    allTime.map((time, index) => {
                                        return (
                                            <button
                                                className={time.isSelected === true ? 'btn btn-info-custom active' : 'btn btn-info-custom'}
                                                key={index}
                                                onClick={() => this.handleClickBtn(time)}
                                            >
                                                {time.value_en}
                                            </button>
                                        )
                                    })

                                )}
                            </div>
                            <div className='existed-schedule col-6 '>
                                <label className='col-12'><FormattedMessage id="doctor-manage.selected-time" /></label>
                                <ListGroup flush numbered>
                                    {schedule && schedule.length > 0
                                        && schedule.map((time, index) => {
                   
                                            return (
                                                <ListGroupItem
                                                    tag="a"
                                                    className='exist-time'
                                                >
                                                    <i className="fas fa-clock"></i> {time.scheduleData.value_en}
                                                    <i className="fas fa-calendar-times red" onClick={() => this.deleteScheduleInfo(time.id)}></i>
                                                </ListGroupItem>
                                            )
                                        })}
                                    {schedule && currentDate && schedule.length === 0 && <div className='red col-12'>Bạn chưa sắp xếp lịch khám vào ngày này</div>}
                                </ListGroup>

                            </div>
                        </div>


                        <div className='row'>
                            <div className='col-9'></div>
                            <div className='col-3 form-group'>
                                <button type="submit"
                                    className="btn btn-primary mt-3"
                                    onClick={() => this.saveScheduleInfo()}><i className="fas fa-calendar-plus"></i>
                                    <FormattedMessage id="common.update" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allTime: state.admin.allTime,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
        createMoreInfoDoctorStart: (data) => dispatch(actions.createMoreInfoDoctorStart(data)),
        getTimeRangeStart: () => dispatch(actions.getTimeRangeStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
