// <reference path="./whatwg-fetch/whatwg-fetch.d.ts" />
/// <reference path="./redux/redux.d.ts" />
/// <reference path="./react/react.d.ts" />


declare interface Object {
    assign(target: any, ...sources: any[]): any;
}

declare interface History {
    push(path: string): void
}