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
    Rating.prototype.vote = function (vote, e) {
        //content_vote
        //console.log(e, vote, contentId);
        fetch('/content_vote', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "vote=" + vote + "&content_id=" + this.props.content.id
        }).
            then(function (r) {
            return r.json();
        }).
            then(function (data) {
            //{"data": {"rating": 1, "votes_against": 0, "votes_for": 1}, "message": "\u0412\u0430\u0448 \u0433\u043e\u043b\u043e\u0441 \u0443\u0447\u0442\u0451\u043d", "ok": true}
            //dispatch({
            //    type: types.SET_COMMUNITY,
            //    community: Object.assign(new models.Community(), data)
            //})
        });
    };
    Rating.prototype.componentWillMount = function () {
        this.setState({ content: this.props.content });
    };
    Rating.prototype.render = function () {
        var rating = this.state.content.rating;
        var content = this.state.content;
        return (React.createElement("div", {"className": "plusMinus"}, React.createElement("span", null, rating.rating), React.createElement("a", {"className": "icon-negative", "title": "поставить минус", "onClick": this.vote.bind(this, -1)}), React.createElement("span", {"className": "negative"}, rating.getVotesAgainst()), React.createElement("a", {"className": "icon-positive", "title": "поставить плюс", "onClick": this.vote.bind(this, 1)}), React.createElement("span", {"className": "positive"}, rating.getVotesFor())));
    };
    return Rating;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Rating;
//# sourceMappingURL=Rating.js.map