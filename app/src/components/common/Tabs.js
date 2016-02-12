/// <reference path="../../typings/tsd.t.ts" />
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
var classNames = require('classnames');
var react_redux_1 = require("react-redux");
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
    //mixins: [Router.A];
    Tabs.prototype.render = function () {
        var _a = this.props, location = _a.location, handleClick = _a.handleClick, tabs = _a.tabs, params = _a.params;
        var currentTab = location.pathname.replace(/\//, "").split("/")[2] || "";
        if (!currentTab) {
            currentTab = "wall";
        }
        return (React.createElement("ul", {"className": "tabs"}, tabs.map(function (tab, index) {
            return (React.createElement("li", {"key": index}, React.createElement("a", {"href": "/community/3" + tab[0], "onMouseDown": function (e) { e.preventDefault(); handleClick(tab[0]); }, "onClick": function (e) { return e.preventDefault(); }, "className": classNames({ current: currentTab.replace(/\//, "") == tab[0].replace(/\//, "") })}, tab[1])));
        })));
    };
    Tabs = __decorate([
        react_redux_1.connect()
    ], Tabs);
    return Tabs;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tabs;
//# sourceMappingURL=Tabs.js.map