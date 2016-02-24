var _ = require('lodash');
function trimSlash(s) {
    if (!_.isString(s)) {
        throw new Error("require string");
    }
    return s.replace(/\//, "");
}
exports.trimSlash = trimSlash;
function loadCommunityUsers(communityId, type, page, query) {
    return fetch('/rest/community/' + communityId + "/user?type=" + type + "&page=" + page + "&query=" + query, {
        credentials: 'same-origin'
    }).
        then(function (r) {
        return r.json();
    }).then(function (data) {
        return data;
    });
}
exports.loadCommunityUsers = loadCommunityUsers;
//# sourceMappingURL=helpers.js.map