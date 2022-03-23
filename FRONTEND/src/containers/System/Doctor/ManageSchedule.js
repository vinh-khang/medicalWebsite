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
        }
    }

    async componentDidMount() {
        this.props.fetchAllDoctorsStart();
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
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedOption: selectedOption
        });

    }

    handleChangeDate = () => {

    }

    render() {
        let { selectedOption, allDoctors } = this.state;

        return (
            <React.Fragment>
                <div className="doctor-infor-container">
                    Hahahahaaha
                    <Select
                        value={selectedOption}
                        onChange={this.handleChangeSelect}
                        options={allDoctors}
                    />
                    <div className='col-6 form-group'>
                        <DatePicker
                            onChange={this.handleChangeDate}
                            className='form-control'
                        />
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
        createMoreInfoDoctorStart: (data) => dispatch(actions.createMoreInfoDoctorStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
