import React from 'react';
import {Redirect} from 'react-router-dom';
import {OrderDeliverData} from '../services/OrderData';
import strings from "../components/Localize";

export default class Commit extends React.Component {

    constructor() {
        super();

        this.state = {
            items: [],
            redirectToDashboard: false,
            redirectToDeliver: false,
            data: [],
            error: '',
            terms: '',
            isButtonDisabled: false,
            success: false,
        };

        this.commit = this.commit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.cancel = this.cancel.bind(this);
        this.back = this.back.bind(this);
        this.dashboard = this.dashboard.bind(this);
    }

    componentWillMount() {

        let items = sessionStorage.getItem("deliverItems");

        if(items.length == 0){
            this.setState({success: true});
        }

        this.setState({ items:items });

    }

    handleChange(e) {
        let isChecked = e.target.checked;
        this.setState({'terms':isChecked});
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    commit() {

        this.setState({error:''});

        if(this.state.terms == false) {
            this.setState({error:'<div class="alert alert-danger">'+strings.err_agree+'</div>'});
        } else {

            if(this.state.isButtonDisabled == false) {

                this.setState({isButtonDisabled: true});

                OrderDeliverData(this.state.items,this.state.affiliate_domain).then((result) => {
                    let responseJson = result;
                    sessionStorage.setItem("deliverItems", '');
                    this.setState({success: true, items: [],isButtonDisabled: false});
                });

            }

        }
    }

    cancel() {
        sessionStorage.setItem("deliverItems",'');
        this.setState({redirectToDashboard: true});
    }

    back() {
        this.setState({redirectToDeliver: true});
    }

    dashboard() {
        this.setState({redirectToDashboard: true});
    }

    render() {


        if (this.state.redirectToDashboard) {
            return (<Redirect to={'/'}/>)
        }

        if (this.state.redirectToDeliver) {
            return (<Redirect to={'/deliver'}/>)
        }

        var inputStyle = {padding:'12px'}
        if (this.state.success) {

            let success_text = strings.success_deliver;
            return (
                <div className="col-sm-9">
                    <div id="success" className="alert alert-success">{success_text}</div>
                    <div id="errors" dangerouslySetInnerHTML={{__html: this.state.error}}></div>
                    <a className="btn btn-primary" onClick={this.dashboard}>{strings.back_dashboard}</a>
                </div>
            )

        } else {


            let arrTableItems = [];
            let items = JSON.parse(this.state.items);
            let index = 0;

            if(items.length > 0) {

                var oz = 0;
                var g = 0;

                for (var k = 0; k < items.length; k++) {

                    var id = items[k].id;
                    var weight = parseFloat(items[k].weight);
                    var weightg = 0;
                    var weighto = 0;

                    if(items[k].unit == 'g'){
                        weightg = parseFloat(weight);
                        weighto = parseFloat(weight/31.1);
                        g += parseFloat(weightg);
                        oz += parseFloat(weighto);
                    } else {
                        weightg = parseFloat(weight*31.1);
                        weighto = parseFloat(weight);
                        g += parseFloat(weightg);
                        oz += parseFloat(weighto);
                    }

                    arrTableItems.push(<tr key={k}>
                        <td>{items[k].brand}</td>
                        <td>{items[k].metal_type}</td>
                        <td>{weighto.toFixed(3)}  oz</td>
                        <td>{weightg.toFixed(3)} g</td>
                    </tr>);
                }
                oz = oz.toFixed(3);
                g = g.toFixed(3);
            }



            return (

                <div className="col-sm-9">

                    <h2> {strings.confirm} </h2>

                    <table className="table table-striped" style={{"width":"100%"}}>
                        <thead className="thead">
                        <tr>
                            <th>{strings.brand}</th>
                            <th>{strings.metaltype}</th>
                            <th>{strings.total_ounces}</th>
                            <th>{strings.total_grams}</th>

                        </tr>
                        </thead>
                        <tbody>

                            {arrTableItems}

                        <tr>
                            <td></td>
                            <td>Totals:</td>
                            <td>{oz} oz</td>
                            <td>{g} g</td>
                        </tr>
                        </tbody>
                    </table>

                    <div id="errors" dangerouslySetInnerHTML={{__html: this.state.error}}></div>


                    <br/>

                    <div className="col-sm-12">
                        <input type="checkbox" onChange={this.handleChange}  name="terms" style={{float:'left',margin:10}} />
                        <div style={{marginLeft:5,fontSize:14}}>{strings.deldiclaimer}</div><br />
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
                            onClick={this.commit}>{strings.confirm}</a>&nbsp;

                    <a className="btn btn-default"
                           onClick={this.back}>{strings.goback}</a>&nbsp;
                    <a className="btn btn-secondary"
                            onClick={this.cancel}>{strings.cancel}</a>
                    </div>



                </div>

            )

        }


    }

}