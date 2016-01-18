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
import {reducer as formReducer} from 'redux-form';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reduxForm} from 'redux-form';
import * as ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import {reducer as communityReducer} from './components/community/reducers';
import thunk from 'redux-thunk';
//import { syncHistory, routeReducer } from 'redux-simple-router';
//import { createHistory } from 'history';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route } from 'react-router'
//import fetch from 'whatwg-fetch';
//var fetch = require('whatwg-fetch');
import {syncHistory, syncReduxAndRouter, routeReducer, push} from 'redux-simple-router';
import {Community} from './components/community/Community'

import * as communityActions from './components/community/actions'
import * as models from './models/models'


const COMMUNITY = 'community';

console.log("communityActions", communityActions);

var reducers = {
    // ... your other reducers here ...
    //COMMUNITY: communityReducer,
    routing: routeReducer,
    form: formReducer,     // <---- Mounted at 'form'. See note below.
    //community: combineReducers({
    //    community: communityReducer,
    //    tabs: tabsReducer,
    //})
};

reducers[COMMUNITY] = communityReducer;


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
        tabs: [
            ["/wall", 'Стена'],
            ["/rules", 'Правила'],
            ["/members", 'Участники'],
            ["/albums", 'Альбомы'],
            ["/settings", 'Настройки']
        ],
        currentTab: "/wall",
        subTabs: {
            "/wall": [
                ["", "Всё"],
                ["/article", "Статьи"],
                ["/note", "Заметки"],
                ["/photo", "Фото"],
                ["/video", "Видео"],
                ["/poll", "Опросы"],
                ["/bookmark", "Закладки"],
                ["/action", "Действия"]
            ],
            "/members": [
                ["", "Все"],
                ["/admin", "Руководство"],
                ["/friend", "Друзья"],
                ["/waiting", "Заявки"],
                ["/blacklist", "Черный список"],
                ["/name", "По алфавиту"],
                ["/activity", "По активности"]
            ]
        },
        currentSubTab: "",
        content: {
            "all": [{}, {}, {}],
            "article": [],
            "note": [],
            "photo": [],
            "video": [],
            "poll": [],
            "bookmark": [],
            "action": []
        },
        infinityIsLoading: false
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
    ({community}) => community
)(Community);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/community/:id" component={CommunityView} />
            <Route path="/community/:id/:tab" component={CommunityView} />
            <Route path="/community/:id/:tab/:subtab" component={CommunityView} />
        </Router>
    </Provider>, content);
