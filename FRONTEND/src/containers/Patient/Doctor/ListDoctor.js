import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDoctorBySpecialty } from '../../../services/userService';
import { getSpecialty } from '../../../services/specialtyService';
import NumberFormat from 'react-number-format';
import { withRouter } from 'react-router';
import './ListDoctor.scss';
import Select from 'react-select';
import { InputGroup, InputGroupText, Input } from 'reactstrap';


class ListDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorInfor: '',
            input: '',
            doctorName: '',
            doctorInfor2: '',
        }
    }

    componentDidMount() {
        let { doctorInfor } = this.props;
        let doctorName = [];
        if (doctorInfor) {
            this.setState({
                doctorInfor: doctorInfor
            })
        }

        doctorInfor.map((item, index) => {
            let name = `${item.User.lastname} ${item.User.firstname}`;
            doctorName.push(name);
        })

        this.setState({
            doctorName: doctorName
        })

    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        // let { doctor, specialty } = this.props;
        // if (prevProps.doctor !== this.props.doctor) {
        //     this.setState({
        //         doctor_deg: doctor.positionData.value_vi
        //     })
        // }
    }

    getDoctorDetail = (id) => {
        if (this.props.history) {
            this.props.history.push(`/doctor/${id}`)
        }
    }

    filterDoctor = (e) => {
        let { doctorName, doctorInfor } = this.state;
        this.setState({
            input: e.target.value
        })

        let doctor = doctorName.map((name, index) => {
            if (name.indexOf(e.target.value) !== -1) {
                return name;
            }
        })

        let doctorFilter = [];

        doctor.map((doctor, index) => {
            doctorInfor.map((item, index) => {
                let name = `${item.User.lastname} ${item.User.firstname}`;
                if (doctor === name) {
                    doctorFilter.push(item)
                }
            })
        })

        this.setState({
            doctorInfor2: doctorFilter
        })
    }


    render() {

        let { doctorInfor, input, doctorName, doctorInfor2 } = this.state;
        if (input.length > 0) {
            doctorInfor = doctorInfor2
        }
        return (
            <>
                <div className='list-doctor-title'>
                    {/* <i className="fas fa-search"></i> Tìm kiếm Bác sĩ theo tên */}
                    <div class="input-group">
                        <input type="text" value={input} onChange={(e) => this.filterDoctor(e)}
                            class="form-control" placeholder="Tìm kiếm nhanh bác sĩ" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                </div>
                <div className='list-doctor-content'>
                    <div className='row'>
                        {doctorInfor && doctorInfor.length > 0 && doctorInfor.map((item, index) => {
                            let img64 = '';
                            if (item.User.image) {
                                img64 = new Buffer(item.User.image, 'base64').toString('binary');
                            }
                            return (
                                <><div className='col-6'>
                                    <div className='list-doctor-infor' onClick={() => this.getDoctorDetail(item.User.id)}>
                                        <div className='row'>
                                            <div className='list-doctor-img-padding col-3 '>
                                                <div className='list-doctor-img' style={{ backgroundImage: `url(${img64})` }}></div>
                                            </div>
                                            <div className='col-9'>
                                                <div className='list-doctor-name'><i className="fa fa-user-md"></i>Bác sĩ {item.User.lastname} {item.User.firstname}</div>
                                                <div className='list-doctor-text'><i class="fas fa-transgender"></i><b>Giới tính:</b> {item.gender_value}</div>
                                                <div className='list-doctor-text'><i class="fas fa-stethoscope"></i><b>Chuyên khoa:</b> {item.Specialty.specialty_name}</div>
                                                <div className='list-doctor-text'> <i class="fas fa-coins"></i><b>Chi phí:</b> {<NumberFormat value={item.Specialty.specialty_price} displayType={'text'} thousandSeparator={true} prefix={''} />} VNĐ</div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </>
                            )
                        })}
                        {doctorInfor && doctorInfor.length === 0 && <div className='justify-content-center'>Không tìm thấy kết quả cho "{input}"</div>}

                    </div>
                </div>
            </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListDoctor));
