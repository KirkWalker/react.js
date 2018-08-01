import React from 'react';
import {Redirect} from 'react-router-dom';
import {NewsItemData} from '../services/NewsData';
import strings from "../components/Localize";

export default class News extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: '',
            redirectToReferrer: false,
        }

        this.cancel = this.cancel.bind(this);

    }

    componentWillMount() {
        NewsItemData(this.props.match.params.id).then((result) => {
            let responseJson = result;
            this.setState({data: responseJson});
        });
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
                <h2>{strings.headline}</h2>
                <em>{strings.published} {strings.published_on}</em>
                <br clear="all"/><br clear="all"/>
                <p>{strings.summary}</p>
            </div>

        )
    }
}