var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/tsd.t.ts" />
var React = require('react');
var ContentItem_1 = require('../common/ContentItem');
var BottomTags_1 = require('../common/BottomTags');
var Loading_1 = require('../common/Loading');
var Tabs_1 = require('../common/Tabs');
var SubTabs_1 = require('../common/SubTabs');
var Visible_1 = require('../common/Visible');
var actions = require('./actions');
var Rules_1 = require('./blocks/Rules');
var helpers_1 = require('../../helpers/helpers');
//var Infinite = require('react-infinite');
var InfiniteScrolling_1 = require('../common/InfiniteScrolling');
var Community = (function (_super) {
    __extends(Community, _super);
    function Community() {
        _super.apply(this, arguments);
    }
    Community.prototype.componentWillMount = function () {
        var _a = this.props, params = _a.params, dispatch = _a.dispatch;
        if (params.tab) {
            dispatch(actions.setTab(params.tab));
        }
        if (params.subtab) {
            dispatch(actions.setSubTab(params.subtab));
        }
        dispatch(actions.fetchCommunity(params.id));
    };
    Community.prototype.render = function () {
        var community = this.props.community;
        if (community) {
            return React.createElement(InnerCommunity, React.__spread({}, this.props));
        }
        else {
            return React.createElement(Loading_1.default, null);
        }
    };
    return Community;
})(React.Component);
exports.Community = Community;
var InnerCommunity = (function (_super) {
    __extends(InnerCommunity, _super);
    function InnerCommunity() {
        _super.apply(this, arguments);
    }
    InnerCommunity.prototype.handleLoadMore = function () {
        console.log("handleLoadMore");
        var _a = this.props, dispatch = _a.dispatch, infinityIsLoading = _a.infinityIsLoading;
        if (!infinityIsLoading) {
            dispatch(actions.setContentLoadingState(true));
            dispatch(actions.fetchContent(this.getCurrentSubTab()));
        }
    };
    InnerCommunity.prototype.getCurrentTab = function () {
        var currentTab = this.props.currentTab;
        if (currentTab == '') {
            return "wall";
        }
        return helpers_1.trimSlash(currentTab);
    };
    InnerCommunity.prototype.getCurrentSubTab = function () {
        var currentSubTab = this.props.currentSubTab;
        if (currentSubTab == '') {
            return "all";
        }
        return helpers_1.trimSlash(currentSubTab);
    };
    InnerCommunity.prototype.handleTabClick = function (path) {
        var _a = this.props, history = _a.history, community = _a.community, dispatch = _a.dispatch;
        history.push("/community/" + community.id + "" + path);
        dispatch(actions.setTab(path));
    };
    InnerCommunity.prototype.handleSubTabClick = function (path) {
        var _a = this.props, history = _a.history, community = _a.community, dispatch = _a.dispatch, currentTab = _a.currentTab;
        history.push("/community/" + community.id + "/" + currentTab + path);
        dispatch(actions.setSubTab(path));
    };
    InnerCommunity.prototype.render = function () {
        var _this = this;
        var _a = this.props, community = _a.community, location = _a.location, history = _a.history, tabs = _a.tabs, currentTab = _a.currentTab, subTabs = _a.subTabs, currentSubTab = _a.currentSubTab, content = _a.content, infinityIsLoading = _a.infinityIsLoading;
        console.log("content==", content, content[this.getCurrentSubTab()]);
        console.log("currentSubTab", this.getCurrentSubTab());
        console.log("currentSubTab2", content[this.getCurrentSubTab()].length);
        //this.getCurrentTab() == 'wall' && this.getCurrentSubTab() == 'all'
        //console.log("tab and subtab", this.getCurrentTab(), this.getCurrentSubTab());
        return (React.createElement("div", {"className": "content", "style": { paddingBottom: 0 }}, React.createElement("div", {"className": "left-col"}, React.createElement("div", {"className": "commun-photo"}, React.createElement("a", {"onClick": function () { history.push("/community/" + community.id + "/users"); }}, React.createElement("img", {"src": community.avatar['180'], "alt": ""}))), React.createElement("div", {"className": "user-btns"}, React.createElement("div", {"className": "line line2"}), React.createElement("div", {"className": "cat-block people_module"}, React.createElement("h4", null, "Категории (0)"), React.createElement("ul", {"className": "cat-list"}, React.createElement("li", null, React.createElement("a", {"className": "active", "href": "/community/4"}, "Все")))), React.createElement("div", {"className": "save-mess community-joined"}, "Вы вступили в сообщество")), React.createElement("br", null), React.createElement("br", null), React.createElement("div", {"className": "line"}), React.createElement("div", {"className": "module people_module"}, React.createElement("div", {"className": "module-title"}, React.createElement("h4", null, React.createElement("a", {"href": "#?pane=members&amp;tab=admin"}, "Руководство ", React.createElement("span", null, "(1)")))), React.createElement("div", {"className": "peoples"}, React.createElement("div", {"className": "people_cell active"}, React.createElement("a", {"href": "/user/yaru", "style": { display: 'block', height: '52px', whiteSpace: 'nowrap' }}, React.createElement("img", {"src": "/static/u/photo/1/s.jpg", "className": "ava center-image", "alt": "yaru", "style": { verticalAlign: 'middle', border: 'none' }}), React.createElement("span", null, "yaru"))))), React.createElement("div", {"className": "line"})), React.createElement("div", {"className": "center-wall", "community-panes": "4", "is-admin": "true", "is-moderator": "false", "is-admin-or-moderator": "true"}, React.createElement("div", {"className": "user-wall-top"}, React.createElement("h1", null, community.name), React.createElement("div", {"className": "group-name"}, "Сообщество"), React.createElement("div", {"className": "group-text shot-text"}, React.createElement("span", {"ng-show": "!full_description"}, "Третье сообщество"), " ", React.createElement("a", {"href": "", "className": "more-text", "ng-click": "full_description=true;console.log(1);", "ng-show": "!full_description"}, "еще"), React.createElement("span", {"className": "ng-hide", "ng-show": "full_description"}, "Третье сообщество"), " ", React.createElement("a", {"href": "", "className": "more-text2 ng-hide", "ng-click": "full_description=false", "ng-show": "full_description"}, "свернуть"))), React.createElement("div", {"className": "wall-tabs blue-block"}, React.createElement(Tabs_1.default, {"location": location, "tabs": tabs, "handleClick": this.handleTabClick.bind(this), "currentTab": currentTab}), React.createElement("div", {"className": "panes"}, React.createElement(Visible_1.default, {"className": "pane", "ng-show": "pane=='wall'", "test": currentTab == "" || helpers_1.trimSlash(currentTab) == "wall"}, React.createElement(Visible_1.default, {"test": currentTab == "" || helpers_1.trimSlash(currentTab) == "wall"}, React.createElement(SubTabs_1.default, {"tabs": subTabs["/wall"] || [], "currentTab": currentSubTab, "handleClick": this.handleSubTabClick.bind(this)})), React.createElement(Visible_1.default, {"className": "userAc", "test": currentSubTab == '' || helpers_1.trimSlash(currentSubTab) == 'all'}, React.createElement("div", null, (content['all']).length), content['all'].map(function (content, index) {
            return React.createElement(ContentItem_1.default, {"content": content, "key": index});
        }), React.createElement(InfiniteScrolling_1.default, {"infiniteLoadMore": this.handleLoadMore.bind(this), "isActive": function () { return _this.getCurrentTab() == 'wall' && _this.getCurrentSubTab() == 'all'; }, "pause": function () { return infinityIsLoading; }})), React.createElement(Visible_1.default, {"className": "userAc ng-hide", "test": helpers_1.trimSlash(currentSubTab) == 'article', "ng-show": "tab=='article'"}, content['article'].map(function (content, index) {
            return React.createElement(ContentItem_1.default, {"content": content, "key": index});
        }), React.createElement(InfiniteScrolling_1.default, {"infiniteLoadMore": this.handleLoadMore.bind(this), "isActive": function () { return _this.getCurrentTab() == 'wall' && _this.getCurrentSubTab() == 'article'; }, "pause": function () { return infinityIsLoading; }}), React.createElement("br", null), React.createElement("br", null)), React.createElement(Visible_1.default, {"className": "userAc", "test": helpers_1.trimSlash(currentSubTab) == 'note'}, content['note'].map(function (content, index) {
            return React.createElement(ContentItem_1.default, {"content": content, "key": index});
        }), React.createElement(InfiniteScrolling_1.default, {"infiniteLoadMore": this.handleLoadMore.bind(this), "isActive": function () { return _this.getCurrentTab() == 'wall' && _this.getCurrentSubTab() == 'note'; }, "pause": function () { return infinityIsLoading; }}), React.createElement("br", null), React.createElement("br", null)), React.createElement(Visible_1.default, {"className": "userAc", "test": helpers_1.trimSlash(currentSubTab) == 'photo'}, React.createElement("br", null), React.createElement("br", null)), React.createElement(Visible_1.default, {"className": "userAc", "test": helpers_1.trimSlash(currentSubTab) == 'video'}, React.createElement("br", null), React.createElement("br", null)), React.createElement(Visible_1.default, {"className": "userAc", "test": helpers_1.trimSlash(currentSubTab) == 'poll'}, React.createElement("br", null), React.createElement("br", null)), React.createElement(Visible_1.default, {"className": "userAc", "test": helpers_1.trimSlash(currentSubTab) == 'bookmark'}, React.createElement("br", null), React.createElement("br", null))), React.createElement(Visible_1.default, {"className": "pane ng-hide", "ng-show": "pane=='info'", "test": helpers_1.trimSlash(currentTab) == 'info'}, React.createElement("div", {"className": "userAc"}, React.createElement("p", null, "Третье сообщество"))), React.createElement(Visible_1.default, {"className": "pane", "test": helpers_1.trimSlash(currentTab) == 'rules'}, React.createElement(Rules_1.default, {"community": community})), React.createElement(Visible_1.default, {"className": "pane", "test": helpers_1.trimSlash(currentTab) == 'members'}, React.createElement(SubTabs_1.default, {"tabs": subTabs["/members"] || [], "currentTab": currentSubTab, "handleClick": this.handleSubTabClick.bind(this)}), React.createElement("div", {"className": "fr-search"}, React.createElement("input", {"type": "text", "placeholder": "Найти участника по имени", "className": "fr-search-txt ng-pristine ng-untouched ng-valid", "ng-model": "query"}), React.createElement("input", {"type": "submit", "value": "", "className": "fr-search-btn"})), React.createElement("div", {"className": "wall-panes bord"}, React.createElement("div", {"className": "userAc", "ng-show": "true"}, React.createElement("article", {"ng-repeat": "member in members", "className": "ng-scope"}, React.createElement("header", null, React.createElement("a", {"href": "/user/2", "className": "usName ng-binding"}, "2")), React.createElement("div", {"className": "user-edit", "ng-show": "is_admin_or_moderator"}, React.createElement("select", {"ng-show": "is_admin", "ng-hide": "is_moderator", "ng-change": "groupChanged(member, group)", "ng-options": "group.value as group.title for group in groups", "ng-model": "member.group_id", "className": "ng-pristine ng-untouched ng-valid"}, React.createElement("option", {"value": "number:3", "label": "Участник"}, "Участник"), React.createElement("option", {"value": "number:2", "label": "Модератор"}, "Модератор"), React.createElement("option", {"value": "number:1", "label": "Администратор"}, "Администратор")), React.createElement("a", {"href": "", "className": "action", "ng-click": "banUser(member)", "ng-show": "!member.is_blocked"}, "Исключить"), React.createElement("a", {"href": "", "ng-hide": "is_moderator", "className": "action", "ng-click": "banUser(member)", "ng-show": "member.is_blocked"}, "Разбанить")), React.createElement("div", {"className": "user-l"}, React.createElement("div", {"className": "userAva", "style": { whiteSpace: 'nowrap', overflow: 'hidden' }}, React.createElement("span", {"style": { display: 'inline-block', verticalAlign: 'middle', height: '100%' }}), React.createElement("img", {"alt": "", "style": { verticalAlign: 'middle', marginLeft: '-3px' }, "src": "/static/images/avatars/b.png"})), React.createElement("span", {"className": "user-stat ng-hide", "ng-show": "false"}, "Online")))))), React.createElement(Visible_1.default, {"className": "pane photo ng-hide", "ng-show": "pane == 'photo'", "test": helpers_1.trimSlash(currentTab) == 'albums'}, React.createElement("div", {"className": "wall-panes", "ng-show": "tab == 'all'"}, React.createElement("div", {"className": "userAc photo-box"}, React.createElement("a", {"href": "#", "className": "top-link add-photo"}, "Добавить фотографию"), React.createElement("div", {"className": "line"}), React.createElement("a", {"href": "#", "className": "top-link add-alb"}, "Добавить альбом"), React.createElement("div", {"className": "line"})), React.createElement("div", {"className": "userAc photo-box"})), React.createElement("div", {"className": "wall-panes ng-hide", "ng-show": "tab == 'album'"}, React.createElement("div", {"className": "userAc photo-box"}, React.createElement("article", null, React.createElement("header", null, React.createElement("h6", null, "Альбом ", React.createElement("span", {"className": "ng-binding"})), React.createElement("p", {"className": "ng-binding"}, " фотографии")), React.createElement("div", {"className": "photo-cell add only-six"}, React.createElement("a", {"href": "#publ4", "className": "fancy-noclose"})))))), React.createElement(Visible_1.default, {"className": "pane community_albums community-settings ng-scope ng-hide", "ng-show": "pane=='settings'", "test": helpers_1.trimSlash(currentTab) == 'settings'}, React.createElement("form", {"id": "community_settings", "ng-submit": "settingsSubmit()", "className": "ng-pristine ng-valid"}, React.createElement("input", {"id": "inp-community-id", "type": "hidden", "name": "community_id", "value": "4"}), React.createElement("input", {"type": "hidden", "name": "csrfmiddlewaretoken", "value": "cYmRvFENGItbhkX46gLHpN7ASOiR1VcY"}), React.createElement("div", {"className": "userAc page"}, React.createElement("p", {"className": "info-label"}, "Название"), React.createElement("div", {"className": "form-row"}, React.createElement("input", {"id": "id_name", "maxLength": 256, "name": "name", "type": "text", "value": "Третье сообщество"}), React.createElement("div", {"className": "text-error ng-binding"})), React.createElement("p", {"className": "info-label"}, "Описание"), React.createElement("div", {"className": "form-row form-row2"}, React.createElement("textarea", {"cols": 40, "id": "id_description", "name": "description", "rows": 10}, "Третье сообщество"), React.createElement("div", {"className": "text-error ng-binding"})), React.createElement("p", {"className": "info-label"}, "Правила"), React.createElement("div", {"className": "form-row form-row2"}, React.createElement("textarea", {"cols": 40, "id": "id_rules", "name": "rules", "rows": 10}), React.createElement("div", {"className": "text-error ng-binding"})), React.createElement("article", null, React.createElement("div", {"className": "info-box"}, React.createElement("div", {"className": "saved-info"}, React.createElement("div", {"className": "info-line"}, React.createElement("p", {"className": "info-label"}, "Категория"), React.createElement("p", {"className": "info-data"}, "Общество")), React.createElement("div", {"className": "info-line"}, React.createElement("p", {"className": "info-label"}, "Субкатегория"), React.createElement("p", {"className": "info-data"}, "Войны и конфликты")), React.createElement("div", {"className": "info-line"}, React.createElement("p", {"className": "info-label"}, "Адрес сайта"), React.createElement("p", {"className": "info-data", "style": { width: '50%' }}, React.createElement("input", {"id": "id_url", "maxLength": 256, "name": "url", "type": "text"})))))), React.createElement("div", {"className": "userAc subscription"}, React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность ставить заметки"), React.createElement("ul", {"id": "id_note_only_admin"}, React.createElement("li", null, React.createElement("label", {"htmlFor": "id_note_only_admin_0"}, React.createElement("input", {"checked": true, "id": "id_note_only_admin_0", "name": "note_only_admin", "type": "radio", "value": "False"}), " Всем участникам")), React.createElement("li", null, React.createElement("label", {"htmlFor": "id_note_only_admin_1"}, React.createElement("input", {"id": "id_note_only_admin_1", "name": "note_only_admin", "type": "radio", "value": "True"}), " Только администраторам")))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность ставить ссылки"), React.createElement("ul", {"id": "id_link_only_admin"}, React.createElement("li", null, React.createElement("label", {"htmlFor": "id_link_only_admin_0"}, React.createElement("input", {"checked": true, "id": "id_link_only_admin_0", "name": "link_only_admin", "type": "radio", "value": "False"}), " Всем участникам")), React.createElement("li", null, React.createElement("label", {"htmlFor": "id_link_only_admin_1"}, React.createElement("input", {"id": "id_link_only_admin_1", "name": "link_only_admin", "type": "radio", "value": "True"}), " Только администраторам")))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность ставить статьи"), React.createElement("ul", {"id": "id_article_only_admin"}, React.createElement("li", null, React.createElement("label", {"htmlFor": "id_article_only_admin_0"}, React.createElement("input", {"checked": true, "id": "id_article_only_admin_0", "name": "article_only_admin", "type": "radio", "value": "False"}), " Всем участникам")), React.createElement("li", null, React.createElement("label", {"htmlFor": "id_article_only_admin_1"}, React.createElement("input", {"id": "id_article_only_admin_1", "name": "article_only_admin", "type": "radio", "value": "True"}), " Только администраторам")))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность ставить фотографии"), React.createElement("ul", {"id": "id_photo_only_admin"}, React.createElement("li", null, React.createElement("label", {"htmlFor": "id_photo_only_admin_0"}, React.createElement("input", {"checked": true, "id": "id_photo_only_admin_0", "name": "photo_only_admin", "type": "radio", "value": "False"}), " Всем участникам")), React.createElement("li", null, React.createElement("label", {"htmlFor": "id_photo_only_admin_1"}, React.createElement("input", {"id": "id_photo_only_admin_1", "name": "photo_only_admin", "type": "radio", "value": "True"}), " Только администраторам")))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность размещать видео"), React.createElement("ul", {"id": "id_video_only_admin"}, React.createElement("li", null, React.createElement("label", {"htmlFor": "id_video_only_admin_0"}, React.createElement("input", {"checked": true, "id": "id_video_only_admin_0", "name": "video_only_admin", "type": "radio", "value": "False"}), " Всем участникам")), React.createElement("li", null, React.createElement("label", {"htmlFor": "id_video_only_admin_1"}, React.createElement("input", {"id": "id_video_only_admin_1", "name": "video_only_admin", "type": "radio", "value": "True"}), " Только администраторам")))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность ставить опросы"), React.createElement("ul", {"id": "id_poll_only_admin"}, React.createElement("li", null, React.createElement("label", {"htmlFor": "id_poll_only_admin_0"}, React.createElement("input", {"checked": true, "id": "id_poll_only_admin_0", "name": "poll_only_admin", "type": "radio", "value": "False"}), " Всем участникам")), React.createElement("li", null, React.createElement("label", {"htmlFor": "id_poll_only_admin_1"}, React.createElement("input", {"id": "id_poll_only_admin_1", "name": "poll_only_admin", "type": "radio", "value": "True"}), " Только администраторам")))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность комментировать"), React.createElement("div", {"className": "subscr-line"}, React.createElement("input", {"type": "checkbox", "checked": true, "ng-disabled": "!is_admin"}), React.createElement("p", null, "Всем пользователям Гайдпарка")), React.createElement("div", {"className": "subscr-line"}, React.createElement("input", {"type": "checkbox", "ng-disabled": "!is_admin"}), React.createElement("p", null, "Только участникам сообщества")), React.createElement("div", {"className": "subscr-line"}, React.createElement("input", {"type": "checkbox", "ng-disabled": "!is_admin"}), React.createElement("p", null, "Только администраторам"))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Тип сообщества"), React.createElement("ul", {"id": "id_is_closed"}, React.createElement("li", null, React.createElement("label", {"htmlFor": "id_is_closed_0"}, React.createElement("input", {"checked": true, "id": "id_is_closed_0", "name": "is_closed", "type": "radio", "value": "False"}), " Открытое сообщество")), React.createElement("li", null, React.createElement("label", {"htmlFor": "id_is_closed_1"}, React.createElement("input", {"id": "id_is_closed_1", "name": "is_closed", "type": "radio", "value": "True"}), " Закрытое сообщество"))))), React.createElement("div", {"style": { margin: 'auto', width: '100%', textAlign: 'center' }}, React.createElement("input", {"ng-show": "is_admin", "type": "submit", "className": "btn btn-blue", "value": "Сохранить", "ng-disabled": "inProgress", "ng-className": "{'btn-grey': inProgress}"})))))))), React.createElement(BottomTags_1.default, null)));
    };
    return InnerCommunity;
})(React.Component);
//# sourceMappingURL=Community.js.map