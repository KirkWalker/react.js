import React, {Component} from 'react';
import TransactionsWidget from "../components/TransactionsWidget";
import strings from "../components/Localize";

class Transactions extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        let order_id = this.props.match.params.id;
        return (

            <div className="col-sm-9">

                <h4>{strings.details_order} #{order_id}</h4>
                <TransactionsWidget isLoading={true} id={order_id} />

            </div>

        );

    }
}

export default Transactions;