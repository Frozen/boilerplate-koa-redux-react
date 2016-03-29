
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


interface AsyncResult {
    results: Array<any>
}

export class Loader {

    page: number;
    baseUrl: string;
    hasNext: boolean;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.hasNext = true;
        this.page = 0;
    }

    next(data: { [key:string]:string; } = {}): JQueryPromise<any> {
        this.page += 1;

        if (!this.hasNext) {
            return $.Deferred().resolve( {
                results: []
            })
        }

        return $.ajax({
            url: this.baseUrl,
            type: 'GET',
            data: _.assign({}, data, {page: this.page})
        }).then(function(data: AsyncResult) {
            if (!data.results) {
                this.hasNext = false;
                return $.Deferred().resolve(data);//   Promise.resolve(data);
            }
            if (data.results.length < 10) {
                this.hasNext = false;
                return $.Deferred().resolve(data);
            }
            return $.Deferred().resolve(data);
        }.bind(this))
    }

    reset() {
        this.page = 0;
        this.hasNext = true;
    }
}