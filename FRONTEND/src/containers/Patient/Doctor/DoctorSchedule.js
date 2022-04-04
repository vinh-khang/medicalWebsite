import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getDoctorSchedule } from '../../../services/userService';
import './DoctorSchedule.scss';


class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDays: [],
        }
    }

    async componentDidMount() {
        let arrDays = []
        for (let i = 0; i < 7; i++) {
            let day = {};
            day.label_vi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            day.label_en = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            day.value = moment(new Date()).add(i, 'days').startOf('days').valueOf();
            arrDays.push(day);
        }

        this.setState({
            arrDays: arrDays
        })

    }

    onChangeSelect = async (e) => {
        if (this.props.doctorId.id && e.target.value) {
            let id = this.props.doctorId.id;
            let day = e.target.value;
            let schedule = await getDoctorSchedule(id, day);
            console.log(schedule);
        }
    }

    render() {
        let { arrDays } = this.state;
        let { language } = this.props;

        return (
            <div className='doctor-schedule-container'>
                <div className='left-schedule'>
                    <div className='select-date-schedule'>
                        <select onChange={(e) => this.onChangeSelect(e)}>
                            {arrDays && arrDays.length > 0
                                && arrDays.map((day, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={day.value}
                                        > {language === LANGUAGES.VI ? day.label_vi : day.label_en}</option>
                                    )
                                })}
                        </select>
                    </div>
                </div>
                <div className='right-booking'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
