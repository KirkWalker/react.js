import React from 'react';
import {Redirect} from 'react-router-dom';
import {OrderBuyData} from '../services/OrderData';
import strings from "../components/Localize";

export default class Commit extends React.Component {

    constructor(){
        super();

        this.state = {
            ounces: '',
            redirectToDashboard: false,
            data: [],
            error: '',
            affiliate_domain: '',
            terms: false,
            isButtonDisabled: false,
            success: false,
        };

        this.commit = this.commit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentWillMount() {
        if(!sessionStorage.getItem("access_token")){
            location.href='/login/';
        }

        if(sessionStorage.getItem("buyCommit") == '' || sessionStorage.getItem("buyCommit") == null){
            if(this.props.amt && this.props.amt > 99) {
                this.setState({ounces:this.props.amt});
            } else {
                this.setState({redirectToDashboard:true});
            }
        } else {
            this.setState({ounces:sessionStorage.getItem("buyCommit")});
        }

    }

    handleChange(e) {
        this.setState({'terms':e.target.checked});
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    commit() {

        this.setState({error:''});

        if(this.state.terms == false) {
            this.setState({error:'<div class="alert alert-danger">'+strings.err_agree+'</div>'});
        } else {
            if(this.state.isButtonDisabled == false) {
                this.setState({isButtonDisabled: true});
                OrderBuyData(this.state.ounces,this.state.affiliate_domain).then((result) => {
                    let responseJson = result;
                    this.setState({success: true,isButtonDisabled: false});
                    sessionStorage.setItem("buyCommit",'');

                });
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

        let confirm_text = (strings.confirm_text).replace("[x]",this.state.ounces);

        if (this.state.redirectToDashboard) {
            return (<Redirect to={'/'}/>)
        }

        if(this.state.success) {

            let success_text = (strings.success_buy).replace("[x]",this.state.ounces);

            return (

                <div className="col-sm-9">

                    <div id="success" className="alert alert-success">{success_text}</div>

                    <a className="btn btn-secondary" onClick={this.cancel}>{strings.back_dashboard}</a>

                </div>

            )
        } else {

            return (

                <div className="col-sm-9">
                    <h2> {strings.confirm} </h2>
                    <p className="alert alert-success">{confirm_text}</p>

                    <div id="errors" dangerouslySetInnerHTML={{__html: this.state.error}}></div>

                    <div style={{padding:10}} className="col-md-12">
                        <input type="checkbox" onChange={this.handleChange} id="terms" name="terms" style={{float:'left',marginRight:10,marginTop:3}} value="true" />
                        <div style={{marginLeft:5,fontSize:14}}>
                            {strings.buydisclaimer}
                        </div>
                    </div>



                    <div style={{padding:10}} className="col-md-12">
                        <h4>Affiliate Domain <small>(optional)</small></h4>
                        <div style={{display:'inline-block'}}>Do you have an affiliate link? Add it here : <strong>http://
                            <input type="text" id="affiliate_domain"
                                   name="affiliate_domain"
                                   onChange={this.onChange}
                                   style={{width:'25%',display:'inline-block'}}
                                   maxLength="4"
                            />.lode.one</strong></div>
                    </div>

                    <br />
                    <div className="btn-group" role="group">
                    <a className="btn btn-primary"
                            onClick={this.commit}>{strings.commit}</a>
                    &nbsp;
                    <a className="btn btn-secondary"
                            onClick={this.cancel}>{strings.cancel}</a>
                    </div>
                </div>

            )
        }
    }
}