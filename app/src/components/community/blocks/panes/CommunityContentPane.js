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
var Visible_1 = require('../../../common/Visible');
var SubTabs_1 = require('../../../common/SubTabs');
var ContentItem_1 = require('../../../common/ContentItem');
var InfiniteScrolling_1 = require('../../../common/InfiniteScrolling');
var actions = require('../../../../actions/community');
var helpers_1 = require('../../../../helpers/helpers');
var react_redux_1 = require('react-redux');
var CommunityContentPane = (function (_super) {
    __extends(CommunityContentPane, _super);
    function CommunityContentPane() {
        _super.apply(this, arguments);
    }
    //handleLoadMore() {
    //    console.log("CommunityContentPane handle load more")
    //}
    //getCurrentTab() {
    //    return 'wall'
    //}
    //
    //getCurrentSubTab() {
    //    return 'all'
    //}
    //handleLoadMore() {
    //    console.log("handleLoadMore");
    //    const {dispatch, infinityIsLoading} = this.props;
    //
    //    if (!infinityIsLoading) {
    //        dispatch(actions.setContentLoadingState(true));
    //        dispatch(actions.fetchContent(this.getCurrentSubTab()))
    //    }
    //}
    CommunityContentPane.prototype.handleSubTabClick = function (path) {
        var _a = this.props, history = _a.history, dispatch = _a.dispatch, params = _a.params;
        history.push("/community/" + params.id + "/" + this.getCurrentTab() + path);
        dispatch(actions.setSubTab(path));
    };
    CommunityContentPane.prototype.handleLoadMore = function () {
        console.log("handleLoadMore");
        var _a = this.props, dispatch = _a.dispatch, infinityIsLoading = _a.infinityIsLoading;
        if (!infinityIsLoading) {
            dispatch(actions.setContentLoadingState(true));
            dispatch(actions.fetchContent(this.getCurrentSubTab()));
        }
    };
    CommunityContentPane.prototype.componentWillMount = function () {
        //console.log("CommunityContentPane componentWillMount props", this.props);
    };
    CommunityContentPane.prototype.getCurrentTab = function () {
        //const {currentTab} = this.props;
        var _a = this.props, params = _a.params, dispatch = _a.dispatch;
        if (!params.tab) {
            return "wall";
        }
        return helpers_1.trimSlash(params.tab);
    };
    CommunityContentPane.prototype.getCurrentSubTab = function () {
        //const {currentSubTab} = this.props;
        var _a = this.props, params = _a.params, dispatch = _a.dispatch;
        if (!params.subtab) {
            return "all";
        }
        return helpers_1.trimSlash(params.subtab);
    };
    CommunityContentPane.prototype.render = function () {
        var _this = this;
        var _a = this.props, subTabs = _a.subTabs, content = _a.content, infinityIsLoading = _a.infinityIsLoading;
        console.log("CommunityContentPane==", this.props);
        return (React.createElement(Visible_1.default, {"className": "pane", "test": this.getCurrentTab() == "" || this.getCurrentTab() == "wall"}, React.createElement(SubTabs_1.default, {"tabs": subTabs || [], "currentTab": this.getCurrentSubTab(), "handleClick": this.handleSubTabClick.bind(this)}), React.createElement(Visible_1.default, {"className": "userAc", "test": this.getCurrentSubTab() == 'all'}, React.createElement("div", null, (content['all']).length), content['all'].map(function (content, index) {
            return React.createElement(ContentItem_1.default, {"content": content, "key": index});
        }), React.createElement(InfiniteScrolling_1.default, {"infiniteLoadMore": this.handleLoadMore.bind(this), "isActive": function () { return _this.getCurrentTab() == 'wall' && _this.getCurrentSubTab() == 'all'; }, "pause": function () { return infinityIsLoading; }})), React.createElement(Visible_1.default, {"className": "userAc ng-hide", "test": this.getCurrentSubTab() == 'article', "ng-show": "tab=='article'"}, content['article'].map(function (content, index) {
            return React.createElement(ContentItem_1.default, {"content": content, "key": index});
        }), React.createElement(InfiniteScrolling_1.default, {"infiniteLoadMore": this.handleLoadMore.bind(this), "isActive": function () { return _this.getCurrentTab() == 'wall' && _this.getCurrentSubTab() == 'article'; }, "pause": function () { return infinityIsLoading; }}), React.createElement("br", null), React.createElement("br", null)), React.createElement(Visible_1.default, {"className": "userAc", "test": this.getCurrentSubTab() == 'note'}, content['note'].map(function (content, index) {
            return React.createElement(ContentItem_1.default, {"content": content, "key": index});
        }), React.createElement(InfiniteScrolling_1.default, {"infiniteLoadMore": this.handleLoadMore.bind(this), "isActive": function () { return _this.getCurrentTab() == 'wall' && _this.getCurrentSubTab() == 'note'; }, "pause": function () { return infinityIsLoading; }}), React.createElement("br", null), React.createElement("br", null)), React.createElement(Visible_1.default, {"className": "userAc", "test": this.getCurrentSubTab() == 'photo'}, React.createElement("br", null), React.createElement("br", null)), React.createElement(Visible_1.default, {"className": "userAc", "test": this.getCurrentSubTab() == 'video'}, React.createElement("br", null), React.createElement("br", null)), React.createElement(Visible_1.default, {"className": "userAc", "test": this.getCurrentSubTab() == 'poll'}, React.createElement("br", null), React.createElement("br", null)), React.createElement(Visible_1.default, {"className": "userAc", "test": this.getCurrentSubTab() == 'bookmark'}, React.createElement("br", null), React.createElement("br", null))));
    };
    CommunityContentPane = __decorate([
        react_redux_1.connect(function (state) { return state.community.panes.content; })
    ], CommunityContentPane);
    return CommunityContentPane;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommunityContentPane;
//# sourceMappingURL=CommunityContentPane.js.map