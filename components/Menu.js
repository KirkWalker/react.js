import React, {Component} from 'react';
import strings from "./Localize";

class Menu extends Component {

    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            loggedIn:false
        };
    }


    componentDidMount() {


        console.log('props',this.props);
        if(this.props.loaded == true){
            this.setState({loaded:true});
        }
        if(this.props.loggedin == true){
            this.setState({loggedIn:true});
        }
    }

    render() {

        if(this.state.loaded == true && this.state.loggedIn == true) {

            return (

                <div>
                    <ul className="menu2 ">
                        <li><a href="/">{strings.dashboard}</a></li>
                        <li><span>{strings.silver}</span>
                            <ul>
                                <li><a href="/buy">{strings.buy}</a></li>
                                <li><a href="/deliver">{strings.deliver}</a></li>
                            </ul>
                        </li>
                        <li><a href="/news">{strings.latest_news}</a></li>
                        <li><a href="/activity">{strings.activity}</a></li>
                        <li><a href="/downloads">{strings.download}</a></li>
                        <li><a href="/profile">{strings.your_profile}</a></li>
                    </ul>

                </div>

            );
        } else {

            return (

                <div></div>
            )

        }

    }

}
export default Menu;