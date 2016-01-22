
import * as _ from 'lodash';


export function trimSlash(s: string): string {

    if (!_.isString(s)) {
        throw new Error("require string");
    }

    return s.replace(/\//, "")

}