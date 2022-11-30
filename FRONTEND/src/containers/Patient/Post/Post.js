import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import HomeHeader from '../../Homepage/HomeHeader';
import Footer from '../../Homepage/Footer';
import banner from '../../../assets/images/banner1.jpg';
import quytrinh from '../../../assets/images/quytrinh.jpg';
import thinking from '../../../assets/images/thinking.jpg';
import { LANGUAGES, ADMIN_ACTION, CommonUtils } from '../../../utils';
import './Post.scss';
import { getClinicInfo } from '../../../services/clinicService';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinic: null,
            doctorID: null,
            specialty: '',
            type: ''
        }
    }

    componentDidMount = async () => {
        let clinic = await getClinicInfo(this.props.match.params.type);
        this.setState({
            clinic: clinic.clinic,
            type: this.props.match.params.type
        })

    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (prevState.type !== this.props.match.params.type) {
            let clinic = await getClinicInfo(this.props.match.params.type);
            this.setState({
                clinic: clinic.clinic,
                type: this.props.match.params.type
            })
        }
    }

    render() {
        let { clinic, type } = this.state;
        return (
            <>
                <HomeHeader isShow={false} />
                <div className="post-container">
                    {type && type === 'PROCEDURE' ? <div className='post-banner' style={{ backgroundImage: `url(${quytrinh})` }}>
                        <div className='post-title'>
                            {clinic && clinic.title}
                        </div></div> : ''}
                    {type && type === 'INTRO' ? <div className='post-banner' style={{ backgroundImage: `url(${banner})` }}>
                        <div className='post-title'>
                        </div></div> : ''}
                    {type && type === 'GUIDE' ? <div className='post-banner' style={{ backgroundImage: `url(${thinking})` }}>
                        <div className='post-title'>
                            {clinic && clinic.title}
                        </div></div> : ''}
                    <div className='post-content'>
                        <div className='post-title'>{type && type !== 'INTRO' ? '' : clinic && clinic.title}</div>
                        <div className='post-markdown'>

                            {
                                (
                                    <span>
                                        <div dangerouslySetInnerHTML={{ __html: clinic && clinic.clinic_HTML }}></div>
                                    </span>
                                )
                            }
                        </div>
                        <div className='post-comment'></div>
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
        getDoctorIDStart: (id) => dispatch(actions.getDoctorIDStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
