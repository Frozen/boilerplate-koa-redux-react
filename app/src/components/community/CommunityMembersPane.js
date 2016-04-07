var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var SubTabs_1 = require('../common/SubTabs');
var react_redux_1 = require('react-redux');
var helpers_1 = require('../../helpers/helpers');
var constants = require('../../constants/constants');
var CommunityMembersPane = (function (_super) {
    __extends(CommunityMembersPane, _super);
    function CommunityMembersPane() {
        _super.apply(this, arguments);
    }
    CommunityMembersPane.prototype.getSubTabs = function () {
        return [["all", "Все"],
            ["admin", "Руководство"],
            ["friends", "Друзья"],
            ["waiting", "Заявки"],
            ["blacklist", "Черный список"],
            ["name", "По алфавиту"],
            ["activity", "По активности"]];
    };
    CommunityMembersPane.prototype.handleSubTabClick = function (path) {
        var _a = this.props, history = _a.history, dispatch = _a.dispatch, params = _a.params;
        history.push("/community/" + params.id + "/members/" + path);
    };
    CommunityMembersPane.prototype.render = function () {
        var _a = this.props, params = _a.params, location = _a.location, community = _a.community;
        console.log("CommunityMembersPane CommunityMembersPane ");
        return (React.createElement("div", {"className": "pane"}, React.createElement(SubTabs_1.default, {"tabs": this.getSubTabs(), "location": location, "currentTab": params.subtab || '', "handleClick": this.handleSubTabClick.bind(this), "showCallback": function (tab) {
            if (community.user_group_id == constants.COMMUNITY_GROUP_ADMIN ||
                request.user_group_id == constants.COMMUNITY_GROUP_MODERATOR) {
                return true;
            }
            if (tab == 'waiting') {
                return false;
            }
            if (tab == 'blacklist') {
                return false;
            }
            return true;
        }}), this.props.children));
    };
    CommunityMembersPane = __decorate([
        react_redux_1.connect(function (state) { return state.community; })
    ], CommunityMembersPane);
    return CommunityMembersPane;
})(React.Component);
exports.CommunityMembersPane = CommunityMembersPane;
var CommunityUser = (function (_super) {
    __extends(CommunityUser, _super);
    function CommunityUser() {
        _super.apply(this, arguments);
    }
    CommunityUser.prototype.componentWillMount = function () {
        this.setState({
            group_id: this.props.group_id,
            is_blocked: this.props.is_blocked
        });
    };
    CommunityUser.prototype.changeGroup = function (e) {
        var group_id = e.target.value;
        this.setState({
            group_id: group_id
        });
        $.ajax({
            url: '/rest/community/' + this.props.community.id + '/change_group',
            type: 'POST',
            data: {
                group: group_id,
                user: this.props.user.id
            }
        });
    };
    CommunityUser.prototype.unBun = function (e) {
        var user = this.props.user;
        e.preventDefault();
        $.ajax({
            url: '/rest/community/' + this.props.community.id + '/unban',
            type: 'POST',
            data: {
                user: user.id
            }
        });
    };
    CommunityUser.prototype.ban = function (e) {
        var user = this.props.user;
        e.preventDefault();
        $.ajax({
            url: '/rest/community/' + this.props.community.id + '/ban',
            type: 'POST',
            data: {
                user: user.id
            }
        });
    };
    CommunityUser.prototype.render = function () {
        var user = this.props.user;
        var group_id = this.state.group_id;
        var is_blocked = this.state.is_blocked;
        var community = this.props.community;
        return (React.createElement("div", {"className": "userAc"}, React.createElement("article", {"className": "ng-scope"}, React.createElement("header", null, React.createElement("a", {"href": user.url, "className": "usName"}, user.fio_or_username_or_id)), React.createElement("div", {"className": "user-edit", "style": { display: community.user_group_id == constants.COMMUNITY_GROUP_ADMIN ? 'block' : 'none' }}, React.createElement("select", {"value": group_id.toString(), "onChange": this.changeGroup.bind(this)}, React.createElement("option", {"value": "3", "label": "Участник"}, "Участник"), React.createElement("option", {"value": "2", "label": "Модератор"}, "Модератор"), React.createElement("option", {"value": "1", "label": "Администратор"}, "Администратор")), " ", !is_blocked ? React.createElement("a", {"href": "", "className": "action", "onClick": this.ban.bind(this)}, "Исключить") : '', is_blocked ? React.createElement("a", {"href": "", "className": "action", "onClick": this.unBun.bind(this)}, "Разбанить") : ''), React.createElement("div", {"className": "user-l"}, React.createElement("div", {"className": "userAva", "style": { whiteSpace: 'nowrap', overflow: 'hidden' }}, React.createElement("span", {"style": { display: 'inline-block', verticalAlign: 'middle', height: '100%' }}), React.createElement("a", {"href": user.url}, React.createElement("img", {"alt": user.fio_or_username_or_id, "style": { verticalAlign: 'middle', marginLeft: '0px' }, "src": user.avatar['50x50']}))), user.is_online ? React.createElement("span", {"className": "user-stat ng-hide"}, "Online") : ''))));
    };
    return CommunityUser;
})(React.Component);
var CommunityMembersPaneBase = (function (_super) {
    __extends(CommunityMembersPaneBase, _super);
    function CommunityMembersPaneBase() {
        _super.apply(this, arguments);
        this.state = {
            users: [],
        };
        this.isLoading = false;
        // вкладка
        this.type = null;
        this.loader = null;
    }
    CommunityMembersPaneBase.prototype.componentDidMount = function () {
        if (this.type === null) {
            throw new Error("type is null");
        }
        this.loader = new helpers_1.Loader('/rest/community/' + this.props.community.id + "/users?type=" + this.type);
        this.handleLoadMore();
    };
    CommunityMembersPaneBase.prototype.componentWillUnmount = function () {
        this.loader = null;
    };
    CommunityMembersPaneBase.prototype.handleLoadMore = function () {
        this._handleLoadMore('');
    };
    CommunityMembersPaneBase.prototype._handleLoadMore = function (query) {
        if (this.isLoading) {
            return;
        }
        this.loader.next({ query: query }).then(function (data) {
            var rows = this.state.users;
            // unmounted
            if (this.loader === null) {
                return;
            }
            this.setState({
                users: rows.concat(data.results),
            });
            this.isLoading = false;
        }.bind(this));
    };
    CommunityMembersPaneBase.prototype.reset = function () {
        this.loader.reset();
        this.setState({
            users: []
        });
    };
    CommunityMembersPaneBase.prototype.handleSearch = function (e) {
        var val = e.target.value;
        this.reset();
        this._handleLoadMore(val);
    };
    CommunityMembersPaneBase.prototype.render = function () {
        var users = this.state.users;
        var community = this.props.community;
        return (React.createElement("div", null, React.createElement("div", {"className": "fr-search"}, React.createElement("input", {"type": "text", "placeholder": "Найти участника по имени", "className": "fr-search-txt", "onChange": this.handleSearch.bind(this)}), React.createElement("input", {"type": "submit", "value": "", "className": "fr-search-btn"})), React.createElement("div", {"className": "wall-panes bord"}, users.map(function (cu, index) {
            return React.createElement(CommunityUser, React.__spread({}, cu, {"community": community, "key": index}));
        }))));
    };
    return CommunityMembersPaneBase;
})(React.Component);
var CommunityMembersPaneAll = (function (_super) {
    __extends(CommunityMembersPaneAll, _super);
    function CommunityMembersPaneAll() {
        _super.apply(this, arguments);
        this.type = 'all';
    }
    CommunityMembersPaneAll = __decorate([
        react_redux_1.connect(function (state) { return state.community; })
    ], CommunityMembersPaneAll);
    return CommunityMembersPaneAll;
})(CommunityMembersPaneBase);
exports.CommunityMembersPaneAll = CommunityMembersPaneAll;
var CommunityMembersPaneAdmin = (function (_super) {
    __extends(CommunityMembersPaneAdmin, _super);
    function CommunityMembersPaneAdmin() {
        _super.apply(this, arguments);
        this.type = 'admins';
    }
    CommunityMembersPaneAdmin = __decorate([
        react_redux_1.connect(function (state) { return state.community; })
    ], CommunityMembersPaneAdmin);
    return CommunityMembersPaneAdmin;
})(CommunityMembersPaneBase);
exports.CommunityMembersPaneAdmin = CommunityMembersPaneAdmin;
var CommunityMembersPaneFriends = (function (_super) {
    __extends(CommunityMembersPaneFriends, _super);
    function CommunityMembersPaneFriends() {
        _super.apply(this, arguments);
        this.type = 'friends';
    }
    CommunityMembersPaneFriends = __decorate([
        react_redux_1.connect(function (state) { return state.community; })
    ], CommunityMembersPaneFriends);
    return CommunityMembersPaneFriends;
})(CommunityMembersPaneBase);
exports.CommunityMembersPaneFriends = CommunityMembersPaneFriends;
var CommunityMembersPaneWaiting = (function (_super) {
    __extends(CommunityMembersPaneWaiting, _super);
    function CommunityMembersPaneWaiting() {
        _super.apply(this, arguments);
        this.type = 'waiting';
    }
    CommunityMembersPaneWaiting = __decorate([
        react_redux_1.connect(function (state) { return state.community; })
    ], CommunityMembersPaneWaiting);
    return CommunityMembersPaneWaiting;
})(CommunityMembersPaneBase);
exports.CommunityMembersPaneWaiting = CommunityMembersPaneWaiting;
var CommunityMembersPaneBlacklist = (function (_super) {
    __extends(CommunityMembersPaneBlacklist, _super);
    function CommunityMembersPaneBlacklist() {
        _super.apply(this, arguments);
        this.type = 'blacklist';
    }
    CommunityMembersPaneBlacklist = __decorate([
        react_redux_1.connect(function (state) { return state.community; })
    ], CommunityMembersPaneBlacklist);
    return CommunityMembersPaneBlacklist;
})(CommunityMembersPaneBase);
exports.CommunityMembersPaneBlacklist = CommunityMembersPaneBlacklist;
var CommunityMembersPaneName = (function (_super) {
    __extends(CommunityMembersPaneName, _super);
    function CommunityMembersPaneName() {
        _super.apply(this, arguments);
        this.type = 'name';
    }
    CommunityMembersPaneName = __decorate([
        react_redux_1.connect(function (state) { return state.community; })
    ], CommunityMembersPaneName);
    return CommunityMembersPaneName;
})(CommunityMembersPaneBase);
exports.CommunityMembersPaneName = CommunityMembersPaneName;
var CommunityMembersPaneActivity = (function (_super) {
    __extends(CommunityMembersPaneActivity, _super);
    function CommunityMembersPaneActivity() {
        _super.apply(this, arguments);
        this.type = 'activity';
    }
    CommunityMembersPaneActivity = __decorate([
        react_redux_1.connect(function (state) { return state.community; })
    ], CommunityMembersPaneActivity);
    return CommunityMembersPaneActivity;
})(CommunityMembersPaneBase);
exports.CommunityMembersPaneActivity = CommunityMembersPaneActivity;
//# sourceMappingURL=CommunityMembersPane.js.map