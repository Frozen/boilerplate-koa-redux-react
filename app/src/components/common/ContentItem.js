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
                case 'poll':
                    return React.createElement(ContentPoll, {"content": content, "key": key});
                case 'note':
                    return React.createElement(ContentNote, {"content": content, "key": key});
                case 'link':
                    return React.createElement(ContentLink, {"content": content, "key": key});
                case 'video':
                    return React.createElement(ContentVideo, {"content": content, "key": key});
                default:
                    return React.createElement("div", null, "No Content Type ", content.type);
            }
        };
        return (f(content));
    };
    return ContentItem;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ContentItem;
var User = (function (_super) {
    __extends(User, _super);
    function User() {
        _super.apply(this, arguments);
    }
    User.prototype.render = function () {
        var user = this.props.user;
        return (React.createElement("div", {"className": "user-l"}, React.createElement("div", {"className": "userAva"}, React.createElement("img", {"src": user.avatar['50x50'], "alt": user.getFioOrUsernameOrId()})), user.isOnline() ? React.createElement("span", {"className": "user-stat"}, "Online") : ''));
    };
    return User;
})(React.Component);
var ContentArticle = (function (_super) {
    __extends(ContentArticle, _super);
    function ContentArticle() {
        _super.apply(this, arguments);
        this.type = 'статью';
    }
    ContentArticle.prototype.render = function () {
        var content = this.props.content;
        return (React.createElement("article", null, React.createElement("header", null, React.createElement("a", {"href": "#", "className": "usName"}, "yaru"), React.createElement("p", null, "добавил ", this.type, React.createElement("mark", null, React.createElement("a", {"href": content.getUrl()}, content.getEditorTitle())))), React.createElement("p", null, content.text), React.createElement("footer", null, React.createElement(Rating_1.default, {"content": content}), React.createElement("a", {"href": "/community/4/content/100#comments"}, React.createElement("span", null, "Комментировать"), " (0)")), React.createElement(User, {"user": content.user})));
    };
    return ContentArticle;
})(React.Component);
var ContentPoll = (function (_super) {
    __extends(ContentPoll, _super);
    function ContentPoll() {
        _super.apply(this, arguments);
        this.type = 'опрос';
    }
    return ContentPoll;
})(ContentArticle);
var ContentVideo = (function (_super) {
    __extends(ContentVideo, _super);
    function ContentVideo() {
        _super.apply(this, arguments);
        this.type = 'видео';
    }
    return ContentVideo;
})(ContentArticle);
var ContentLink = (function (_super) {
    __extends(ContentLink, _super);
    function ContentLink() {
        _super.apply(this, arguments);
    }
    ContentLink.prototype.render = function () {
        var content = this.props.content;
        return (React.createElement("article", null, React.createElement("header", null, React.createElement("a", {"href": "#", "className": "usName"}, "yaru"), React.createElement("p", null, "добавил ссылку", React.createElement("mark", null, React.createElement("a", {"href": content.getSourceLink()}, content.getEditorTitle())))), React.createElement("p", null, content.text), React.createElement("footer", null, React.createElement(Rating_1.default, {"content": content}), React.createElement("a", {"href": "/community/4/content/100#comments"}, React.createElement("span", null, "Комментировать"), " (0)")), React.createElement(User, {"user": content.user})));
    };
    return ContentLink;
})(React.Component);
//class ContentPoll extends React.Component<IProps, any> {
//
//
//    render() {
//
//        const {content} = this.props;
//
//        return (
//            <article>
//                <header>
//                    <a href="#" className="usName">yaru</a>
//                    <p>добавил опрос в
//
//                        сообщество <a href={content.community.getUrl()}>Третье сообщество</a>
//
//                        <mark>
//                            <a href={content.getUrl()}>{content.getEditorTitle()}</a>
//                        </mark>
//                    </p>
//
//                </header>
//                <p>
//                    {content.text}
//                </p>
//
//                <footer>
//                    <Rating rating={content.rating} />
//                    <a href="/community/4/content/100#comments"><span>Комментировать</span> (0)</a>
//                </footer>
//
//                <User user={content.user} />
//
//            </article>
//        )
//    }
//
//}
var ContentNote = (function (_super) {
    __extends(ContentNote, _super);
    function ContentNote() {
        _super.apply(this, arguments);
    }
    ContentNote.prototype.render = function () {
        var content = this.props.content;
        return (React.createElement("article", null, React.createElement("header", null, React.createElement("a", {"href": content.user.getUrl(), "className": "usName"}, content.user.getFioOrUsernameOrId()), React.createElement("p", null, "добавил заметку")), React.createElement("p", null, content.text), React.createElement("footer", null, React.createElement(Rating_1.default, {"content": content}), React.createElement("a", {"href": "/community/4/content/100#comments"}, React.createElement("span", null, "Комментировать"), " (0)")), React.createElement(User, {"user": content.user})));
    };
    return ContentNote;
})(React.Component);
//# sourceMappingURL=ContentItem.js.map