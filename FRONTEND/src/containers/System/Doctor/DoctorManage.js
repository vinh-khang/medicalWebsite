import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './DoctorManage.scss';
import { LANGUAGES, ADMIN_ACTION, CommonUtils } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { getDoctorById } from '../../../services/userService';
import { getSpecialty } from '../../../services/specialtyService';
import Select from 'react-select';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class DoctorManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            specialty: '',
            allDoctors: [],
            oldDataDoctor: false,
            allSpecialty: [],
            selectedOptionSpe: null,
            allSpecialtyName: [],

        }
    }

    async componentDidMount() {
        this.props.fetchAllDoctorsStart();
        let specialty = await getSpecialty('ALL');
        this.setState({
            allSpecialty: specialty.specialty
        })
    }


    handleChangeSelectSpe = async (selectedOptionSpe) => {
        this.setState({
            selectedOptionSpe: selectedOptionSpe
        });

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

        if (prevState.allSpecialty !== this.state.allSpecialty) {
            let result = [];
            let allSpecialty = this.state.allSpecialty;
            if (allSpecialty && allSpecialty.length > 0) {
                allSpecialty.map((specialty, index) => {
                    let obj = {};
                    obj.label = specialty.specialty_name;
                    obj.value = specialty.id;
                    result.push(obj)
                })
            }

            this.setState({
                allSpecialtyName: result
            })
        }



    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
    }

    handleChange = async (selectedOption) => {
        this.setState({
            selectedOption: selectedOption
        })

        let res = await getDoctorById(selectedOption.value);
        if (res && res.errCode === 0 && res.doctors && res.doctors.DetailedInformation
            && res.doctors.DetailedInformation.contentHTML && res.doctors.DoctorDetail.specialty_id) {
            let selectedOptionSpe2 = this.state.allSpecialtyName.find(option => {
                return option.value === res.doctors.DoctorDetail.specialty_id
            })

            this.setState({
                contentHTML: res.doctors.DetailedInformation.contentHTML,
                contentMarkdown: res.doctors.DetailedInformation.contentMarkdown,
                description: res.doctors.DetailedInformation.description,
                oldDataDoctor: true,
                specialty: res.doctors.DoctorDetail.specialty_id,
                selectedOptionSpe: selectedOptionSpe2,
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                oldDataDoctor: false,
                specialty: '',
                selectedOptionSpe: '',
            })
        }

    }

    handleTextArea = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    saveDetailedInformation = () => {
        let { oldDataDoctor } = this.state;
        this.props.createMoreInfoDoctorStart({
            doctor_id: this.state.selectedOption.value,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            specialty_id: this.state.selectedOptionSpe.value,
            action: oldDataDoctor === true ? ADMIN_ACTION.EDIT : ADMIN_ACTION.CREATE,
        });
    }

    render() {
        let { selectedOption, description, allDoctors, selectedOptionSpe, allSpecialtyName, specialty, oldDataDoctor } = this.state;
        return (
            <React.Fragment>
                <div className="doctor-manage-container">
                    <div className='doctor-manage-title text-center'><i className="fas fa-user-md"></i> <FormattedMessage id="doctor-manage.doctor-management" /></div>
                    <div className="doctor-manage-content">
                        <div className='doctor-manage row'>
                            <div className='col-6 form-group'>
                                <div className='doctor-search'>
                                    <label><FormattedMessage id="doctor-manage.doctor-name" /></label>
                                    <Select
                                        value={selectedOption}
                                        onChange={this.handleChange}
                                        options={allDoctors}
                                    />
                                    <label className='mt-3'><FormattedMessage id="specialty.specialty" /></label>
                                    <Select
                                        value={selectedOptionSpe}
                                        onChange={this.handleChangeSelectSpe}
                                        options={allSpecialtyName}
                                    />
                                </div>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="doctor-manage.doctor-description" /></label>
                                <textarea
                                    rows="4"
                                    value={description}
                                    onChange={(e) => this.handleTextArea(e)}
                                ></textarea>
                            </div>

                        </div>

                        <label><FormattedMessage id="doctor-manage.doctor-information" /></label>
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown} />

                        <div className='row'>
                            <div className='col-9'></div>
                            <div className='col-3 form-group'>
                                <button
                                    className="btn btn-primary mt-3"
                                    onClick={() => this.saveDetailedInformation()} >
                                    <i className="fas fa-user-plus"></i>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
        createMoreInfoDoctorStart: (data) => dispatch(actions.createMoreInfoDoctorStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
