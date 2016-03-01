/// <reference path="../typings/tsd.t.ts" />
var types = require('../types/community');
// declare var $: JQuery;
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
        $.ajax({
            url: '/rest/community/' + communityId
        }).then(function (data) {
            dispatch({
                type: types.SET_COMMUNITY,
                community: data
            });
        });
    };
};
exports.asyncJoinCommunity = function (communityId) {
    return function (dispatch) {
        $.ajax({
            url: '/rest/community/join',
            type: 'POST',
            data: {
                community_id: communityId
            }
        }).then(function (data) {
            // console.log(data);
            dispatch(exports.fetchCommunity(communityId));
        });
    };
};
// @TODO
exports.asyncLeaveCommunity = function (communityId) {
    return function (dispatch) {
        $.ajax({
            url: '/rest/community/leave',
            type: 'POST',
            data: {
                community_id: communityId
            }
        }).then(function (data) {
            // console.log(data);
            dispatch(exports.fetchCommunity(communityId));
        });
        // dispatch(setCommunityGroup(0))
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