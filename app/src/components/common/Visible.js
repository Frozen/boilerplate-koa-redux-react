var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/tsd.t.ts" />
var React = require('react');
var Visible = (function (_super) {
    __extends(Visible, _super);
    function Visible() {
        _super.apply(this, arguments);
    }
    Visible.prototype.render = function () {
        var _a = this.props, test = _a.test, className = _a.className;
        return (React.createElement("div", {"style": { display: test ? "block" : 'none' }, "className": className || ''}, this.props.children));
    };
    return Visible;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Visible;
//# sourceMappingURL=Visible.js.map