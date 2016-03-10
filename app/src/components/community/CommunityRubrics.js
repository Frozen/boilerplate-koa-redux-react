var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var CommunityJoinLeave_1 = require('./blocks/CommunityJoinLeave');
var IProps = (function () {
    function IProps() {
    }
    return IProps;
})();
var CommunityRubrics = (function (_super) {
    __extends(CommunityRubrics, _super);
    function CommunityRubrics() {
        _super.apply(this, arguments);
    }
    //e: MouseEvent
    CommunityRubrics.prototype.push = function (categoryId, e) {
        e.preventDefault();
        var _a = this.props, community = _a.community, history = _a.history;
        history.push("/community/" + community.id + "/wall/all?rubric_filter=" + categoryId);
    };
    CommunityRubrics.prototype.render = function () {
        var community = this.props.community;
        var rubrics = community.rubrics || [];
        var location = this.props.location;
        return (React.createElement("div", {"className": "user-btns"}, React.createElement(CommunityJoinLeave_1.default, null), React.createElement("div", {"className": "line line2"}), React.createElement("div", {"className": "cat-block people_module"}, React.createElement("h4", null, "Категории (", rubrics.length, ")"), React.createElement("ul", {"className": "cat-list"}, React.createElement("li", null, React.createElement("a", {"href": '/community/' + community.id, "className": location.query.rubric ? '' : 'active'}, "Все")), rubrics.map(function (category, index) {
            return React.createElement("li", {"key": index}, React.createElement("a", {"className": location.query.rubric == category.id.toString() ? "active" : '', "href": "/community/" + community.id + '' + '/wall/all?rubric=' + category.id}, category.name));
        }.bind(this))))));
    };
    return CommunityRubrics;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommunityRubrics;
//# sourceMappingURL=CommunityRubrics.js.map