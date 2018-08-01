/*
common file for handling all fetch's
*/
import 'babel-polyfill';
import "isomorphic-fetch";
import api_url from '../components/Config'


var BaseURL = api_url;

export function FetchHandler( _method = 'POST', _url, _control = 'FetchHandler', _formbody = '', _debug=false) {
    var headerJSON = {method: _method,
        body: _formbody,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;',
        }};

    if(_formbody == ''){
        headerJSON = {method: _method}
    }

    return new Promise((resolve, reject) =>{
        fetch(BaseURL+_url,
            headerJSON
        )
        .then((response) => {
            var page = window.location.href;
            page = page.replace(window.location.protocol+'//'+window.location.host,'');

            if (response.status === 401 && page.toLowerCase() != '/login') {
                // 401 returned from server
                sessionStorage.setItem('access_token',"");
                location.href = window.location.protocol+'//'+window.location.host+'/login';

            } else {
                // another status code
                return response.json()
            }
        })
        .then((res) => {

            if(_debug) {
                //console.log(_control + ' result:', res);
            }
            resolve(res);
        })
        .catch((res) => {

            if(_debug) {
                console.error(_control+' error:',res);
            }
            var output = '';
            if(typeof res.errors === 'object') {
                var obj = res.errors;
                for (var property in obj) {
                    output += obj[property] + "<br />";
                }
            } else {

                output = res.error;

            }

            reject(output);
        });

    });

}


