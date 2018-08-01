import {FetchHandler} from '../services/FetchHandler';
import axios from "axios/index";

export function UserLogin(_userData) {

    return new Promise((resolve, reject) => {
        var params = {
            'username': _userData.username,
            'password': _userData.password
        };

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        FetchHandler('POST', 'authorize', 'UserData::UserLogin', formBody, false).then((result2) => {
            resolve(result2);

        }).catch((error2) => {
            reject(error2);
        });

    });

}

export function GetUserData() {
    return new Promise((resolve, reject) => {
        var access_token = sessionStorage.getItem("access_token");
        var url = 'me?token=' + access_token;
        FetchHandler('GET', url, 'UserData::GetUserData', '', false).then((res) => {
            resolve(res);
        }).catch((error) => {
            reject(error);
        });
    });
}



export function GetFileData() {
    return new Promise((resolve, reject) => {
        var access_token = sessionStorage.getItem("access_token");
        var url = 'getFiles?token='+access_token;
        FetchHandler('GET', url, 'FileData::GetFileData', '', false).then((res) => {


            resolve(res);
        }).catch((error) => {
            reject(error);
        });
    });
}


export function UpdateUserPost(userData) {

    return new Promise((resolve, reject) => {
        var access_token = sessionStorage.getItem("access_token");
        var url = 'users?token=' + access_token;
        var params = {
            'username': userData.username,
            'email': userData.email,
            'phone': userData.phone,
            'fname': userData.fname,
            'lname': userData.lname,
            'address': userData.address,
            'address2': userData.address2,
            'city': userData.city,
            'prov': userData.province,
            'country': userData.country,
            'postal': userData.postal,
            'lang': userData.language,
            'list_newsletter': userData.list_newsletter,
            'list_announce': userData.list_announce,
            'gdpr_consent': userData.gdpr_consent

        };

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        FetchHandler('POST', url, 'UserData::GetUserData?token=' + access_token, formBody, false).then((res) => {
            resolve(res);
        }).catch((error) => {
            reject(error);
        });


    });


}


export function DeleteUserImg() {

    return new Promise((resolve, reject) =>{
        var access_token = sessionStorage.getItem("access_token");
        var url = 'users/deleteImg?access_token='+access_token;

        FetchHandler('POST', url, 'UserData::DeleteUserImg', '', false).then((res) => {

            resolve(res);
        }).catch((error) => {
            console.error('UserData::DeleteUserImg',error);
            reject(error);
        });


    });

}

export function UpdateAddress(_address) {

    return new Promise((resolve, reject) => {

        var access_token = sessionStorage.getItem("access_token");
        var url = 'address/'+_address+'?access_token='+access_token;

        FetchHandler('POST', url, 'UserData::UpdateAddress', '', false).then((res) => {
            resolve(res);
        }).catch((error) => {
            console.error('UserData::UpdateAddress',error);
            reject(error);
        });
    });

}


// export function UpdateGDPR() {
//
//     return new Promise((resolve, reject) => {
//
//         var access_token = sessionStorage.getItem("access_token");
//         var url = 'gdprconsent?token='+access_token;
//
//         FetchHandler('POST', url, 'UserData::GDPRconsent', '', false).then((res) => {
//             resolve(res);
//         }).catch((error) => {
//             console.error('UserData::GDPRconsent',error);
//             reject(error);
//         });
//     });
//
// }

