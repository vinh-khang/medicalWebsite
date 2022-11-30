import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './Clinic.scss';
import MarkdownIt from 'markdown-it';
import { toast } from 'react-toastify';
import { getClinicInfo, updateClinicInfo } from '../../../services/clinicService';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ClinicPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clinic_title: '',
            clinic_HTML: '',
            clinic_Markdown: '',
            isUpdate: false,
            clinic_type: 'INTRO'
        }
    }

    async componentDidMount() {
        let data = await getClinicInfo(this.state.clinic_type);
        this.setState({
            clinic_title: data.clinic.title,
            clinic_HTML: data.clinic.clinic_HTML,
            clinic_Markdown: data.clinic.clinic_Markdown,
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnInput = async (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        });
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            clinic_HTML: html,
            clinic_Markdown: text
        })
    }

    checkValidateForm = () => {
        let checkArr = ['clinic_title'];
        let isValidate = true;
        for (let i = 0; i < checkArr.length; i++) {
            if (!this.state[checkArr[i]]) {
                isValidate = false;
                alert('Missing input at: ' + checkArr[i]);
                break;
            }
        }

        return isValidate;
    }

    handleSelectChange = async (e) => {
        let data = await getClinicInfo(e.target.value);
        this.setState({
            clinic_title: data.clinic.title,
            clinic_HTML: data.clinic.clinic_HTML,
            clinic_Markdown: data.clinic.clinic_Markdown,
            clinic_type: e.target.value,
        })
    }

    saveDetailedInformation = async () => {
        if (!this.checkValidateForm()) return;
        await updateClinicInfo({
            title: this.state.clinic_title,
            clinic_Markdown: this.state.clinic_Markdown,
            clinic_HTML: this.state.clinic_HTML,
            type: this.state.clinic_type
        })

        this.setState({
            specialty_name: '',
            specialty_image: '',
            specialty_price: '',
            contentHTML: '',
            contentMarkdown: '',
        })
        toast.success("Cập nhật bài viết thành công!")
    }

    render() {
        let { clinic_title } = this.state;
        // let { specialtyData } = this.props;
        return (
            <React.Fragment>
                <div className="clinic-manage-container">
                    <div className='clinic-manage-title text-center'><i className="fas fa-newspaper"></i> <FormattedMessage id="clinic.clinic-post-management" /></div>
                    <div className="clinic-manage-content">
                        <div className='container'>
                            <div className='row'>
                                <div className="form-group col-6">
                                    <label ><FormattedMessage id="clinic.clinic-post-name" /></label>
                                    <input type="text" className="form-control" value={clinic_title} onChange={(e) => this.handleOnInput(e, 'clinic_title')} />
                                </div>
                                <div className="form-group col-6">
                                    <label ><FormattedMessage id="clinic.clinic-post-type" /></label>
                                    <select className="form-control" onChange={(e) => this.handleSelectChange(e)} >
                                        <option value="INTRO" selected>GIỚI THIỆU</option>
                                        <option value="PROCEDURE">QUY TRÌNH</option>
                                        <option value="GUIDE">HƯỚNG DẪN</option>
                                    </select>
                                </div>
                                <div className="form-group col-12">
                                    <label><FormattedMessage id="clinic.clinic-post-content" /></label>
                                    <MdEditor
                                        style={{ height: '300px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorChange}
                                        value={this.state.clinic_Markdown} />
                                </div>
                                <div className="col-12 row">
                                    <div className='col-9'></div>
                                    <div className='col-3 form-group'>
                                        <button type="submit"
                                            className="btn btn-primary "
                                            onClick={() => this.saveDetailedInformation()} ><i className="fas fa-edit"></i> <FormattedMessage id="common.update" />
                                        </button>

                                    </div>
                                </div>

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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createSpecialtyStart: (data) => dispatch(actions.createSpecialtyStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicPost);
