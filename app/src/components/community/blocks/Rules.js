/**
 *
 * Текст сообщества
 *
 *
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Rules = (function (_super) {
    __extends(Rules, _super);
    function Rules() {
        _super.apply(this, arguments);
    }
    Rules.prototype.render = function () {
        var community = this.props.community;
        return (React.createElement("div", {"className": "userAc"}, React.createElement("h3", null, "Правила поведения в сообществе."), React.createElement("p", null, community.description)));
    };
    return Rules;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Rules;
//# sourceMappingURL=Rules.js.map