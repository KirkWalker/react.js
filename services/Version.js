import 'babel-polyfill';
import "isomorphic-fetch";


export function Version() {


    return new Promise((resolve, reject) =>{

        var url = '/version.txt';

        fetch(url, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        })
        .then((resp) => {
            var theText = resp.text();
            return theText;
        }) // Transform the data into json
        .then((res) => {

            var theResult = res.substring(0,8);
            resolve(theResult);
        })
            .catch((error) => {
                reject(error);
            });


    });


}