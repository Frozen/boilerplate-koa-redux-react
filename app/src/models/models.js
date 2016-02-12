var User = (function () {
    function User() {
    }
    User.prototype.getFioOrUsernameOrId = function () {
        return this.fio_or_username_or_id;
    };
    User.prototype.isOnline = function () {
        return this.is_online;
    };
    User.prototype.getUrl = function () {
        return this.url;
    };
    return User;
})();
exports.User = User;
var Content = (function () {
    function Content() {
    }
    Content.prototype.getUrl = function () {
        return this.url;
    };
    Content.prototype.getEditorTitle = function () {
        return this.editor_title || this.title;
    };
    return Content;
})();
exports.Content = Content;
var Community = (function () {
    function Community() {
    }
    Community.prototype.isInCommunity = function () {
        return this.is_in_community;
    };
    ;
    Community.prototype.getUrl = function () {
        return this.url;
    };
    Community.prototype.getId = function () {
        return this.id;
    };
    Community.prototype.getGroup = function () {
        return this.user_group;
    };
    return Community;
})();
exports.Community = Community;
var Rating = (function () {
    function Rating() {
        var _this = this;
        this.getVotesFor = function () { return _this.votes_for; };
        this.getVotesAgainst = function () { return _this.votes_against; };
    }
    return Rating;
})();
exports.Rating = Rating;
function mapContent(data) {
    var user = Object.assign(new User(), data.user);
    var rating = Object.assign(new Rating(), data.rating);
    var community = Object.assign(new Community(), data.community);
    return Object.assign(new Content(), data, { user: user, rating: rating, community: community });
}
exports.mapContent = mapContent;
//# sourceMappingURL=models.js.map