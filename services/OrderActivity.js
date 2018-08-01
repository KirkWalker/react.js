import {FetchHandler} from "./FetchHandler";


export function ActivityData(limit) {

    return new Promise((resolve, reject) => {

        var access_token = sessionStorage.getItem("access_token");
        let data = JSON.parse(sessionStorage.getItem("userData"));
        var url = 'activity?token='+access_token+'&lodeid='+data.lodeid;

        if(limit != ''){
            url += '&limit='+limit;
        }

        FetchHandler('GET', url, 'OrderActivity::ActivityData', '', false).then((res) => {
            resolve (res.data);
        }).catch((error) => {
            reject(error);
        });


    });


}

export function OrderDetailsData(_orderid) {

    return new Promise((resolve, reject) => {

        var access_token = sessionStorage.getItem("access_token");
        let data = JSON.parse(sessionStorage.getItem("userData"));
        var url = 'activitydetails/'+_orderid+'?token='+access_token;

        FetchHandler('GET', url, 'OrderActivity::OrderDetailsData', '', false).then((res) => {
            resolve (res.data);
        }).catch((error) => {
            reject(error);
        });


    });


}