// import React from 'react';
//import ReactDOM from 'react-dom';
//// import App from './components/App';
//import {Community} from './components/community/Community.jsx';
//
//
//function main() {
//  // const app = document.createElement('div');
//
//    var content = document.getElementById("Content");
//
//    ReactDOM.render(<Community />, content);
//
//  //
//  // document.body.appendChild(app);
//
//  // ReactDOM.render(<App />, app);
//}
//
//main();


import React from 'react';
import {reducer as formReducer, reduxForm} from 'redux-form';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import * as communityReducers from './reducers/community';
import thunk from 'redux-thunk';
//import { syncHistory, routeReducer } from 'redux-simple-router';
//import { createHistory } from 'history';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route, IndexRoute } from 'react-router';
//import fetch from 'whatwg-fetch';
//var fetch = require('whatwg-fetch');
import {syncHistory, syncReduxAndRouter, routeReducer, push} from 'redux-simple-router';
import Community from './components/community/Community';
import TestBlock from './components/community/TestBlock';
import CommunityContentPane from './components/community/blocks/panes/CommunityContentPane';
import CommunityMembersPane from './components/community/blocks/panes/CommunityMembersPane';
import CommunityRulesPane from './components/community/blocks/panes/CommunityRulesPane';
import CommunitySettingsPane from './components/community/blocks/panes/CommunitySettingsPane';
import CommunityAlbumsPane from './components/community/blocks/panes/CommunityAlbumsPane';

import * as communityActions from './actions/community';
import * as models from './models/models'

import * as stubs from './models/stubs';



//
import {reducer as tabReducer} from './components/community/blocks/tabreducer';
//


const COMMUNITY = 'community';

console.log("communityActions", communityActions);

console.log("reducers----", tabReducer);

var reducers = {
    // ... your other reducers here ...
    //COMMUNITY: communityReducer,
    routing: routeReducer,
    form: formReducer,     // <---- Mounted at 'form'. See note below.
    community: combineReducers({
        community: communityReducers.community,
        //contentPane: combineReducers(tabReducer),
        panes: combineReducers({
            content: communityReducers.contentPane,
            members: communityReducers.membersPane,
            settings: communityReducers.settingsPane
        })
        //tabs: combineReducers({}),
        //currentTab: combineReducers({}),
        //currentSubTab: combineReducers({}),
        //infinityIsLoading: combineReducers({})

    })
};

//reducers[COMMUNITY] = communityReducer;


//console.log("push", push);

//const history = createHistory();
const history = createBrowserHistory();

const reduxRouterMiddleware = syncHistory(history);

const reducer = combineReducers(reducers);
//let store = createStore(reducer);

let store =  applyMiddleware(thunk, reduxRouterMiddleware)(createStore)(reducer, {
    //table: {users: []}

    community: {
        community: null,
        //tabs: [
        //    ["/wall", 'Стена'],
        //    ["/rules", 'Правила'],
        //    ["/members", 'Участники'],
        //    ["/albums", 'Альбомы'],
        //    ["/settings", 'Настройки']
        //],
        //currentTab: "/wall",

        panes: {
            "members": {
                "subTabs": [
                    ["/all", "Все"],
                    ["/admin", "Руководство"],
                    ["/friend", "Друзья"],
                    ["/waiting", "Заявки"],
                    ["/blacklist", "Черный список"],
                    ["/name", "По алфавиту"],
                    ["/activity", "По активности"]
                ]
            },
            "content": {
                "subTabs": [
                    ["", "Всё"],
                    ["/article", "Статьи"],
                    ["/note", "Заметки"],
                    ["/photo", "Фото"],
                    ["/video", "Видео"],
                    ["/poll", "Опросы"],
                    ["/bookmark", "Закладки"],
                    ["/action", "Действия"]
                ],
                "infinityIsLoading": false,
                content: {
                    "all": [stubs.createContent(), stubs.createContent(), stubs.createContent()],
                    "article": [],
                    "note": [],
                    "photo": [],
                    "video": [],
                    "poll": [],
                    "bookmark": [],
                    "action": []
                }
            },
            "settings": {
                //form: {
                //    "name": "bla bla ojojo community 1"
                //}
            }
        }

        //contentPane: {
        //    "subTabs": [
        //        ["", "Всё"],
        //        ["/article", "Статьи"],
        //        ["/note", "Заметки"],
        //        ["/photo", "Фото"],
        //        ["/video", "Видео"],
        //        ["/poll", "Опросы"],
        //        ["/bookmark", "Закладки"],
        //        ["/action", "Действия"]
        //    ]
        //},
        //
        //subTabs: {
        //    "/wall": [
        //        ["", "Всё"],
        //        ["/article", "Статьи"],
        //        ["/note", "Заметки"],
        //        ["/photo", "Фото"],
        //        ["/video", "Видео"],
        //        ["/poll", "Опросы"],
        //        ["/bookmark", "Закладки"],
        //        ["/action", "Действия"]
        //    ],
        //
        //
        //},
        //currentSubTab: "",
        //content: {
        //    "all": [stubs.createContent(), stubs.createContent(), stubs.createContent()],
        //    "article": [],
        //    "note": [],
        //    "photo": [],
        //    "video": [],
        //    "poll": [],
        //    "bookmark": [],
        //    "action": []
        //},
        //infinityIsLoading: false
    }
});


//syncReduxAndRouter(history, store);

// Sync store to history
reduxRouterMiddleware.syncHistoryToStore(store);


//store.dispatch({
//    type: 'SET_USERS',
//    users:  [
//        {id: 1, name: "kot", active: true},
//        {id: 2, name: "phpconf", active: true},
//        {id: 3, name: "unit", active: false}
//    ]
//});



store.subscribe(()=> {
    console.log("subscribe store", store.getState());
});

var content = document.getElementById("Content");

const CommunityView = connect(
    ({community}) => {
        return community
    }
)(Community);


//var TestBlockView = connect(
//    (state) => {
//        console.log("aa999 state", state);
//        return state.community.panes.content;
//    }
//)(TestBlock);


//var CommunityContentPaneView = connect(
//    (state) => {
//        return state.community.panes.content;
//    }
//)(CommunityContentPane);

//var CommunitySettingsPaneView = reduxForm({
//
//    form: 'simple',
//    fields: ['name']
//
//
//})(CommunitySettingsPane);


//class MyCommunity extends React.Component{
//
//    render() {
//        return (
//            <CommunityView {...this.props}>
//                <CommunityContentPane {...this.props} />
//                <CommunityMembersPane params={this.props.params} history={this.props.history} />
//
//                <CommunitySettingsPane {...this.props} />
//            </CommunityView>
//        )
//    }
//}
//
//const MyCommunityView = connect(
//
//    ({community}) => {
//        console.log('MyCommunityView + ', community.community);
//        return community
//    }
//
//)(MyCommunity);


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/community/:id" component={Community}>
                <IndexRoute component={CommunityContentPane} />
                <Route path="rules" component={CommunityRulesPane} />
                <Route path="wall" component={CommunityContentPane} />
                <Route path="members" component={CommunityMembersPane} />
                <Route path="settings" component={CommunitySettingsPane} />
                <Route path="albums" component={CommunityAlbumsPane} />
            </Route>

        </Router>
    </Provider>, content);


//<Route path="/community/:id/:tab" component={Community} />
//<Route path="/community/:id/:tab/:subtab" component={Community} />