import cookie from "react-cookies";
import {FetchHandler} from "./FetchHandler";

export function RegisterPost(userData) {

    return new Promise((resolve, reject) => {

        var url = 'register';

        let domain = '';

        if (typeof cookie.load('BaseURL') != "undefined") {
            domain = cookie.load('BaseURL');
        } else {
            domain = window.location.hostname;
        }


        var params = {
            'username': userData.username,
            'password': userData.password,
            'email': userData.email,
            'phone': userData.phone,
            'fname': userData.fname,
            'lname': userData.lname,
            'country': userData.country,
            'domain': domain,
            'lang': userData.lang,
            'langIDX': userData.lang,
            'send_sms': userData.send_sms,
            'recaptcha': userData.recaptcha
        };

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        FetchHandler('POST', url, 'PostData::RegisterPost', formBody, false).then((res) => {
            resolve(res);
        }).catch((error) => {
            reject(error);
        });

    });

}

export function ConfirmPhoneNumber(sms_code, userid) {

    return new Promise((resolve, reject) => {

        var access_token = sessionStorage.getItem("access_token");
        var url = 'verfiysms?token=' + access_token;

        var params = {
            'sms_code': sms_code,
        };

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        FetchHandler('POST', url, 'PostData::ConfirmPhoneNumber', formBody, false).then((res) => {
            resolve(res);
        }).catch((error) => {
            reject(error);
        });


    });


}

export function SendCode(phone, lodeid) {

    return new Promise((resolve, reject) => {
        var access_token = sessionStorage.getItem("access_token");
        var url = 'resendsms?token=' + access_token;
        var params = {
            'access_token': access_token,
            'phone': phone,
        };

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        FetchHandler('POST', url, 'PostData::ConfirmPhoneNumber', formBody, false).then((res) => {
            resolve(res);
        }).catch((error) => {
            reject(error);
        });


    });


}
