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
        $.ajax({
            url: '/content_vote',
            type: 'post',
            data: {
                vote: vote,
                content_id: this.props.content.id
            }
        }).
            then(function (data) {
            if (data.ok) {
                this.setState({
                    content: Object.assign({}, this.state.content, { rating: data.data })
                });
            }
        }.bind(this));
    };
    Rating.prototype.componentWillMount = function () {
        this.setState({ content: this.props.content });
    };
    Rating.prototype.render = function () {
        var rating = this.state.content.rating;
        var content = this.state.content;
        return (React.createElement("div", {"className": "plusMinus"}, React.createElement("span", null, rating.votes_against), " ", React.createElement("a", {"className": "icon-negative", "title": "поставить минус", "onClick": this.vote.bind(this, -1)}), React.createElement("span", {"className": "negative"}, rating.rating), React.createElement("a", {"className": "icon-positive", "title": "поставить плюс", "onClick": this.vote.bind(this, 1)}), " ", React.createElement("span", {"className": "positive"}, rating.votes_for)));
    };
    return Rating;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Rating;
//# sourceMappingURL=Rating.js.map