import React from 'react';
import {Redirect} from 'react-router-dom';
import strings from "../components/Localize";
import {GetUserData} from "../services/UserData";


export default class Deliver extends React.Component {

    constructor() {
        super();

        this.state = {
            weight: '',
            brand: '',
            unit: 'oz',
            metal_type: 'silver',
            redirectToDashboard: false,
            redirectToCommit: false,
            error: '',
            id: 0,
            isButtonDisabled: false,
            items: [],
            phone_verified: 1,
            profile_completed: 1,
            address: '',
            city: '',
            country: '',
            province: '',
            postal: '',
        };

        this.add = this.add.bind(this);
        this.onChange = this.onChange.bind(this);
        this.cancel = this.cancel.bind(this);
        this.commitDelivery = this.commitDelivery.bind(this);
    }

    fixNull(thevalue) {
        if (thevalue == null) {
            thevalue = '';
        }
        return thevalue;
    }

    componentDidMount() {

        if (sessionStorage.getItem("deliverItems") != '' && sessionStorage.getItem("deliverItems") != null) {
            let items = JSON.parse(sessionStorage.getItem("deliverItems"));
            this.setState({items: items});
        }



        GetUserData().then((result) => {
            let responseJson = result;
            this.setState({
                address: this.fixNull(responseJson.data.address),
                city: this.fixNull(responseJson.data.city),
                country: responseJson.data.country,
                province: this.fixNull(responseJson.data.prov),
                postal: this.fixNull(responseJson.data.postal),
                phone_verified: responseJson.data.phone_verified
            });

            if (this.state.address == null || this.state.postal == null || this.state.city == null ||
                this.state.address == "" || this.state.postal == "" || this.state.city == "") {
                this.setState({error: strings.err_profile, profile_completed: 0});
            } else {
                this.setState({profile_completed: 1});
            }

            if (responseJson.data.phone_verified == 0) {
                this.setState({error: strings.err_phone_conf, phone_verified: 0});
            } else {
                this.setState({phone_verified: 1});
            }


        }).catch((err) => {

        });


    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    add() {

        this.setState({error: ''});
        let errorMessage = '';

        var weight = String(this.state.weight);
        if (!this.IsNumeric(weight)) {
            errorMessage += strings.err_num_weight + '<br />';
        } else {
            if (weight < 0) {
                errorMessage += strings.err_pos_weight + '<br />';
            }
        }

        if (weight == '') {
            errorMessage += strings.err_weight + '<br />';
        }

        if (this.state.brand == '') {
            errorMessage += strings.err_brand + '<br />';
        }

        if (this.state.address == null || this.state.postal == null || this.state.city == null ||
            this.state.address == "" || this.state.postal == "" || this.state.city == "") {
            errorMessage = strings.err_profile;
        }

        if (errorMessage == '') {

            let id = this.state.id + 1;
            var params = {
                'id': id,
                'weight': this.state.weight,
                'brand': this.state.brand,
                'metal_type': this.state.metal_type,
                'unit': this.state.unit,
            };

            this.setState({items: this.state.items.concat([params])});
            this.setState({weight: '', brand: '', id: id});

        } else {

            errorMessage = '<div class="alert alert-danger">' + errorMessage + '</div>';
            this.setState({error: errorMessage});
        }

    }


    cancel() {
        this.setState({redirectToDashboard: true});
    }

    IsNumeric(val) {
        return !isNaN(parseFloat(val)) && isFinite(val);
    }


    handleRemoveItem(id) {

        var items = this.state.items;
        var clength = items.length;
        var finalItems = [];

        for (var i = 0; i < clength; i++) {

            if (i != id) {

                var finalObj = this.state.items[i];
                finalItems.push(finalObj);
            }
        }

        this.setState({items: finalItems, id: (items.length - 1)});

    }


    commitDelivery() {

        if (this.state.items.length == 0) {
            this.setState({error: '<div class="alert alert-danger">' + strings.add_one + '</div>'});
        } else {

            if (this.state.isButtonDisabled == false) {

                this.setState({isButtonDisabled: true});
                if (this.refs.commit) {
                    this.refs.commit.setAttribute("disabled", "disabled");
                }


                //need to total up all the items and make sure it's larger than 100oz
                var items = this.state.items;
                var clength = items.length;

                var weight = 0;
                var min_amount = 100;
                var mtype = strings.silver;
                for (var i = 0; i < clength; i++) {

                    var Obj = this.state.items[i];
                    var w = 0;
                    if (Obj.metal_type == 'gold') {
                        min_amount = 2;
                        mtype = strings.gold;
                    }
                    if (Obj.unit == 'g') {
                        w = (Number(Obj.weight) / 31.1);
                        weight += w;
                    } else {
                        weight += Number(Obj.weight);
                    }
                }

                if (weight < min_amount) {
                    var localization_text = strings.err_min_commit.replace('[x]', min_amount);
                    localization_text = localization_text.replace('[y]', mtype);
                    this.setState({error: '<div class="alert alert-danger">' + localization_text + '</div>'});
                    this.setState({isButtonDisabled: false});
                } else {
                    sessionStorage.setItem("deliverItems", JSON.stringify(this.state.items));
                    this.setState({redirectToCommit: true});
                }

            }


        }


    }


    render() {

        if (this.state.redirectToDashboard) {
            return (<Redirect to={'/'}/>)
        }

        if (this.state.redirectToCommit) {
            return (<Redirect to={'/commitdelivery'}/>)
        }

        let arrTableItems = [];
        let items = this.state.items;
        let index = 0;
        if (this.state.items != null) {
            if (items.length > 0) {

                for (var k = 0; k < items.length; k++) {

                    var id = items[k].id;

                    arrTableItems.push(<tr key={k}>
                        <td>{items[k].weight} {items[k].unit}</td>
                        <td>{items[k].brand}</td>
                        <td>{items[k].metal_type}</td>
                        <td><span className="fa fa-trash" key={k} onClick={this.handleRemoveItem.bind(this, k)}></span>
                        </td>
                    </tr>);
                }

            }
        }


        var inputStyle = {padding: '12px'}
        const divStyle30 = {
            width: '41%',
            marginRight: '1%',
            minWidth: 310,
        };
        const divStyle70 = {
            width: '55%',

        };

        if (this.state.phone_verified == 0 || this.state.profile_completed == 0) {
            return (

                <div className="col-sm-9">
                    <h2>{strings.deliver_silver}</h2>

                    <div className="alert alert-danger" dangerouslySetInnerHTML={{__html: this.state.error}}></div>

                </div>

            )

        } else {

            return (

                <div className="col-sm-9">
                    <h2>{strings.deliver_silver}</h2>
                    <div dangerouslySetInnerHTML={{__html: strings.deliver_silver_text}}></div>

                    <div id="errors" dangerouslySetInnerHTML={{__html: this.state.error}}></div>
                    <br/>

                    <div className="row">
                        <div style={divStyle30}>
                            <h4>{strings.add_item}</h4>
                            <form onSubmit={this.handleSubmit}>
                                <div className="input-group input-group-sm">
                                    <input type="text" placeholder={strings.brand} name="brand"
                                           onChange={this.onChange} value={this.state.brand} style={{width: 270}}/>
                                    <div style={{float: 'left', width: 110, marginRight: 10}}>
                                        <input type="text" className="form-control" inputMode="numeric"
                                               placeholder={strings.total_weight} name="weight"
                                               onChange={this.onChange} value={this.state.weight}/>
                                    </div>
                                    <div style={{float: 'left', width: 70, marginRight: 10}}>
                                        <select name="unit" className="form-control" value={this.state.unit}
                                                onChange={this.onChange}>
                                            <option value="oz">Oz</option>
                                            <option value="g">{strings.grams}</option>
                                        </select>
                                    </div>
                                    <div style={{float: 'left', width: 70}}>
                                        <select name="metal_type" className="form-control"
                                                value={this.state.metal_type} onChange={this.onChange}>
                                            <option value="silver">{strings.silver}</option>
                                            <option value="gold">{strings.gold}</option>
                                        </select>
                                    </div> 
                                    <a className="btn btn-primary" id="add_to_list"
                                       onClick={this.add}>{strings.add_list}</a>&nbsp;
                                </div>
                            </form>
                        </div>

                        <div style={divStyle70}>
                            <h4>{strings.your_items}</h4>
                            <table className="table table-sm table-striped">
                                <thead className="thead">
                                <tr>
                                    <th>{strings.weight}</th>
                                    <th>{strings.brand}</th>
                                    <th>{strings.metaltype}</th>
                                    <th>&nbsp;</th>
                                </tr>
                                </thead>
                                <tbody>
                                {arrTableItems}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-md-12 text-right">
                            <h5>({strings.min_deliver} 100oz)</h5>
                            <div className="btn-group" role="group">
                                <a className="btn btn-primary" ref="commit" id="commit"
                                   onClick={this.commitDelivery}>{strings.commit}</a>&nbsp;
                                <a className="btn btn-default"
                                   onClick={this.cancel}>{strings.cancel}</a>
                            </div>
                        </div>
                    </div>
                </div>


            )
        }
    }


}