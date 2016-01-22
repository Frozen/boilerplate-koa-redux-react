/// <reference path="../typings/tsd.t.ts" />
// <reference path="./types.ts" />

import * as types from '../types/community';
import * as models from '../models/models';
import * as stubs from '../models/stubs';


//console.log("modelscommm", models.Community);

export const setCommunity = (community: any) => {
    return {
        type: types.SET_COMMUNITY,
        community: community
    }
};

export const fetchCommunity = (communityId: number) => {
    return (dispatch) => {


        fetch('/rest/community/' + communityId).
        then((r) => {
            return r.json()
        }).
        then((data) => {

            dispatch({
                type: types.SET_COMMUNITY,
                community: Object.assign(new models.Community(), data)
            })

        });

    }
};


export const setTab = (path: string): any => {

    return {
        type: types.SET_TAB,
        currentTab: path
    }

};


export const setSubTab = (path: string): any => {
    return {
        type: types.SET_SUB_TAB,
        currentTab: path
    }
};

export const addContents = (contents: Array<any>, type: string) => {
    return {
        type: types.ADD_CONTENTS,
        contents: contents,
        contentType: type
    }
};

export const setContentLoadingState = (state: boolean) => {
    return {
        type: types.SET_CONTENT_LOADING,
        state: state
    }
};

export const fetchContent = (type: string): any => {
    return (dispatch) => {
        dispatch(setContentLoadingState(true));
        setTimeout(() => {
            dispatch(addContents(
                [stubs.createContent(), stubs.createContent()], type
            ));
            dispatch(setContentLoadingState(false))
        }, 2000);

    }
};

// set from value
export const setFormValue = (key: string, value: string) => {
    return {
        type: types.SET_FORM_VALUE,
        key: key,
        value: value
    }
};
