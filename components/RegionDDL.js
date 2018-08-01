import React, {Component} from 'react';
import {RegionData} from "../services/LocationData";
import strings from "./Localize";

class RegionDDL extends Component {


    constructor(props){
        super(props);

        this.state = {
            province: props.province,
            country: props.country || 33,
            rArray: [],
            isLoading:  props.isLoading || false,
        };

    }


    componentWillReceiveProps(newProps){

        let country = this.state.country;
        if( newProps.country !== this.props.country ) {
            country = newProps.country;
            RegionData(country).then((result) => {
                //console.log('RegionData result', result);
                let arrTen = [];
                for (var k = 0; k < result.length; k++) {
                    arrTen.push(<option key={result[k].id} value={result[k].id}> {result[k].name} </option>);
                }
                this.setState({rArray:arrTen,isLoading:false});
            });
        } else {
            country = this.props.country;
        }


        if( newProps.isLoading !== this.props.isLoading ) {
            this.setState({isLoading:newProps.isLoading});
        }

    }




    componentDidMount(){

        let country = this.state.country;
        RegionData(country).then((result) => {
            //console.log('RegionData result', result);
            let arrTen = [];
            for (var k = 0; k < result.length; k++) {
                arrTen.push(<option key={result[k].id} value={result[k].id}>{result[k].name}</option>);
            }
            this.setState({rArray:arrTen,isLoading:false});
        });



    }

    render() {

        //console.log('render',this.state.isLoading);


            var content = 'Not applicable';
            var disabled = 'disabled';
            if(this.state.rArray.length > 0){
                disabled = '';
                content = strings.please_choose;
            }



        return (

            <div>
                {!this.state.isLoading && <select name="province" onChange={this.props.onChange} value={this.props.province} disabled={disabled} >
                    <option>{content}</option>
                    {this.state.rArray}
                </select>}
            </div>

        )


    }

}

export default RegionDDL;