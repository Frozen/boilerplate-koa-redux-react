var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var CommunityAlbumsPane = (function (_super) {
    __extends(CommunityAlbumsPane, _super);
    function CommunityAlbumsPane() {
        _super.apply(this, arguments);
    }
    //componendWillUnmount() {
    //    console.log("aaahahahahahah unmount");
    //}
    CommunityAlbumsPane.prototype.render = function () {
        //console.log("aaahahahahahah");
        return (React.createElement("div", {"className": "pane photo ng-hide", "ng-show": "pane == 'photo'"}, React.createElement("div", {"className": "wall-panes", "ng-show": "tab == 'all'"}, React.createElement("div", {"className": "userAc photo-box"}, React.createElement("a", {"href": "#", "className": "top-link add-photo"}, "Добавить фотографию"), React.createElement("div", {"className": "line"}), React.createElement("a", {"href": "#", "className": "top-link add-alb"}, "Добавить альбом"), React.createElement("div", {"className": "line"})), React.createElement("div", {"className": "userAc photo-box"})), React.createElement("div", {"className": "wall-panes ng-hide", "ng-show": "tab == 'album'"}, React.createElement("div", {"className": "userAc photo-box"}, React.createElement("article", null, React.createElement("header", null, React.createElement("h6", null, "Альбом ", React.createElement("span", {"className": "ng-binding"})), React.createElement("p", {"className": "ng-binding"}, " фотографии")), React.createElement("div", {"className": "photo-cell add only-six"}, React.createElement("a", {"href": "#publ4", "className": "fancy-noclose"})))))));
    };
    return CommunityAlbumsPane;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommunityAlbumsPane;
//# sourceMappingURL=CommunityAlbumsPane.js.map