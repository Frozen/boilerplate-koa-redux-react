var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/tsd.t.ts" />
var React = require('react');
var classNames = require('classnames');
var helpers_1 = require('../../helpers/helpers');
var SubTabs = (function (_super) {
    __extends(SubTabs, _super);
    function SubTabs() {
        _super.apply(this, arguments);
    }
    SubTabs.prototype.render = function () {
        var _a = this.props, tabs = _a.tabs, currentTab = _a.currentTab, handleClick = _a.handleClick;
        var _tabs = tabs || [];
        return (React.createElement("ul", {"className": "wall-filter"}, _tabs.map(function (tab, index) {
            return React.createElement("li", {"key": index}, React.createElement("a", {"href": "", "className": classNames({ current: helpers_1.trimSlash(tab[0]) == helpers_1.trimSlash(currentTab) }), "onClick": function (e) { e.preventDefault(); handleClick(tab[0]); }, "ng-click": "tab='all'"}, tab[1]));
        })));
    };
    return SubTabs;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubTabs;
//# sourceMappingURL=SubTabs.js.map