var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Rating = (function (_super) {
    __extends(Rating, _super);
    function Rating() {
        _super.apply(this, arguments);
    }
    Rating.prototype.render = function () {
        var rating = this.props.rating;
        return (React.createElement("div", {"className": "plusMinus"}, React.createElement("span", null, rating.rating), React.createElement("span", {"className": "negative"}, rating.votesAgainst), React.createElement("span", {"className": "positive"}, rating.votesFor)));
    };
    return Rating;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Rating;
//# sourceMappingURL=Rating.js.map