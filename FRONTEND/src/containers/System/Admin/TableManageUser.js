import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import './TableManageUser.scss';


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
        }
    }

    async componentDidMount() {
        this.props.fetchAllUsersStart();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrUsers !== this.props.arrUsers) {
            let arrUsers = this.props.arrUsers;
            this.setState({
                arrUsers: arrUsers,
                gender: arrUsers && arrUsers.length > 0 ? arrUsers[0].key : ''
            })
        }
    }

    deleteUser = (id) => {
        this.props.deleteUserStart(id);
    }

    editUser = (user) => {
        this.props.handleEditUser(user);
    }

    render() {
        let { arrUsers } = this.state;
        return (
            <React.Fragment>
                <div className="users-container">
                    <div className='title text-center'>ỦA ALO</div>
                    <div className='users-table mt-4 mx-3'>
                        <table id="customers">
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th><FormattedMessage id="user_manage.firstname" /></th>
                                    <th><FormattedMessage id="user_manage.lastname" /></th>
                                    <th><FormattedMessage id="user_manage.address" /></th>
                                    <th style={{ width: "150px" }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arrUsers && arrUsers.map((user, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{user.email}</td>
                                                <td>{user.firstname}</td>
                                                <td>{user.lastname}</td>
                                                <td>{user.address}</td>
                                                <td>
                                                    <div className='mx-3 edit' onClick={() => this.editUser(user)}><i class="fas fa-edit"></i></div>
                                                    <div className='mx-3 delete' onClick={() => this.deleteUser(user.id)}><i class="fas fa-trash-alt"></i></div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
                {/* <MdEditor
                    style={{ height: '500px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={handleEditorChange} /> */}
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        arrUsers: state.admin.users,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserStart: (id) => dispatch(actions.deleteUserStart(id)),
        changeLanguageRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
