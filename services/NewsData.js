
import {FetchHandler} from "./FetchHandler";


export function NewsData(fullText) {

    return new Promise((resolve, reject) => {

        var access_token = sessionStorage.getItem("access_token");
        var url = 'newsfeed?token=' + access_token;
        if (fullText) {
            url = url + '&full=1';
        } else {
            url = url + '&full=0';
        }

        FetchHandler('GET', url, 'NewsData::GetNewsData', '', false).then((res) => {
            resolve (res.data);
        }).catch((error) => {
            reject(error);
        });
    });
}

export function NewsItemData(_newsID) {

    return new Promise((resolve, reject) => {

        var access_token = sessionStorage.getItem("access_token");
        var url = 'newsfeed/click?access_token='+access_token;

        var formBody = [];
        var encodedKey = encodeURIComponent('article_id');
        var encodedValue = encodeURIComponent(_newsID);
        formBody.push(encodedKey + "=" + encodedValue);
        formBody = formBody.join("&");


        FetchHandler('POST', url, 'NewsData::NewsItemData', formBody, false).then((res) => {
            resolve(res.data);
        }).catch((error) => {
            reject(error);
        });


    });


}