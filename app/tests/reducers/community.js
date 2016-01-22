'use strict';

//require('babel-core/register');

var assert = require('assert');

import {community, contentPane, settingsPane} from '../../src/reducers/community';
import * as actions from '../../src/actions/community';
var _ = require('lodash');
import * as models from '../../src/models/models';
import * as stubs from '../../src/models/stubs';


describe('Community', function() {
    describe('test reducers', function () {

        it('should test setting tab', function () {
            const state = {currentTab: ""};
            const result = {currentTab: "/users"};
            const updated = community(state, actions.setTab("/users"));
            assert.deepEqual(result, updated)

        });

        it('should test setting subtab', function () {
            const state = {currentSubTab: ""};
            const result = {currentSubTab: "/article"};
            const updated = community(state, actions.setSubTab("/article"));
            assert.deepEqual(result, updated)

        });

        it('should set community object when set community', () => {
            const state = {};
            const result = {id: 1};
            const updated = community(state, actions.setCommunity({id: 1}));
            assert.deepEqual(result, updated);
            assert.equal(undefined, updated.getId);
        });





    });

});

describe('Community content pane', function() {
    describe('test reducers', function () {

        it('should test multiple content add', function () {
            const state = {content: {article: []}};
            const _stubs = [stubs.createContent(), stubs.createContent()];

            const result = {content: {article: _stubs}};
            const updated = contentPane(state, actions.addContents(_stubs, 'article'));
            assert.deepEqual(result, updated)

        });

        it('should set state "content loading"', () => {
            const state = {infinityIsLoading: false};
            const result = {infinityIsLoading: true};
            const updated = contentPane(state, actions.setContentLoadingState(true));
            assert.deepEqual(result, updated);

            const updated2 = contentPane(updated, actions.setContentLoadingState(false));
            assert.deepEqual({infinityIsLoading: false}, updated2)

        });

    });

});


describe('Community settings pane', function() {
    describe('test reducers', function () {

        it('should set form value', function () {
            const state = {form: {name: ""}};
            const result = {form: {name: "community 1"}};
            const updated = settingsPane(state, actions.setFormValue("name", "community 1"));
            assert.deepEqual(result, updated)

        });



    });

});



//./node_modules/mocha/bin/mocha --compilers js:babel-core/register --watch --recursive  js/tests
//./node_modules/mocha/bin/mocha --compilers js:babel-core/register --watch --recursive  js/tests