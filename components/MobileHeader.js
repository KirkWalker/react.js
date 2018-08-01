import React, {Component} from 'react';
import Menu from "../components/Menu";

class MobileHeader extends Component {


    constructor(){
        super();

        this.state = {
            showMenu: false,
            lang: 0,
        };

        this.showSidebar = this.showSidebar.bind(this);

    }

    showSidebar(){
        if(this.state.showMenu){
            this.setState({ showMenu: false });
        } else {
            this.setState({ showMenu: true });
        }
    }

    render() {

        return (

            <div className="title-bar hide-for-large">

                <div className="title-bar-left">

                    { this.props.loggedin == true ? <button className="menu-icon" type="button" data-open="my-info" onClick={this.showSidebar}></button> : null }

                    <span className="title-bar-title">LODE One</span>
                </div>

                { this.state.showMenu == true ? <Menu loggedin={this.props.loggedin} /> : null }

            </div>
        );
    }
}
export default MobileHeader;