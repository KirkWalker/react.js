import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import strings from "../components/Localize";
import NewsWidget from "../components/NewsWidget";

export default class NewsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirectToReferrer: false,
        }

        this.cancel = this.cancel.bind(this);

    }


    cancel() {
        this.setState({redirectToReferrer: true});

    }

    render(){

        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/'}/>)
        }

        return(

            <div className="col-sm-9">
                <h2>{strings.latest_news}</h2>
                <div className="list-group">
                    <NewsWidget isLoading={true} fullText={true} />
                </div>

            </div>

        )
    }
}