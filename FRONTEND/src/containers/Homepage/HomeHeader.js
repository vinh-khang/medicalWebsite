import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import vnflag from '../../assets/images/vn.png';
import usaflag from '../../assets/images/usa.png';
import banner from '../../assets/images/banner1.jpg';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { withRouter } from 'react-router';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import { handleLoginAPI, getUserByEmail } from '../../services/userService';
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
            user: '',
            checked: false
        }
    }
    componentDidMount = async () => {
        if (sessionStorage.getItem("isLoginEmail")) {
            this.setState({
                isLogin: true,
                isLoginEmail: sessionStorage.getItem("isLoginEmail"),
            })

            let user = await getUserByEmail(sessionStorage.getItem("isLoginEmail"));
            this.setState({
                user: user.user
            })
        }


    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.setState({
                isOpen: this.props.isOpen
            })
        }
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
            this.props.history.push('/user-register')
        }
    }

    onShowPost = (type) => {
        if (this.props.history) {
            this.props.history.push(`/post/${type}`)
        }
    }

    openLogin = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })

        if (sessionStorage.getItem("mg-user")) {
            this.setState({
                email: sessionStorage.getItem("mg-user"),
                password: sessionStorage.getItem("mg-pass"),
                checked: true
            })
        } else {
            this.setState({
                email: '',
                password: '',
                checked: false
            })
        }
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
            email: e.target.value,
            message: ''
        })
    }

    onPasswordInput = (e) => {
        this.setState({
            password: e.target.value,
            message: ''
        })
    }

    handleLogin = async () => {
        this.setState({
            message: ''
        })

        try {
            let data = await handleLoginAPI(this.state.email, this.state.password, 'HP');
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

                sessionStorage.setItem('isLoginEmail', this.state.email);
                if (this.state.checked) {
                    sessionStorage.setItem('mg-user', this.state.email);
                    sessionStorage.setItem('mg-pass', this.state.password);
                } else {
                    sessionStorage.removeItem('mg-user');
                    sessionStorage.removeItem('mg-pass');
                }

                let user = await getUserByEmail(this.state.isLoginEmail);
                this.setState({
                    user: user.user
                })
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

        sessionStorage.removeItem('isLoginEmail');
        if (this.props.history) {
            this.props.history.push('/homepage')
        }
    }

    getAllDoctor = () => {
        if (this.props.history) {
            this.props.history.push('/all-doctors')
        }
    }

    onProfileTab = (tab) => {
        if (this.props.history) {
            this.props.history.push(`/${tab}`)
        }
    }

    setChecked = () => {
        this.setState({
            checked: !this.state.checked
        })
    }


    render() {
        const { language, admin } = this.props;
        const { isLogin, user, checked, email, password, message } = this.state;

        return (
            <Fragment>
                <div className="homeheader-container">
                    <div className="homeheader-content">
                        <div className="left-content col-3" onClick={() => this.returnToHome()}>
                            <div className="header-logo" ></div>
                        </div>
                        <div className='col-2'></div>
                        <div className="right-content col-7">
                            <div className="center-content">
                                <div className="child-content" onClick={() => this.onShowPost('INTRO')}><FormattedMessage id="homeheader.intro" /></div>
                                <div className="child-content" onClick={() => this.onShowPost('PROCEDURE')}><FormattedMessage id="homeheader.procedure" /></div>

                                <div className="child-content" onClick={() => this.onShowPost('GUIDE')}><FormattedMessage id="homeheader.question" /></div>
                            </div>

                            <div >
                                <div className="header-language">
                                    <img className={language === LANGUAGES.VI ? "language-flag active" : "language-flag"} src={vnflag} alt="Logo" onClick={() => this.changeLanguage(LANGUAGES.VI)} />
                                    <img className={language === LANGUAGES.EN ? "language-flag active" : "language-flag"} src={usaflag} alt="Logo" onClick={() => this.changeLanguage(LANGUAGES.EN)} />
                                </div>
                            </div>

                            {isLogin ? <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className='header-register'>
                                <DropdownToggle caret className='header-register-btn' style={{ border: 'none !important' }}>
                                    {user.firstname}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header><FormattedMessage id="homeheader.hello" /> <b>{user.firstname}</b></DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={() => this.onProfileTab('profile')}><i className="fas fa-address-book"></i><FormattedMessage id="homeheader.profile" /></DropdownItem>
                                    <DropdownItem onClick={() => this.getAllDoctor()}><i className="fas fa-user-md"></i><FormattedMessage id="homeheader.booking" /></DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={() => this.onLogout()}><i className="fas fa-power-off"></i><FormattedMessage id="homeheader.loggout" /></DropdownItem>
                                </DropdownMenu>
                            </Dropdown> : <div className='header-register' onClick={() => this.openLogin()}>
                                <FormattedMessage id="homeheader.login" />
                            </div>}
                        </div>
                    </div>
                </div>
                {this.props.isShow && (
                    <div className='banner-content' style={{ backgroundImage: `url(${banner})` }}>
                        <div className='banner-layer-blue'>
                        </div>
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
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control user-login-input"
                                                    name="email"
                                                    placeholder="Vui lòng nhập Email"
                                                    onChange={(e) => this.onEmailInput(e)}
                                                    value={email}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Nhập mật khẩu</label>
                                                <input
                                                    type="password"
                                                    className="form-control user-login-input"
                                                    name="password"
                                                    placeholder="Vui lòng nhập mật khẩu"
                                                    onChange={(e) => this.onPasswordInput(e)}
                                                    value={password}
                                                />
                                            </div>
                                            <FormGroup check>
                                                <Input
                                                    type="checkbox"
                                                    defaultChecked={checked}
                                                    onChange={() => this.setChecked(!checked)}

                                                />
                                                {' '}
                                                <Label check>
                                                    Ghi nhớ tôi
                                                </Label>
                                            </FormGroup>
                                            <div className='form-group mt-3'>
                                                <span className='red'>{message ? message : ''}</span>
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

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>

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
