import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../../utils';
import * as actions from '../../../../store/actions';
import './DoctorManage.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const mdParser = new MarkdownIt(/* Markdown-it options */);
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
class DoctorManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            contentHTML: '',
            contentMarkdown: '',
            description: ''
        }
    }

    async componentDidMount() {

    }


    componentDidUpdate(prevProps, prevState, snapshot) {

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
        console.log(this.state)
    }

    render() {
        let { selectedOption,
            contentHTML,
            contentMarkdown,
            description } = this.state;
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
                                    options={options}
                                />
                            </div>
                            <div className='doctor-desc'>
                                <label>Mô tả</label>
                                <textarea
                                    rows="4"
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserStart: (id) => dispatch(actions.deleteUserStart(id)),
        changeLanguageRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
