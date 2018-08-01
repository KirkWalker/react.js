import React, {Component} from 'react';
import strings from "../components/Localize";
import NewsWidget from "../components/NewsWidget";
import ActivityWidget from "../components/ActivityWidget";
import {UpdateUserPost, UpdateGDPR} from "../services/UserData";


class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone_verified: 1,
            loaded: false,
            error: '',
        };
    }



    componentWillMount() {
        if (sessionStorage.getItem("access_token")) {
            let userData = JSON.parse(sessionStorage.getItem("userData"));
        }
    }

    componentDidMount() {

        if (sessionStorage.getItem("access_token")) {
            var output = 'Your phone number has not been validated, ' +
                'our system cannot accept orders until this step has been completed. Click <a href="/smsverify">here</a> to verify your phone number.';

            var userData = sessionStorage.getItem("userData");

            if(this.props.phone_verified){ //this is just for jest
                //console.log('this.props.phone_verified',this.props.phone_verified);
                (this.props.phone_verified == 0) ? this.setState({
                    error: output,
                    phone_verified: 0,
                    loaded:true
                }) : this.setState({phone_verified: 1, loaded:true});

            } else
            {
                (userData.phone_verified) ? this.setState({
                    error: output,
                    phone_verified: 0,
                    loaded:true
                }) : this.setState({phone_verified: 1, loaded:true});
            }


        } else {
            // if token not found
            location.href = "/login";
        }

    }



    getContent(){


        if(!this.state.phone_verified) {
           return ( <div id="errors" className="alert alert-danger" dangerouslySetInnerHTML={{__html: this.state.error}}></div>);
        }


        if(this.state.phone_verified) {
            return (
                <div>
                <h4>{ strings.latest_news }
                <a href="/news" style={{fontSize: 14}}> - {strings.viewall}</a>
                </h4>

                <NewsWidget isLoading={true} fullText={false} />
                <br clear="all"/>
                <h4>{strings.recent_activity}<a href="/activity" style={{fontSize: 14}}> - {strings.viewall}</a></h4>
                <ActivityWidget isLoading={true} limit="5"/>
                </div>
            )
        }

    }


    render() {
       if (this.state.loaded == true) {
            return (
                <div className="col-sm-9">
                    <h2>{strings.dashboard}</h2>
                    {this.getContent()}
                </div>
            )
        } else {
            return (

                <div></div>
            )

        }
    }
}

export default Dashboard;
