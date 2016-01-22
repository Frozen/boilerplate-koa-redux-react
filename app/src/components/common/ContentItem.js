/**

    Блок одного контента в списке

 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Rating_1 = require('../common/Rating');
var ContentItem = (function (_super) {
    __extends(ContentItem, _super);
    function ContentItem() {
        _super.apply(this, arguments);
    }
    ContentItem.prototype.render = function () {
        var _a = this.props, content = _a.content, key = _a.key;
        var f = function (content) {
            switch (content.type) {
                case 'article':
                    return React.createElement(ContentArticle, {"content": content, "key": key});
                default:
                    return React.createElement("div", null);
            }
        };
        return (f(content));
    };
    return ContentItem;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ContentItem;
var ContentArticle = (function (_super) {
    __extends(ContentArticle, _super);
    function ContentArticle() {
        _super.apply(this, arguments);
    }
    ContentArticle.prototype.render = function () {
        var content = this.props.content;
        return (React.createElement("article", null, React.createElement("header", null, React.createElement("a", {"href": "#", "className": "usName"}, "yaru"), React.createElement("p", null, "добавил опрос в" + ' ' + "сообщество ", React.createElement("a", {"href": content.community.getUrl()}, "Третье сообщество"), React.createElement("mark", null, React.createElement("a", {"href": content.getUrl()}, content.getEditorTitle())))), React.createElement("p", null, content.text), React.createElement("footer", null, React.createElement(Rating_1.default, {"rating": content.rating}), React.createElement("a", {"href": "/community/4/content/100#comments"}, React.createElement("span", null, "Комментировать"), " (0)")), React.createElement("div", {"className": "user-l"}, React.createElement("div", {"className": "userAva"}, React.createElement("img", {"src": "http://new.maxpark.com/static/u/photo/4297852211/s.jpg", "alt": ""}), React.createElement("div", {"className": "userHoverPopup"}, React.createElement("button", {"className": "close", "title": "Скрыть"}), React.createElement("div", {"className": "userAva"}, React.createElement("img", {"src": "/static/u/photo/1/s.jpg", "alt": ""})), React.createElement("div", {"className": "uDets"}, React.createElement("a", {"href": "#", "className": "usName"}, "Василий стрельников"), React.createElement("div", {"className": "user-location"}, React.createElement("i", {"className": "icon-location"}), React.createElement("i", {"className": "icon-flag-ru"}), React.createElement("b", null, "Россия"), ", Москва"), React.createElement("span", {"className": "friend"}, "546 друзей")), React.createElement("ul", {"className": "u-opts"}, React.createElement("li", null, React.createElement("a", {"href": "#"}, React.createElement("i", {"className": "icon-add-dark"}), "Добавить в друзья")), React.createElement("li", null, React.createElement("a", {"href": "#"}, React.createElement("i", {"className": "icon-mess-dark"}), "Написать сообщение")), React.createElement("li", null, React.createElement("a", {"href": "#"}, React.createElement("i", {"className": "icon-pres-dark"}), "Сделать подарок"))))), React.createElement("span", {"className": "user-stat"}, "Online"))));
    };
    return ContentArticle;
})(React.Component);
//# sourceMappingURL=ContentItem.js.map