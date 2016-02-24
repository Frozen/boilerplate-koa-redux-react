/// <reference path="../typings/tsd.t.ts" />
// <reference path="./types.ts" />
var types = require('../types/community');
var constants = require('../constants/constants');
//console.log("modelscommm", models.Community);
exports.setCommunity = function (community) {
    return {
        type: types.SET_COMMUNITY,
        community: community
    };
};
exports.setCommunityGroup = function (group_id) {
    return {
        type: types.SET_COMMUNITY_GROUP,
        group_id: group_id
    };
};
exports.fetchCommunity = function (communityId) {
    return function (dispatch) {
        fetch('/rest/community/' + communityId).
            then(function (r) {
            return r.json();
        }).
            then(function (data) {
            dispatch({
                type: types.SET_COMMUNITY,
                community: data
            });
        });
    };
};
// @TODO
exports.asyncJoinCommunity = function (communityId, userId) {
    return function (dispatch) {
        dispatch(exports.setCommunityGroup(constants.COMMUNITY_GROUP_MEMBER));
    };
};
// @TODO
exports.asyncLeaveCommunity = function (communityId, userId) {
    return function (dispatch) {
        dispatch(exports.setCommunityGroup(0));
    };
};
//
//export const addContents = (contents: Array<any>, type: string) => {
//    return {
//        type: types.ADD_CONTENTS,
//        contents: contents,
//        contentType: type
//    }
//};
//
//export const setContentLoadingState = (state: boolean) => {
//    return {
//        type: types.SET_CONTENT_LOADING,
//        state: state
//    }
//};
//export const fetchContent = (type: string): any => {
//    return (dispatch) => {
//        dispatch(setContentLoadingState(true));
//        setTimeout(() => {
//            dispatch(addContents(
//                [stubs.createContent(), stubs.createContent()], type
//            ));
//            dispatch(setContentLoadingState(false))
//        }, 2000);
//
//    }
//};
//// set from value
//export const setFormValue = (key: string, value: string) => {
//    return {
//        type: types.SET_FORM_VALUE,
//        key: key,
//        value: value
//    }
//};
//# sourceMappingURL=community.js.map