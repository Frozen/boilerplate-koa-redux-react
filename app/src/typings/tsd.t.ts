// <reference path="./whatwg-fetch/whatwg-fetch.d.ts" />
/// <reference path="./redux/redux.d.ts" />
/// <reference path="./react/react.d.ts" />
/// <reference path="./lodash/lodash.d.ts" />
/// <reference path="./react-router/react-router.d.ts" />


declare interface Object {
    assign(target: any, ...sources: any[]): any;
}

declare interface History {
    push(path: string): void
}

declare interface request {
    user: {
        id: number,
        is_authenticated: boolean
    }
}