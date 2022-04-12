import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES, ADMIN_ACTION, CommonUtils } from '../../../utils';
import './ManageSpecialty.scss'; import MarkdownIt from 'markdown-it';
import { editSpecialty } from '../../../services/specialtyService';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specialty_name: '',
            specialty_image: '',
            specialty_price: '',
            contentHTML: '',
            contentMarkdown: '',
            image_name: '',
            isUpdate: false,
        }
    }

    async componentDidMount() {
        if (this.props.specialtyData) {
            this.setState({
                specialty_name: this.props.specialtyData.specialty_name,
                specialty_image: this.props.specialtyData.specialty_image,
                specialty_price: this.props.specialtyData.specialty_price,
                contentHTML: this.props.specialtyData.specialty_HTML,
                contentMarkdown: this.props.specialtyData.specialty_Markdown,
            })

        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnInput = async (e, id) => {
        if (id === 'specialty_image') {
            let file = e.target.files[0];
            if (file) {
                let img64 = await CommonUtils.getBase64(file);
                this.setState({
                    specialty_image: img64,
                    isUpdate: true
                })
                e.target.files = null;
            }

        } else {
            let copyState = { ...this.state };
            copyState[id] = e.target.value;
            this.setState({
                ...copyState
            });
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
    }

    checkValidateForm = () => {
        let checkArr = ['specialty_name', 'specialty_image', 'specialty_price'];
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

    saveDetailedInformation = async () => {
        if (!this.checkValidateForm()) return;
        await this.props.createSpecialtyStart({
            specialty_name: this.state.specialty_name,
            specialty_Markdown: this.state.contentMarkdown,
            specialty_HTML: this.state.contentHTML,
            specialty_image: this.state.specialty_image,
            specialty_price: this.state.specialty_price,
        })

        this.setState({
            specialty_name: '',
            specialty_image: '',
            specialty_price: '',
            contentHTML: '',
            contentMarkdown: '',
        })
    }

    updateDetailedInformation = async (id) => {
        if (!this.checkValidateForm()) return;
        let img = '';
        if (!this.state.isUpdate) {
            img = new Buffer(this.state.specialty_image, 'base64').toString('binary')
        } else {
            img = this.state.specialty_image
        }
        await editSpecialty({
            id: id,
            specialty_name: this.state.specialty_name,
            specialty_Markdown: this.state.contentMarkdown,
            specialty_HTML: this.state.contentHTML,
            specialty_image: img,
            specialty_price: this.state.specialty_price,
        })

        console.log(this.state.specialty_image.toString('binary'))
        this.setState({
            specialty_name: '',
            specialty_image: '',
            specialty_price: '',
            contentHTML: '',
            contentMarkdown: '',
        })
    }

    render() {
        let { specialty_name, specialty_image, specialty_price, image_name } = this.state;
        let { specialtyData } = this.props;
        return (
            <React.Fragment>
                <div className="specialty-container">
                    <div className="specialty-content">
                        <div className='title text-center'>{this.props.isOpen ? <FormattedMessage id="menu.admin.edit-specialty" /> : <FormattedMessage id="menu.admin.manage-specialty" />} </div>
                        <div className='container'>
                            <div className='row'>
                                <div className="form-group col-4">
                                    <label ><FormattedMessage id="specialty.specialty_name" /></label>
                                    <input type="text" className="form-control" value={specialty_name} onChange={(e) => this.handleOnInput(e, 'specialty_name')} />
                                </div>
                                <div className="form-group col-4">
                                    <label><FormattedMessage id="specialty.specialty_icon" /></label>
                                    <input type="file" className="image-upload-label" id="image-upload" accept=".jpg, .png, .jpeg"
                                        onChange={(e) => this.handleOnInput(e, 'specialty_image')}
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <label><FormattedMessage id="specialty.specialty_price" /></label>
                                    <input type="number" className="form-control" id="inputPassword4" min="1000"
                                        value={specialty_price}
                                        onChange={(e) => this.handleOnInput(e, 'specialty_price')}
                                    />
                                </div>
                                <div className="form-group col-12">
                                    <label><FormattedMessage id="specialty.specialty_info" /></label>
                                    <MdEditor
                                        style={{ height: '300px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorChange}
                                        value={this.state.contentMarkdown} />
                                </div>
                                <div className="form-group col-12">
                                    <div className='submit'>
                                        {!this.props.isOpen ?
                                            <button type="submit"
                                                className="btn btn-info col-3"
                                                onClick={() => this.saveDetailedInformation()} ><FormattedMessage id="user_manage.add" />
                                            </button> :
                                            <button type="submit"
                                                className="btn btn-info col-3"
                                                onClick={() => this.updateDetailedInformation(specialtyData.id)} ><FormattedMessage id="user_manage.edit" />
                                            </button>}

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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
