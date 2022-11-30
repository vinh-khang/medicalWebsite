// import React, { Component } from 'react';
// // import { FormattedMessage } from 'react-intl';
// import { connect } from 'react-redux';
// import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
// import _ from 'lodash';

// class ModalEditUser extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: '',
//             password: '',
//             firstname: '',
//             lastname: '',
//             address: '',
//             phonenumber: ''
//         }
//     }

//     componentDidMount() {
//         let user = this.props.editUser;
//         if (user && !_.isEmpty(user)) {
//             this.setState({
//                 id: user.id,
//                 email: user.email,
//                 password: 'password',
//                 firstname: user.firstname,
//                 lastname: user.lastname,
//                 address: user.address,
//                 phonenumber: user.phonenumber
//             })
//         }
//     }

//     toggle = () => {
//         this.props.toggleEditUserModal();
//     }

//     handleInputEvent = (e, id) => {
//         let copyState = { ...this.state };
//         copyState[id] = e.target.value;
//         this.setState({
//             ...copyState
//         })
//     }

//     validateInput = () => {
//         let isValid = true;
//         let arrInput = ['email', 'password', 'firstname', 'lastname', 'address', 'phonenumber'];
//         for (let i = 0; i < arrInput.length; i++) {
//             if (!this.state[arrInput[i]]) {
//                 isValid = false;
//                 alert('Missing parameters: ' + arrInput[i]);
//                 break;
//             }
//         }

//         return isValid;
//     }

//     doEditUser = async () => {
//         let isValid = this.validateInput();
//         if (isValid) {
//             let success = await this.props.doEditUser(this.state);

//         }
//     }

//     render() {
//         let { email, password, firstname, lastname, address, phonenumber } = this.state;
//         let { editUser } = this.props;
//         return (
//             <Modal
//                 isOpen={this.props.isOpen}
//                 toggle={() => { this.toggle() }}
//                 size="lg"
//                 centered={true}
//                 className='modal-container-user'
//             >
//                 <ModalHeader toggle={() => { this.toggle() }}>
//                     Sửa tài khoản người dùng
//                 </ModalHeader>
//                 <ModalBody>
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-12">
//                                 <div className="form-row">
//                                     <div className="form-group col-6 px-1">
//                                         <label htmlFor="inputEmail4">Email</label>
//                                         <input type="email" className="form-control" name="email" placeholder="Email"
//                                             onChange={(e) => this.handleInputEvent(e, 'email')}
//                                             value={email}
//                                             disabled
//                                         />
//                                     </div>
//                                     <div className="form-group col-6 px-1">
//                                         <label htmlFor="inputPassword4">Password</label>
//                                         <input type="password" className="form-control" name="password" placeholder="Password"
//                                             onChange={(e) => this.handleInputEvent(e, 'password')}
//                                             value={password}
//                                             disabled
//                                         />
//                                     </div>
//                                     <div className="form-group col-6 px-1 mt-3">
//                                         <label htmlFor="inputEmail4">First name</label>
//                                         <input type="text" className="form-control" name="firstname" placeholder="First name"
//                                             onChange={(e) => this.handleInputEvent(e, 'firstname')}
//                                             value={firstname}
//                                         />
//                                     </div>
//                                     <div className="form-group col-6 px-1 mt-3">
//                                         <label htmlFor="inputPassword4">Last name</label>
//                                         <input type="text" className="form-control" name="lastname" placeholder="Last name"
//                                             onChange={(e) => this.handleInputEvent(e, 'lastname')}
//                                             value={lastname}
//                                         />
//                                     </div>
//                                     <div className="form-group col-12 mt-3 px-1">
//                                         <label htmlFor="inputAddress">Address</label>
//                                         <input type="text" className="form-control" name="address" placeholder="Address"
//                                             onChange={(e) => this.handleInputEvent(e, 'address')}
//                                             value={address}
//                                         />
//                                     </div>
//                                     <div className="form-group col-6 mt-3 px-1">
//                                         <label htmlFor="inputCity">Phone number</label>
//                                         <input type="text" className="form-control" name="phonenumber"
//                                             onChange={(e) => this.handleInputEvent(e, 'phonenumber')}
//                                             value={phonenumber}
//                                         />
//                                     </div>
//                                     {/* <div className="form-group col-3 mt-3 px-1">
//                                         <label>Gender</label>
//                                         <select name="gender" className="form-control">
//                                             <option selected value="1">Male</option>
//                                             <option value="2">Female</option>
//                                         </select>
//                                     </div>
//                                     <div className="form-group col-3">
//                                         <label>Role</label>
//                                         <select name="roleid" className="form-control">
//                                             <option selected>Admin</option>
//                                             <option >Doctor</option>
//                                             <option >Patient</option>
//                                         </select>
//                                     </div> */}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button
//                         color="primary"
//                         onClick={() => { this.doEditUser() }}
//                         className="px-3"
//                     >
//                         Sửa
//                     </Button>
//                     {' '}
//                     <Button onClick={() => { this.toggle() }}
//                         className="px-3">
//                         Hủy
//                     </Button>
//                 </ModalFooter>
//             </Modal>

//         )
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

// export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
