import {FetchHandler} from "./FetchHandler";

export function CountryData() {

    return new Promise((resolve, reject) => {

        FetchHandler('GET', 'countries', 'LocationData::CountryData', '', false).then((res) => {
            resolve (res.data);
        }).catch((error) => {
            reject(error);
        });


    });

}

export function RegionData(_country) {

    return new Promise((resolve, reject) => {
        FetchHandler('GET', 'countries/'+_country+'/regions', 'LocationData::CountryData', '', false).then((res) => {
            resolve (res.data);
        }).catch((error) => {
            reject(error);
        });
    });

}
