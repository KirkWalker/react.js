import React, {Component} from 'react';
import "babel-polyfill";
import Routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileHeader from './components/MobileHeader';
import Menu from "./components/Menu";
import strings from "./components/Localize";
import {UpdateGDPR} from "./services/UserData";

const qs = require('query-string');

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            appName: "Lode One User Portal",
            loggedIn: false,
            loaded: false,
            lang: 'en',
            gdpr_consent: 1,
        };

    }

    componentDidMount() {

        var locationCheck = window.location.protocol + '//' + window.location.host;
        var loggedIn = false;
        let lang = 'en';
        let gdpr_consent = 1;
        let userData = JSON.parse(sessionStorage.getItem("userData"));

        if (
            location.href !== locationCheck + '/login' &&
            location.href !== locationCheck + '/forgot' &&
            location.href !== locationCheck + '/thankyou' &&
            location.href.indexOf(locationCheck + '/activate') > 0 &&
            location.href.indexOf(locationCheck + '/resetpassword') > 0 &&
            location.href !== locationCheck + '/register'
        ) {
            loggedIn = false;
            location.href = window.location.protocol + '//' + window.location.host + '/login'
        }

        if (!sessionStorage.getItem("access_token")) {
            loggedIn = false;
        } else {
            loggedIn = true;
        }

        const parsed = qs.parse(location.search);
        if (parsed.lang) {
            sessionStorage.setItem('userLang', parsed.lang);
            lang = parsed.lang;
            location.href = "/login";
        } else {

            if (sessionStorage.getItem('userLang')) {
                lang = sessionStorage.getItem('userLang');

                if (lang == null) {
                    lang = 'en';
                }

            } else {
                sessionStorage.setItem('userLang', lang);
            }

            this.setState({lang: lang});
        }


        //Sets state of GDPR based on userdata
        if (userData) {
            gdpr_consent = userData.gdpr_consent;
            //If a use is not GDPR verified, and they are not already on the profile page... route user to the profile page.
            if (userData.gdpr_consent === 0 && location.pathname !== '/profile') {
                location.pathname = '/profile';
            }

        }

        this.setState({gdpr_consent: gdpr_consent,lang: lang,loggedIn: loggedIn, loaded:true});


    }

    render() {

        const globalState = {
            name: this.state.appName,
            loggedin: this.state.loggedIn,
            loaded: this.state.loaded,
        };

        strings.setLanguage(this.state.lang);
        return (
            <div>

                <MobileHeader{...globalState}/>
                <Header {...globalState} />
                <div id="Body" className="row">
                    <div className="d-none d-sm-block col-sm-2">
                        <Menu {...globalState} />
                    </div>
                    <Routes {...globalState} />
                </div>
                <Footer/>

            </div>
        );

    }
}

export default App;
