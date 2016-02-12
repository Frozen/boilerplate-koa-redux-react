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
var SubTabs_1 = require('../../../common/SubTabs');
var react_redux_1 = require("react-redux");
var CommunityMembersPane = (function (_super) {
    __extends(CommunityMembersPane, _super);
    function CommunityMembersPane() {
        _super.apply(this, arguments);
    }
    CommunityMembersPane.prototype.getSubTabs = function () {
        return [["all", "Все"],
            ["admin", "Руководство"],
            ["friend", "Друзья"],
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
        var _a = this.props, params = _a.params, location = _a.location;
        return (React.createElement("div", {"className": "pane"}, React.createElement(SubTabs_1.default, {"tabs": this.getSubTabs(), "location": location, "currentTab": params.subtab || '', "handleClick": this.handleSubTabClick.bind(this)}), React.createElement("div", {"className": "fr-search"}, React.createElement("input", {"type": "text", "placeholder": "Найти участника по имени", "className": "fr-search-txt ng-pristine ng-untouched ng-valid"}), React.createElement("input", {"type": "submit", "value": "", "className": "fr-search-btn"})), React.createElement("div", {"className": "wall-panes bord"}, React.createElement("div", {"className": "userAc"}, React.createElement("article", {"ng-repeat": "member in members", "className": "ng-scope"}, React.createElement("header", null, React.createElement("a", {"href": "/user/2", "className": "usName ng-binding"}, "2")), React.createElement("div", {"className": "user-edit", "ng-show": "is_admin_or_moderator"}, React.createElement("select", {"ng-show": "is_admin", "ng-hide": "is_moderator", "ng-change": "groupChanged(member, group)", "ng-options": "group.value as group.title for group in groups", "ng-model": "member.group_id", "className": "ng-pristine ng-untouched ng-valid"}, React.createElement("option", {"value": "number:3", "label": "Участник"}, "Участник"), React.createElement("option", {"value": "number:2", "label": "Модератор"}, "Модератор"), React.createElement("option", {"value": "number:1", "label": "Администратор"}, "Администратор")), React.createElement("a", {"href": "", "className": "action", "ng-click": "banUser(member)", "ng-show": "!member.is_blocked"}, "Исключить"), React.createElement("a", {"href": "", "ng-hide": "is_moderator", "className": "action", "ng-click": "banUser(member)", "ng-show": "member.is_blocked"}, "Разбанить")), React.createElement("div", {"className": "user-l"}, React.createElement("div", {"className": "userAva", "style": { whiteSpace: 'nowrap', overflow: 'hidden' }}, React.createElement("span", {"style": { display: 'inline-block', verticalAlign: 'middle', height: '100%' }}), React.createElement("img", {"alt": "", "style": { verticalAlign: 'middle', marginLeft: '-3px' }, "src": "/static/images/avatars/b.png"})), React.createElement("span", {"className": "user-stat ng-hide"}, "Online")))))));
    };
    CommunityMembersPane = __decorate([
        react_redux_1.connect()
    ], CommunityMembersPane);
    return CommunityMembersPane;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommunityMembersPane;
//# sourceMappingURL=CommunityMembersPane.js.map