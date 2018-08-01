import React, {Component} from 'react';
import {RegisterPost} from '../services/PostData';
import {Redirect} from 'react-router-dom';
import CountryDDL from "../components/CountryDDL";
import strings from "../components/Localize";
import ReCAPTCHA from 'react-google-recaptcha';

class Register extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            password2: '',
            email: '',
            fname: '',
            lname: '',
            phone: '',
            error: '',
            terms: '',
            cArray: [],
            country: 33,
            recaptcha: '',
            send_sms: '',
            redirectToReferrer: false,
            redirectToThankyou: false,
        };

        this.signup = this.signup.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.onChangeCaptcha = this.onChangeCaptcha.bind(this);
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

        return "Password needs at least: " + missing.join(', ');
    }


    onPhoneChange(status, value, countryData, number, id){

        number = number.replace('+','');
        this.setState({phone:number});
    }


    onChangeCaptcha(response) {

        this.setState({
            recaptcha: response
        });
    }


    signup() {

        this.setState({error:''});

        var errorMessage = '';

        if(this.state.recaptcha == '') {
            errorMessage = 'Please verify you are not a robot';
        }
        if(this.state.terms == '') {
            errorMessage = 'You must agree to the terms and conditions';
        }



        pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        if(!pattern.test(this.state.email)) {
            errorMessage = 'Please enter a valid email';
        }

        //pattern = /^\+\d{1} \d{3} \d{3}-\d{4}$/;
        //if(!pattern.test(this.state.phone )) {
            //errorMessage = 'Please enter a phone number in the correct format (+1 555 555-5555)';
        //}

        var pattern = /^[a-zA-Z0-9\-_]{6,20}$/;
        if(!pattern.test(this.state.username) || this.state.username.length < 6 || this.state.username.length > 20) {
            errorMessage = 'Please enter a valid username (6-20 characters, alpha numeric characters only)';
        } else {


            var letters =(this.state.username.replace(/[^A-Z0-9]/gi, "").length);
            var characters = (this.state.username.replace(/[A-Z]/gi, "").length);

            if(characters >= letters){

                errorMessage = 'Please enter a valid username, you have too many special characters.';

            }

        }


        pattern = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

        if(!pattern.test(this.state.fname) || this.state.fname.length < 2 || this.state.fname.length > 30) {
            errorMessage = 'Please enter a valid first name (2-20 characters, alpha numeric characters only)';
        }

        if(!pattern.test(this.state.lname) || this.state.lname.length < 2 || this.state.lname.length > 20) {
            errorMessage = 'Please enter a valid last name (2-20 characters, alpha numeric characters only)';
        }

        if(this.state.password != this.state.password2){
            errorMessage = 'Your passwords do not match';
        }

        if(this.passwordStrength() != null) {
            errorMessage = this.passwordStrength();
        }

        if(errorMessage == ''){
            RegisterPost(this.state).then((result) => {
                let responseJson = result;
                //console.log('responseJson',responseJson);


                if(responseJson.data){
                    this.setState({redirectToThankyou: true});
                    //console.log(responseJson)
                    //location.href = "/login";
                    //this.setState({error:'<div class="row alert alert-success">Registration successfull! Please check your email for further instructions.</div>'});
                } else {
                    //handle error from API response
                   //console.log('responseJson',responseJson);CB8j6kb
                    var output = '<div class="alert alert-danger">';
                    if(typeof responseJson.errors === 'object') {
                        var obj = responseJson.errors;
                        for (var property in obj) {
                            output += obj[property] + '<br />';
                        }
                    } else {
                        output += responseJson.errors;
                    }
                    output += '</div>';
                    this.setState({error:'<div class="row alert alert-danger">'+ output + '</div>'});
                }
            })
            .catch((err) => {

                //console.log('err',err);

                var output = '<div class="alert alert-danger">';
                if(typeof err.errors === 'object') {
                    var obj = err.errors;
                    for (var property in obj) {
                        output += obj[property] + '<br />';
                    }
                } else {
                    output = err.error;
                }
                output += '</div>';

                this.setState({error:'<div class="row alert alert-danger">'+ output + '</div>'});
            });


        } else {

            this.setState({error:'<div class="row alert alert-danger">'+ errorMessage + '</div>'});
        }
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }


    render() {

        if (this.state.redirectToThankyou) {
            return (<Redirect to={'/thankyou'}/>)
        }

        //if (this.state.redirectToReferrer ) {
           // return (<Redirect to={'/'}/>)
        //}



        return (

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12"><a id="#msg"></a>
                        <h4>{strings.register_title}</h4>
                        <p className="small-text">{strings.register_sub_title}</p>
                        <p>&nbsp;</p>
                    </div>
                    <div className="col-md-5 col-sm-6">
                        <label>{strings.fname}</label>
                        <input type="text" name="fname"  placeholder={strings.fname} onChange={this.onChange} />
                    </div>
                    <div className="col-md-5 col-sm-6">
                        <label>{strings.lname}</label>
                        <input type="text" name="lname"  placeholder={strings.lname} onChange={this.onChange} />
                    </div>
                    <div className="col-md-5 col-sm-6">
                        <label>{strings.country}</label>
                        <CountryDDL country={this.state.country} lang={this.state.lang} onChange={this.onChange}  />
                    </div>
                    <div className="col-md-5 col-sm-6">
                        <label>{strings.phone}</label>
                        <input type="text" name="phone"  placeholder={strings.phone} onChange={this.onChange} />
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-md-5 col-sm-6">
                        <label>{strings.email}</label>
                        <input type="text" name="email"  placeholder={strings.email} onChange={this.onChange}  />
                    </div>
                    <div className="col-md-5 col-sm-6">
                        <label>{strings.username}</label>
                        <input type="text" name="username" placeholder={strings.username} onChange={this.onChange}  />
                    </div>
                    <div className="col-md-5 col-sm-6">
                        <label>{strings.password}</label>
                        <input type="password" name="password"  onChange={this.onChange} />
                    </div>
                    <div className="col-md-5 col-sm-6">
                        <label>{strings.repeat_password}</label>
                        <input type="password" name="password2"  onChange={this.onChange}  />
                    </div>

                </div>

                <hr />
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <h5>{strings.terms_of_service} & {strings.privacy_policy}</h5>
                        <p className="small-text"><input type="checkbox" name="terms" onChange={this.onChange} />&nbsp;&nbsp;* {strings.icertify}.
                            I agree to the <a href="https://www.lode.one/termsofagreement">{strings.terms_of_service}</a> and <a href="https://www.lode.one/privacy-policy">{strings.privacy_policy}</a></p>

                            <ReCAPTCHA
                            ref="recaptcha"
                            sitekey="6LfxikQUAAAAADND6M_ZQRbNj4P7-cAOU2kzX1Lb"
                            onChange={this.onChangeCaptcha}/>

                        <br clear="all" />
                    </div>

                    <div className="col-md-5 col-sm-12">
                        <div id="errors" dangerouslySetInnerHTML={{__html: this.state.error}}></div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <a href="#msg" className="btn btn-primary" tabIndex="11" onClick={this.signup}>{strings.register}</a>
                    </div>
                </div>

            </div>
        );
    }
}

export default Register;