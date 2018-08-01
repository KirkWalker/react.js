import React, {Component} from 'react';
import queryString from 'query-string';
import {ActivateData} from '../services/ActivateData';
import strings from "../components/Localize";

class Activate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            version: '1.000',
        };
    }

    componentDidMount() {

        let params = queryString.parse(this.props.location.search)
        let email = params.email;

        ActivateData(this.props.match.params.token, email).then((result) => {

            let responseJson = result;

        });

    }

    render(){

        return(
            <div id="Body" className="container-fluid">
                <div className="center-block">
                    <div className="col-md-7 mx-auto">
                        <h2>{strings.account_activated}</h2>
                        <p>{strings.thanks_activated}</p>
                        <p><a href="/login">{strings.click_login}</a></p>

                    </div>
                </div>
            </div>
        )


    }
}
export default Activate;