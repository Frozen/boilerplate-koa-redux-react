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
        //dispatch(actions.fetchCommunity(params.id));
    };
    Community.prototype.render = function () {
        var community = this.props.community;
        console.log('community children111', community);
        if (community) {
            //return <div></div>;
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
    }
    //handleLoadMore() {
    //    console.log("handleLoadMore");
    //    const {dispatch, infinityIsLoading} = this.props;
    //
    //    if (!infinityIsLoading) {
    //        dispatch(actions.setContentLoadingState(true));
    //        dispatch(actions.fetchContent(this.getCurrentSubTab()))
    //    }
    //}
    //getCurrentTab(): string {
    //    const {currentTab} = this.props;
    //    if (currentTab == '') {
    //        return "wall"
    //    }
    //    return trimSlash(currentTab)
    //}
    //
    //getCurrentSubTab(): string {
    //    const {currentSubTab} = this.props;
    //    if (currentSubTab == '') {
    //        return "all"
    //    }
    //    return trimSlash(currentSubTab);
    //}
    InnerCommunity.prototype.getTabs = function () {
        return [
            ["/wall", 'Стена'],
            ["/rules", 'Правила'],
            ["/members", 'Участники'],
            ["/albums", 'Альбомы'],
            ["/settings", 'Настройки']
        ];
    };
    InnerCommunity.prototype.handleTabClick = function (path) {
        var _a = this.props, history = _a.history, community = _a.community, dispatch = _a.dispatch;
        history.push("/community/" + community.id + "" + path);
        dispatch(actions.setTab(path));
    };
    //handleSubTabClick(path) {
    //    const {history, community, dispatch, currentTab} = this.props;
    //    history.push("/community/" + community.id + "/" + currentTab + path);
    //    dispatch(actions.setSubTab(path))
    //}
    InnerCommunity.prototype.getCommunity = function () {
        return this.props.community;
    };
    InnerCommunity.prototype.render = function () {
        //console.log('community children222', this.props.children);
        var _a = this.props, community = _a.community, location = _a.location, history = _a.history, currentTab = _a.currentTab, params = _a.params;
        console.log('community???', community);
        //console.log("content==", content, content[this.getCurrentSubTab()]);
        //console.log("currentSubTab", this.getCurrentSubTab());
        //console.log("currentSubTab2", content[this.getCurrentSubTab()].length);
        //this.getCurrentTab() == 'wall' && this.getCurrentSubTab() == 'all'
        //console.log("tab and subtab", this.getCurrentTab(), this.getCurrentSubTab());
        return (React.createElement("div", {"className": "content", "style": { paddingBottom: 0 }}, React.createElement("div", {"className": "left-col"}, React.createElement("div", {"className": "commun-photo"}, React.createElement("a", {"onClick": function () { history.push("/community/" + community.id + "/users"); }}, React.createElement("img", {"src": community.avatar['180'], "alt": ""}))), React.createElement(CommunityCategories_1.default, {"history": this.props.history, "community": this.getCommunity()}), React.createElement("div", {"className": "save-mess community-joined"}, "Вы вступили в сообщество"), React.createElement("br", null), React.createElement("br", null), React.createElement("div", {"className": "line"}), React.createElement("div", {"className": "module people_module"}, React.createElement("div", {"className": "module-title"}, React.createElement("h4", null, React.createElement("a", {"href": "#?pane=members&amp;tab=admin"}, "Руководство ", React.createElement("span", null, "(1)")))), React.createElement("div", {"className": "peoples"}, React.createElement("div", {"className": "people_cell active"}, React.createElement("a", {"href": "/user/yaru", "style": { display: 'block', height: '52px', whiteSpace: 'nowrap' }}, React.createElement("img", {"src": "/static/u/photo/1/s.jpg", "className": "ava center-image", "alt": "yaru", "style": { verticalAlign: 'middle', border: 'none' }}), React.createElement("span", null, "yaru"))))), React.createElement("div", {"className": "line"})), React.createElement("div", {"className": "center-wall"}, React.createElement("div", {"className": "user-wall-top"}, React.createElement("h1", null, community.name), React.createElement("div", {"className": "group-name"}, "Сообщество"), React.createElement("div", {"className": "group-text shot-text"}, React.createElement("span", null, "Третье сообщество"), " ", React.createElement("a", {"href": "", "className": "more-text"}, "еще"), React.createElement("span", {"className": "ng-hide", "ng-show": "full_description"}, "Третье сообщество"), " ", React.createElement("a", {"href": "", "className": "more-text2 ng-hide", "ng-click": "full_description=false", "ng-show": "full_description"}, "свернуть"))), React.createElement("div", {"className": "wall-tabs blue-block"}, React.createElement(Tabs_1.default, {"location": location, "tabs": this.getTabs(), "handleClick": this.handleTabClick.bind(this), "currentTab": params.tab || 'wall'}), React.createElement("div", {"className": "panes"}, this.props.children))), React.createElement(BottomTags_1.default, null)));
    };
    return InnerCommunity;
})(React.Component);
//# sourceMappingURL=Community.js.map