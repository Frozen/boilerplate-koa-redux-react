/**
 * Created by kot on 16.01.16.
 */

'use strict';

var assert = require('assert');

import {User} from '../../../src/models/models';
import * as actions from '../../../src/actions/community';


describe('User model', function() {
    describe('test getFioOrUserOrId method', function () {

        it('should return fio_or_username_or_id', function () {
            const user = Object.assign(new User(), {fio_or_username_or_id:"first last"});
            assert.equal("first last", user.getFioOrUsernameOrId())
        });

    });

});