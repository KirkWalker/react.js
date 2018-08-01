import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import ActivityWidget from "../components/ActivityWidget";
import strings from "../components/Localize";


class RecentActivity extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (

            <div className="col-sm-9">

                <div className="row">
                    <div className="col-sm-12">
                        <h4>{strings.activity}</h4>
                        <ActivityWidget isLoading={true}  />
                    </div>
                </div>

            </div>

        );
    }
}

export default RecentActivity;