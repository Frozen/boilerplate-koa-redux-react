/// <reference path="../typings/tsd.t.ts" />


import * as types from '../types/community';
import * as models from '../models/models';
import * as stubs from '../models/stubs';
import * as constants from '../constants/constants';

// declare var $: JQuery;


//console.log("modelscommm", models.Community);
export const setCommunity = (community: any) => {
    return {
        type: types.SET_COMMUNITY,
        community: community
    }
};

export const setCommunityGroup = (group_id: number) => {
    return {
        type: types.SET_COMMUNITY_GROUP,
        group_id: group_id
    }
};

export const fetchCommunity = (communityId: number) => {
    return (dispatch) => {

        $.ajax({
            url: '/rest/community/' + communityId
        }).then((data) => {

            dispatch({
                type: types.SET_COMMUNITY,
                community: data
            })

        });

    }
};


export const asyncJoinCommunity = (communityId: number) => {

    return (dispatch) => {


        $.ajax({
            url: '/rest/community/join',
            type: 'POST',
            data: {
                community_id: communityId
            }
        }).then((data) => {

            // console.log(data);
            dispatch(fetchCommunity(communityId))

        });

    }

};

// @TODO
export const asyncLeaveCommunity = (communityId: number) => {

    return (dispatch) => {
        $.ajax({
            url: '/rest/community/leave',
            type: 'POST',
            data: {
                community_id: communityId
            }
        }).then((data) => {

            // console.log(data);
            dispatch(fetchCommunity(communityId))

        });
        // dispatch(setCommunityGroup(0))
    }

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
