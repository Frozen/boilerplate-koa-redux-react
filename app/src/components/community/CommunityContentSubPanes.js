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
var ContentItem_1 = require('../common/ContentItem');
var InfiniteScrolling_1 = require('../common/InfiniteScrolling');
var helpers_1 = require('../../helpers/helpers');
var react_redux_1 = require('react-redux');
var CommunityContentPaneBase = (function (_super) {
    __extends(CommunityContentPaneBase, _super);
    function CommunityContentPaneBase() {
        _super.apply(this, arguments);
        this.state = {
            content: [],
            isActive: true,
            next: true,
            isLoading: false
        };
        this.isLoading = false;
        // вкладка
        this.type = null;
        this.loader = null;
    }
    CommunityContentPaneBase.prototype.componentDidMount = function () {
        if (this.type === null) {
            throw new Error("type is null");
        }
        var _a = this.props, params = _a.params, location = _a.location, community = _a.community;
        this.loader = new helpers_1.Loader('/rest/community/' + community.id +
            "/content?type=" + this.type +
            "&rubric=" + (location.query.rubric ? location.query.rubric : ''));
        this.handleLoadMore();
    };
    CommunityContentPaneBase.prototype.componentWillUnmount = function () {
        this.loader = null;
    };
    /**
     * Обнуляем контент по подкатегории
     * @private
     */
    CommunityContentPaneBase.prototype._resetContent = function () {
        this.setState({ content: [],
            pages: 0,
            next: true
        });
        this.loader.reset();
    };
    CommunityContentPaneBase.prototype.handleLoadMore = function () {
        this._handleLoadMore();
    };
    CommunityContentPaneBase.prototype._handleLoadMore = function () {
        if (!this.state.next) {
            return;
        }
        if (!this.isLoading) {
            this.isLoading = true;
            this.setState({
                isLoading: true
            });
            this._fetchContent();
        }
    };
    CommunityContentPaneBase.prototype._fetchContent = function () {
        this.loader.
            next().
            then(function (data) {
            this.isLoading = false;
            // unmounted
            if (this.loader === null) {
                return;
            }
            this.setState({
                content: this.state.content.concat(data.results),
                isLoading: false
            });
        }.bind(this));
    };
    CommunityContentPaneBase.prototype.render = function () {
        var _this = this;
        var infinityIsLoading = this.props.infinityIsLoading;
        var content = this.state.content;
        return (React.createElement("div", {"className": "userAc"}, content.map(function (content, index) {
            return React.createElement(ContentItem_1.default, {"content": content, "key": index});
        }), this.state.isLoading ? React.createElement("div", {"className": "spinner"}, React.createElement("img", {"src": "/static/images/loading_spinner.gif"})) : '', React.createElement(InfiniteScrolling_1.default, {"infiniteLoadMore": this.handleLoadMore.bind(this), "isActive": function () { return _this.state.isActive; }, "pause": function () { return infinityIsLoading; }})));
    };
    return CommunityContentPaneBase;
})(React.Component);
var CommunityContentPaneAll = (function (_super) {
    __extends(CommunityContentPaneAll, _super);
    function CommunityContentPaneAll() {
        _super.apply(this, arguments);
        this.type = 'all';
    }
    CommunityContentPaneAll = __decorate([
        react_redux_1.connect(function (state) { return state.community; })
    ], CommunityContentPaneAll);
    return CommunityContentPaneAll;
})(CommunityContentPaneBase);
exports.CommunityContentPaneAll = CommunityContentPaneAll;
var CommunityContentPaneArticle = (function (_super) {
    __extends(CommunityContentPaneArticle, _super);
    function CommunityContentPaneArticle() {
        _super.apply(this, arguments);
        this.type = 'article';
    }
    CommunityContentPaneArticle = __decorate([
        react_redux_1.connect(function (state) { return state.community; })
    ], CommunityContentPaneArticle);
    return CommunityContentPaneArticle;
})(CommunityContentPaneBase);
exports.CommunityContentPaneArticle = CommunityContentPaneArticle;
var CommunityContentPaneNote = (function (_super) {
    __extends(CommunityContentPaneNote, _super);
    function CommunityContentPaneNote() {
        _super.apply(this, arguments);
        this.type = 'note';
    }
    CommunityContentPaneNote = __decorate([
        react_redux_1.connect(function (state) { return state.community; })
    ], CommunityContentPaneNote);
    return CommunityContentPaneNote;
})(CommunityContentPaneBase);
exports.CommunityContentPaneNote = CommunityContentPaneNote;
var CommunityContentPanePhoto = (function (_super) {
    __extends(CommunityContentPanePhoto, _super);
    function CommunityContentPanePhoto() {
        _super.apply(this, arguments);
        this.type = 'photo';
    }
    CommunityContentPanePhoto = __decorate([
        react_redux_1.connect(function (state) { return state.community; })
    ], CommunityContentPanePhoto);
    return CommunityContentPanePhoto;
})(CommunityContentPaneBase);
exports.CommunityContentPanePhoto = CommunityContentPanePhoto;
var CommunityContentPaneVideo = (function (_super) {
    __extends(CommunityContentPaneVideo, _super);
    function CommunityContentPaneVideo() {
        _super.apply(this, arguments);
        this.type = 'video';
    }
    CommunityContentPaneVideo = __decorate([
        react_redux_1.connect(function (state) { return state.community; })
    ], CommunityContentPaneVideo);
    return CommunityContentPaneVideo;
})(CommunityContentPaneBase);
exports.CommunityContentPaneVideo = CommunityContentPaneVideo;
var CommunityContentPanePoll = (function (_super) {
    __extends(CommunityContentPanePoll, _super);
    function CommunityContentPanePoll() {
        _super.apply(this, arguments);
        this.type = 'poll';
    }
    CommunityContentPanePoll = __decorate([
        react_redux_1.connect(function (state) { return state.community; })
    ], CommunityContentPanePoll);
    return CommunityContentPanePoll;
})(CommunityContentPaneBase);
exports.CommunityContentPanePoll = CommunityContentPanePoll;
//# sourceMappingURL=CommunityContentSubPanes.js.map