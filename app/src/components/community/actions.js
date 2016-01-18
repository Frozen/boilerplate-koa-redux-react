/// <reference path="../../typings/tsd.t.ts" />
/// <reference path="./types.ts" />
var types = require('./types');
var models = require('../../models/models');
var stubs = require('../../models/stubs');
console.log("modelscommm", models.Community);
exports.setCommunity = function (community) {
    return {
        type: types.SET_COMMUNITY,
        community: Object.assign(new models.Community(), community)
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
                community: Object.assign(new models.Community(), data)
            });
        });
    };
};
exports.setTab = function (path) {
    return {
        type: types.SET_TAB,
        currentTab: path
    };
};
exports.setSubTab = function (path) {
    return {
        type: types.SET_SUB_TAB,
        currentTab: path
    };
};
exports.addContents = function (contents, type) {
    return {
        type: types.ADD_CONTENTS,
        contents: contents,
        contentType: type
    };
};
exports.setContentLoadingState = function (state) {
    return {
        type: types.SET_CONTENT_LOADING,
        state: state
    };
};
exports.fetchContent = function (type) {
    return function (dispatch) {
        dispatch(exports.setContentLoadingState(true));
        setTimeout(function () {
            dispatch(exports.addContents([stubs.createContent(), stubs.createContent()], type));
            dispatch(exports.setContentLoadingState(false));
        }, 2000);
    };
};
//# sourceMappingURL=actions.js.map