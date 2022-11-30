import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES, ADMIN_ACTION, CommonUtils } from '../../../utils';
import './History.scss';
import moment from 'moment';
import { toast } from "react-toastify";
import { getBookingSchedule, setBookingSchedule, getAllUsers } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import { withRouter } from 'react-router';
import { FormGroup, Label, Input, Badge, PaginationItem, PaginationLink, Pagination } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from '../../../components/Input/DatePicker';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ProfileTable from '../../Patient/Profile/ProfileTable';

class History extends Component {

    constructor(props) {
        super(props);
        this.state = {
            booking: '',
            isOpen: false,
            patient: '',
            page: 1,
            allPage: 0,
            doctorName: '',
            currentDate: null,
            user: null
        }
    }

    async componentDidMount() {
        let data = await getBookingSchedule(this.props.userInfor.id, 'patient');
        let total = data.booking.length;
        let kq = (total / 10) > Math.floor(total / 10) ? Math.floor(total / 10) + 1 : Math.floor(total / 10);

        let doctorName = [];
        data.booking.map((item, index) => {
            let name = `${item.doctorData.lastname} ${item.doctorData.firstname}`;
            doctorName.push(name);
        })

        this.setState({
            booking: data.booking,
            allPage: kq,
            doctorName: doctorName,
            user: this.props.userInfor
        })
    }

    openModal = async (id) => {
        let patient = await getAllUsers(id);
        this.setState({
            isOpen: !this.state.isOpen,
            patient: patient.users
        })
    }

    closeModal = () => {
        this.setState({
            isOpen: false
        })
    }

    nextPage = (page) => {
        if (page > 0 && page <= this.state.allPage) {
            this.setState({
                page: page
            })
        }
    }

    render() {
        let { booking, patient, page, allPage } = this.state;

        let arrBooking = [];
        for (let i = page * 10 - 10; i <= page * 10 - 1; i++) {
            if (booking[i]) {
                arrBooking.push(booking[i])
            }
        }

        var rows = [];
        for (let i = 1; i <= allPage; i++) {
            let active = page == i ? true : false;
            rows.push(
                <PaginationItem active={active}>
                    <PaginationLink onClick={() => this.nextPage(i)}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return (
            <React.Fragment>
                <div className='history-title text-center'>LỊCH ĐẶT KHÁM</div>
                <div className="history-content">
                    <div className='container'>
                        <div className='row'>
                            <div className='specialty-table'>
                                <table id="specialty">
                                    <thead>
                                        <tr>
                                            <th>Mã đơn</th>
                                            <th>Bác sĩ</th>
                                            <th>Ngày</th>
                                            <th>Thời gian</th>
                                            <th>Phòng</th>
                                            <th>Giá</th>
                                            <th>Trạng thái</th>
                                            {/* <th style={{ width: '100px' }}></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arrBooking && arrBooking.map((item, index) => {
                                                return (
                                                    <tr key={index} style={{ height: '50px' }}>
                                                        <td>{item.id}</td>
                                                        <td><b>{item.doctorData.lastname} {item.doctorData.firstname}</b></td>
                                                        <td>{moment(item.date).format("DD - MM - YYYY")}</td>
                                                        <td>{item.timetypeData.value_en}</td>
                                                        <td>{item.room}</td>
                                                        <td><b><NumberFormat value={item.booking_price} displayType={'text'} thousandSeparator={true} prefix={''} /> VNĐ</b></td>
                                                        <td className='new-status'>
                                                            <Badge color={item.status_id === 'S1' ? "danger" : item.status_id === 'S2' ? 'primary' : item.status_id === 'S3' ? 'success' : 'secondary'}>
                                                                {item.statusData.value_vi}
                                                            </Badge>
                                                        </td>
                                                        {/* <td>
                                                            <div className='mx-3 view-icon' onClick={() => this.openModal(item.patient_id)}><i className="fas fa-user-tag"></i></div>
                                                        </td> */}
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                            <Pagination>
                                <PaginationItem disabled={page === 1 ? true : false} onClick={() => this.nextPage(1)}>
                                    <PaginationLink
                                        first
                                    />
                                </PaginationItem>
                                <PaginationItem disabled={page === 1 ? true : false} onClick={() => this.nextPage(page - 1)}>
                                    <PaginationLink
                                        previous
                                    />
                                </PaginationItem>
                                {rows}
                                <PaginationItem disabled={page === allPage ? true : false} onClick={() => this.nextPage(page + 1)}>
                                    <PaginationLink
                                        next
                                    />
                                </PaginationItem>
                                <PaginationItem disabled={page === allPage ? true : false} onClick={() => this.nextPage(allPage)}>
                                    <PaginationLink
                                        last
                                    />
                                </PaginationItem>
                            </Pagination>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.isOpen}
                    size="lg"
                    centered={true}
                    className='history-modal'
                    toggle={() => this.closeModal()}
                >
                    <ModalHeader
                        toggle={() => { this.closeModal() }}
                        centered={true}
                        className='history-modal-header'>
                        Chi tiết đặt khám
                    </ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <ProfileTable
                                userInfor={patient}
                            />
                        </div>
                    </ModalBody>

                </Modal>

            </React.Fragment >
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

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(History));
