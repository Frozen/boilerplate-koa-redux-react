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
var constants = require('../../../../constants/constants');
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
        var _a = this.props, params = _a.params, location = _a.location;
        return (React.createElement("div", {"className": "pane"}, React.createElement(SubTabs_1.default, {"tabs": this.getSubTabs(), "location": location, "currentTab": params.subtab || '', "handleClick": this.handleSubTabClick.bind(this), "showCallback": function (tab) {
            if (request.user.id == constants.COMMUNITY_GROUP_ADMIN ||
                request.user.id == constants.COMMUNITY_GROUP_MODERATOR) {
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
        react_redux_1.connect()
    ], CommunityMembersPane);
    return CommunityMembersPane;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommunityMembersPane;
//# sourceMappingURL=CommunityMembersPane.js.map