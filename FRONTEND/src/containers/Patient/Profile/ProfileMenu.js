import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import { LANGUAGES, ADMIN_ACTION, CommonUtils } from '../../../utils';
import { editUserAPI } from '../../../services/userService';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import './ProfileMenu.scss';
import _ from 'lodash';

class ProfileMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastname: '',
            firstname: '',
            email: '',
            phone: '',
            gender: '',
            address: '',
            arrGender: [],
            message: '',
            id: '',

        }
    }

    componentDidMount = async () => {
        this.props.getGenderStart();
        if (this.props.userInfor) {
            this.setState({
                lastname: this.props.userInfor.lastname,
                firstname: this.props.userInfor.firstname,
                email: this.props.userInfor.email,
                phone: this.props.userInfor.phonenumber,
                gender: this.props.userInfor.gender,
                address: this.props.userInfor.address,
                user: this.props.userInfor,
                id: this.props.userInfor.id,
            })
        }

    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                arrGender: this.props.genders,
            })
        }

        // if (prevProps.userInfor !== this.props.user) {
        //     this.setState({
        //         lastname: this.props.userInfo.lastname,
        //         firstname: this.props.userInfo.firstname,
        //         email: this.props.userInfo.email,
        //         phone: this.props.userInfo.phone,
        //         gender: this.props.userInfo.gender,
        //         address: this.props.userInfo.address,
        //         user: this.props.userInfo
        //     })
        // }
    }

    validateForm = () => {
        let { lastname, firstname, email, phone, gender, address } = this.state;
        let checkArr = ['lastname', 'firstname', 'email', 'gender', 'address'];

        for (let i = 0; i < checkArr.length; i++) {
            if (!this.state[checkArr[i]]) {
                this.setState({
                    message: 'Chưa nhập đủ các thông tin bắt buộc!',
                })
                return false;
            }
        }

        return true

    }

    onInput = (e, id) => {
        let copyState = this.state;
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })


    }

    updateUser = async () => {
        if (!this.validateForm()) return;

        let data = await editUserAPI({
            id: this.state.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            address: this.state.address,
            gender: this.state.gender,
        })

        if (data.errCode === 0) {
            toast.success("Cập nhật tài khoản thành công!");
        }
    }

    render() {
        let { arrGender, lastname, firstname, email, phone, gender, address, message } = this.state;
        return (
            <>
                <div className="booking-form-heading">THÔNG TIN HỒ SƠ BỆNH NHÂN</div>
                <div className="booking-content">
                    <div className="booking-form-content">
                        <div className='row'>
                            <div className='col-6'>
                                <div className="form-group ">
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label className="form-label">Họ và chữ lót <span className='red'>*</span></label>
                                            <input name="lastname" type="text" placeholder="Vui lòng nhập họ và chữ lót"
                                                className="form-control" required
                                                value={lastname}
                                                onChange={(e) => this.onInput(e, 'lastname')} />

                                        </div>
                                        <div className='col-6'>
                                            <label className="form-label">Tên <span className='red'>*</span></label>
                                            <input name="firstname" type="text" placeholder="Vui lòng nhập tên"
                                                className="form-control"
                                                value={firstname}
                                                onChange={(e) => this.onInput(e, 'firstname')}
                                            />

                                        </div>
                                    </div>
                                </div>


                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-group">
                                            <label htmlFor="gender" className="form-label">Giới tính <span className='red'>*</span></label>
                                            <select id="gender" name="gender" className="form-control" value={gender}
                                                onChange={(e) => this.onInput(e, 'gender')}>
                                                {arrGender && arrGender.length > 0 && arrGender.map((gender, index) => {
                                                    return (<option value={gender.keyMap} >{gender.value_vi}</option>)
                                                })}
                                            </select>

                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className="form-group">
                                            <label htmlFor="phone" className="form-label">Số điện thoại <span className='red'>*</span></label>
                                            <input id="phone" name="phone" type="text"
                                                placeholder="Vui lòng nhập số điện thoại"
                                                className="form-control"
                                                value={phone}
                                                onChange={(e) => this.onInput(e, 'phone')}
                                                disabled
                                            />

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email <span className='red'>*</span></label>
                                    <input id="email" name="email" type="text"
                                        placeholder="Vui lòng nhập Email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => this.onInput(e, 'email')}
                                        disabled
                                    />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="address" className="form-label">Địa chỉ <span className='red'>*</span></label>
                                    <input id="address" name="address"
                                        type="text" placeholder="Vui lòng nhập địa chỉ chi tiết"
                                        className="form-control"
                                        value={address}
                                        onChange={(e) => this.onInput(e, 'address')}
                                    />

                                </div>
                                <span className="form-message" style={{ color: 'red' }}>{message}</span>
                            </div>
                        </div>
                        <div className='divide-line'></div>
                        <div className="row justify-content-center align-items-center">
                            <button className="form-submit col-6 " onClick={() => this.updateUser()}><i className="fas fa-edit"> </i> Cập nhật</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        createUserStart: (data) => dispatch(actions.createUserStart(data)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileMenu));
