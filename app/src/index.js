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
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router';
//import fetch from 'whatwg-fetch';
//var fetch = require('whatwg-fetch');
import {syncHistory, syncReduxAndRouter, routeReducer, push} from 'redux-simple-router';
import Community from './components/community/Community';
import {CommunityContentPaneAll, CommunityContentPaneArticle,
    CommunityContentPaneNote, CommunityContentPanePoll,
    CommunityContentPaneVideo, CommunityContentPanePhoto} from './components/community/CommunityContentSubPanes';

import {CommunityMembersPaneAll, CommunityMembersPaneAdmin,
    CommunityMembersPaneFriends, CommunityMembersPaneWaiting,
    CommunityMembersPaneBlacklist, CommunityMembersPaneName,
    CommunityMembersPaneActivity} from './components/community/CommunityMembersSubPanes';
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



var reducers = {
    // ... your other reducers here ...
    //COMMUNITY: communityReducer,
    routing: routeReducer,
    form: formReducer,     // <---- Mounted at 'form'. See note below.
    community: combineReducers({
        community: communityReducers.community,
        //contentPane: combineReducers(tabReducer),
        //panes: combineReducers({
        //    //content: communityReducers.contentPane,
        //    //members: communityReducers.membersPane,
        //    //settings: communityReducers.settingsPane
        //})
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
        community: null
    }
});


//syncReduxAndRouter(history, store);

// Sync store to history
reduxRouterMiddleware.syncHistoryToStore(store);


store.subscribe(()=> {
    console.log("subscribe store", store.getState());
});

var content = document.getElementById("wrapper");

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/community/:id" component={Community}>

                <IndexRedirect to="wall" />
                <Route path="rules" component={CommunityRulesPane} />
                <Route path="wall" component={CommunityContentPane}>
                    <IndexRedirect to="all" />
                    <Route path="all" component={CommunityContentPaneAll} />
                    <Route path="article" component={CommunityContentPaneArticle} />
                    <Route path="note" component={CommunityContentPaneNote} />
                    <Route path="photo" component={CommunityContentPanePhoto} />
                    <Route path="video" component={CommunityContentPaneVideo} />
                    <Route path="poll" component={CommunityContentPanePoll} />
                </Route>

                <Route path="members" component={CommunityMembersPane}>
                    <IndexRedirect to="all" />
                    <Route path="all" component={CommunityMembersPaneAll} />
                    <Route path="admin" component={CommunityMembersPaneAdmin} />
                    <Route path="friends" component={CommunityMembersPaneFriends} />
                    <Route path="waiting" component={CommunityMembersPaneWaiting} />
                    <Route path="blacklist" component={CommunityMembersPaneBlacklist} />
                    <Route path="name" component={CommunityMembersPaneName} />
                    <Route path="activity" component={CommunityMembersPaneActivity} />
                </Route>


                <Route path="members(/:subtab)" component={CommunityMembersPane} />
                <Route path="settings" component={CommunitySettingsPane} />
                <Route path="albums" component={CommunityAlbumsPane} />
            </Route>
        </Router>
    </Provider>, content);


//<Route path="/community/:id/:tab" component={Community} />
//<Route path="/community/:id/:tab/:subtab" component={Community} />