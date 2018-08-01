import React, {Component} from 'react';
import {CountryData} from "../services/LocationData";
import strings from "./Localize";

class CountryDDL extends Component {

    constructor(props){
        super(props);
        this.state = {
            cArray: [],
            result: '',
        };
    }

    componentDidMount(){

        CountryData().then((result) => {
            let responseJsonData = result;

            let arrTen = [];
            for (var k = 0; k < result.length; k++) {
                arrTen.push(<option key={result[k].id} value={result[k].id}>{result[k].name}</option>);
            }
            this.setState({cArray:arrTen, result: result});

        }).catch((e) => {


        });

    }


    render() {

        return (

            <div>
                <select name="country" onChange={this.props.onChange} value={this.props.country}>
                    <option value="">{strings.please_choose}</option>
                    {this.state.cArray}
                </select>
            </div>

        )


    }

}

export default CountryDDL;