import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import _ from "lodash";
import './BookingSchedule.scss';
import moment from 'moment';
import { toast } from "react-toastify";
import { getBookingSchedule, setBookingSchedule, getAllUsers } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import { withRouter } from 'react-router';
import { Dropdown, Label, DropdownItem, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, InputGroup, Button, Input, Badge, PaginationItem, PaginationLink, Pagination } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from '../../../components/Input/DatePicker';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ProfileTable from '../../Patient/Profile/ProfileTable';

class BookingSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            booking: '',
            isOpen: false,
            patient: '',
            page: 1,
            arrBooking: [],
            allPage: 0,
            name_stt: false,
            doctorName: '',
            input: '',
            selection: 'ALL',
            status_stt: false,
            currentDate: null,
            date_stt: false,
            isOpenFilter: false,
            filterSelected: 0,
            doctorLogin: false
        }
    }

    async componentDidMount() {
        let data = null;
        let userInfo = this.props.userInfo;
        if (userInfo && !_.isEmpty(userInfo)) {
            if (userInfo.role_id === 'R2') {
                data = await getBookingSchedule(userInfo.id, 'doctor');
                this.setState({
                    doctorLogin: true
                })
            } else {
                data = await getBookingSchedule('ALL', 'admin');
            }
        }

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
            doctorName: doctorName
        })
    }


    changeStatusID = async (id, status_id) => {
        if (id && status_id) {
            await setBookingSchedule({
                id: id,
                type: 'STATUS',
                status_id: status_id
            })
            let data = null;
            let userInfo = this.props.userInfo;
            if (userInfo && !_.isEmpty(userInfo)) {
                if (userInfo.role_id === 'R2') {
                    data = await getBookingSchedule(userInfo.id, 'doctor');
                } else {
                    data = await getBookingSchedule('ALL', 'admin');
                }
            }
            this.setState({
                booking: data.booking,
            })

        }
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

    nameFilter = (data, array) => {
        let { doctorName } = this.state;
        if (data) {
            this.setState({
                input: data,
                name_stt: true
            })
        } else {
            this.setState({
                input: data,
                name_stt: false
            })
        }

        let doctor = [];

        doctorName.map((name, index) => {
            if (name.indexOf(data) !== -1 && !doctor.includes(name)) {
                doctor.push(name);
            }
        })

        let doctorFilter = [];

        doctor.map((doctor, index) => {
            array.map((item, index) => {
                let name = `${item.doctorData.lastname} ${item.doctorData.firstname}`;
                if (doctor === name) {
                    doctorFilter.push(item)
                }
            })
        })

        let total = doctorFilter.length;
        let kq = (total / 10) > Math.floor(total / 10) ? Math.floor(total / 10) + 1 : Math.floor(total / 10);
        this.setState({
            allPage: kq,
        })

        return doctorFilter;
    }

    statusFilter = (data, array) => {
        if (data === 'ALL') {
            let total = array.length;
            let kq = (total / 10) > Math.floor(total / 10) ? Math.floor(total / 10) + 1 : Math.floor(total / 10);
            this.setState({
                status_stt: false,
                allPage: kq,
            })

            return [];
        } else {
            let statusBooking = []
            array.forEach((item, index) => {
                if (item.status_id === data) statusBooking.push(item)
            })

            let total = statusBooking.length;
            let kq = (total / 10) > Math.floor(total / 10) ? Math.floor(total / 10) + 1 : Math.floor(total / 10);

            this.setState({
                selection: data,
                status_stt: true,
                allPage: kq,
            })

            return statusBooking;
        }
    }

    dateFilter = (data, array) => {
        let dateData = [];
        array.forEach((item, index) => {
            if (moment(item.date).format("DD - MM - YYYY") === moment(data).format("DD - MM - YYYY")) dateData.push(item)
        })

        let total = dateData.length;
        let kq = (total / 10) > Math.floor(total / 10) ? Math.floor(total / 10) + 1 : Math.floor(total / 10);

        this.setState({
            date: moment(data).format("DD - MM - YYYY"),
            date_stt: true,
            allPage: kq,
        })

        return dateData;
    }

    handleChangeDate = (date) => {
        this.setState({
            currentDate: date[0],
        })

        this.filterData(date[0], 'date');

    }

    filterData = (e, type) => {
        let { booking, name_stt, input, status_stt, selection, date_stt } = this.state;

        if (type === 'name' && !status_stt && !date_stt) {
            let data = this.nameFilter(e.target.value, booking);

            this.setState({
                bookingArrFilter: data
            })
        } else if (type === 'name' && status_stt && !date_stt) {
            let array = this.nameFilter(e.target.value, booking);
            let finalData = this.statusFilter(selection, array);

            this.setState({
                bookingArrFilter: finalData
            })
        }

        if (type === 'status' && !name_stt && !date_stt) {
            let data = this.statusFilter(e.target.value, booking);

            this.setState({
                bookingArrFilter: data
            })
        } else if (type === 'status' && name_stt && !date_stt) {
            let array = this.statusFilter(e.target.value, booking);
            let finalData = this.nameFilter(input, array);

            this.setState({
                bookingArrFilter: finalData
            })
        } else if (type === 'status' && date_stt) {
            this.setState({
                status_stt: true
            })
        }

        if (type === 'date' && (type)) {
            let data = this.dateFilter(e, booking);

            if (name_stt) {
                data = this.nameFilter(input, data);
            }

            if (status_stt) {
                data = this.statusFilter(selection, data);

            }

            this.setState({
                bookingArrFilter: data
            })


        }
    }

    toggle = () => {
        this.setState({
            isOpenFilter: !this.state.isOpenFilter
        })
    }

    changeFilter = (id) => {
        let { booking } = this.state;
        let total = booking.length;
        let kq = (total / 10) > Math.floor(total / 10) ? Math.floor(total / 10) + 1 : Math.floor(total / 10);
        if (id === 0) {
            this.setState({
                filterSelected: id,
                arrBooking: [],
                status_stt: false,
                date_stt: false,
                name_stt: false,
                input: '',
                selection: '',
                currentDate: null,
                allPage: kq,
                filterSelected: 0

            })
        } else {

            this.setState({
                filterSelected: id,
                arrBooking: [],
                status_stt: false,
                date_stt: false,
                name_stt: false,
                input: '',
                selection: '',
                currentDate: null,
                allPage: kq

            })

        }

    }


    render() {
        let { doctorLogin, selection, input, booking, patient, page, allPage, bookingArrFilter, status_stt, name_stt, currentDate, date_stt, isOpenFilter, filterSelected } = this.state;

        let bookingCopy = booking;
        if (status_stt || name_stt || date_stt) {
            bookingCopy = bookingArrFilter
        }

        let arrBooking = [];
        for (let i = page * 10 - 10; i <= page * 10 - 1; i++) {
            if (bookingCopy[i]) {
                arrBooking.push(bookingCopy[i])
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
                <div className="booking-schedule-container">
                    <div className='booking-schedule-title text-center'><FormattedMessage id="menu.admin.booking-management" /></div>
                    <div className="booking-schedule-content">
                        <div className='container'>
                            <div className='row'>
                                <Dropdown
                                    toggle={() => this.toggle()}
                                    isOpen={isOpenFilter}

                                >

                                    <DropdownToggle caret className="filter">
                                        <i className="fas fa-filter"></i>
                                    </DropdownToggle>
                                    <DropdownMenu container="body">
                                        <DropdownItem onClick={() => this.changeFilter(1)}>
                                            <FormattedMessage id="common.filter-by-doctor" />
                                        </DropdownItem>
                                        <DropdownItem onClick={() => this.changeFilter(1)}>
                                            <FormattedMessage id="common.filter-by-status" />
                                        </DropdownItem>
                                        <DropdownItem onClick={() => this.changeFilter(2)}>
                                            <FormattedMessage id="common.filter-by-date" />
                                        </DropdownItem>
                                        <DropdownItem onClick={() => this.changeFilter(0)} className="red">
                                            <FormattedMessage id="common.cancel-filter" />
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                {filterSelected === 1 ?
                                    <div className='col-4 row'>
                                        <Input
                                            className='col-8 search'
                                            placeholder="Tìm tên bác sĩ"
                                            onChange={(e) => this.filterData(e, 'name')}
                                            value={input}
                                        />

                                        <Input
                                            className='col-3 select'
                                            type="select"
                                            onChange={(e) => this.filterData(e, 'status')}
                                            value={selection}

                                        >
                                            <option value='ALL'>
                                                ALL
                                            </option>
                                            <option value='S1'>
                                                Lịch hẹn mới
                                            </option>
                                            <option value='S2'>
                                                Đã xác nhận
                                            </option>
                                            <option value='S3'>
                                                Đã khám xong
                                            </option>
                                            <option value='S4'>
                                                Đã hủy
                                            </option>
                                        </Input>
                                    </div> : filterSelected === 2 ?
                                        <DatePicker
                                            onChange={this.handleChangeDate}
                                            className='form-control col-2 date-picker'
                                            value={currentDate}
                                        /> :
                                        ''}
                                <div className='specialty-table'>
                                    <table id="specialty">
                                        <thead>
                                            <tr>
                                                <th><FormattedMessage id="common.code" /></th>
                                                {!doctorLogin ? <th><FormattedMessage id="doctor-manage.doctor-name" /></th> : ''}
                                                <th><FormattedMessage id="common.date" /></th>
                                                <th><FormattedMessage id="common.time" /></th>
                                                <th><FormattedMessage id="common.room" /></th>
                                                <th><FormattedMessage id="common.price" /></th>
                                                <th style={{ width: '60px' }}>TT</th>
                                                <th style={{ width: '300px' }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                arrBooking && arrBooking.map((item, index) => {
                                                    return (
                                                        <tr key={index} style={{ height: '50px' }}>
                                                            <td>{item.id}</td>
                                                            {!doctorLogin ? <td><b>{item.doctorData.lastname} {item.doctorData.firstname}</b></td> : ''}
                                                            <td>{moment(item.date).format("DD - MM - YYYY")}</td>
                                                            <td>{item.timetypeData.value_en}</td>
                                                            <td>{item.room}</td>
                                                            <td><b><NumberFormat value={item.booking_price} displayType={'text'} thousandSeparator={true} prefix={''} /> VNĐ</b></td>
                                                            <td className='new-status'>
                                                                {item.status_id === 'S1' ?
                                                                    <i className="fas fa-calendar-plus"></i>
                                                                    : item.status_id === 'S2' ?
                                                                        <i className="fas fa-calendar"></i>
                                                                        : item.status_id === 'S3' ?
                                                                            <i className="fas fa-calendar-check"></i> :
                                                                            <i className="fas fa-calendar-times"></i>}

                                                            </td>
                                                            <td style={{ width: '100px' }}>
                                                                {item.status_id === 'S2' ? <button className='mx-3 btn btn-success' onClick={() => this.changeStatusID(item.id, 'S3')}><FormattedMessage id="common.complete" /></button>
                                                                    : item.status_id === 'S1' ? <button className='mx-3 btn btn-danger' onClick={() => this.changeStatusID(item.id, 'S2')}><FormattedMessage id="common.confirm" /></button> : ''}
                                                                <div className='mx-3 view-icon' onClick={() => this.openModal(item.patient_id)}><i className="fas fa-user-tag"></i></div>
                                                                <div className='mx-3 delete-icon' onClick={() => this.changeStatusID(item.id, 'S4')}><i class="fas fa-trash-alt"></i></div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
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
                    className='booking-schedule-modal'
                    toggle={() => this.closeModal()}
                >
                    <ModalHeader
                        toggle={() => { this.closeModal() }}
                        centered={true}
                        className='booking-schedule-modal-header'>
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
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingSchedule));
