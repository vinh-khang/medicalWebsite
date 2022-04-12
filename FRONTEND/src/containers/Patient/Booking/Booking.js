import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import HomeHeader from '../../Homepage/HomeHeader';
import { LANGUAGES, ADMIN_ACTION, CommonUtils } from '../../../utils';
import './Booking.scss';
import _ from 'lodash';

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastname: '',
            firstname: '',
            email: '',
            phone: '',
            gender: '',
            address: '',
            password: '',
            password_confirmation: '',
            arrGender: [],
            passMess: ''
        }
    }

    componentDidMount = async () => {
        this.props.getGenderStart();

    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                arrGender: this.props.genders,
                gender: this.props.genders && this.props.genders.length > 0 ? this.props.genders[0].keyMap : ''
            })
        }
    }

    validateForm = () => {
        let { lastname, firstname, email, phone, gender, address, password, password_confirmation } = this.state;
        let checkArr = ['lastname', 'firstname', 'email', 'phone', 'gender', 'address', 'password', 'password_confirmation'];
        for (let i = 0; i < checkArr.length; i++) {
            if (!this.state[checkArr[i]]) {
                this.setState({
                    passMess: 'Chưa nhập đủ các thông tin bắt buộc!',
                })
                return false;
            }
        }

        if (password !== password_confirmation) {
            this.setState({
                passMess: 'Mật khẩu chưa khớp, vui lòng nhập lại!',
            })
            return false;
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

    registerUser = () => {
        if (!this.validateForm()) return;
        this.props.createUserStart({
            email: this.state.email,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            address: this.state.address,
            phonenumber: this.state.phone,
            gender: this.state.gender,
            role_id: 'R3',
            position_id: null,
            image: null,
        })

        console.log('Oke nhe!');

    }

    render() {
        let { arrGender, lastname, firstname, email, phone, gender, address, password, password_confirmation, passMess } = this.state;
        console.log(arrGender)
        return (
            <>
                <HomeHeader isShow={false} />
                <div className="booking-container">
                    <div className="booking-content">
                        <div className="booking-form-content">
                            <h3 className="booking-form-heading">ĐĂNG KÝ HỒ SƠ BỆNH NHÂN</h3>
                            <div className="row justify-content-center align-items-center">
                                <div className='booking-detail'>(Sau khi đã điền đầy đủ thông tin, Quý khách hàng sẽ có thể sử dụng toàn bộ dịch vụ của MegaHealth)</div>
                            </div>
                            <br></br>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className="form-group ">
                                        <div className='row'>
                                            <div className='col-6'>
                                                <label className="form-label">Họ và chữ lót <i>(có dấu)</i> *</label>
                                                <input name="lastname" type="text" placeholder="Vui lòng nhập họ và chữ lót"
                                                    className="form-control" required
                                                    value={lastname}
                                                    onChange={(e) => this.onInput(e, 'lastname')} />
                                                <span className="form-message"></span>
                                            </div>
                                            <div className='col-6'>
                                                <label className="form-label">Tên <i>(có dấu)</i> *</label>
                                                <input name="firstname" type="text" placeholder="Vui lòng nhập tên"
                                                    className="form-control"
                                                    value={firstname}
                                                    onChange={(e) => this.onInput(e, 'firstname')}
                                                />
                                                <span className="form-message"></span>
                                            </div>
                                        </div>
                                    </div>


                                    <div className='row'>
                                        <div className='col-3'>
                                            <div className="form-group">
                                                <label htmlFor="gender" className="form-label">Giới tính *</label>
                                                <select id="gender" name="gender" className="form-control" value={gender}
                                                    onChange={(e) => this.onInput(e, 'gender')}>
                                                    {arrGender && arrGender.length > 0 && arrGender.map((gender, index) => {
                                                        return (<option value={gender.keyMap} >{gender.value_vi}</option>)
                                                    })}
                                                </select>
                                                <span className="form-message"></span>
                                            </div>
                                        </div>
                                        <div className='col-9'>
                                            <div className="form-group">
                                                <label htmlFor="phone" className="form-label">Số điện thoại *</label>
                                                <input id="phone" name="phone" type="text"
                                                    placeholder="Vui lòng nhập số điện thoại"
                                                    className="form-control"
                                                    value={phone}
                                                    onChange={(e) => this.onInput(e, 'phone')}
                                                />
                                                <span className="form-message"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address" className="form-label">Địa chỉ *</label>
                                        <input id="address" name="address"
                                            type="text" placeholder="Vui lòng nhập địa chỉ chi tiết"
                                            className="form-control"
                                            value={address}
                                            onChange={(e) => this.onInput(e, 'address')}
                                        />
                                        <span className="form-message"></span>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">Email *</label>
                                        <input id="email" name="email" type="text"
                                            placeholder="Vui lòng nhập Email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => this.onInput(e, 'email')}
                                        />
                                        <span className="form-message"></span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="form-label">Mật khẩu *</label>
                                        <input id="password" name="password" type="password"
                                            placeholder="Vui lòng nhập mật khẩu" className="form-control"
                                            value={password}
                                            onChange={(e) => this.onInput(e, 'password')} />
                                        <span className="form-message"></span>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password_confirmation" className="form-label">Nhập lại mật khẩu *</label>
                                        <input id="password_confirmation" name="password_confirmation"
                                            placeholder="Nhập lại mật khẩu" type="password"
                                            className="form-control"
                                            value={password_confirmation}
                                            onChange={(e) => this.onInput(e, 'password_confirmation')}
                                        />
                                        <span className="form-message" style={{ color: 'red' }}>{passMess}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center align-items-center">
                                <button className="form-submit col-6 " onClick={() => this.registerUser()}>ĐĂNG KÝ</button>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
