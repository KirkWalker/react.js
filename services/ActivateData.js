import {FetchHandler} from "./FetchHandler";

export function ActivateData( token, email) {

    return new Promise((resolve, reject) =>{

        var url = 'activate/' + token + '/' + encodeURIComponent(email);

        FetchHandler('POST', url, 'ActivateData::ActivateData', '', false).then((res) => {
            resolve (res);
        }).catch((error) => {
            reject(error);
        });

    });


}