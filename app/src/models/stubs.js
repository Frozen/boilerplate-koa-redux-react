var _this = this;
exports.createRating = function () {
    return {
        rating: 0,
        getVotesFor: function () { return 0; },
        getVotesAgainst: function () { return 0; }
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
        ],
        //is_in_community: false,
        isInCommunity: function () { return _this.is_in_community; },
        user_group: 0,
        getGroup: function () { return _this.user_group; }
    };
};
exports.createContent = function (type) {
    if (type === void 0) { type = 'article'; }
    return {
        id: 1,
        type: type,
        community: exports.createCommunity(),
        user: exports.createUser(),
        rating: exports.createRating(),
        getEditorTitle: function () { return 'editor title'; },
        text: "bla bla text",
        getUrl: function () {
            return "/content/5";
        },
        getSourceLink: function () {
            return "source_link";
        }
    };
};
exports.createUser = function () {
    return {
        getFioOrUsernameOrId: function () { return "username"; },
        getUrl: function () { return "/user/5"; },
        isOnline: function () { return true; },
        avatar: { '50x50': 'http://new.maxpark.com/static/u/photo/4297852211/s.jpg' }
    };
};
//# sourceMappingURL=stubs.js.map