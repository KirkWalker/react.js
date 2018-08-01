import {FetchHandler} from "./FetchHandler";

export function OrderBuyData(_ounces, _affiliate_domain) {

    return new Promise((resolve, reject) => {

        let access_token = sessionStorage.getItem("access_token");
        let userData = JSON.parse(sessionStorage.getItem("userData"));
        var grams = (_ounces*31.1).toFixed(2);

        var url = 'orders/buy?token='+access_token;

        var params = {
            'lodeid':userData.lodeid,
            'qty': _ounces,
            'unit': 'Ounce',
            'metal_type': 'silver',
            'weight': 1,
            'grams': grams,
            'affiliate_domain': _affiliate_domain,
        '   description': 'Buy order for '+ _ounces + 'oz - converted:  ' + grams + 'g',
        };

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        FetchHandler('POST', url, 'OrderData::OrderBuyData?token='+access_token, formBody, false).then((res) => {
            resolve (res);
        }).catch((error) => {
            reject(error);
        });
    });
}

export function OrderDeliverData(orderData, _affiliate_domain) {

    return new Promise((resolve, reject) => {

        let access_token = sessionStorage.getItem("access_token");
        let userData = JSON.parse(sessionStorage.getItem("userData"));
        let items = JSON.parse(orderData);

        var url = 'orders/deliver?token='+access_token;

        var params = {
            'token': access_token,
            'lodeid': userData.lodeid,
            'affiliate_domain': _affiliate_domain,
        };


        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        for (var k = 0; k < items.length; k++) {

            var grams = 0;
            if(items[k].unit == 'g') {
                grams = items[k].weight;
            } else {
                grams = (items[k].weight)*31.1;
            };

            var desc = 'Deliver order for '+items[k].weight+' ' + items[k].unit+ ' ('+items[k].brand+')';

            formBody.push("grams[]=" + encodeURIComponent(grams));
            formBody.push("qty[]=" + encodeURIComponent("1"));
            formBody.push("weight[]=" + encodeURIComponent(items[k].weight));
            formBody.push("brand[]=" + encodeURIComponent(items[k].brand));
            formBody.push("unit[]=" + encodeURIComponent(items[k].unit));
            formBody.push("metal_type[]=" + encodeURIComponent(items[k].metal_type));
            formBody.push("description[]=" + encodeURIComponent(desc));
        }

        formBody = formBody.join("&");
        FetchHandler('POST', url, 'OrderData::OrderDeliverData', formBody, false).then((res) => {
            resolve (res);
        }).catch((error) => {
            reject(error);
        });
    });
}

