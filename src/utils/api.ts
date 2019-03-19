import axios from "axios";

const AVGLE_LIST_VIDEOS_API_URL = 'https://api.avgle.com/v1/videos/0';
const AVGLE_ZH_PARAMS = '?limit=250&c=13';

function getListVideos(): Promise<Array<object>>{
    let url = AVGLE_LIST_VIDEOS_API_URL + AVGLE_ZH_PARAMS;
    return new Promise((resolve, rejects) => {
        axios.get(url).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            console.log('err'+err);
            rejects(err);
        });
    });
}

export {getListVideos};