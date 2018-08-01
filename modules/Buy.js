import React from 'react';
import {Redirect} from 'react-router-dom';
import strings from "../components/Localize";
import {GetUserData} from "../services/UserData";

export default class Buy extends React.Component {

    constructor(){
        super();

        this.state = {
            ounces: '',
            redirectToDashboard: false,
            redirectToCommit: false,
            error: '',
            username:'',
            address:'',
            city:'',
            country:'',
            province:'',
            postal:'',
            show_phone_verfiy:'',
            phone_verified: 1,
            profile_completed: 1,
        };

        this.commit = this.commit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    fixNull(thevalue){
        if(thevalue == null){
            thevalue = '';
        }
        return thevalue;
    }


    componentDidMount() {

        if(!sessionStorage.getItem("access_token")){
            location.href='/';
        }

        GetUserData().then((result) => {
            let responseJson = result;

            this.setState({
                address: this.fixNull(responseJson.data.address),
                username:this.fixNull(responseJson.data.username),
                city: this.fixNull(responseJson.data.city),
                country: responseJson.data.country,
                province: this.fixNull(responseJson.data.prov),
                postal: this.fixNull(responseJson.data.postal),
                phone_verified: responseJson.data.phone_verified
            });

            if(this.state.address == null || this.state.postal == null || this.state.city == null  ||
                this.state.address == "" || this.state.postal == "" || this.state.city == "" ){
                this.setState({error:strings.err_profile,profile_completed:0});

            } else {
                this.setState({profile_completed:1});
            }

            if(this.fixNull(responseJson.data.phone_verified) == 0) {
                this.setState({error:strings.err_phone_conf,phone_verified:0});
            } else {
                this.setState({phone_verified:1});
            }


        }).catch((err) => {

        });


    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }


    commit() {

        this.setState({error:''});

        if(!this.IsNumeric(this.state.ounces)) {
            this.setState({error:'<div class="alert alert-danger">'+strings.err_num_ounces+'</div>'});
        } else if(this.state.ounces < 100) {
            this.setState({error:'<div class="alert alert-danger">'+strings.err_min_ounces+'</div>'});
        } else {

            if(this.state.address == null || this.state.postal == null || this.state.city == null ||
                this.state.address == "" || this.state.postal == "" || this.state.city == "" ){
                this.setState({error:'<div class="alert alert-danger">'+strings.err_profile+'</div>'});

            } else {

                var amount = parseFloat(this.state.ounces);
                amount = amount.toFixed(0);

                sessionStorage.setItem("buyCommit", amount);
                this.setState({redirectToCommit: true});

            }

        }

    }

    cancel() {
        this.setState({redirectToDashboard: true});
    }

    IsNumeric(val) {
        return !isNaN(parseFloat(val)) && isFinite(val);
    }

    render(){


        if (this.state.redirectToDashboard) {
            return (<Redirect to={'/'}/>)
        }

        if (this.state.redirectToCommit) {
            return (<Redirect to={'/commit'}/>)
        }

        if(this.state.phone_verified == 0 || this.state.profile_completed == 0) {
            return (


                <div className="col-sm-9">
                    <h2>{strings.buy_lode_coins}</h2>
                    <div className="alert alert-danger" dangerouslySetInnerHTML={{__html: this.state.error}}></div>

                </div>


            )

        } else {

            return (

                <div className="col-sm-9">

                    <h2>{strings.buy_lode_coins}</h2>
                    <div dangerouslySetInnerHTML={{__html: strings.buy_lode_text}}></div>

                    <div id="errors" dangerouslySetInnerHTML={{__html: this.state.error}}></div>

                    <div className="row">
                        <div className="col-md-6">
                            <br/>
                            <label>{strings.ounces} ({strings.min_deliver} 100oz)</label>
                            <input type="text" id="ounces" name="ounces" placeholder={strings.enter_ounces}
                                   onChange={this.onChange}/>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 text-right">

                            <div className="btn-group" role="group">
                                <a className="btn btn-primary"
                                   onClick={this.commit}>{strings.commit}</a>&nbsp;
                                <a className="btn btn-secondary"
                                   onClick={this.cancel}>{strings.cancel}</a>
                            </div>

                        </div>
                    </div>
                </div>

            )
        }
    }
}