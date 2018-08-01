import {FetchHandler} from "./FetchHandler";

export function ForgotPasswordPost( email) {

    return new Promise((resolve, reject) =>{

        var url = 'forgotpassword';

        var formBody = [];
        var encodedKey = encodeURIComponent('email');
        var encodedValue = encodeURIComponent(email);
        formBody.push(encodedKey + "=" + encodedValue);
        formBody = formBody.join("&");

        FetchHandler('POST', url, 'ForgotPassword::ForgotPasswordPost', formBody, false).then((res) => {
            resolve (res);
        }).catch((error) => {
            reject(error);
        });

    });


}

export function ResetPasswordPost( password, token) {

    return new Promise((resolve, reject) =>{

        var url = 'resetpassword/'+token+'/'+encodeURIComponent(password);

        FetchHandler('POST', url, 'ForgotPassword::ResetPasswordPost', '', false).then((res) => {
            resolve (res);
        }).catch((error) => {
            reject(error);
        });

    });


}

export function ResetPasswordAUTHEDPost( password) {

    return new Promise((resolve, reject) =>{

        var access_token = sessionStorage.getItem("access_token");
        var url = 'resetauthpassword?token='+access_token;
        var params = {
            'access_token': access_token,
            'password': password,
        };

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        FetchHandler('POST', url, 'ForgotPassword::ResetPasswordAUTHEDPost', formBody, false).then((res) => {
            resolve (res);
        }).catch((error) => {
            reject(error);
        });

    });

}

