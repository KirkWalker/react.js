import React, {Component} from 'react';
import {ForgotPasswordPost} from '../services/ForgotPassword';
import strings from "../components/Localize";


class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            error: '',
            success: false,
            redirectToReferrer: false
        };

        this.sendemail = this.sendemail.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    sendemail() {
        this.setState({error:'',success:false});

        var errorMessage = '';
        var pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        if(!pattern.test(this.state.email)) {
            errorMessage = 'Please enter a valid email';
        }


        if(errorMessage == '') {

            ForgotPasswordPost(this.state.email).then((result) => {

                let responseJson = result;
                if(responseJson.status==0) {
                    var output = '<div class="alert alert-danger">Email address not found</div>';
                    this.setState({error: output});
                } else {
                    this.setState({success:true});
                }
            })
            .catch((err) => {

                var output = '<div class="alert alert-danger">' + err + '</div>';
                this.setState({error: output});
            });

        } else {
            var output = '<div class="alert alert-danger">' + errorMessage + '</div>';
            this.setState({error: output});
        }
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }


    render(){


        if(this.state.success == true){
            return (

                <div className="col-md-7 mx-auto">
                    <h2>Forgot Password</h2>
                    <h4>Success!</h4>
                    <p>An email has been sent to <strong>{this.state.email}.</strong></p>
                    <p>Please check your email and follow the instructions within.</p>
                </div>

            )
        } else {
            return (

                <div className="col-md-6 mx-auto">

                    <h2>Forgot Password</h2>
                    <div id="errors" dangerouslySetInnerHTML={{__html: this.state.error}}></div>
                    <p>Enter the email address you registered with and a notice will be sent with instructions
                        to reset your password.</p>
                    <label>Your Email</label>
                    <input type="text" name="email" placeholder="Email" onChange={this.onChange}
                           value={this.state.email}/>

                    <div className="btn-group" role="group">
                        <a className="btn btn-primary"
                           onClick={this.sendemail}>{strings.sendnotice}</a>
                    </div>

                </div>

            )
        }

    }
}
export default ForgotPassword;