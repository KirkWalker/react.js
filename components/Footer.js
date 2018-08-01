import React, {Component} from 'react';
import {Version} from "../services/Version";
import LiveChat from 'react-livechat'
import strings from "./Localize";


const license_id = 9712615;


class Footer extends Component {

    constructor(props){
        super(props);
        this.state = {
            version: 'localdev',
        };
    }

    componentDidMount() {

        Version().then((result) => {
            //console.log('ver',result);
            this.setState({version:result});
        });

    }

    onBeforeLoad(ref){
        var name = 'visitor';
        var email = 'visitor.public@gmail.com';


        var userData = JSON.parse(sessionStorage.getItem("userData"));

        if (sessionStorage.getItem("access_token")) {

            name = userData.username;
            email = userData.email;
        }



        LC_API.set_visitor_email(email);
        LC_API.set_visitor_name(name);
    }


    getChatWindow(){

        if(this.state.version != 'localdev'){
            return (
                    <div>
                        <LiveChat
                                onBeforeLoad={ ref => this.onBeforeLoad(ref)}
                                license={license_id}
                        />
                    </div>
            )
        }
    }

    render() {
        return (
                <div className="container-fluid" id="footer">
                    <hr />
                    <div className="row">
                        <div className="col-md-10 offset-md-1 text-center">
                            <a href="https://www.lode.one/privacy-policy" style={{fontSize: 12}}>{strings.privacy_policy}</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                            <a href="https://www.lode.one/terms-service" style={{fontSize: 12}}>{strings.terms_of_service}</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                            <a href="https://www.lode.one/cookies-policy" style={{fontSize: 12}}>{strings.cookies_policy}</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                            <a href="https://www.lode.one/legal-disclaimer" style={{fontSize: 12}}>{strings.legal_disclaimer}</a>

                        </div>
                    </div>
                    <div className="version">Version: {this.state.version}</div>

                    {this.getChatWindow()}


                </div>
        );
    }
}

export default Footer;
