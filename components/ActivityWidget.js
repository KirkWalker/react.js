import React, {Component} from 'react';
import {ActivityData} from "../services/OrderActivity";
import strings from "../components/Localize";
import Loading from "../components/Loading";

class ActivityWidget extends Component {

    constructor(props){
        super(props);

        this.state = {
            activityFeed: [],
            limit: 'undefined',
            isLoading:  props.isLoading || false,
        };

        this.convertDateForIos = this.convertDateForIos.bind(this);

    }

    componentWillReceiveProps(newProps){

        if( newProps.isLoading !== this.props.isLoading ) {
            this.setState({isLoading:newProps.isLoading});
        }

        this.setState({limit:newProps.limit});


    }

    convertDateForIos(date) {
        var arr = date.split(/[- :]/);
        date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
        return date;
    }

    componentDidMount(){

        ActivityData(this.props.limit).then((result) => {
            let responseJsonData = result.data;

            let arrTen = [];


            if (result.totalCount == 0) {
                arrTen.push(<tr key="0"><td colSpan="4" style={{textAlign: 'center'}}>{strings.no_activity}</td></tr>);
            } else {

                for (var k = 0; k < result.totalCount; k++) {
                    arrTen.push(<tr key={ responseJsonData[k].id }>
                        <th scope="row">{ responseJsonData[k].order_id }</th>
                        <td>{ responseJsonData[k].created_at.split(' ')[0] }</td>
                        <td>{ responseJsonData[k].activity }</td>
                        <td><a href={ '/transactions/'+responseJsonData[k].order_id }>view</a></td>
                    </tr>);
                }

            }


            this.setState({activityFeed: arrTen,isLoading:false});

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

                    {<table className="table table-sm table-striped">
                        <thead className="thead">
                        <tr>
                            <th>#</th>
                            <th>{strings.date}</th>
                            <th>{strings.details}</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.activityFeed}
                        </tbody>
                    </table>}

                </div>

            )
        }
    }
}
export default ActivityWidget;