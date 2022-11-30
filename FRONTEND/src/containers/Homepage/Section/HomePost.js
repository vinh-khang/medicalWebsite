import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardSubtitle, CardText, Button, CardImg, CardBody, CardGroup } from 'reactstrap';
import { withRouter } from 'react-router';
import { getClinicInfo } from '../../../services/clinicService';
import question from '../../../assets/images/question.jpg';
import hello from '../../../assets/images/hello.jpg';
import procedure from '../../../assets/images/hp-quytrinh.jpg'
import { FormattedMessage } from 'react-intl';
import './HomePost.scss';
class HomePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: []
        }
    }
    componentDidMount = async () => {
        let data = await getClinicInfo('ALL');
        this.setState({
            post: data.clinic
        })
    }

    onShowPost = (type) => {
        if (this.props.history) {
            this.props.history.push(`/post/${type}`)
        }
    }


    render() {
        let { post } = this.state;
        return (
            <div className="home-post-container">

                <div className='home-post-content row'>
                    {/* <CardGroup> */}

                    <Card className='mr-3 post-card' onClick={() => this.onShowPost('INTRO')}>
                        <CardImg
                            alt="Card image cap"
                            src={hello}
                            top
                            width="100%"
                        />
                        <CardBody>
                            <CardTitle tag="h5" className="blue">
                                {post[0] ? post[0].title : ''}
                            </CardTitle>

                            <CardText>
                                Giới thiệu về phần mềm và Bệnh viên Đa khoa MegaHealth.
                            </CardText>

                        </CardBody>
                    </Card>

                    <Card className='mr-3 post-card' onClick={() => this.onShowPost('PROCEDURE')}>
                        <CardImg
                            alt="Card image cap"
                            src={procedure}
                            top
                            width="100%"
                        />
                        <CardBody>
                            <CardTitle tag="h5" className="blue">
                                {post[1] ? post[1].title : ''}
                            </CardTitle>

                            <CardText>
                                Hướng dẫn chi tiết về quy trình đặt khám, quy trình khám bệnh, cách thức sử dụng và quản lý tài khoản, hệ thống,...
                            </CardText>

                        </CardBody>
                    </Card>
                    <Card className='post-card' onClick={() => this.onShowPost('GUIDE')}>
                        <CardImg
                            alt="Card image cap"
                            src={question}
                            top
                            width="100%"
                        />
                        <CardBody>
                            <CardTitle tag="h5" className="blue">
                                {post[2] ? post[2].title : ''}
                            </CardTitle>

                            <CardText>
                                Những vấn đề thường gặp, trong quá trình khám & tái khám: Quản lý thông tin bệnh nhân, quy trình khám bệnh & nhận phiếu khám bệnh, hoàn tất thanh toán,...
                            </CardText>

                        </CardBody>
                    </Card>
                    {/* </CardGroup> */}
                </div>
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePost));
