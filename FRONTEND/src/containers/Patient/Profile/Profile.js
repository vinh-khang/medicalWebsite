import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import HomeHeader from '../../Homepage/HomeHeader';
import ProfileTable from './ProfileTable';
import { LANGUAGES, ADMIN_ACTION, CommonUtils } from '../../../utils';
import './Profile.scss';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { getUserByEmail } from '../../../services/userService';
import Footer from '../../Homepage/Footer';
import ProfileMenu from './ProfileMenu';
import History from './History';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            menu: 1
        }
    }

    componentDidMount = async () => {
        if (sessionStorage.getItem("isLoginEmail")) {
            let user = await getUserByEmail(sessionStorage.getItem("isLoginEmail"));
            this.setState({
                user: user.user
            })
        }

    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {

    }

    changeMenu = (id) => {
        this.setState({
            menu: id
        })
    }

    render() {
        let { user, menu } = this.state;
        return (
            <>
                <HomeHeader isShow={false} />
                <div className="profile-container">
                    <div className="profile-content">
                        <div className='row'>
                            <div className='col-3 menu'>
                                <div className='menu-title'>TÀI KHOẢN CỦA TÔI</div>
                                <div className='hello-user'>Xin chào, <b>{user ? user.firstname : ''}</b> !</div>
                                <Nav vertical>

                                    <NavItem>
                                        <NavLink onClick={() => this.changeMenu(1)}>
                                            <i className="fas fa-file-medical"></i> Lịch sử đặt khám
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink onClick={() => this.changeMenu(2)}>
                                            <i className="fas fa-address-book"></i> Hồ sơ bệnh nhân
                                        </NavLink>
                                    </NavItem>
                                    {/* <NavItem>
                                        <NavLink onClick={() => this.changeMenu(3)}>
                                            <i className="fas fa-bell"></i> Thông báo của tôi
                                        </NavLink>
                                    </NavItem> */}
                                </Nav>
                                <div className='divide-line'></div>
                            </div>
                            <div className='col-9'>
                                {
                                    user && menu === 1 && <History
                                        userInfor={user} />
                                }
                                {
                                    user && menu === 2 && <ProfileMenu
                                        userInfor={user} />
                                }
                            </div>
                        </div>

                    </div>
                </div>
                <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
