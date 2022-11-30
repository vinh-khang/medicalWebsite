import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { PaginationItem, PaginationLink, Pagination, Label, Input } from 'reactstrap';
import './TableManageUser.scss';


class TableManagerUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            page: 1,
            allPage: 0,
            input: '',
            userArrFilter: [],
            filter: false
        }
    }

    async componentDidMount() {
        this.props.fetchAllUsersStart();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrUsers !== this.props.arrUsers) {
            let arrUsers = this.props.arrUsers;
            let total = arrUsers.length;
            let kq = (total / 8) > Math.floor(total / 8) ? Math.floor(total / 8) + 1 : Math.floor(total / 8);
            this.setState({
                arrUsers: arrUsers,
                gender: arrUsers && arrUsers.length > 0 ? arrUsers[0].key : '',
                allPage: kq
            })
        }
    }

    deleteUser = (id) => {
        this.props.deleteUserStart(id);
    }

    editUser = (user) => {
        this.props.handleEditUser(user);

    }

    nextPage = (page) => {
        if (page > 0 && page <= this.state.allPage) {
            this.setState({
                page: page
            })
        }
    }

    emailFilter = (data, array) => {
        let { arrUsers } = this.state;
        if (data) {
            this.setState({
                input: data,
            })
        }

        let users = [];

        arrUsers.map((user, index) => {
            if (user.email.indexOf(data) !== -1) {
                users.push(user);
            }
        })



        let userFilter = [];

        users.map((user, index) => {
            array.map((item, index) => {
                if (user.email === item.email) {
                    userFilter.push(item)
                }
            })
        })

        let total = userFilter.length;
        let kq = (total / 8) > Math.floor(total / 8) ? Math.floor(total / 8) + 1 : Math.floor(total / 8);
        this.setState({
            allPage: kq,
            filter: true
        })

        return userFilter;
    }

    filterData = (e, type) => {
        let { arrUsers } = this.state;
        if (type === 'email') {
            let data = this.emailFilter(e.target.value, arrUsers);
            this.setState({
                userArrFilter: data
            })
        }
    }

    render() {
        let { arrUsers, page, allPage, userArrFilter, filter, input } = this.state;
        let { language } = this.props;
        let arrUsersPage = [];
        if (userArrFilter.length > 0) {
            arrUsers = userArrFilter
        } else if (userArrFilter.length === 0 && filter) {
            arrUsers = []
        }
        for (let i = page * 8 - 8; i <= page * 8 - 1; i++) {
            if (arrUsers[i]) {
                arrUsersPage.push(arrUsers[i])
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
                <div className="users-container">
                    <div className='col-6'>
                        <Input
                            placeholder="Tìm kiếm tài khoản qua Email"
                            onChange={(e) => this.filterData(e, 'email')}
                            className="search"
                        />
                    </div>

                    <div className='users-table mt-4 mx-3'>
                        <table id="user-manage">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th><FormattedMessage id="user_manage.firstname" /></th>
                                    <th><FormattedMessage id="user_manage.role" /></th>
                                    <th style={{ width: "150px" }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arrUsersPage && arrUsersPage.map((user, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{user.id}</td>
                                                <td>{user.email}</td>
                                                <td>{user.firstname}</td>
                                                <td>{user.role_id === 'R1' ? <i className="fas fa-user-lock red"></i> : user.role_id === 'R2' ? <i className="fas fa-user-md blue"></i> : <i className="fas fa-user-check"></i>}</td>
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
                        {arrUsersPage.length === 0 &&
                            <div className='no-search'>{language === 'vi' ? 'Không có kết quả cho tìm kiếm' : 'Sorry! No result found '}</div>}
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);
