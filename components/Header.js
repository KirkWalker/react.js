import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import strings from "./Localize";

class Header extends Component {

    constructor(props){
        super(props);

        this.state = {
            redirectToLogin: false,
            redirectToRegister: false,
            loggedin: props.loggedin || false,
        };

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {


        if(sessionStorage.getItem('userData')){
            this.setState({loggedin:true});
        }

    }

    register() {
        this.setState({redirectToRegister: true});
    }

    login() {
        this.setState({redirectToLogin: true});
    }

    logout() {

        var currentLang = sessionStorage.getItem('userLang');
        sessionStorage.clear();
        sessionStorage.setItem('userLang', currentLang);

    }

    render() {

        if (this.state.redirectToRegister) {
            return (<Redirect to={'/register'}/>)
        }

        if (this.state.redirectToLogin) {
            return (<Redirect to={'/login'}/>)
        }

        var homeUrl = window.location.protocol+'//'+window.location.host+'/';
        var buttons = '';
        var buttons2 = '';

        if(this.state.loggedin == "true" || this.state.loggedin == true){
            buttons = <a href="/login"  onClick={this.logout} className="btn-sm btn-primary">{strings.logout}</a>;
        } else {
            buttons = <a href="/register" className="btn-sm btn-primary">{strings.register}</a>;
            buttons2 = <a href="/login" className="btn-sm btn-default">{strings.signin}</a>;
        }

        return (

            <div className="header row">
                <div className="col-xs-2">
                    <a href={homeUrl}>
                    <img src="/img/LogoNew.png" className="logo" />
                    </a>
                </div>

                <div className="col-xs-9">
                    <div className="header-buttons text-right">
                        {buttons}&nbsp;{buttons2}
                    </div>
                </div>
            </div>

        );

    }

}
export default Header;