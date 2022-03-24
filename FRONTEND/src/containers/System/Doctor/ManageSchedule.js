import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import './ManageSchedule.scss';

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            allDoctors: [],
            currentDate: new Date(),
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
                                        <button className='btn btn-info-custom'>
                                            {time.value_vi}
                                        </button>
                                    )
                                })

                            )}
                        </div>
                        <div className='submit'>
                            <button type="submit"
                                className="btn btn-info mt-3 col-3"
                                onClick><FormattedMessage id="user_manage.add" />
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
