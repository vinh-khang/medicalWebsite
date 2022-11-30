// import React, { Component } from 'react';
// // import { FormattedMessage } from 'react-intl';
// import { connect } from 'react-redux';
// import { getAllUsers, createUserAPI, deleteUserAPI, editUserAPI } from '../../services/userService';
// import ModalUser from './ModalUser';
// import ModalEditUser from './ModalEditUser';
// import './UserManage.scss';

// class UserManage extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             arrUsers: [],
//             editUser: [],
//             isOpenModal: false,
//             isOpenEditModal: false,
//         }
//     }

//     async componentDidMount() {
//         await this.getAllUsersFromReact();
//     }

//     getAllUsersFromReact = async () => {
//         let response = await getAllUsers('ALL');
//         if (response && response.errCode === 0) {
//             this.setState({
//                 arrUsers: response.users
//             })
//         }
//     }

//     handleOpenCreateUser = () => {
//         this.setState({
//             isOpenModal: !this.state.isOpenModal
//         })
//     }

//     // handleOpenEditUser = () => {
//     //     this.setState({
//     //         isOpenModal: !this.state.isOpenModal
//     //     })
//     // }

//     toggleUserModal = () => {
//         this.setState({
//             isOpenModal: !this.state.isOpenModal
//         })
//     }

//     toggleEditUserModal = async () => {
//         this.setState({
//             isOpenEditModal: !this.state.isOpenEditModal
//         })
//     }

//     createUser = async (data) => {
//         try {
//             let success = true;
//             let response = await createUserAPI(data);
//             if (response && response.errCode !== 0) {
//                 alert(response.errMessage);
//                 success = false;
//             } else {
//                 await this.getAllUsersFromReact();
//                 this.setState({
//                     isOpenModal: !this.state.isOpenModal
//                 })
//             }
//             return success;
//         } catch (e) {
//             console.log(e);
//         }
//     }

//     handleDeleteUser = async (id) => {
//         try {
//             let response = await deleteUserAPI(id);
//             if (response && response.errCode !== 0) {
//                 alert(response.errMessage);
//             } else {
//                 await this.getAllUsersFromReact();
//             }
//         } catch (e) {
//             console.log(e);
//         }
//     }

//     handleEditUser = (user) => {
//         this.setState({
//             isOpenEditModal: !this.state.isOpenEditModal,
//             editUser: user,
//         })
//     }

//     doEditUser = async (user) => {
//         try {
//             let success = true;
//             let response = await editUserAPI(user);
//             if (response && response.errCode !== 0) {
//                 alert(response.errMessage);
//                 success = false;
//             } else {
//                 await this.getAllUsersFromReact();
//                 this.setState({
//                     isOpenEditModal: !this.state.isOpenEditModal
//                 })
//             }
//             return success;
//         } catch (e) {
//             console.log(e);
//         }

//     }

//     render() {
//         let { arrUsers, isOpenModal, isOpenEditModal, editUser } = this.state;
//         return (
//             <div className="users-container">
//                 <div className='title text-center'>Manage users</div>
//                 <ModalUser
//                     isOpen={isOpenModal}
//                     toggleUserModal={this.toggleUserModal}
//                     createUser={this.createUser}
//                 />
//                 {isOpenEditModal &&
//                     <ModalEditUser
//                         isOpen={isOpenEditModal}
//                         toggleEditUserModal={this.toggleEditUserModal}
//                         editUser={editUser}
//                         doEditUser={this.doEditUser}
//                     />
//                 }
//                 <div className='mx-3'>
//                     <button className='btn btn-primary px-3'
//                         onClick={() => this.handleOpenCreateUser()}><i className="fas fa-plus-circle"></i> Add new user</button>
//                 </div>
//                 <div className='users-table mt-4 mx-3'>
//                     <table id="customers">
//                         <thead>
//                             <tr>
//                                 <th>Email</th>
//                                 <th>First name</th>
//                                 <th>Last name</th>
//                                 <th>Address</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {
//                                 arrUsers && arrUsers.map((user, index) => {
//                                     return (
//                                         <tr key={index}>
//                                             <td>{user.email}</td>
//                                             <td>{user.firstname}</td>
//                                             <td>{user.lastname}</td>
//                                             <td>{user.address}</td>
//                                             <td>
//                                                 <button className='mx-3' onClick={() => { this.handleEditUser(user) }}>Edit</button>
//                                                 <button onClick={() => { this.handleDeleteUser(user.id) }}>Delete</button>
//                                             </td>
//                                         </tr>
//                                     )
//                                 })
//                             }

//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         );
//     }

// }

// const mapStateToProps = state => {
//     return {
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
