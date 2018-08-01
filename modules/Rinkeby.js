import React, {Component} from 'react';
import Header from '../components/Header';
//import Web3 from 'web3';

//var web3 = new Web3(new Web3.providers.HttpProvider('http://159.100.252.249:8545'));
//const abi = [{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"payable":false,"type":"fallback"}];
//const address = "0x0e4f9deafc4353a5c6c52201746c3318669fa87e"; //test address created on rinkeby, 3.0 eth requested on google plus
//const deployedContract = web3.eth.contract(abi).at(address);
//const filter = web3.eth.filter('latest');


class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            lang: 0,
            block_ids: [],
            block_hashes: [],
            curr_block: null
        };


    }



    componentWillMount() {

        let data = JSON.parse(sessionStorage.getItem("userData"));
        this.setState({username:data.username, lang:data.lang}); //show username in view

        var curr_block_no = web3.eth.blockNumber;
        console.log('curr_block_no',curr_block_no);
        this.setState({
            curr_block: curr_block_no
        });
    }


    render() {


        console.log('web3.eth.accounts',web3.eth.accounts.wallet);

        return (
            <div className="col-md-5 mx-auto">
                <h2>Rinkeby Test Network</h2>
                <div id="errors" dangerouslySetInnerHTML={{__html: this.state.error}}></div>
                <p>This page is used to test the Rinkeby test network with Web3</p>

                <p>Current Block: {this.state.curr_block}</p>



            </div>
        );
    }

}

export default Login;