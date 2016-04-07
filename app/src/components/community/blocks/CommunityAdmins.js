var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var helpers_1 = require("../../../helpers/helpers");
var react_router_1 = require('react-router');
/**
 * Блок админы сообщества
 */
var CommunityAdmins = (function (_super) {
    __extends(CommunityAdmins, _super);
    function CommunityAdmins() {
        _super.apply(this, arguments);
        this.state = {
            users: [],
            count: 0
        };
        this.loader = null;
    }
    CommunityAdmins.prototype.componentDidMount = function () {
        var community = this.props.community;
        this.loader = new helpers_1.Loader('/rest/community/' + this.props.community.id + "/users?type=admins");
        this.loader.next().then(function (data) {
            this.setState({
                users: data.results.slice(0, 9),
                count: data.count
            });
        }.bind(this));
    };
    CommunityAdmins.prototype.render = function () {
        var community = this.props.community;
        return (React.createElement("div", {"className": "module people_module"}, React.createElement("div", {"className": "module-title"}, React.createElement("h4", null, React.createElement(react_router_1.Link, {"to": '/community/' + community.id + '/members/admin'}, "Руководство ", React.createElement("span", null, "(", this.state.count, ")")))), React.createElement("div", {"className": "peoples"}, this.state.users.map(function (cu, index) {
            return (React.createElement("div", {"className": "people_cell active", "key": index}, React.createElement("a", {"href": cu.user.url, "style": { display: 'block', height: '52px', whiteSpace: 'nowrap' }}, React.createElement("img", {"src": cu.user.avatar['50x50'], "className": "ava center-image", "alt": cu.user.fio_or_username_or_id, "style": { verticalAlign: 'middle', border: 'none' }}), React.createElement("span", {"dangerouslySetInnerHTML": { __html: cu.user.fio_or_username_or_id.replace(" ", "<br />") }}))));
        }))));
    };
    return CommunityAdmins;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommunityAdmins;
//# sourceMappingURL=CommunityAdmins.js.map