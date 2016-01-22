
import * as types from '../types/community';
import * as models from '../models/models';
//import * as _ from 'lodash';


export const community = (state={}, action) => {

    switch (action.type) {
        case types.SET_COMMUNITY:
            return Object.assign({}, state, action.community);
            return Object.assign(new models.Community(), state, action.community);

        case types.SET_TAB:
            return Object.assign({}, state, {currentTab: action.currentTab});

        case types.SET_SUB_TAB:
            return Object.assign({}, state, {currentSubTab: action.currentTab});

        default:
            return state;
    }

};


export const contentPane = (state={}, action) => {

    switch (action.type) {
        case types.ADD_CONTENTS:
            var _state = Object.assign({}, state);
            const content = [...state.content[action.contentType], ...action.contents];
            _state.content[action.contentType] = content;

            return _state;

        case types.SET_CONTENT_LOADING:
            return Object.assign({}, state, {infinityIsLoading: action.state});
    }

    return state;
};

export const membersPane = (state={}, action) => {

    //switch (action.type) {
    //    case types.ADD_CONTENTS:
    //        var _state = Object.assign({}, state);
    //        const content = [...state.content[action.contentType], ...action.contents];
    //        _state.content[action.contentType] = content;
    //
    //        return _state;
    //
    //    case types.SET_CONTENT_LOADING:
    //        return Object.assign({}, state, {infinityIsLoading: action.state});
    //}

    return state;
};


export const settingsPane = (state={}, action) => {

    switch (action.type) {
        case types.SET_FORM_VALUE:
            var newState = Object.assign({}, state);
            newState.form[action.key] = action.value;
            return newState
    }

    return state;
};

