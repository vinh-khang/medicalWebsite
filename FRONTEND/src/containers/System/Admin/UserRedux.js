import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { LANGUAGES, ADMIN_ACTION } from '../../../utils';
import * as actions from '../../../store/actions';
import TableManageUser from './TableManageUser';

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
        id: ''
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
                gender: arrGender && arrGender.length > 0 ? arrGender[0].key : ''
            })
        }

        if (prevProps.positions !== this.props.positions) {
            let positionArr = this.props.positions;
            this.setState({
                positionArr: positionArr,
                position: positionArr && positionArr.length > 0 ? positionArr[0].key : ''
            })
        }

        if (prevProps.roles !== this.props.roles) {
            let roleArr = this.props.roles;
            this.setState({
                roleArr: roleArr,
                role: roleArr && roleArr.length > 0 ? roleArr[0].key : ''
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
                gender: arrGender && arrGender.length > 0 ? arrGender[0].key : '',
                position: positionArr && positionArr.length > 0 ? positionArr[0].key : '',
                role: roleArr && roleArr.length > 0 ? roleArr[0].key : '',
                action: ADMIN_ACTION.CREATE,
            })
        }
    }

    handlePreviewImage = (e) => {
        let files = e.target.files;
        let file = files[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImage: objectUrl,
                image: file
            })
        }
    }

    openPreview = () => {
        if (!this.state.previewImage) return;
        this.setState({
            isOpen: !this.state.isOpen,
        })

        console.log(this.state.previewImage)
    }

    handleOnInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidateForm = () => {
        let checkArr = ['email', 'password', 'firstname', 'lastname', 'address', 'phone'];
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

    handleSaveUser = () => {
        if (!this.checkValidateForm()) return;
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
                position_id: this.state.position
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
                position_id: this.state.position,

            })
        }
    }

    handleEditUser = (user) => {
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.position_id,
            role: user.role_id,
            image: user.image,
            previewImage: user.previewImage,
            action: ADMIN_ACTION.EDIT,
            id: user.id
        })
    }

    render() {
        let { arrGender, positionArr, roleArr, email, password, firstname, lastname, phone, address,
            gender, position, role, image, action, previewImage, isOpen } = this.state;
        let { language, genders } = this.props;
        return (
            <div className="user-redux-container" >
                <div className='title'>
                    {action === ADMIN_ACTION.CREATE ? <FormattedMessage id="user_manage.create_title" /> : <FormattedMessage id="user_manage.edit_title" />}
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className="form-group col-3">
                                <label >Email</label>
                                <input type="email" className="form-control" id="inputEmail4"
                                    value={email} onChange={(e) => { this.handleOnInput(e, 'email') }} placeholder="Email"
                                    disabled={action === ADMIN_ACTION.EDIT ? true : false} />
                            </div>
                            <div className="form-group col-3">
                                <label>Password</label>
                                <input type="password" className="form-control" id="inputPassword4"
                                    value={password} onChange={(e) => { this.handleOnInput(e, 'password') }} placeholder="Password"
                                    disabled={action === ADMIN_ACTION.EDIT ? true : false} />
                            </div>
                            <div className="form-group col-3">
                                <label ><FormattedMessage id="user_manage.firstname" /></label>
                                <input type="text" className="form-control" id="inputEmail4" value={firstname} onChange={(e) => { this.handleOnInput(e, 'firstname') }} placeholder="First name" />
                            </div>
                            <div className="form-group col-3">
                                <label><FormattedMessage id="user_manage.lastname" /></label>
                                <input type="text" className="form-control" id="inputPassword4" value={lastname} onChange={(e) => { this.handleOnInput(e, 'lastname') }} placeholder="Last name" />
                            </div>


                            <div className="form-group col-3">
                                <label><FormattedMessage id="user_manage.phone" /></label>
                                <input type="text" className="form-control" id="inputAddress2" value={phone} onChange={(e) => { this.handleOnInput(e, 'phone') }} placeholder="Phone number" />
                            </div>

                            <div className="form-group col-9">
                                <label><FormattedMessage id="user_manage.address" /></label>
                                <input type="text" className="form-control" id="inputAddress" value={address} onChange={(e) => { this.handleOnInput(e, 'address') }} placeholder="1234 Main St" />
                            </div>

                            <div className="form-group col-3">
                                <label> <FormattedMessage id="user_manage.gender" /></label>
                                <select className="form-control"
                                    onChange={(e) => { this.handleOnInput(e, 'gender') }}
                                    value={gender}>
                                    {arrGender && arrGender.map((gender, index) => {
                                        return (
                                            language === LANGUAGES.VI ? <option key={index} value={gender.key} >{gender.value_vi}</option> :
                                                <option key={index} value={gender.key} >{gender.value_en}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-group col-3">
                                <label> <FormattedMessage id="user_manage.position" /></label>
                                <select className="form-control"
                                    onChange={(e) => { this.handleOnInput(e, 'position') }}
                                    value={position}>
                                    {positionArr && positionArr.map((position, index) => {
                                        return (
                                            language === LANGUAGES.VI ? <option key={index} value={position.key}  >{position.value_vi}</option> :
                                                <option key={index} value={position.key}  >{position.value_en}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-group col-3">
                                <label> <FormattedMessage id="user_manage.role" /></label>
                                <select className="form-control"
                                    onChange={(e) => { this.handleOnInput(e, 'role') }}
                                    value={role}>
                                    {roleArr && roleArr.map((role, index) => {
                                        return (
                                            language === LANGUAGES.VI ? <option key={index} value={role.key} >{role.value_vi}</option> :
                                                <option key={index} value={role.key} >{role.value_en}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-group col-3">
                                <label> <FormattedMessage id="user_manage.image" /></label>
                                <div className='image-upload'>
                                    <input type="file" className="image-upload-label" id="image-upload" hidden accept=".jpg, .png, .jpeg"
                                        onChange={(e) => this.handlePreviewImage(e)}
                                    />
                                    <label htmlFor="image-upload" className='image-upload-input'><i class="fas fa-upload"></i> <FormattedMessage id="user_manage.upload" /></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImage})` }}
                                        value={image} onClick={() => this.openPreview()}></div>
                                </div>

                            </div>
                            <div className="form-group col-3">
                                {action === ADMIN_ACTION.CREATE ?
                                    <button type="submit"
                                        className="btn btn-primary mt-3 col-12"
                                        onClick={() => this.handleSaveUser()} ><FormattedMessage id="user_manage.create" />
                                    </button>
                                    :
                                    <button type="submit"
                                        className="btn btn-warning mt-3 col-12"
                                        onClick={() => this.handleSaveUser()} ><FormattedMessage id="user_manage.edit" />
                                    </button>
                                }
                            </div>
                        </div>
                        <TableManageUser
                            handleEditUser={this.handleEditUser}
                        />

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
        changeLanguageRedux: (language) => dispatch(actions.changeLanguageApp(language)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
