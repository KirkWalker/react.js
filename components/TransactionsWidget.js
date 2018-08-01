import React, {Component} from 'react';
import {OrderDetailsData} from "../services/OrderActivity";
import strings from "./Localize";

class TransactionsWidget extends Component {

    constructor(props){
        super(props);

        this.state = {
            lang: 0,
            activityFeed: [],
        };


    }

    componentDidMount(){

        let order_id = this.props.id;
        OrderDetailsData(order_id).then((result) => {
            let responseJson = result;
            let arrTen = [];

            for (var k = 0; k < result.length; k++) {

                let unit = ' oz';
                if (result[k].unit.charAt(0) == 'g') {
                    unit = ' g';
                }
                let confirmed = 'no';
                if(result[k].confirmed > 0){
                    confirmed = result[k].confirmed + unit;
                }
                arrTen.push(<tr key={result[k].id}>
                    <td scope="row">{result[k].item_no + 1}</td>
                    <td>{result[k].qty}</td>
                    <td>{result[k].weight}{unit}</td>
                    <td>{result[k].grams}</td>
                    <td>{result[k].description}</td>
                    <td>{confirmed}</td>
                </tr>);
            }
            this.setState({activityFeed: arrTen});
        });

    }



    render() {
        return (

            <div className="list-group">
                <table className="table table-sm table-striped">
                    <thead className="thead">
                    <tr>
                        <th>#</th>
                        <th>Qty</th>
                        <th>{strings.weight}</th>
                        <th>{strings.grams}</th>
                        <th>{strings.description}</th>
                        <th>{strings.confirmed}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.activityFeed}
                    </tbody>
                </table>
            </div>

        )

    }

}

export default TransactionsWidget;