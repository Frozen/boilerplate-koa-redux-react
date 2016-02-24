
import * as _ from 'lodash';

import * as infs from '../interfaces/interfaces'


export function trimSlash(s: string): string {

    if (!_.isString(s)) {
        throw new Error("require string");
    }

    return s.replace(/\//, "")

}



export function loadCommunityUsers(communityId: number,
                                   type: string,
                                   page: number,
                                   query: string): Promise<any> {

    return fetch('/rest/community/' + communityId + "/user?type=" + type + "&page=" + page + "&query="+query, {
        credentials: 'same-origin'
    }).
    then((r) => {
        return r.json()
    }).then(function(data)  {
        return data
    });

}