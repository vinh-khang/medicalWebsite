import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import HomeHeader from '../../Homepage/HomeHeader';
import { LANGUAGES, ADMIN_ACTION, CommonUtils } from '../../../utils';
import { Button, UncontrolledCollapse, Card, CardBody } from 'reactstrap';
import quytrinh from '../../../assets/images/quytrinh.jpg';
import './SpecialtyDetailed.scss';
import { getSpecialty } from '../../../services/specialtyService';
import { getDoctorBySpecialty } from '../../../services/userService';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody } from 'reactstrap';
import ListDoctor from '../Doctor/ListDoctor';
import Footer from '../../Homepage/Footer';

class SpecialtyDetailed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: null,
            specialtyID: null,
            specialty: '',
            isLogin: '',
            isLoginEmail: '',
            isOpen: false

        }
    }

    componentDidMount = async () => {
        let data = await getSpecialty(this.props.match.params.id);
        let doctor = await getDoctorBySpecialty(this.props.match.params.id);

        this.setState({
            specialtyID: this.props.match.params.id,
            specialty: data.specialty,
            doctor: doctor.data
        })
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
    }

    openSpecialtyDetail = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        let { specialty, doctor } = this.state;
        let image = '';
        if (specialty.specialty_image) {
            image = new Buffer(specialty.specialty_image, 'base64').toString('binary');
        }
        return (
            <>
                <HomeHeader isShow={false} />
                <div className='specialty-detail-container'>
                    <div className='specialty-detail-banner' style={{ backgroundImage: `url(${quytrinh})` }}>
                        <div className='specialty-detail-title'>
                            CHUYÊN KHOA<br />
                            {specialty.specialty_name}
                        </div>
                    </div>
                    <div className='specialty-detail-content'>
                        <div className='specialty-detail-infor'>
                            <div className='specialty-detail-desc'>
                                <div className='detaild-doctor-text'>
                                    <div>
                                        <Button
                                            color="primary"
                                            style={{
                                                marginBottom: '1rem'
                                            }}
                                            className="button-detail-doctor"
                                            onClick={() => this.openSpecialtyDetail()}
                                        >
                                            Xem chi tiết
                                        </Button>
                                        <Modal
                                            isOpen={this.state.isOpen}
                                            toggle={() => { this.openSpecialtyDetail() }}
                                            size="lg"
                                            centered={true}
                                            className='specialty-detail-modal'
                                        >
                                            <ModalHeader
                                                toggle={() => { this.openSpecialtyDetail() }}
                                                centered={true}
                                                className='specialty-detail-modal-header'>
                                                {/* <div className='icon-img'
                                                    style={{
                                                        backgroundImage: `url(${image})`,
                                                    }}
                                                /> */}
                                                <div className='specialty-detail-title'>CHUYÊN KHOA {specialty.specialty_name}</div>

                                            </ModalHeader>
                                            <ModalBody>
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className='specialty-detail-content'>
                                                                {specialty &&
                                                                    (
                                                                        <span>
                                                                            <div dangerouslySetInnerHTML={{ __html: specialty.specialty_HTML }}></div>
                                                                        </span>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ModalBody>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {doctor && specialty &&
                        <ListDoctor
                            doctorInfor={doctor}
                        />
                    }
                </div>
                <Footer />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        doctor: state.user.doctor,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDoctorIDStart: (id) => dispatch(actions.getDoctorIDStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetailed);
