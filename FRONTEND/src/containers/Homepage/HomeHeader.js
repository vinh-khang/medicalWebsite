import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import vnflag from '../../assets/images/vn.png';
import usaflag from '../../assets/images/usa.png';
import banner from '../../assets/images/banner1.jpg';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
// import Navigator from '../../components/Navigator';
// // import { adminMenu } from './menuApp';
import './Homepage.scss';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        }
    }

    changeLanguage = (language) => {
        this.props.changeLanguageRedux(language)
    }

    render() {
        const { language, admin } = this.props;
        const { search } = this.state;
        console.group(this.props)
        return (
            <Fragment>
                <div className="homeheader-container">
                    <div className="homeheader-content">
                        <div className="left-content">
                            <div className="header-logo"></div>
                        </div>
                        <div className="right-content">
                            <div className='header-top'>
                                <input className='search' placeholder="Tìm kiếm" />
                                <div className='search-btn'>
                                    <i className="fas fa-search"></i>
                                </div>
                                <div >
                                    <div className="header-language">
                                        <img className={language === LANGUAGES.VI ? "language-flag active" : "language-flag"} src={vnflag} alt="Logo" onClick={() => this.changeLanguage(LANGUAGES.VI)} />
                                        <img className={language === LANGUAGES.EN ? "language-flag active" : "language-flag"} src={usaflag} alt="Logo" onClick={() => this.changeLanguage(LANGUAGES.EN)} />
                                    </div>
                                </div>
                                <div className='header-register'><i className="fas fa-edit" />
                                    <FormattedMessage id="homeheader.register" />
                                </div>
                                <div className='header-phone'>
                                    <FormattedMessage id="homeheader.phone" />: 0962 435 100
                                </div>
                            </div>
                            <div className='header-bot'>
                                <div className="center-content">
                                    <div className="child-content"><FormattedMessage id="homeheader.intro" /> <i className="fas fa-caret-down"></i>
                                        <div className='dropdown-content'>
                                            ssss
                                        </div></div>
                                    <div className="child-content"><FormattedMessage id="homeheader.service" /> <i className="fas fa-caret-down"></i>
                                        <div className='dropdown-content'>
                                            ssss
                                        </div></div>
                                    <div className="child-content"><FormattedMessage id="homeheader.specialist" /> <i className="fas fa-caret-down"></i>
                                        <div className='dropdown-content'>
                                            ssss
                                        </div></div>
                                    <div className="child-content"><FormattedMessage id="homeheader.team" /> <i className="fas fa-caret-down"></i>
                                        <div className='dropdown-content'>
                                            ssss
                                        </div></div>
                                    <div className="child-content"><FormattedMessage id="homeheader.manual" /> <i className="fas fa-caret-down"></i>
                                        <div className='dropdown-content'>
                                            ssss
                                        </div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShow && (
                    <div className='banner-content'>
                        <img className="banner-image" src={banner} alt="Logo" />
                    </div>)
                }

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
