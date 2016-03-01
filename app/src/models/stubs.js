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
        url: "/community/5",
        rules: "community rules",
        categories: [
            { id: 1, name: 'community category 1' }
        ],
        //is_in_community: false,
        isInCommunity: function () { return _this.is_in_community; },
        user_group_id: 0,
        description: "community description full",
        short_description: "community description"
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
        source_link: "source_link",
        url: "/content/5",
        image: "/static/image",
        editor_title: "editor title",
        comments_count: 5
    };
};
exports.createUser = function () {
    return {
        fio_or_username_or_id: "username",
        url: "/user/5",
        is_online: true,
        getFioOrUsernameOrId: function () { return "username"; },
        getUrl: function () { return "/user/5"; },
        isOnline: function () { return true; },
        avatar: { '50x50': 'http://new.maxpark.com/static/u/photo/4297852211/s.jpg' }
    };
};
//# sourceMappingURL=stubs.js.map