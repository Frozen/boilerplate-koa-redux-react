
import * as _ from 'lodash';

import * as infs from '../interfaces/interfaces'


export function trimSlash(s: string): string {

    if (!_.isString(s)) {
        throw new Error("require string");
    }

    return s.replace(/\//, "")

}



// export function loadCommunityUsers(communityId: number,
//                                    type: string,
//                                    page: number,
//                                    query: string): Promise<any> {
//
//     return fetch('/rest/community/' + communityId + "/users?type=" + type + "&page=" + page + "&query="+query, {
//         credentials: 'same-origin'
//     }).
//     then((r) => {
//         return r.json()
//     }).then(function(data)  {
//         return data
//     });
//
// }

export function previewText(text: string, maxLength: number): string {

    if (text.length <= maxLength) {
        return text
    }

    const splitted = text.split(" ");
    let rs = "";

    for (let i=0; i<splitted.length; i++) {
        let word = splitted[i];

        if ((rs + word).length > maxLength) {
            return rs
        }
        rs += word;
    }

    return rs;
}


export class Loader {

    page = 0;
    baseUrl: string;


    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    next(data: { [key:string]:string; } = {}) {
        this.page += 1;
        return $.ajax({
            url: this.baseUrl,
            type: 'GET',
            data: Object.assign({}, data, {page: this.page})
        });
    }

    reset() {
        this.page = 0;
    }
}