import {getCategroies, getListToChidVideos} from "./api";

export const Videos = {
    categroies(){
        return new Promise((resolve, rejects) => {
            getCategroies().then((res) => {
                resolve(res);
            }).catch((err) => {
                rejects(err);
            });
        });
    },
    list(chid:any){
        return new Promise((resolve, rejects) => {
            getListToChidVideos(chid).then((res) => {
                resolve(res);
            }).catch((err) => {
                rejects(err);
            });
        });
    }
};