import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import RegionDDL from "../components/RegionDDL";
import CountryDDL from "../components/CountryDDL";
import {GetUserData, UpdateUserPost, DeleteUserImg, UpdateGDPR} from "../services/UserData";
import Loading from "../components/Loading";
import strings from "../components/Localize";


export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            fname: '',
            lname: '',
            phone: '',
            address: '',
            address2: '',
            city: '',
            country: '',
            cc: '',
            province: '',
            postal: '',
            language: 'en',
            list_newsletter: 0,
            list_announce: 1,
            gdpr_consent: 1,
            lodeid: 0,
            error: '',
            success: '',
            image: '/img/no-image-available.png',
            redirectToReferrer: false,
            isLoading: false,
            pageLoading: false,

        };

        this.update = this.update.bind(this);
        this.cancel = this.cancel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.toggleNewsletter = this.toggleNewsletter.bind(this);
        this.toggleAnnouncements = this.toggleAnnouncements.bind(this);
        this.onGDPRChange = this.onGDPRChange.bind(this);

    }


    deleteFile() {

        let responseJson = '';
        DeleteUserImg().then((result) => {
            responseJson = result;
            console.log('clicked delete:', responseJson);
            this.setState({image: '/img/no-image-available.png'});
        }).catch((err) => {

        });
    }

    onPhoneChange(status, value, countryData, number, id) {
        this.setState({phone: number});
    }


    componentDidMount() {

        GetUserData().then((result) => {

            var responseJson = result;
            sessionStorage.setItem('userLang', responseJson.data.lang);

            this.setState({
                id: responseJson.data.id,
                username: responseJson.data.username,
                email: this.fixNull(responseJson.data.email),
                fname: responseJson.data.fname,
                lname: responseJson.data.lname,
                phone: responseJson.data.phone,
                address: this.fixNull(responseJson.data.address),
                address2: this.fixNull(responseJson.data.address2),
                city: this.fixNull(responseJson.data.city),
                country: responseJson.data.country,
                cc: responseJson.data.cc,
                province: this.fixNull(responseJson.data.prov),
                postal: this.fixNull(responseJson.data.postal),
                lang: responseJson.data.lang,
                language: responseJson.data.lang,
                lodeid: responseJson.data.lodeid,
                list_newsletter: responseJson.data.list_newsletter,
                list_announce: responseJson.data.list_announce,
                gdpr_consent: responseJson.data.gdpr_consent,

            });


        }).catch((err) => {
            console.log(err);
        });
    }

    toggleNewsletter() {
        if (this.state.list_newsletter == 0) {
            this.setState({list_newsletter: 1});
        } else {
            this.setState({list_newsletter: 0});
        }
    }

    toggleAnnouncements() {
        if (this.state.list_announce == 0) {
            this.setState({list_announce: 1});

        } else {
            this.setState({list_announce: 0});
        }
    }

    onGDPRChange() {
        if (this.state.gdpr_consent == 0) {
            this.setState({gdpr_consent: 1});
            sessionStorage.setItem('gdpr_consent', 1);
        } else {
            this.setState({gdpr_consent: 0});
            sessionStorage.setItem('gdpr_consent', 0);

        }

        console.log('this.state.gdpr_consent', this.state.gdpr_consent);
    }


    fixNull(thevalue) {
        if (thevalue == null) {
            thevalue = '';
        }
        return thevalue;
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
        if (e.target.name == 'language') {
            this.state.lang = e.target.value.toLowerCase();
            strings.setLanguage(e.target.value.toLowerCase());
        }
    }

    onChangeCountry(e) {
        this.setState({[e.target.name]: e.target.value});
        this.setState({isLoading: true});
    }

    cancel() {

        location.href = "/";

    }

    update() {

        this.setState({error: '', success: '', pageLoading: true});

        var errorMessage = '';
        var pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        if (!pattern.test(this.state.email)) {
            errorMessage = strings.regerr_invalid_email;
        }

        pattern = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
        if (!pattern.test(this.state.fname) || this.state.fname.length < 2 || this.state.fname.length > 30) {
            errorMessage = strings.regerr_invalid_fname;
        }

        if (!pattern.test(this.state.lname) || this.state.lname.length < 2 || this.state.lname.length > 20) {
            errorMessage = strings.regerr_invalid_lname;
        }

        if (this.state.city == '') {
            errorMessage = strings.regerr_invalid_city;
        }
        if (this.state.address == '') {
            errorMessage = strings.regerr_invalid_address;
        }

        // pattern = /^\+\d{1} \d{3} \d{3}-\d{4}$/;
        // if(!pattern.test(this.state.phone )) {
        //errorMessage = 'Please enter a phone number in the correct format (+1 555 555-5555)';
        // }

        if (this.state.postal == '') {
            errorMessage = strings.regerr_invalid_postal;
        }
        if (this.state.province == '') {
            //errorMessage = 'Please choose a province';
            this.state.province = 0;
        }

        if (errorMessage == '') {

            UpdateUserPost(this.state).then((result) => {
                let responseJson = result;
                //console.log('responseJson',responseJson);
                //console.log('state',this.state);
                if (responseJson.data) {
                    responseJson.data.password = this.state.password;

                    sessionStorage.setItem('userData', JSON.stringify(responseJson.data));
                    if (responseJson.new_access_token) {
                        sessionStorage.setItem('access_token', responseJson.new_access_token);
                    }

                    sessionStorage.setItem('userLang', responseJson.data.lang.toLowerCase());

                    this.setState({success: strings.success_profile, pageLoading: false});

                } else {
                    //handle error from API response
                    var output = '';
                    if (typeof responseJson.errors === 'object') {
                        var obj = responseJson.errors;
                        for (var property in obj) {
                            output += obj[property] + "<br />";
                        }
                    } else {
                        output = responseJson.error;
                    }
                    this.setState({error: output, pageLoading: false});
                }

            })
                .catch((err) => {
                    this.setState({error: err, pageLoading: false});
                });

        } else {

            var output = '<div class="row alert alert-danger">' + errorMessage + '</div>';

            this.setState({error: output, pageLoading: false});
        }
    }

    renderScreen() {

        if (this.state.success != '') {
            return (
                <div>
                    <div id="success" className="alert alert-success">{this.state.success}</div>
                    <a className="btn btn-primary" onClick={this.cancel}>{strings.back_dashboard}</a>
                </div>
            )
        } else {

            var list_annc_chkd = '', list_news_chkd = '', gdpr_consent_chkd = '', lang = 0;
            if (this.state.list_newsletter == 1) {
                list_news_chkd = "checked";

            }
            if (this.state.list_announce == 1) {
                list_annc_chkd = "checked";
            }
            if (this.state.gdpr_consent == 1) {
                gdpr_consent_chkd = "checked";
            } else {

            }


            return (


                <div>

                    {(this.state.gdpr_consent) ? "" : (<div>
                        <div id="success"
                             className="alert alert-success">{this.state.success}{strings.alert_no_gdpr_consent}</div>
                    </div>)}

                    <h2> {strings.your_profile} </h2>
                    <small style={{float: 'right', marginTop: -50}}>LodeID: {this.state.lodeid}</small>

                    <div className="row">

                        <div className="col-sm-11">
                            <div id="errors" dangerouslySetInnerHTML={{__html: this.state.error}}></div>
                        </div>

                        <div className="col-md-5 col-md-6">
                            <label>{strings.username}</label>
                            <input type="text" id="username" name="username" value={this.state.username || ''}
                                   disabled="disabled"/>
                        </div>
                        <div className="col-md-5 col-md-6">
                            <label>{strings.email}</label>
                            <input type="text" id="email" name="email" value={this.state.email || ''}
                                   disabled="disabled"/>
                        </div>

                        <div className="col-md-5 col-md-6">
                            <label>{strings.fname}</label>
                            <input type="text" name="fname" placeholder={strings.fname} onChange={this.onChange}
                                   value={this.state.fname || ''}/>
                        </div>
                        <div className="col-md-5 col-md-6">
                            <label>{strings.lname}</label>
                            <input type="text" name="lname" placeholder={strings.lname} onChange={this.onChange}
                                   value={this.state.lname || ''}/>
                        </div>
                        <div className="col-md-5 col-md-6">
                            <label>{strings.lang}</label>
                            <select name="language" value={this.state.language} onChange={this.onChange}>
                                <option value="en">English</option>
                                <option value="fr">Français</option>
                                <option value="es">Español</option>
                            </select>
                        </div>
                        <div className="col-md-5 col-md-6">
                            <label>{strings.phone}</label>
                            <input type="text" name="phone" placeholder={strings.phone} onChange={this.onChange}
                                   value={this.state.phone || ''}/>
                        </div>
                        <div className="col-md-5 col-md-6">
                            <label>{strings.country}</label>
                            <CountryDDL country={this.state.country} onChange={this.onChangeCountry}/>
                        </div>
                        <div className="col-md-5 col-md-6">
                            <label>{strings.province}</label>
                            <RegionDDL province={this.state.province} onChange={this.onChange}
                                       country={this.state.country} isLoading={this.state.isLoading}/>
                        </div>
                        <div className="col-md-5 col-md-6">
                            <label>{strings.city}</label>
                            <input type="text" name="city" placeholder={strings.city} onChange={this.onChange}
                                   value={this.state.city || ''}/>
                        </div>
                        <div className="col-md-5 col-md-6">
                            <label>{strings.address}</label>
                            <input type="text" name="address" placeholder={strings.address} onChange={this.onChange}
                                   value={this.state.address || ''}/>
                        </div>
                        <div className="col-md-5 col-md-6">
                            <label>{strings.address2}</label>
                            <input type="text" name="address2" placeholder={strings.address2} onChange={this.onChange}
                                   value={this.state.address2 || ''}/>
                        </div>
                        <div className="col-md-5 col-md-6">
                            <label>{strings.postal}</label>
                            <input type="text" name="postal" placeholder={strings.postal} onChange={this.onChange}
                                   value={this.state.postal || ''}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <p>
                                <small><input type="checkbox" checked={list_news_chkd}
                                              onChange={this.toggleNewsletter}/> {strings.newsletter}</small>
                                <br/>
                                <small><input type="checkbox" checked={list_annc_chkd}
                                              onChange={this.toggleAnnouncements}/> {strings.announcements}</small>
                                <br/>
                                <small><b><input type="checkbox" checked={gdpr_consent_chkd} onChange={this.onGDPRChange}/> <span
                                    style={{width: '300px'}}
                                    dangerouslySetInnerHTML={{__html: strings.read_accept_terms}}></span></b></small>
                                <br/>

                            </p>
                            <div>
                                {/*<input type="checkbox" checked={this.state.gdpr_consent} onChange={this.onGDPRChange} />&nbsp;<span style={{width:'300px'}} dangerouslySetInnerHTML={{__html: strings.read_accept_terms}}></span>*/}
                            </div>
                            <div align="right"><p>{strings.update_password} <a
                                href="/resetpassword">{strings.click_here}</a></p></div>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 text-right">
                            <div className="btn-group" role="group">
                                <a className="btn btn-primary" onClick={this.update}>{strings.update_info}</a>&nbsp;
                                <a className="btn btn-default" onClick={this.cancel}>{strings.cancel}</a>
                            </div>
                        </div>
                    </div>

                </div>

            )
        }
    }


    render() {

        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/'}/>)
        }
        if (this.state.pageLoading) {

            var divStyle = {
                minHeight: 300,
                paddingTop: 100,
            };

            return (

                <div className="center-block">
                    <div className="col-md-3 mx-auto" style={divStyle}>
                        <Loading/>
                    </div>
                </div>

            );
        } else {
            return (
                <div className="col-sm-9">
                    {this.renderScreen()}
                </div>

            )
        }
    }

}
