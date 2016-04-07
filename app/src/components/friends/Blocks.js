var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var FriendBlock = (function (_super) {
    __extends(FriendBlock, _super);
    function FriendBlock() {
        _super.apply(this, arguments);
    }
    FriendBlock.prototype.removeFriend = function (e) {
        e.preventDefault();
        var _a = this.props, friend = _a.friend, reload = _a.reload;
        $.ajax('/api/v1/user/remove_friend', {
            type: 'POST',
            data: {
                user_id: friend.user.id
            }
        }).then(function () {
            reload();
        }.bind(this));
    };
    FriendBlock.prototype.isViewMyself = function () {
        var viewed_user_id = parseInt(this.props.params.id);
        return viewed_user_id == request.user.id;
    };
    FriendBlock.prototype.render = function () {
        var _a = this.props, friend = _a.friend, reload = _a.reload;
        var user = friend.user;
        return (React.createElement("div", {"className": "fr-div"}, React.createElement("div", {"className": "fr-img"}, React.createElement("img", {"alt": user.fio_or_username_or_id, "src": user.avatar['180x180']})), React.createElement("div", {"className": "fr-cont"}, React.createElement("div", {"className": "fr-name"}, React.createElement("a", {"href": user.url}, user.fio_or_username_or_id), user.is_online ? React.createElement("span", null, " Online") : ''), React.createElement("div", {"className": "fr-inf"}, React.createElement("a", {"href": '/user/' + user.id + '/friends'}, friend.friends_count, " ", friend.friends_count_text_plural)), React.createElement("div", {"className": "fr-btns"}, React.createElement("a", {"href": '/user/' + user.id + '/messages/', "className": "mess-link"}, "Написать сообщение"), React.createElement("br", null), this.isViewMyself() ?
            React.createElement("a", {"id": "friend-remove", "href": "", "className": "remove-link", "onClick": this.removeFriend.bind(this)}, "Удалить из друзей") : ''))));
    };
    return FriendBlock;
})(React.Component);
exports.FriendBlock = FriendBlock;
var EnemyBlock = (function (_super) {
    __extends(EnemyBlock, _super);
    function EnemyBlock() {
        _super.apply(this, arguments);
    }
    EnemyBlock.prototype.removeEnemy = function (e) {
        e.preventDefault();
        var _a = this.props, friend = _a.friend, reload = _a.reload;
        $.ajax('/api/v1/user/remove_enemy', {
            type: 'POST',
            data: {
                user_id: friend.user.id
            }
        }).then(function () {
            reload();
        }.bind(this));
    };
    EnemyBlock.prototype.isViewMyself = function () {
        var viewed_user_id = parseInt(this.props.params.id);
        return viewed_user_id == request.user.id;
    };
    EnemyBlock.prototype.render = function () {
        var _a = this.props, friend = _a.friend, reload = _a.reload;
        var user = friend.user;
        return (React.createElement("div", {"className": "fr-div"}, React.createElement("div", {"className": "fr-img"}, React.createElement("img", {"alt": user.fio_or_username_or_id, "src": user.avatar['180x180']})), React.createElement("div", {"className": "fr-cont"}, React.createElement("div", {"className": "fr-name"}, React.createElement("a", {"href": user.url}, user.fio_or_username_or_id), user.is_online ? React.createElement("span", null, " Online") : ''), React.createElement("div", {"className": "fr-inf"}, React.createElement("a", {"href": '/user/' + user.id + '/friends'}, friend.friends_count, " ", friend.friends_count_text_plural)), React.createElement("div", {"className": "fr-btns"}, React.createElement("a", {"href": '/user/' + user.id + '/messages/', "className": "mess-link"}, "Написать сообщение"), React.createElement("br", null), this.isViewMyself() ?
            React.createElement("a", {"id": "friend-remove", "href": "", "className": "remove-link", "onClick": this.removeEnemy.bind(this)}, "Удалить из противников")
            : ''))));
    };
    return EnemyBlock;
})(React.Component);
exports.EnemyBlock = EnemyBlock;
var RequestBlock = (function (_super) {
    __extends(RequestBlock, _super);
    function RequestBlock() {
        _super.apply(this, arguments);
    }
    RequestBlock.prototype.addFriend = function (e) {
        e.preventDefault();
        var _a = this.props, friend = _a.friend, reload = _a.reload;
        $.ajax('/api/v1/user/add_friend', {
            type: 'POST',
            data: {
                user_id: friend.user.id
            }
        }).then(function () {
            reload();
        }.bind(this));
    };
    RequestBlock.prototype.removeRequest = function (e) {
        e.preventDefault();
        var _a = this.props, friend = _a.friend, reload = _a.reload;
        $.ajax('/api/v1/user/remove_friend_request', {
            type: 'POST',
            data: {
                user_id: friend.user.id
            }
        }).then(function () {
            reload();
        }.bind(this));
    };
    RequestBlock.prototype.isViewMyself = function () {
        var viewed_user_id = parseInt(this.props.params.id);
        return viewed_user_id == request.user.id;
    };
    RequestBlock.prototype.render = function () {
        var _a = this.props, friend = _a.friend, reload = _a.reload;
        var user = friend.user;
        return (React.createElement("div", {"className": "fr-div"}, React.createElement("div", {"className": "fr-img"}, React.createElement("img", {"alt": user.fio_or_username_or_id, "src": user.avatar['180x180']})), React.createElement("div", {"className": "fr-cont"}, React.createElement("div", {"className": "fr-name"}, React.createElement("a", {"href": user.url}, user.fio_or_username_or_id), user.is_online ? React.createElement("span", null, " Online") : ''), React.createElement("div", {"className": "fr-inf"}, React.createElement("a", {"href": '/user/' + user.id + '/friends'}, friend.friends_count, " ", friend.friends_count_text_plural)), friend.message ?
            React.createElement("div", {"className": "message-text"}, React.createElement("div", {"className": "message-text-title"}, "Cообщение:"), friend.message) : '', this.isViewMyself() ?
            React.createElement("div", {"className": "fr-btns fr-btns2"}, React.createElement("a", {"href": "", "className": "add-fr-link", "onClick": this.addFriend.bind(this)}, "Добавить в друзья"), React.createElement("a", {"href": "", "className": "remove-link", "onClick": this.removeRequest.bind(this)}, "Отклонить заявку"))
            : '')));
    };
    return RequestBlock;
})(React.Component);
exports.RequestBlock = RequestBlock;
var RequestMyBlock = (function (_super) {
    __extends(RequestMyBlock, _super);
    function RequestMyBlock() {
        _super.apply(this, arguments);
    }
    RequestMyBlock.prototype.removeRequest = function (e) {
        e.preventDefault();
        var _a = this.props, friend = _a.friend, reload = _a.reload;
        $.ajax('/api/v1/user/remove_friend_request', {
            type: 'POST',
            data: {
                user_id: friend.user.id
            }
        }).then(function () {
            reload();
        }.bind(this));
    };
    RequestMyBlock.prototype.isViewMyself = function () {
        var viewed_user_id = parseInt(this.props.params.id);
        return viewed_user_id == request.user.id;
    };
    RequestMyBlock.prototype.render = function () {
        var _a = this.props, friend = _a.friend, reload = _a.reload;
        var user = friend.user;
        return (React.createElement("div", {"className": "fr-div"}, React.createElement("div", {"className": "fr-img"}, React.createElement("img", {"alt": user.fio_or_username_or_id, "src": user.avatar['180x180']})), React.createElement("div", {"className": "fr-cont"}, React.createElement("div", {"className": "fr-name"}, React.createElement("a", {"href": user.url}, user.fio_or_username_or_id), user.is_online ? React.createElement("span", null, " Online") : ''), React.createElement("div", {"className": "fr-inf"}, React.createElement("a", {"href": '/user/' + user.id + '/friends'}, friend.friends_count, " ", friend.friends_count_text_plural)), this.isViewMyself() ?
            React.createElement("div", {"className": "fr-btns fr-btns2"}, React.createElement("a", {"href": "", "className": "remove-link", "onClick": this.removeRequest.bind(this)}, "Удалить заявку"))
            : '')));
    };
    return RequestMyBlock;
})(React.Component);
exports.RequestMyBlock = RequestMyBlock;
var BlacklistBlock = (function (_super) {
    __extends(BlacklistBlock, _super);
    function BlacklistBlock() {
        _super.apply(this, arguments);
    }
    BlacklistBlock.prototype.removeFromBlacklist = function (e) {
        e.preventDefault();
        var _a = this.props, friend = _a.friend, reload = _a.reload;
        $.ajax('/api/v1/user/remove_from_blacklist', {
            type: 'POST',
            data: {
                user_id: friend.user.id
            }
        }).then(function () {
            reload();
        }.bind(this));
    };
    BlacklistBlock.prototype.isViewMyself = function () {
        var viewed_user_id = parseInt(this.props.params.id);
        return viewed_user_id == request.user.id;
    };
    BlacklistBlock.prototype.render = function () {
        var _a = this.props, friend = _a.friend, reload = _a.reload;
        var user = friend.user;
        return (React.createElement("div", {"className": "fr-div"}, React.createElement("div", {"className": "fr-img"}, React.createElement("img", {"alt": user.fio_or_username_or_id, "src": user.avatar['180x180']})), React.createElement("div", {"className": "fr-cont"}, React.createElement("div", {"className": "fr-name"}, React.createElement("a", {"href": user.url}, user.fio_or_username_or_id), user.is_online ? React.createElement("span", null, " Online") : ''), React.createElement("div", {"className": "fr-inf"}, React.createElement("a", {"href": '/user/' + user.id + '/friends'}, friend.friends_count, " ", friend.friends_count_text_plural)), this.isViewMyself() ?
            React.createElement("div", {"className": "fr-btns fr-btns2"}, React.createElement("a", {"href": "", "className": "remove-link", "onClick": this.removeFromBlacklist.bind(this)}, "Удалить из черного списка"))
            : '')));
    };
    return BlacklistBlock;
})(React.Component);
exports.BlacklistBlock = BlacklistBlock;
//# sourceMappingURL=Blocks.js.map