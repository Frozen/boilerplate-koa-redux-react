exports.createRating = function () {
    return {
        rating: 0,
        votesFor: 0,
        votesAgainst: 0
    };
};
exports.createCommunity = function (name) {
    if (name === void 0) { name = 'community name'; }
    return {
        id: 5,
        avatar: {},
        name: name,
        getUrl: function () {
            return "/community/5";
        },
        rules: "community rules",
        categories: [
            { id: 1, name: 'community category 1' }
        ]
    };
};
exports.createContent = function (type) {
    if (type === void 0) { type = 'article'; }
    return {
        type: type,
        community: exports.createCommunity(),
        user: exports.createUser(),
        rating: exports.createRating(),
        getEditorTitle: function () { return 'editor title'; },
        text: "bla bla text",
        getUrl: function () {
            return "/content/5";
        }
    };
};
exports.createUser = function () {
    return {
        getFioOrUsernameOrId: function () { return "username"; },
        getUrl: function () { return "/user/5"; },
        isOnline: function () { return true; }
    };
};
//# sourceMappingURL=stubs.js.map