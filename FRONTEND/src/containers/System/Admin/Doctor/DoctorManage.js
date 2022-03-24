import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CommonUtils, ADMIN_ACTION } from '../../../../utils';
import * as actions from '../../../../store/actions';
import './DoctorManage.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { getDoctorById } from '../../../../services/userService';
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
            allDoctors: [],
            olDataDoctor: false,
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
        console.log(res);
        if (res && res.errCode === 0 && res.doctors && res.doctors.DetailedInformation) {
            this.setState({
                contentHTML: res.doctors.DetailedInformation.contentHTML,
                contentMarkdown: res.doctors.DetailedInformation.contentMarkdown,
                description: res.doctors.DetailedInformation.description,
                olDataDoctor: true,
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                olDataDoctor: false,
            })
            console.log('Sai r' + res.data);
        }

    }

    handleTextArea = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    saveDetailedInformation = () => {
        let { olDataDoctor } = this.state;
        this.props.createMoreInfoDoctorStart({
            doctor_id: this.state.selectedOption.value,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            action: olDataDoctor === true ? ADMIN_ACTION.EDIT : ADMIN_ACTION.CREATE,
        });
    }

    render() {
        let { selectedOption, description, allDoctors } = this.state;
        return (
            <React.Fragment>
                <div className="doctor-infor-container">
                    <div className="doctor-infor-content">
                        <div className='title text-center'>DOCTOR MANAGE</div>
                        <div className='doctor-infor'>
                            <div className='doctor-search'>
                                <label>Tên bác sĩ</label>
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={allDoctors}
                                />
                            </div>
                            <div className='doctor-desc'>
                                <label>Mô tả</label>
                                <textarea
                                    rows="2"
                                    value={description}
                                    onChange={(e) => this.handleTextArea(e)}
                                ></textarea>
                            </div>
                        </div>
                        <label>Thông tin chi tiết</label>
                        <MdEditor
                            style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown} />
                        <div className='submit'>
                            <button type="submit"
                                className="btn btn-info mt-3 col-3"
                                onClick={() => this.saveDetailedInformation()} ><FormattedMessage id="user_manage.add" />
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
        createMoreInfoDoctorStart: (data) => dispatch(actions.createMoreInfoDoctorStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
