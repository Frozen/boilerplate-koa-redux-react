/// <reference path="../../typings/tsd.t.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var classNames = require('classnames');
var PropTypes = React.PropTypes;
/**
 *
 * @param {Function} handleClick Function that takes a path and push url
 * next location
 *
 * @param {Array} tabs Array of tabs to show
 * @param {String} currentTab String that match one of tabs url, if equal set
 * current tab selected
 *
 */
var Tabs = (function (_super) {
    __extends(Tabs, _super);
    function Tabs() {
        _super.apply(this, arguments);
    }
    //propTypes: {
    //    handleClick: React.PropTypes.func.isRequired,
    //    currentTab: React.PropTypes.string.isRequired,
    //    tabs: React.PropTypes.array.isRequired
    //};
    Tabs.prototype.render = function () {
        var _a = this.props, handleClick = _a.handleClick, currentTab = _a.currentTab, tabs = _a.tabs;
        //const current = () => {
        //    return
        //};
        //x
        return (React.createElement("ul", {"className": "tabs"}, tabs.map(function (tab, index) {
            return React.createElement("li", {"key": index}, React.createElement("a", {"href": "/community/3" + tab[0], "onMouseDown": function (e) { e.preventDefault(); handleClick(tab[0]); }, "onClick": function (e) { return e.preventDefault(); }, "className": classNames({ current: currentTab.replace(/\//, "") == tab[0].replace(/\//, "") })}, tab[1]));
        })));
    };
    return Tabs;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tabs;
//# sourceMappingURL=Tabs.js.map