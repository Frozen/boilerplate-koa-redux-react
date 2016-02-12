var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_router_1 = require('react-router');
var CommunityJoinLeave_1 = require('./blocks/CommunityJoinLeave');
var IProps = (function () {
    function IProps() {
    }
    return IProps;
})();
var CommunityCategories = (function (_super) {
    __extends(CommunityCategories, _super);
    function CommunityCategories() {
        _super.apply(this, arguments);
    }
    //e: MouseEvent
    CommunityCategories.prototype.push = function (categoryId, e) {
        e.preventDefault();
        var _a = this.props, community = _a.community, history = _a.history;
        history.push("/community/" + community.id + "/wall/all?rubric_filter=" + categoryId);
    };
    CommunityCategories.prototype.render = function () {
        var community = this.props.community;
        var categories = community.categories || [];
        return (React.createElement("div", {"className": "user-btns"}, React.createElement(CommunityJoinLeave_1.default, null), React.createElement("div", {"className": "line line2"}), React.createElement("div", {"className": "cat-block people_module"}, React.createElement("h4", null, "Категории (", categories.length, ")"), React.createElement("ul", {"className": "cat-list"}, React.createElement("li", null, React.createElement(react_router_1.Link, {"className": "active", "to": "/community/" + community.id}, "Все")), categories.map(function (category, index) {
            return React.createElement("li", {"key": index}, React.createElement("a", {"className": "active", "href": "/community/" + category.id, "onClick": this.push.bind(this, category.id)}, category.name));
        }.bind(this))))));
    };
    return CommunityCategories;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommunityCategories;
//# sourceMappingURL=CommunityCategories.js.map