import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import vnflag from '../../assets/images/vn.png';
import usaflag from '../../assets/images/usa.png';
import banner from '../../assets/images/banner1.jpg';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { withRouter } from 'react-router';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { handleLoginAPI } from '../../services/userService';
// import Navigator from '../../components/Navigator';
// // import { adminMenu } from './menuApp';
import './Homepage.scss';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            isOpen: false,
            email: '',
            password: '',
            message: '',
            isLogin: false,
            isLoginEmail: '',
            dropdownOpen: '',
            dropdownOpen2: '',
        }
    }
    componentDidMount = () => {
        if (sessionStorage.getItem("isLoginEmail")) {
            this.setState({
                isLogin: true,
                isLoginEmail: sessionStorage.getItem("isLoginEmail"),
            })
        }
    }

    componentDidUpdate = () => {
        // if (sessionStorage.getItem("isLoginEmail")) {
        //     this.setState({
        //         isLogin: true,
        //         isLoginEmail: sessionStorage.getItem("isLoginEmail"),
        //     })
        // }
    }

    changeLanguage = (language) => {
        this.props.changeLanguageRedux(language)
    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push('/homepage')
        }
    }

    openRegisterMedical = () => {
        if (this.props.history) {
            this.props.history.push('/booking')
        }
    }

    openLogin = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    toggle2 = () => {
        this.setState({
            dropdownOpen2: !this.state.dropdownOpen2
        });
    }

    onEmailInput = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    onPasswordInput = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            message: ''
        })
        try {
            let data = await handleLoginAPI(this.state.email, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    message: data.message
                });

            }
            if (data && data.errCode === 0) {
                this.setState({
                    isOpen: !this.state.isOpen,
                    isLogin: true,
                    isLoginEmail: this.state.email,
                })

                sessionStorage.setItem('isLoginEmail', this.state.email)
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        message: e.response.data.message
                    });

                }
            }
        }
    }

    onLogout = () => {
        this.setState({
            isLogin: false,
            isLoginEmail: '',
        })

        sessionStorage.removeItem('isLoginEmail')
    }

    render() {
        const { language, admin } = this.props;
        const { search, isLoginEmail, isLogin } = this.state;
        console.log(isLoginEmail)
        return (
            <Fragment>
                <div className="homeheader-container">
                    <div className="homeheader-content">
                        <div className="left-content" onClick={() => this.returnToHome()}>
                            <div className="header-logo" ></div>
                        </div>
                        <div className="right-content">
                            <div className="center-content">
                                <div className="child-content"><FormattedMessage id="homeheader.intro" /></div>
                                <div className="child-content">QUY TRÌNH</div>
                                <div className="child-content"><FormattedMessage id="homeheader.manual" />
                                </div>
                            </div>

                            {/* <div className='header-service'>
                                CHỌN <FormattedMessage id="homeheader.service" />
                            </div> */}
                            <Dropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle2}
                                className='header-service'>
                                <DropdownToggle caret className='header-service'>
                                    <FormattedMessage id="homeheader.service" />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>Another Action</DropdownItem>

                                    <DropdownItem>Another Action</DropdownItem>

                                    <DropdownItem>Another Action</DropdownItem>

                                </DropdownMenu>
                            </Dropdown>
                            {/* <input className='search' placeholder="Tìm kiếm" /> */}
                            {/* <div className='search-btn'>
                                    <i className="fas fa-search"></i>
                                </div> */}
                            <div >
                                <div className="header-language">
                                    <img className={language === LANGUAGES.VI ? "language-flag active" : "language-flag"} src={vnflag} alt="Logo" onClick={() => this.changeLanguage(LANGUAGES.VI)} />
                                    <img className={language === LANGUAGES.EN ? "language-flag active" : "language-flag"} src={usaflag} alt="Logo" onClick={() => this.changeLanguage(LANGUAGES.EN)} />
                                </div>
                            </div>
                            {/* 
                            <div className='header-phone'>
                                <FormattedMessage id="homeheader.phone" />: 0962 435 100
                            </div> */}
                            {isLogin ? <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className='header-register'>
                                <DropdownToggle caret className='header-register-btn'>
                                    {isLoginEmail}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>Header</DropdownItem>
                                    <DropdownItem disabled>Action</DropdownItem>
                                    <DropdownItem>Another Action</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={() => this.onLogout()}>Đăng xuất</DropdownItem>
                                </DropdownMenu>
                            </Dropdown> : <div className='header-register' onClick={() => this.openLogin()}>
                                <FormattedMessage id="homeheader.login" />
                            </div>}
                        </div>
                    </div>
                </div>
                {this.props.isShow && (
                    <div className='banner-content'>
                        <img className="banner-image" src={banner} alt="Logo" />
                    </div>)
                }

                <Modal
                    isOpen={this.state.isOpen}
                    toggle={() => { this.openLogin() }}
                    size="lg"
                    centered={true}
                    className='user-login-modal'
                >
                    <ModalHeader
                        toggle={() => { this.openLogin() }}
                        centered={true}
                        className='user-login-modal-header'>
                        ĐĂNG NHẬP VÀO MEGAHEALTH
                    </ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-row">
                                        <div className='user-login-form'>
                                            <div className="form-group">
                                                <label htmlFor="inputEmail4">Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control user-login-input"
                                                    name="email"
                                                    placeholder="Vui lòng nhập Email"
                                                    onChange={(e) => this.onEmailInput(e)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputEmail4">Nhập mật khẩu</label>
                                                <input
                                                    type="password"
                                                    className="form-control user-login-input"
                                                    name="password"
                                                    placeholder="Vui lòng nhập mật khẩu"
                                                    onChange={(e) => this.onPasswordInput(e)}
                                                />
                                            </div>

                                            <button
                                                color="primary"
                                                onClick={() => { this.handleLogin() }}
                                                className="user-login-btn"
                                            >
                                                <b>ĐĂNG NHẬP</b>
                                            </button>
                                            <div
                                                className='login-register'
                                                onClick={() => this.openRegisterMedical()}>Chưa có tài khoản? Vui lòng <span>đăng ký</span></div>
                                            {/*
                                        <div className="form-group col-6 px-1">
                                            <label htmlFor="inputPassword4">Password</label>
                                            <input type="password" className="form-control" name="password" placeholder="Password"
                                                onChange={(e) => this.handleInputEvent(e, 'password')}
                                                value={password}
                                                disabled
                                            />
                                        </div>
                                        <div className="form-group col-6 px-1 mt-3">
                                            <label htmlFor="inputEmail4">First name</label>
                                            <input type="text" className="form-control" name="firstname" placeholder="First name"
                                                onChange={(e) => this.handleInputEvent(e, 'firstname')}
                                                value={firstname}
                                            />
                                        </div>
                                        <div className="form-group col-6 px-1 mt-3">
                                            <label htmlFor="inputPassword4">Last name</label>
                                            <input type="text" className="form-control" name="lastname" placeholder="Last name"
                                                onChange={(e) => this.handleInputEvent(e, 'lastname')}
                                                value={lastname}
                                            />
                                        </div>
                                        <div className="form-group col-12 mt-3 px-1">
                                            <label htmlFor="inputAddress">Address</label>
                                            <input type="text" className="form-control" name="address" placeholder="Address"
                                                onChange={(e) => this.handleInputEvent(e, 'address')}
                                                value={address}
                                            />
                                        </div>
                                        <div className="form-group col-6 mt-3 px-1">
                                            <label htmlFor="inputCity">Phone number</label>
                                            <input type="text" className="form-control" name="phonenumber"
                                                onChange={(e) => this.handleInputEvent(e, 'phonenumber')}
                                                value={phonenumber}
                                            />
                                        </div> */}
                                            {/* <div className="form-group col-3 mt-3 px-1">
                                        <label>Gender</label>
                                        <select name="gender" className="form-control">
                                            <option selected value="1">Male</option>
                                            <option value="2">Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-3">
                                        <label>Role</label>
                                        <select name="roleid" className="form-control">
                                            <option selected>Admin</option>
                                            <option >Doctor</option>
                                            <option >Patient</option>
                                        </select>
                                    </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    {/* <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => { this.doEditUser() }}
                            className="px-3"
                        >
                            Sửa
                        </Button>
                        {' '}
                        <Button onClick={() => { this.toggle() }}
                            className="px-3">
                            Hủy
                        </Button>
                    </ModalFooter> */}
                </Modal>

            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        admin: state.user.firstname,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
