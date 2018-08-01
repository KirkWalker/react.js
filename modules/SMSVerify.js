import React from 'react';
import strings from "../components/Localize";
import {ConfirmPhoneNumber, SendCode} from '../services/PostData';
import {GetUserData} from "../services/UserData";

export default class SMSVerify extends React.Component {

    constructor() {
        super();

        this.state = {
            sms_code: '',
            error: '',
            id: 0,
            lodeid: 0,
            phone: '',
            success: false,
        };

        this.verify = this.verify.bind(this);
        this.onChange = this.onChange.bind(this);
        this.send = this.send.bind(this);
    }


    componentDidMount() {

        GetUserData().then((result) => {
            let responseJson = result;

            this.setState({
                id: responseJson.data.id,
                phone: responseJson.data.phone,

            });

        }).catch((err) => {

        });

    }

    onChange(e) {

        this.setState({[e.target.name]: e.target.value});

    }

    verify() {

        this.setState({error: ''});

        var errorMessage = '';

        if(this.state.sms_code != '') {

            ConfirmPhoneNumber(this.state.sms_code,this.state.id).then((result) => {
                let responseJson = result;
                var output = '';

                if(responseJson.status == 400){

                    var message = responseJson.result;
                    message = message.replace('[HTTP 400] Unable to create record: ','');
                    output = '<div class="row alert alert-danger">'+message+'</div>';

                } else if(responseJson.status == 0) {

                    output = '<div class="row alert alert-danger">'+strings.err_phone_code+'</div>';

                } else {

                    output = '<div class="row alert alert-success">'+strings.verify_success+'</div>';
                    this.setState({success:true});

                    let data = JSON.parse(sessionStorage.getItem("userData"));

                    data.phone_verified = 1;
                    data.phone = this.state.phone;
                    sessionStorage.setItem("userData", JSON.stringify(data));
                }

                this.setState({error:output});

            })
            .catch((err) => {

                this.setState({error:err});
            });

        } else {

            var output = '<div class="row alert alert-danger">' + strings.err_sms_code + '</div>';
            this.setState({error:output});

        }
    }

    send() {

        this.setState({error: ''});

        //check to see if the user has sent a message in the last 15 seconds
        var throttle = false;
        var time = new Date();

        if (sessionStorage.getItem("sms_throttle")) {
            var value = sessionStorage.getItem("sms_throttle");
            var seconds = (time.getTime() - value) / 1000;
            if(seconds < 15) {
                throttle = true;
            } else {
                sessionStorage.setItem("sms_throttle",time.getTime());
            }
        } else {
            sessionStorage.setItem("sms_throttle",time.getTime());
        }

        var output = '';

        if(this.state.phone == '') {
            output = '<div class="row alert alert-danger">You must enter a phone number</div>';
        }

        if(throttle) {
            output = '<div class="row alert alert-danger">You can only submit one request every 15 seconds</div>';
        }

        if(output != '') {
            this.setState({error: output});
        } else {

            SendCode(this.state.phone, this.state.lodeid).then((result) => {
                let responseJson = result;

                if (responseJson.status == 'queued') {
                    output = '<div class="row alert alert-success">' + strings.resend_success + '</div>';
                } else if (responseJson.status == 400) {
                    output = '<div class="row alert alert-danger">' + responseJson.result.replace('[HTTP 400] Unable to create record: ', '') + '</div>';
                } else {
                    output = '<div class="row alert alert-danger">' + strings.err_phone_num + '</div>';
                }
                this.setState({error: output});
            })
            .catch((err) => {
                this.setState({error: err});
            });
        }
    }

    render() {

        if (this.state.success) {
            return (

                <div className="col-sm-9">

                    <h2>{strings.confirm_title}</h2>

                    <div id="errors" dangerouslySetInnerHTML={{__html: this.state.error}}></div>

                </div>

            )
        } else {

            return (

                <div className="col-sm-9">

                    <h2>{strings.confirm_title}</h2>

                    <p>{strings.confirm_phone_text}</p>

                    <div id="errors" dangerouslySetInnerHTML={{__html: this.state.error}}></div>

                    <div className="row">
                        <div className="col-md-11">
                            <br/>
                            <label>{strings.phone}</label>

                            <div className="btn-group" role="group">

                                <input type="text"
                                       name="phone"
                                       id="phone"
                                       placeholder={strings.phone}
                                       onChange={this.onChange}
                                       value={this.state.phone}
                                       style={{float:'left', width:200}}
                                />

                                &nbsp;<a className="btn btn-primary send-code" style={{ height:40}} onClick={this.send}>{strings.btn_send}</a>
                            </div>

                            <br /><br />
                            <label>{strings.sms_code}</label>
                            <div className="btn-group" role="group">

                                <input type="text" name="sms_code" id="sms_code" placeholder={strings.enter_sms_code}
                                       onChange={this.onChange} style={{float:'left', width:200}} />&nbsp;
                                <a className="btn btn-primary sms-code" style={{ height:40}}  onClick={this.verify}>{strings.btn_verify}</a>

                            </div>
                        </div>
                    </div>

                </div>

            )
        }
    }
}
