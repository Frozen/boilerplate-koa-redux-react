'use strict';

//require('babel-core/register');

var assert = require('assert');

import {reducer} from '../../../src/components/community/reducers';
import * as actions from '../../../src/components/community/actions';


//var x = require('../../src/reducers');

//const X = 1;
//
//class A {
//
//}

//import


//const x = (a) => {
//    console.log(a);
//};


//describe('UsersTable', function() {
//    describe('update_user', function () {
//
//        const state = {users: [{id: 1, name: "kot", active: true}]};
//
//        it('should set user active to false', function () {
//
//            const result = {users: [{id: 1, name: "kot", active: false}]};
//
//            let updated = usersReducer(state, {type: 'UPDATE_USER', user: {id: 1, active: false}});
//
//            assert.deepEqual(result, updated)
//
//        });
//    });
//
//});

describe('Community', function() {
    describe('test reducers', function () {

        it('should test setting tab', function () {
            const state = {currentTab: ""};
            const result = {currentTab: "/users"};
            const updated = reducer(state, actions.setTab("/users"));
            assert.deepEqual(result, updated)

        });

        it('should test setting subtab', function () {
            const state = {currentSubTab: ""};
            const result = {currentSubTab: "/article"};
            const updated = reducer(state, actions.setSubTab("/article"));
            assert.deepEqual(result, updated)

        });

        it('should set community object when set community', () => {
            const state = {community: null};
            const result = {community: {id: 1}};
            const updated = reducer(state, actions.setCommunity({id: 1}));
            assert.deepEqual(result, updated);
            assert(1, updated.community.getId());

        });

        it('should set content loading', () => {
            const state = {infinityIsLoading: false};
            const result = {infinityIsLoading: true};
            const updated = reducer(state, actions.setContentLoadingState(true));
            assert.deepEqual(result, updated);

            const updated2 = reducer(updated, actions.setContentLoadingState(false));
            assert.deepEqual({infinityIsLoading: false}, updated2)


        })

    });

});



//./node_modules/mocha/bin/mocha --compilers js:babel-core/register --watch --recursive  js/tests
//./node_modules/mocha/bin/mocha --compilers js:babel-core/register --watch --recursive  js/tests