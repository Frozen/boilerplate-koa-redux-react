var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var InfiniteScrolling = (function (_super) {
    __extends(InfiniteScrolling, _super);
    function InfiniteScrolling() {
        _super.apply(this, arguments);
        this.prevScrollValue = document.body.scrollTop;
    }
    InfiniteScrolling.prototype.isMovingDown = function (currentScroll) {
        return currentScroll > this.prevScrollValue;
    };
    InfiniteScrolling.prototype.componentDidMount = function () {
        var _a = this.props, infiniteLoadMore = _a.infiniteLoadMore, isActive = _a.isActive, pause = _a.pause;
        this.f = function (e) {
            var viewportOffset = this.refs.i.getBoundingClientRect();
            var scroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (scroll + 500 > viewportOffset.top && this.isMovingDown(scroll) &&
                infiniteLoadMore && isActive() && !pause()) {
                // console.log("should load more");
                infiniteLoadMore();
            }
            this.prevScrollValue = document.body.scrollTop;
        }.bind(this);
        window.addEventListener('scroll', this.f);
    };
    InfiniteScrolling.prototype.componentWillUnmount = function () {
        window.removeEventListener('scroll', this.f);
    };
    InfiniteScrolling.prototype.render = function () {
        return React.createElement("i", {"ref": "i"});
    };
    return InfiniteScrolling;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InfiniteScrolling;
//# sourceMappingURL=InfiniteScrolling.js.map