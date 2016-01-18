/**
 * Created by kot on 16.01.16.
 */

'use strict';

var assert = require('assert');

import User from '../../../src/models/User';
import * as actions from '../../../src/components/community/actions';


describe('User model', function() {
    describe('test getFioOrUserOrId method', function () {

        it('should test correct fio', function () {
            const user = new User({first_name:"first", last_name: 'last'});
            assert.equal("first last", user.getFioOrUsernameOrId())
        });

        it('should return first name', function () {
            const user = new User({first_name:"first"});
            assert.equal("first", user.getFioOrUsernameOrId())
        });

        it('should return username', function () {
            const user = new User({username:"uname"});
            assert.equal("uname", user.getFioOrUsernameOrId())
        });

        it('should return id', function () {
            const user = new User({id:5});
            assert.equal("5", user.getFioOrUsernameOrId())
        });

    });

});