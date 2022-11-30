import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import HomeHeader from '../../Homepage/HomeHeader';
import moment from 'moment';
import { getDoctorById, getAllUsers, getUserByEmail, createBookingSchedule } from '../../../services/userService';
import { LANGUAGES, ADMIN_ACTION, CommonUtils } from '../../../utils';
import NumberFormat from 'react-number-format';
import { Table } from 'reactstrap';
import './ProfileTable.scss';
import _ from 'lodash';

class ProfileTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidMount = () => {
        this.setState({
            user: this.props.userInfor
        })
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {

    }


    render() {
        let { user } = this.state;
        return (
            <>
                <div className="profile-table-container">
                    <div className='profile-title'><i class="fas fa-id-card"></i> Chi tiết thông tin bệnh nhân</div>
                    <div className='profile-table'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="form-group ">
                                    <div className='row booking-user-infor'>
                                        <Table borderless>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '120px' }}>
                                                        <i class="fas fa-user-circle"></i> Họ:
                                                    </th>
                                                    <td style={{ width: '' }}>
                                                        <b>{user ? user.lastname : ''}</b>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        <i class="fas fa-user-circle"></i> Tên:
                                                    </th>
                                                    <td>
                                                        <b>{user ? user.firstname : ''}</b>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th style={{ width: '180px' }}>
                                                        <i className="fas fa-mobile-alt"></i> Số điện thoại:
                                                    </th>
                                                    <td>
                                                        {user ? user.phonenumber : ''}
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>

                                                    <th>
                                                        <i class="fas fa-envelope"></i> Email:
                                                    </th>
                                                    <td>
                                                        {user ? user.email : ''}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        <i className="fas fa-transgender"></i> Giới tính:
                                                    </th>
                                                    <td>
                                                        {user ? user.gender_value : ''}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <i class="fas fa-map-marker-alt"></i> Địa chỉ:
                                                    </th>
                                                    <td>
                                                        {user ? user.address : ''}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>

                                    </div>
                                </div>

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

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTable);
