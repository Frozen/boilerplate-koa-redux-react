var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var CommunityUser = (function (_super) {
    __extends(CommunityUser, _super);
    function CommunityUser() {
        _super.apply(this, arguments);
    }
    CommunityUser.prototype.render = function () {
        var communityUser = this.props.communityUser;
        var isOnline = function (isOnline) {
            if (isOnline) {
                return React.createElement("span", {"className": "user-stat ng-hide"}, "Online");
            }
            else {
                return React.createElement("span", {"className": "user-stat"});
            }
        };
        return (React.createElement("article", null, React.createElement("header", null, React.createElement("a", {"href": communityUser.user.getUrl(), "className": "usName"}, communityUser.user.getFioOrUsernameOrId())), React.createElement("div", {"className": "user-edit"}, React.createElement("select", null, React.createElement("option", {"value": "3", "label": "Участник"}, "Участник"), React.createElement("option", {"value": "2", "label": "Модератор"}, "Модератор"), React.createElement("option", {"value": "1", "label": "Администратор"}, "Администратор")), React.createElement("a", {"href": "", "className": "action"}, "Исключить"), React.createElement("a", {"href": "", "className": "action", "ng-show": "member.is_blocked"}, "Разбанить")), React.createElement("div", {"className": "user-l"}, React.createElement("div", {"className": "userAva", "style": { whiteSpace: 'nowrap', overflow: 'hidden' }}, React.createElement("span", {"style": { display: 'inline-block', verticalAlign: 'middle', height: '100%' }}), React.createElement("img", {"alt": "", "style": { verticalAlign: 'middle', marginLeft: '-3px' }, "src": ""})), isOnline(communityUser.user.isOnline()))));
    };
    return CommunityUser;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommunityUser;
//# sourceMappingURL=CommunityUser.js.map