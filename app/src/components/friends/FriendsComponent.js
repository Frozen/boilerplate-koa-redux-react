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
var InfiniteScrolling_1 = require('../common/InfiniteScrolling');
var react_redux_1 = require('react-redux');
var helpers_1 = require('../../helpers/helpers');
var react_router_1 = require('react-router');
var Blocks_1 = require('./Blocks');
var classNames = require('classnames');
var FriendsComponent = (function (_super) {
    __extends(FriendsComponent, _super);
    function FriendsComponent() {
        _super.apply(this, arguments);
    }
    FriendsComponent.prototype.makeUrl = function (path) {
        var params = this.props.params;
        if (path == '') {
            return "/user/" + params.id + "/friends";
        }
        return "/user/" + params.id + "/friends/" + path;
    };
    FriendsComponent.prototype.getCurrentTab = function () {
        var location = this.props.location;
        var path = location.pathname;
        var curpath = path.split("/")[4];
        if (curpath) {
            return curpath;
        }
        else {
            return '';
        }
    };
    FriendsComponent.prototype.render = function () {
        var params = this.props.params;
        var viewed_user_id = parseInt(params.id);
        return (React.createElement("div", {"className": "wall-tabs blue-block apps-wall"}, React.createElement("div", {"className": "wall-title"}, React.createElement("h1", null, "Общение в Newsland")), React.createElement("div", {"className": "panes"}, React.createElement("div", null, React.createElement("div", {"className": "pane"}, React.createElement("ul", {"className": "wall-filter"}, React.createElement("li", null, React.createElement(react_router_1.Link, {"to": this.makeUrl(''), "className": classNames({ current: this.getCurrentTab() == '' })}, "Друзья")), React.createElement("li", null, React.createElement(react_router_1.Link, {"to": this.makeUrl('online'), "className": classNames({ current: this.getCurrentTab() == 'online' })}, "Друзья онлайн")), React.createElement("li", null, React.createElement(react_router_1.Link, {"to": this.makeUrl('enemies'), "className": classNames({ current: this.getCurrentTab() == 'enemies' })}, "Противники")), request.user.id == viewed_user_id ?
            React.createElement("li", null, React.createElement(react_router_1.Link, {"to": this.makeUrl('requests'), "className": classNames({ current: this.getCurrentTab() == 'requests' })}, "Заявки на дружбу")) : '', request.user.id == viewed_user_id ?
            React.createElement("li", null, React.createElement(react_router_1.Link, {"to": this.makeUrl('requests-my'), "className": classNames({ current: this.getCurrentTab() == 'requests-my' })}, "Мои заявки")) : '', React.createElement("li", null, React.createElement(react_router_1.Link, {"to": this.makeUrl('blacklist'), "className": classNames({ current: this.getCurrentTab() == 'blacklist' })}, "Черный список"))), this.props.children)))));
    };
    FriendsComponent = __decorate([
        react_redux_1.connect()
    ], FriendsComponent);
    return FriendsComponent;
})(React.Component);
exports.FriendsComponent = FriendsComponent;
var FriendsPaneBase = (function (_super) {
    __extends(FriendsPaneBase, _super);
    function FriendsPaneBase() {
        _super.apply(this, arguments);
        this.state = {
            users: [],
            search: ''
        };
        this.loader = null;
        this.loading = false;
    }
    FriendsPaneBase.prototype.componentDidMount = function () {
        var params = this.props.params;
        this.loader = new helpers_1.Loader('/api/v1/user/' + params.id + '/friend_list');
        this.loadMore();
    };
    FriendsPaneBase.prototype.componentWillUnmount = function () {
        this.loader = null;
    };
    FriendsPaneBase.prototype.reset = function () {
        this.loader.reset();
        this.setState({
            users: []
        });
    };
    FriendsPaneBase.prototype.loadMore = function () {
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.loader.next({ query: this.refs.search.value }).then(function (rs) {
            if (this.loader === null) {
                return;
            }
            var users = this.state.users;
            rs.results.map(function (user) {
                users.push(user);
            });
            this.setState({
                users: users
            });
            this.loading = false;
        }.bind(this));
    };
    FriendsPaneBase.prototype.handleSearch = function () {
        this.reset();
        this.setState({
            search: this.refs.search.value
        });
        this.loadMore();
    };
    return FriendsPaneBase;
})(React.Component);
exports.FriendsPaneBase = FriendsPaneBase;
var FriendsPaneFriends = (function (_super) {
    __extends(FriendsPaneFriends, _super);
    function FriendsPaneFriends() {
        _super.apply(this, arguments);
    }
    FriendsPaneFriends.prototype.reload = function () {
        this.reset();
        this.loadMore();
    };
    FriendsPaneFriends.prototype.render = function () {
        return (React.createElement("div", null, React.createElement("div", {"className": "fr-search"}, React.createElement("input", {"type": "text", "placeholder": "Поиск знакомых", "className": "fr-search-txt", "value": this.state.search, "ref": "search", "onChange": this.handleSearch.bind(this)}), React.createElement("input", {"type": "submit", "className": "fr-search-btn", "value": ""})), React.createElement("div", {"className": "wall-panes"}, React.createElement("div", {"className": "userAc"}, React.createElement("div", {"className": "friends"}, this.state.users.map(function (friend, index) {
            return React.createElement(Blocks_1.FriendBlock, {"friend": friend, "key": index, "reload": this.reload.bind(this), "params": this.props.params});
        }.bind(this)), React.createElement(InfiniteScrolling_1.default, {"infiniteLoadMore": this.loadMore.bind(this), "isActive": function () { return true; }, "pause": function () { return false; }}))))));
    };
    FriendsPaneFriends = __decorate([
        react_redux_1.connect()
    ], FriendsPaneFriends);
    return FriendsPaneFriends;
})(FriendsPaneBase);
exports.FriendsPaneFriends = FriendsPaneFriends;
var FriendsPaneOnline = (function (_super) {
    __extends(FriendsPaneOnline, _super);
    function FriendsPaneOnline() {
        _super.apply(this, arguments);
    }
    FriendsPaneOnline.prototype.reload = function () {
        this.reset();
        this.loadMore();
    };
    FriendsPaneOnline.prototype.componentDidMount = function () {
        var params = this.props.params;
        this.loader = new helpers_1.Loader('/api/v1/user/' + params.id + '/online_friend_list');
        this.loadMore();
    };
    FriendsPaneOnline.prototype.render = function () {
        return (React.createElement("div", null, React.createElement("div", {"className": "fr-search"}, React.createElement("input", {"type": "text", "placeholder": "Поиск знакомых", "className": "fr-search-txt", "value": this.state.search, "ref": "search", "onChange": this.handleSearch.bind(this)}), React.createElement("input", {"type": "submit", "className": "fr-search-btn", "value": ""})), React.createElement("div", {"className": "wall-panes"}, React.createElement("div", {"className": "userAc"}, React.createElement("div", {"className": "friends"}, this.state.users.map(function (friend, index) {
            return React.createElement(Blocks_1.FriendBlock, {"friend": friend, "key": index, "reload": this.reload.bind(this), "params": this.props.params});
        }.bind(this)), React.createElement(InfiniteScrolling_1.default, {"infiniteLoadMore": this.loadMore.bind(this), "isActive": function () { return true; }, "pause": function () { return false; }}))))));
    };
    FriendsPaneOnline = __decorate([
        react_redux_1.connect()
    ], FriendsPaneOnline);
    return FriendsPaneOnline;
})(FriendsPaneBase);
exports.FriendsPaneOnline = FriendsPaneOnline;
var FriendsPaneEnemies = (function (_super) {
    __extends(FriendsPaneEnemies, _super);
    function FriendsPaneEnemies() {
        _super.apply(this, arguments);
    }
    FriendsPaneEnemies.prototype.reload = function () {
        this.reset();
        this.loadMore();
    };
    FriendsPaneEnemies.prototype.componentDidMount = function () {
        var params = this.props.params;
        this.loader = new helpers_1.Loader('/api/v1/user/' + params.id + '/enemies_list');
        this.loadMore();
    };
    FriendsPaneEnemies.prototype.render = function () {
        return (React.createElement("div", null, React.createElement("div", {"className": "fr-search"}, React.createElement("input", {"type": "text", "placeholder": "Поиск знакомых", "className": "fr-search-txt", "value": this.state.search, "ref": "search", "onChange": this.handleSearch.bind(this)}), React.createElement("input", {"type": "submit", "className": "fr-search-btn", "value": ""})), React.createElement("div", {"className": "wall-panes"}, React.createElement("div", {"className": "userAc"}, React.createElement("div", {"className": "friends"}, this.state.users.map(function (friend, index) {
            return React.createElement(Blocks_1.EnemyBlock, {"friend": friend, "key": index, "reload": this.reload.bind(this), "params": this.props.params});
        }.bind(this)), React.createElement(InfiniteScrolling_1.default, {"infiniteLoadMore": this.loadMore.bind(this), "isActive": function () { return true; }, "pause": function () { return false; }}))))));
    };
    FriendsPaneEnemies = __decorate([
        react_redux_1.connect()
    ], FriendsPaneEnemies);
    return FriendsPaneEnemies;
})(FriendsPaneBase);
exports.FriendsPaneEnemies = FriendsPaneEnemies;
var FriendsPaneRequests = (function (_super) {
    __extends(FriendsPaneRequests, _super);
    function FriendsPaneRequests() {
        _super.apply(this, arguments);
    }
    FriendsPaneRequests.prototype.reload = function () {
        this.reset();
        this.loadMore();
    };
    FriendsPaneRequests.prototype.componentDidMount = function () {
        var params = this.props.params;
        this.loader = new helpers_1.Loader('/api/v1/user/' + params.id + '/friend_requests_list');
        this.loadMore();
    };
    FriendsPaneRequests.prototype.render = function () {
        // const {friend} = this.props;
        return (React.createElement("div", null, React.createElement("div", {"className": "fr-search"}, React.createElement("input", {"type": "text", "placeholder": "Поиск знакомых", "className": "fr-search-txt", "value": this.state.search, "ref": "search", "onChange": this.handleSearch.bind(this)}), React.createElement("input", {"type": "submit", "className": "fr-search-btn", "value": ""})), React.createElement("div", {"className": "wall-panes"}, React.createElement("div", {"className": "userAc"}, React.createElement("div", {"className": "friends"}, this.state.users.map(function (friend, index) {
            return React.createElement(Blocks_1.RequestBlock, {"friend": friend, "key": index, "reload": this.reload.bind(this), "params": this.props.params});
        }.bind(this)), React.createElement(InfiniteScrolling_1.default, {"infiniteLoadMore": this.loadMore.bind(this), "isActive": function () { return true; }, "pause": function () { return false; }}))))));
    };
    FriendsPaneRequests = __decorate([
        react_redux_1.connect()
    ], FriendsPaneRequests);
    return FriendsPaneRequests;
})(FriendsPaneBase);
exports.FriendsPaneRequests = FriendsPaneRequests;
var FriendsPaneRequestsMy = (function (_super) {
    __extends(FriendsPaneRequestsMy, _super);
    function FriendsPaneRequestsMy() {
        _super.apply(this, arguments);
    }
    FriendsPaneRequestsMy.prototype.reload = function () {
        this.reset();
        this.loadMore();
    };
    FriendsPaneRequestsMy.prototype.componentDidMount = function () {
        var params = this.props.params;
        this.loader = new helpers_1.Loader('/api/v1/user/' + params.id + '/my_friend_requests_list');
        this.loadMore();
    };
    FriendsPaneRequestsMy.prototype.render = function () {
        return (React.createElement("div", null, React.createElement("div", {"className": "fr-search"}, React.createElement("input", {"type": "text", "placeholder": "Поиск знакомых", "className": "fr-search-txt", "value": this.state.search, "ref": "search", "onChange": this.handleSearch.bind(this)}), React.createElement("input", {"type": "submit", "className": "fr-search-btn", "value": ""})), React.createElement("div", {"className": "wall-panes"}, React.createElement("div", {"className": "userAc"}, React.createElement("div", {"className": "friends"}, this.state.users.map(function (friend, index) {
            return React.createElement(Blocks_1.RequestMyBlock, {"friend": friend, "key": index, "reload": this.reload.bind(this), "params": this.props.params});
        }.bind(this)), React.createElement(InfiniteScrolling_1.default, {"infiniteLoadMore": this.loadMore.bind(this), "isActive": function () { return true; }, "pause": function () { return false; }}))))));
    };
    FriendsPaneRequestsMy = __decorate([
        react_redux_1.connect()
    ], FriendsPaneRequestsMy);
    return FriendsPaneRequestsMy;
})(FriendsPaneBase);
exports.FriendsPaneRequestsMy = FriendsPaneRequestsMy;
var FriendsPaneBlacklist = (function (_super) {
    __extends(FriendsPaneBlacklist, _super);
    function FriendsPaneBlacklist() {
        _super.apply(this, arguments);
    }
    FriendsPaneBlacklist.prototype.reload = function () {
        this.reset();
        this.loadMore();
    };
    FriendsPaneBlacklist.prototype.componentDidMount = function () {
        var params = this.props.params;
        this.loader = new helpers_1.Loader('/api/v1/user/' + params.id + '/black_list');
        this.loadMore();
    };
    FriendsPaneBlacklist.prototype.render = function () {
        return (React.createElement("div", null, React.createElement("div", {"className": "fr-search"}, React.createElement("input", {"type": "text", "placeholder": "Поиск знакомых", "className": "fr-search-txt", "value": this.state.search, "ref": "search", "onChange": this.handleSearch.bind(this)}), React.createElement("input", {"type": "submit", "className": "fr-search-btn", "value": ""})), React.createElement("div", {"className": "wall-panes"}, React.createElement("div", {"className": "userAc"}, React.createElement("div", {"className": "friends"}, this.state.users.map(function (friend, index) {
            return React.createElement(Blocks_1.BlacklistBlock, {"friend": friend, "key": index, "reload": this.reload.bind(this), "params": this.props.params});
        }.bind(this)), React.createElement(InfiniteScrolling_1.default, {"infiniteLoadMore": this.loadMore.bind(this), "isActive": function () { return true; }, "pause": function () { return false; }}))))));
    };
    FriendsPaneBlacklist = __decorate([
        react_redux_1.connect()
    ], FriendsPaneBlacklist);
    return FriendsPaneBlacklist;
})(FriendsPaneBase);
exports.FriendsPaneBlacklist = FriendsPaneBlacklist;
//# sourceMappingURL=FriendsComponent.js.map