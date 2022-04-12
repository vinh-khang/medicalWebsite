import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import './ManageSchedule.scss';
import { toast } from "react-toastify";
import { saveBulkSchedule } from '../../../services/userService';


class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            allDoctors: [],
            currentDate: null,
            allTime: []
        }
    }

    async componentDidMount() {
        this.props.fetchAllDoctorsStart();
        this.props.getTimeRangeStart();

    }

    handleConvertName = (data) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((doctor, index) => {
                let obj = {};
                let name_vi = `${doctor.lastname} ${doctor.firstname}`;
                let name_en = `${doctor.firstname} ${doctor.lastname}`;
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
        this.setState({
            selectedOption: selectedOption
        });

    }


    handleChangeDate = (date) => {
        this.setState({
            currentDate: date[0]
        })
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
        const { selectedOption, currentDate, allTime } = this.state;
        let result = [];
        if (!selectedOption) {
            toast.error('Doctor is empty!');
            return;
        }
        let formatedDate = null;
        console.log(currentDate);
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
            toast.success('Add schedule successfully!!!')
        } else {
            toast.error('Time range is not selected!');
            return;
        }
    }

    render() {
        let { selectedOption, allDoctors, currentDate, allTime } = this.state;
        console.log(allTime);
        return (
            <React.Fragment>
                <div className="manage-schedule-container">
                    <div className="manage-schedule-content">
                        <div className='title text-center'>SCHEDULE MANAGE</div>
                        <div className='manage-schedule'>
                            <div className='doctor-search'>
                                <label>Chọn bác sĩ</label>
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChangeSelect}
                                    options={allDoctors}
                                />

                            </div>
                            <div className='date-search'>
                                <label>Chọn ngày</label>
                                <DatePicker
                                    onChange={this.handleChangeDate}
                                    className='form-control'
                                    minDate={new Date()}
                                    value={currentDate}
                                />
                            </div>

                        </div>
                        <div className='time-range'>
                            {allTime && allTime.length > 0 && (
                                allTime.map((time, index) => {
                                    return (
                                        <button
                                            className={time.isSelected === true ? 'btn btn-info-custom active' : 'btn btn-info-custom'}
                                            key={index}
                                            onClick={() => this.handleClickBtn(time)}
                                        >
                                            {time.value_vi}
                                        </button>
                                    )
                                })

                            )}
                        </div>
                        <div className='submit'>
                            <button type="submit"
                                className="btn btn-info mt-3 col-3"
                                onClick={() => this.saveScheduleInfo()}><FormattedMessage id="user_manage.add" />
                            </button>
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
