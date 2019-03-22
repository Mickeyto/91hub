import axios from "axios";

const AVGLE_LIST_VIDEOS_API_URL = 'https://api.avgle.com/v1/videos/0';
const AVGLE_ZH_PARAMS = '?limit=250&c=13';
const AVGLE_CATEGORIES_API_URL = 'https://api.avgle.com/v1/categories';

function getListVideos(): Promise<Array<object>>{
    let url = AVGLE_LIST_VIDEOS_API_URL + AVGLE_ZH_PARAMS;
    return new Promise((resolve, rejects) => {
        axios.get(url).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            rejects(err);
        });
    });
}

function getListToChidVideos(chid:any): Promise<Array<object>>{
    let url = AVGLE_LIST_VIDEOS_API_URL + '?limit=250&c=' + chid;
    return new Promise((resolve, rejects) => {
        axios.get(url).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            rejects(err);
        });
    });
}

function getCategroies():Promise <Array<object>>{
    return new Promise((resolve, rejects) => {
        axios.get(AVGLE_CATEGORIES_API_URL).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            rejects(err);
        });
    });
}

export {getListVideos, getCategroies, getListToChidVideos};