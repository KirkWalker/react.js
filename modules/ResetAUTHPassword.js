import React, {Component} from 'react';
import strings from "../components/Localize";
import {ResetPasswordAUTHEDPost} from '../services/ForgotPassword';

class ResetAUTHPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            password2: '',
            error: '',
            token: '',
            success: false,
            successMSG: '',
            redirectToReferrer: false
        };

        this.sendemail = this.sendemail.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.handleError = this.handleError.bind(this);
        this.passwordStrength = this.passwordStrength.bind(this);
    }

    passwordStrength() {

        var passwordStrength = 0, missing = [];
        var k = this.state.password;

        var patterns = {
            lowers: '[a-z]',
            uppers: '[A-Z]',
            digits: '[0-9]',
            symbols: '[^0-9A-Za-z]'
        }

        if (RegExp("(?=.*"+patterns.lowers+")").test(k)) {
            passwordStrength += (k.length - k.replace(RegExp(patterns.lowers, 'g'), '').length) * 3;
        } else {
            missing.push("one lowercase letter");
        }

        if (RegExp("(?=.*"+patterns.uppers+")").test(k)) {
            passwordStrength += (k.length - k.replace(RegExp(patterns.uppers, 'g'), '').length) * 4;
        } else {
            missing.push("one uppercase letter");
        }

        if (RegExp("(?=.*"+patterns.digits+")").test(k)) {
            passwordStrength += (k.length - k.replace(RegExp(patterns.digits, 'g'), '').length) * 4;
        } else {
            missing.push("one digit");
        }

        if (RegExp("(?=.*"+patterns.symbols+")").test(k)) {
            passwordStrength += (k.length - k.replace(RegExp(patterns.symbols, 'g'), '').length) * 6;
        } else {
            missing.push("one symbol");
        }

        if (k.length >= 8) {
            passwordStrength += k.length * 2;
        } else {
            missing.push("8 characters long");
        }

        if (missing.length == 0) {
            //return (passwordStrength <= 100 ? passwordStrength : '100') + "/100";
            return null;
        }

        return "Needs at least: " + missing.join(', ');
    }


    componentDidMount() {
        this.setState({ token:this.props.match.params.token });
    }

    sendemail() {
        this.setState({error:'',success:false})

        var errorMessage = '';
        if(this.state.password!= this.state.password2) {
            errorMessage = strings.err_password_match;
        }

        if(this.passwordStrength() != null) {
            errorMessage = this.passwordStrength();
        }

        if(errorMessage == '') {

            ResetPasswordAUTHEDPost(this.state.password).then((result) => {
                var msg = '<p>'+strings.password_reset+' <a href="/">'+strings.back_dashboard+'</a></p>';
                this.handleResponse(result,msg);
            }).catch((err) => {
                this.handleError(err);
            });

        } else {
            errorMessage = '<div class="alert alert-danger">' +errorMessage+'</div>';
            this.setState({error: errorMessage});
        }

    }

    handleResponse(_responseJson,_msg) {
        if (_responseJson.status == 0) {
            var output = '<div class="widget"><div class="alert alert-danger">' +
                '<p style="padding-top:8px;padding-left:8px;">' + _responseJson.msg + '</p></div></div>';
            this.setState({error: output});
        } else {
            this.setState({success: true,successMSG:_msg});
        }
    }

    handleError(err) {
        var output = '<div class="widget"><div class="alert alert-danger">' +
            '<p style="padding-top:8px;padding-left:8px;"> ' + err + '</p></div></div>';
        this.setState({error: output});
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    render(){
        if(this.state.success == true){
            return (

                <div className="col-md-7 mx-auto">
                    <h2>{strings.forgot_password}</h2>
                    <h4>{strings.success}</h4>
                    <div id="errors" dangerouslySetInnerHTML={{__html: this.state.successMSG }}></div>
                </div>

            )
        } else {
            return (

                <div className="col-sm-9">
                    <h2>{strings.reset_password}</h2>
                    <div id="errors" dangerouslySetInnerHTML={{__html: this.state.error}}></div>

                    <p>{strings.enter_password}</p>

                    <label>{strings.your_password}</label>
                    <input type="password" name="password" placeholder="Your Password" onChange={this.onChange}
                           value={this.state.password}/>

                    <label>{strings.repeat_password}</label>
                    <input type="password" name="password2" placeholder="Repeat Password" onChange={this.onChange}
                           value={this.state.password2}/>


                    <div className="btn-group" role="group">
                        <a className="btn btn-primary"
                           onClick={this.sendemail}>{strings.update_password_button}</a>
                    </div>

                </div>

            )
        }

    }

}
export default ResetAUTHPassword;