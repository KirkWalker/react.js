import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {UserLogin, GetUserData} from '../services/UserData';
import cookie from 'react-cookies';
import Loading from "../components/Loading";
import {FetchHander} from "../services/FetchHandler";
import strings from "../components/Localize";

class Login extends Component {

    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            domain: '',
            redirectToReferrer: false,
            redirectToRegister: false,
            error: '',
            loading: false,
        };

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.login();
        }
    }

    componentWillMount() {

        let BaseURL = cookie.load('BaseURL');
        if (typeof BaseURL != "undefined") {
            this.setState({domain: BaseURL});
        } else {
            let host = window.location.hostname;
            cookie.save('BaseURL', host);
            this.setState({domain: host});
        }

    }

    /*
    componentDidMount() {

        if (sessionStorage.getItem('userLang') != '' && sessionStorage.getItem('userLang') != null) {
            this.setState({ loading: false, lang:sessionStorage.getItem('userLang')});
        }
    }*/

    register() {
        this.setState({redirectToRegister: true});
    }

    login() {

        this.setState({error: ''});

        if (this.state.username && this.state.password) {

            this.setState({loading: true});


            var params = {
                'username': this.state.username,
                'password': this.state.password
            };

            var formBody = [];
            for (var property in params) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(params[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            UserLogin(this.state).then((result) => {
                if (result.status == 0) {
                    var output = '<div class="widget"><div class="alert alert-danger">' +
                        '<p style="padding-top:8px;padding-left:8px;" id="error_msg"> ' + result.error + '</p></div></div>';
                    this.setState({error: output, loading: false});

                } else {

                    let responseJson = result;
                    var access_token = responseJson.data.access_token;
                    sessionStorage.setItem('access_token', access_token);
                    sessionStorage.setItem('userData', JSON.stringify(responseJson.data));
                    sessionStorage.setItem('userLang', responseJson.data.lang.toLowerCase());
                    location.href = "/";
                }
            }).catch((err) => {
                var output = '<div class="widget"><div class="alert alert-danger">' +
                    '<p style="padding-top:8px;padding-left:8px;" id="error_msg"> ' + err + '</p></div></div>';
                this.setState({error: output, loading: false});
            });

        }

    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        if (this.state.redirectToRegister) {
            return (<Redirect to={'/register'}/>)
        }

        if (this.state.loading) {

            var divStyle = {
                minHeight: 300,
                paddingTop: 100,
            };

            return (

                <div className="center-block">
                    <div className="col-md-3 mx-auto" style={divStyle}>
                        <Loading/>
                    </div>
                </div>

            );
        } else {

            return (
                <div className="col-md-5 mx-auto">
                    <h2>{strings.signin}</h2>
                    <div id="errors" dangerouslySetInnerHTML={{__html: this.state.error}}></div>

                    <label>{strings.useroremail}</label>
                    <input type="text" id="username" name="username" placeholder={strings.useroremail} onChange={this.onChange}
                           onKeyPress={this.handleKeyPress} value={this.state.username}/>

                    <label>{strings.password}</label>
                    <input type="password" id="password" name="password" placeholder={strings.password} onChange={this.onChange}
                           onKeyPress={this.handleKeyPress} value={this.state.password}/>

                    <br/>
                    <div className="text-center">
                        <button id="loginButton" className="btn btn-primary"
                                onClick={this.login}>{strings.signin}</button>
                    </div>

                    <div className="text-center">

                        <p>&nbsp;</p>
                        <small>{strings.trouble} <a href="/forgot">{strings.forgot_password}</a>
                        </small>
                        <br/>
                        <small>{strings.noaccount} <a href="/register">{strings.createaccount}</a>
                        </small>
                    </div>
                </div>

            );
        }
    }
}

export default Login;
