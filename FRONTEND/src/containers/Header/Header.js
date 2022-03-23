import React, { Component } from 'react';
import { connect } from 'react-redux';
import vnflag from '../../assets/images/vn.png';
import usaflag from '../../assets/images/usa.png';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],

        }
    }

    changeLanguage = (language) => {
        this.props.changeLanguageRedux(language);
    }

    componentDidMount = () => {
        let userInfo = this.props.userInfo;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            if (userInfo.role_id === 'R1') {
                menu = adminMenu;
            }
            if (userInfo.role_id === 'R2') {
                menu = doctorMenu;
            }
        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        const { menuApp } = this.state;

        console.log(userInfo);
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={menuApp} />
                </div>

                <div className="header-language">
                    <span className='header-admin'><FormattedMessage id="login.welcome" />{userInfo && userInfo ? userInfo.firstname : ''} !</span>
                    <img className={language === LANGUAGES.VI ? "language-flag active" : "language-flag"} src={vnflag} alt="Logo" onClick={() => this.changeLanguage(LANGUAGES.VI)} />
                    <img className={language === LANGUAGES.EN ? "language-flag active" : "language-flag"} src={usaflag} alt="Logo" onClick={() => this.changeLanguage(LANGUAGES.EN)} />
                </div>
                {/* nút logout */}
                <div className="btn btn-logout" onClick={processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
