import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import { handleLoginAPI } from '../../services/userService';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPass: false,
            message: ''
        }
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value,
        });
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    }

    handleLogin = async () => {
        this.setState({
            message: ''
        })
        try {
            let data = await handleLoginAPI(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    message: data.message
                });

            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
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

    onEnterLogin = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            this.handleLogin();

        }
    }

    handleShowPass = () => {
        this.setState({
            isShowPass: !this.state.isShowPass,
        });
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-center text-login">
                            Login
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label>User name: </label>
                            <input type="text" className="form-control" placeholder='Enter your name'
                                value={this.state.username}
                                onChange={(e) => this.onChangeUsername(e)}
                                onKeyDown={(e) => this.onEnterLogin(e)}
                            />
                        </div>
                        <div className='col-12 form-group login-input' >
                            <label>Password: </label>

                            <div className='custom-input-password'>
                                <input
                                    type={this.state.isShowPass ? 'text' : 'password'}
                                    className="form-control" placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(e) => this.onChangePassword(e)}
                                    onKeyDown={(e) => this.onEnterLogin(e)}
                                />
                                <span onClick={this.handleShowPass}>
                                    <i className={this.state.isShowPass ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.message}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login'
                                onClick={() => this.handleLogin()}
                            >Login</button>
                        </div>
                        <div className='col-12'>
                            <span>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span>Or login with:</span>
                            <div className='login-social'>
                                <i className="fab fa-google-plus-square"></i>
                                <i className="fab fa-facebook"></i>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
