import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { LANGUAGES, ADMIN_ACTION, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import TableManageUser from './TableManageUser';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import './UserRedux.scss';

class UserRedux extends Component {
    state = {
        arrGender: [],
        positionArr: [],
        roleArr: [],
        previewImage: '',
        isOpen: false,
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        phone: '',
        address: '',
        gender: '',
        position: '',
        role: '',
        image: '',
        action: ADMIN_ACTION.CREATE,
        id: '',
        isOpenModal: false,
        message: ''
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genders !== this.props.genders) {
            let arrGender = this.props.genders;
            this.setState({
                arrGender: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''
            })
        }

        if (prevProps.positions !== this.props.positions) {
            let positionArr = this.props.positions;
            this.setState({
                positionArr: positionArr,
                position: positionArr && positionArr.length > 0 ? positionArr[0].keyMap : ''
            })
        }

        if (prevProps.roles !== this.props.roles) {
            let roleArr = this.props.roles;
            this.setState({
                roleArr: roleArr,
                role: roleArr && roleArr.length > 0 ? roleArr[0].keyMap : ''
            })
        }

        if (prevProps.users !== this.props.users) {
            let arrGender = this.props.genders;
            let positionArr = this.props.positions;
            let roleArr = this.props.roles;
            this.setState({
                email: '',
                password: '',
                firstname: '',
                lastname: '',
                phone: '',
                address: '',
                image: '',
                previewImage: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
                position: positionArr && positionArr.length > 0 ? positionArr[0].keyMap : '',
                role: roleArr && roleArr.length > 0 ? roleArr[0].keyMap : '',
                action: ADMIN_ACTION.CREATE,
            })
        }
    }

    handlePreviewImage = async (e) => {
        let files = e.target.files;
        let file = files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImage: objectUrl,
                image: base64
            })
        }
    }

    openPreview = () => {
        if (!this.state.previewImage) return;
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    handleOnInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        });
    }

    validateForm = () => {
        let { email, phone, password, role } = this.state;
        let checkArr = ['lastname', 'firstname', 'email', 'phone', 'gender', 'address', 'password'];

        for (let i = 0; i < checkArr.length; i++) {
            if (!this.state[checkArr[i]]) {
                this.setState({
                    message: 'Chưa nhập đủ các thông tin bắt buộc!',
                })
                return false;
            }
        }

        const emailRege = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const emailRegeResult = emailRege.exec(email);
        if (emailRegeResult === null) {
            this.setState({
                message: 'Định dạng Email sai!',
            })
            return false;
        }

        const passnRege = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const passnRegeResult = passnRege.exec(password);
        if (passnRegeResult === null) {
            this.setState({
                message: 'Mật khẩu tối thiếu 08 ký tự, bao gồm số và ký tự!',
            })
            return false;
        }

        const regexp = /^\d{10,11}$/;
        const checkingResult = regexp.exec(phone);
        if (checkingResult === null) {
            this.setState({
                message: 'Số điện thoại không chính xác. Số điện thoại phải có 10 - 11 chữ số!',
            })
            return false;
        }

        return true

    }

    handleSaveUser = () => {
        if (!this.validateForm()) return;
        let position = null;
        if (this.state.role === 'R2') {
            position = this.state.position;
        }

        if (this.state.action === ADMIN_ACTION.CREATE) {
            this.props.createUserStart({
                email: this.state.email,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                address: this.state.address,
                phonenumber: this.state.phone,
                gender: this.state.gender,
                role_id: this.state.role,
                position_id: position,
                image: this.state.image,
            })
        }

        if (this.state.action === ADMIN_ACTION.EDIT) {
            this.props.editUserStart({
                id: this.state.id,
                email: this.state.email,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                address: this.state.address,
                phonenumber: this.state.phone,
                gender: this.state.gender,
                role_id: this.state.role,
                position_id: position,
                image: this.state.image,
            })
        }

        this.setState({
            message: ''
        })
    }

    handleEditUser = (user) => {
        let img64 = '';
        if (user.image) {
            img64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
            email: user.email,
            password: '12345678k',
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.position_id,
            role: user.role_id,
            image: null,
            previewImage: img64,
            action: ADMIN_ACTION.EDIT,
            id: user.id,
            isOpenModal: !this.state.isOpenModal
        })
    }

    openModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })

    }

    render() {
        let { arrGender, positionArr, roleArr, email, password, firstname, lastname, phone, address,
            gender, position, role, image, action, previewImage, isOpen, message } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="user-manage-container" >
                    <div className='user-manage-title'>
                        {action === ADMIN_ACTION.CREATE ?
                            <div><i className="fas fa-user-plus"></i><FormattedMessage id="user_manage.create_title" /></div> :
                            <div><i className="fas fa-user-edit"></i> <FormattedMessage id="user_manage.edit_title" /></div>}
                    </div>
                    <div className='user-manage-content'>
                        <div className='container'>
                            <div className='row'>
                                <div className="col-3">
                                    <div className="form-group">
                                        <label >Email</label>
                                        <input type="email" className="form-control"
                                            value={email}
                                            onChange={(e) => { this.handleOnInput(e, 'email') }}
                                            placeholder="Nhập Email"
                                            disabled={action === ADMIN_ACTION.EDIT ? true : false} />
                                    </div>
                                    <div className="form-group">
                                        <label><FormattedMessage id="user_manage.phone" /></label>
                                        <input type="number" className="form-control"
                                            value={phone}
                                            onChange={(e) => { this.handleOnInput(e, 'phone') }}
                                            placeholder="Nhập SĐT" />
                                    </div>
                                    <div className="form-group">
                                        <label> <FormattedMessage id="user_manage.gender" /></label>
                                        <select className="form-control"
                                            onChange={(e) => { this.handleOnInput(e, 'gender') }}
                                            value={gender}>
                                            {arrGender && arrGender.map((gender, index) => {
                                                return (
                                                    language === LANGUAGES.VI ?
                                                        <option key={index} value={gender.keyMap} >{gender.value_vi}</option> :
                                                        <option keyMap={index} value={gender.keyMap} >{gender.value_en}</option>
                                                )
                                            })}
                                        </select>
                                    </div>

                                </div>
                                <div className='col-6 row'>
                                    <div className="form-group col-6">
                                        <label>Password</label>
                                        <input type="password" className="form-control"
                                            value={password} onChange={(e) => { this.handleOnInput(e, 'password') }}
                                            placeholder="Mật khẩu tối thiếu 08 ký tự"
                                            disabled={action === ADMIN_ACTION.EDIT ? true : false} />
                                    </div>
                                    <div className="form-group col-6">
                                        <label ><FormattedMessage id="user_manage.firstname" /></label>
                                        <input
                                            type="text" className="form-control" value={firstname}
                                            onChange={(e) => { this.handleOnInput(e, 'firstname') }}
                                            placeholder="Nhập tên" />
                                    </div>
                                    <div className="form-group col-12 top-8">
                                        <label><FormattedMessage id="user_manage.address" /></label>
                                        <input
                                            type="text" className="form-control"
                                            value={address} onChange={(e) => { this.handleOnInput(e, 'address') }}
                                            placeholder="Nhập địa chỉ" />
                                    </div>
                                    <div className="form-group col-6 top-8">
                                        <label> <FormattedMessage id="user_manage.role" /></label>
                                        <select className="form-control"
                                            onChange={(e) => { this.handleOnInput(e, 'role') }}
                                            value={role}>
                                            {roleArr && roleArr.map((role, index) => {
                                                return (
                                                    language === LANGUAGES.VI ?
                                                        <option keyMap={index} value={role.keyMap} >{role.value_vi}</option> :
                                                        <option keyMap={index} value={role.keyMap} >{role.value_en}</option>
                                                )
                                            })}
                                        </select>
                                    </div>

                                    {role === 'R2' ? <div className="form-group col-6 top-8">
                                        <label> <FormattedMessage id="user_manage.position" /></label>
                                        <select className="form-control"
                                            onChange={(e) => { this.handleOnInput(e, 'position') }}
                                            value={position}>
                                            {positionArr && positionArr.map((position, index) => {
                                                return (
                                                    language === LANGUAGES.VI ?
                                                        <option keyMap={index} value={position.keyMap}  >{position.value_vi}</option> :
                                                        <option keyMap={index} value={position.keyMap}  >{position.value_en}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                        : <div className="form-group col-6 top-8"></div>}

                                </div>
                                <div className='col-3'>
                                    <div className="form-group">
                                        <label><FormattedMessage id="user_manage.lastname" /></label>
                                        <input type="text" className="form-control"
                                            value={lastname} onChange={(e) => { this.handleOnInput(e, 'lastname') }}
                                            placeholder="Nhập họ và chữ lót" />
                                    </div>
                                    <div className="form-group">
                                        <label> <FormattedMessage id="user_manage.image" /></label>
                                        <div className='image-upload'>
                                            <input type="file" className="image-upload-label" id="image-upload"
                                                hidden accept=".jpg, .png, .jpeg"
                                                onChange={(e) => this.handlePreviewImage(e)}
                                            />
                                            <label htmlFor="image-upload" className='image-upload-input'>
                                                <i class="fas fa-upload"></i> <FormattedMessage id="user_manage.upload" />
                                            </label>
                                            <div className='preview-image'
                                                style={{ backgroundImage: `url(${this.state.previewImage})` }}
                                                value={image} onClick={() => this.openPreview()}></div>
                                        </div>

                                    </div>
                                </div>
                                <div className='col-6'><div className='red'>{message}</div></div>
                                <div className="form-group col-6 row">
                                    <button className="col-6 mt-3 btn btn-info"
                                        onClick={() => this.openModal()}><i className="fas fa-list"></i><FormattedMessage id="user_manage.view-users" /></button>
                                    {action === ADMIN_ACTION.CREATE ?
                                        <button type="submit"
                                            className="btn btn-primary mt-3 col-6"
                                            onClick={() => this.handleSaveUser()} ><i className="fas fa-user-plus"></i> <FormattedMessage id="user_manage.create" />
                                        </button>
                                        :
                                        <button type="submit"
                                            className="btn btn-warning mt-3 col-6"
                                            onClick={() => this.handleSaveUser()} ><i className="fas fa-user-edit"></i> <FormattedMessage id="user_manage.edit" />
                                        </button>
                                    }

                                </div>

                            </div>


                        </div>
                        {isOpen &&
                            <Lightbox
                                mainSrc={previewImage}
                                onCloseRequest={() => this.setState({ isOpen: false })}
                                style={{ transform: "none" }}
                            />
                        }
                    </div>

                </div>
                <Modal
                    isOpen={this.state.isOpenModal}
                    toggle={() => { this.openModal() }}
                    size="lg"
                    centered={true}
                    className='user-manage-modal'
                >
                    <ModalHeader
                        toggle={() => { this.openModal() }}
                        centered={true}
                        className='user-manage-modal-header'>
                        <FormattedMessage id="user_manage.user-information" />
                    </ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <TableManageUser
                                        handleEditUser={this.handleEditUser}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>

                </Modal>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        positions: state.admin.positions,
        roles: state.admin.roles,
        users: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createUserStart: (data) => dispatch(actions.createUserStart(data)),
        editUserStart: (data) => dispatch(actions.editUserStart(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
