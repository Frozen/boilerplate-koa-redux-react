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
/// <reference path="../../typings/tsd.t.ts" />
var React = require('react');
var BottomTags_1 = require('../common/BottomTags');
var Loading_1 = require('../common/Loading');
var Tabs_1 = require('../common/Tabs');
var actions = require('../../actions/community');
var CommunityCategories_1 = require('./CommunityCategories');
var react_redux_1 = require('react-redux');
var CommunityAdmins_1 = require('./blocks/CommunityAdmins');
//<CommunityContentPane {...panes.content}
//    getCurrentSubTab={this.getCurrentSubTab.bind(this)}
//    getCurrentTab={this.getCurrentTab.bind(this)}
//    handleSubTabClick={this.handleSubTabClick.bind(this)}/>
var Community = (function (_super) {
    __extends(Community, _super);
    function Community() {
        _super.apply(this, arguments);
    }
    Community.prototype.componentWillMount = function () {
        var _a = this.props, params = _a.params, community = _a.community, dispatch = _a.dispatch;
        if (!community) {
            dispatch(actions.fetchCommunity(params.id));
        }
    };
    Community.prototype.render = function () {
        var community = this.props.community;
        if (community) {
            return React.createElement(InnerCommunity, React.__spread({}, this.props, {"community": community}));
        }
        else {
            return React.createElement(Loading_1.default, null);
        }
    };
    Community = __decorate([
        react_redux_1.connect(function (state) { return state.community; })
    ], Community);
    return Community;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Community;
var InnerCommunity = (function (_super) {
    __extends(InnerCommunity, _super);
    function InnerCommunity() {
        _super.apply(this, arguments);
        this.state = {
            fullDescription: false
        };
    }
    InnerCommunity.prototype.getTabs = function () {
        return [
            ["wall", 'Стена'],
            ["rules", 'Правила'],
            ["members", 'Участники'],
            ["albums", 'Альбомы'],
            ["settings", 'Настройки']
        ];
    };
    InnerCommunity.prototype.toggleFullDescription = function () {
        this.setState({
            fullDescription: !this.state.fullDescription
        });
    };
    InnerCommunity.prototype.handleTabClick = function (path) {
        var _a = this.props, history = _a.history, community = _a.community, dispatch = _a.dispatch;
        history.push("/community/" + community.id + "/" + path);
    };
    InnerCommunity.prototype.getCommunity = function () {
        return this.props.community;
    };
    InnerCommunity.prototype.render = function () {
        var _a = this.props, community = _a.community, location = _a.location, history = _a.history, params = _a.params;
        return (React.createElement("div", {"className": "content", "style": { paddingBottom: 0 }}, React.createElement("div", {"className": "left-col"}, React.createElement("div", {"className": "commun-photo"}, React.createElement("a", {"onClick": function () { history.push("/community/" + community.id + "/users"); }}, React.createElement("img", {"src": community.avatar['180'], "alt": ""}))), React.createElement(CommunityCategories_1.default, {"history": this.props.history, "community": this.getCommunity()}), React.createElement("div", {"className": "save-mess community-joined"}, "Вы вступили в сообщество"), React.createElement("br", null), React.createElement("br", null), React.createElement("div", {"className": "line"}), React.createElement(CommunityAdmins_1.default, {"community": this.getCommunity()}), React.createElement("div", {"className": "line"})), React.createElement("div", {"className": "center-wall"}, React.createElement("div", {"className": "user-wall-top"}, React.createElement("h1", null, community.name), React.createElement("div", {"className": "group-name"}, "Сообщество"), React.createElement("div", {"className": "group-text shot-text"}, React.createElement("span", null, "Третье сообщество"), " ", React.createElement("a", {"href": "", "className": "more-text"}, "еще"), React.createElement("span", null, "Третье сообщество"), " ", React.createElement("a", {"href": "", "className": "more-text2"}, "свернуть"))), React.createElement("div", {"className": "wall-tabs blue-block"}, React.createElement(Tabs_1.default, {"location": location, "tabs": this.getTabs(), "handleClick": this.handleTabClick.bind(this), "currentTab": params.tab || 'wall'}), React.createElement("div", {"className": "panes"}, this.props.children))), React.createElement(BottomTags_1.default, null)));
    };
    return InnerCommunity;
})(React.Component);
//# sourceMappingURL=Community.js.map