import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CommonUtils } from '../../../../utils';
import * as actions from '../../../../store/actions';
import './DoctorManage.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
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

    handleChange = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption
        })
    }

    handleTextArea = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    saveDetailedInformation = () => {
        this.props.createMoreInfoDoctorStart({
            selectedOption: this.state.selectedOption,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
        });
        this.setState({
            selectedOption: null,
            contentHTML: '',
        })
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
                            onChange={this.handleEditorChange} />
                        <div className='submit'>
                            <button type="submit"
                                className="btn btn-info mt-3 col-3"
                                onClick={() => this.saveDetailedInformation()} ><FormattedMessage id="user_manage.create" />
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
        arrUsers: state.admin.users,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
        fetchAllDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
        createMoreInfoDoctorStart: (data) => dispatch(actions.createMoreInfoDoctorStart(data)),
        deleteUserStart: (id) => dispatch(actions.deleteUserStart(id)),
        changeLanguageRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
