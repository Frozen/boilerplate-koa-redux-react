var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/tsd.t.ts" />
var React = require('react');
var classNames = require('classnames');
var SubTabs = (function (_super) {
    __extends(SubTabs, _super);
    function SubTabs() {
        _super.apply(this, arguments);
    }
    SubTabs.prototype.render = function () {
        var _a = this.props, tabs = _a.tabs, handleClick = _a.handleClick, location = _a.location;
        var showCallback = this.props.showCallback || function (tab) { return true; };
        var currentTab = location.pathname.replace(/\//, "").split("/")[3];
        var _tabs = tabs || [];
        return (React.createElement("ul", {"className": "wall-filter"}, _tabs.map(function (tab, index) {
            return (showCallback(tab[0]) ? React.createElement("li", {"key": index}, React.createElement("a", {"href": "", "className": classNames({ current: tab[0] == currentTab }), "onClick": function (e) { e.preventDefault(); handleClick(tab[0]); }}, tab[1])) : '');
        })));
    };
    return SubTabs;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubTabs;
//# sourceMappingURL=SubTabs.js.map