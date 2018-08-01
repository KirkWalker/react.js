import React, {Component} from 'react';
import {NewsData} from "../services/NewsData";
import Loading from "../components/Loading";
import strings from "../components/Localize";

class NewsWidget extends Component {

    constructor(props){
        super(props);

        this.state = {
            lodeid: props.lodeid || 0,
            newsFeed: [],
            isLoading:  props.isLoading || false,
            fullText: props.fullText
        };

        this.getButton = this.getButton.bind(this);

    }

    componentWillReceiveProps(newProps){
        if( newProps.isLoading !== this.props.isLoading ) {
            this.setState({isLoading:newProps.isLoading});
        }
    }

    getButton(type, link, title, published) {

        if(type == 'External') {
            return(
                <h5 className="mb-1">
                    <a href={link} target="_blank">{title}</a>
                    &nbsp;<small>{published}</small>
                    <span className="label label-info">{strings.external_label}</span>
                </h5>
            );
        } else {
            return(
                <h5 className="mb-1">
                    {title}
                    &nbsp;<small>{published}</small>
                    <span className="label label-default">{strings.system_label}</span>
                </h5>
            );
        }

    }

    componentDidMount(){

        NewsData(this.state.fullText).then((result) => {
            if(result != null) {
                var arrTen = [];
                for (var k = 0; k < result.length; k++) {

                    var link = result[k].link;
                    var type = 'External';
                    if(link === '' || link == null){
                        type = 'System';
                    }
                    var showLink = false
                    if (!this.state.fullText && result[k].summary.indexOf('...') == (result[k].summary.length - 3)) {
                        showLink = true;
                    }
                    arrTen.push(
                        <div id={"article"+result[k].id} key={result[k].id} className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                {this.getButton(type, link, result[k].headline, result[k].published_on)}
                            </div>
                            <pre className="preWrap mb-1">{result[k].summary} {showLink &&
                                <a href="/news">{strings.more}</a>
                            }</pre>
                        </div>
                    );

                }
                this.setState({newsFeed: arrTen,isLoading:false});
            }

        }).catch((e) => {



        });

    }


    render() {
        if(this.state.isLoading) {

            var divStyle = {
                minHeight:300,
                paddingTop:100,
            };

            return (
                <div className="center-block">
                    <div className="col-md-3 mx-auto" style={divStyle}>
                        <Loading />
                    </div>
                </div>

            );

        } else {
            return (

                <div className="list-group">

                    {this.state.newsFeed}

                </div>

            )
        }
    }

}

export default NewsWidget;
