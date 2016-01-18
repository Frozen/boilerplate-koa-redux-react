
import * as types from './types';



export const reducer = (state={}, action) => {

    //console.log('reducer state', state);

    switch (action.type) {
        case types.SET_COMMUNITY:
            const rs = {...state, community: action.community};
            //console.log("reducer state after", rs);
            return rs;
            //return Object.assign({}, state, {community: action.community});

        case types.SET_TAB:
            var rs = {...state, currentTab: action.currentTab};
            return rs;

        case types.SET_SUB_TAB:
            return {...state, currentSubTab: action.currentTab};

        case types.ADD_CONTENTS:
            var _state = Object.assign({}, state);
            const content = [...state.content[action.contentType], ...action.contents];
            _state.content[action.contentType] = content;

            return _state;

        case types.SET_CONTENT_LOADING:
            return Object.assign({}, state, {infinityIsLoading: action.state});

        default:
            return state;
    }

};