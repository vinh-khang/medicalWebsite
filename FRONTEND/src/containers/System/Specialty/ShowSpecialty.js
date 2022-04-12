import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES, ADMIN_ACTION, CommonUtils } from '../../../utils';
import './ShowSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { toast } from "react-toastify";
import { getSpecialty, deleteSpecialty, editSpecialty } from '../../../services/specialtyService';
import NumberFormat from 'react-number-format';
import ManageSpecialty from './ManageSpecialty';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ShowSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specialty_name: '',
            specialty_image: '',
            specialty_price: '',
            contentHTML: '',
            contentMarkdown: '',
            image_name: '',
            allSpecialty: [],
            isOpen: false,
            specialty: '',
        }
    }

    async componentDidMount() {
        let allSpecialty = await getSpecialty('ALL');
        this.setState({
            allSpecialty: allSpecialty.specialty,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevState.genders !== this.props.genders) {
        //     let arrGender = this.props.genders;
        //     this.setState({
        //         arrGender: arrGender,
        //         gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''
        //     })
        // }
    }

    handleOnInput = async (e, id) => {
        if (id === 'specialty_image') {
            let file = e.target.files[0];
            if (file) {
                let img64 = await CommonUtils.getBase64(file);
                this.setState({
                    specialty_image: img64
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

    deleteSpecialty = async (id) => {
        if (id) {
            await deleteSpecialty(id);
            toast.success("Delete Specialty Successfully!!");
        }
        let allSpecialty = await getSpecialty('ALL');
        this.setState({
            allSpecialty: allSpecialty.specialty,
        })

    }

    editUser = async (id) => {
        let specialty = await getSpecialty(id);
        this.setState({
            isOpen: !this.state.isOpen,
            specialty: specialty.specialty
        })
    }


    render() {
        let { allSpecialty, isOpen, specialty, image_name } = this.state;
        return (
            <React.Fragment>
                {isOpen && <div className="specialty-container"><button className='specialty-back-btn' onClick={() => this.editUser()}><i class="fas fa-arrow-left"></i> Quay lại</button></div>}
                {isOpen && <ManageSpecialty isOpen={isOpen} specialtyData={specialty} />}
                {!isOpen && <div className="specialty-container">
                    <div className="specialty-content">
                        <div className='title text-center'><FormattedMessage id="menu.admin.show-specialty" /></div>
                        <div className='container'>
                            <div className='row'>

                                <div className='specialty-table'>
                                    <table id="specialty">
                                        <thead>
                                            <tr>
                                                <th><FormattedMessage id="specialty.specialty_name" /></th>
                                                <th><FormattedMessage id="specialty.specialty_price" /></th>
                                                <th style={{ width: "150px" }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                allSpecialty && allSpecialty.map((spe, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{spe.specialty_name}</td>
                                                            <td>{<NumberFormat value={spe.specialty_price} displayType={'text'} thousandSeparator={true} prefix={''} />} VNĐ</td>
                                                            <td>
                                                                <div className='mx-3 edit' onClick={() => this.editUser(spe.id)}><i class="fas fa-edit"></i></div>
                                                                <div className='mx-3 delete' onClick={() => this.deleteSpecialty(spe.id)}><i class="fas fa-trash-alt"></i></div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>}

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

export default connect(mapStateToProps, mapDispatchToProps)(ShowSpecialty);
