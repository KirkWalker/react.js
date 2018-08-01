import React, {Component} from 'react';

class Thankyou extends Component {

    constructor(props) {
        super(props);

    }

    render(){

        return(
            <div className="col-md-7 mx-auto">
                <h2>You're almost there!</h2>
                <p>Your account has been created.</p>
                <p>Please check your email to confirm your account!</p>
            </div>
        )

    }
}
export default Thankyou;