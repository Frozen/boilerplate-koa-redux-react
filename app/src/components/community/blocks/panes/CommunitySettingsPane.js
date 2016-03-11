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
var constants = require('../../../../constants/constants');
var redux_form_1 = require('redux-form');
var actions = require('../../../../actions/community');
var submit = function (communityId) {
    return function (values, dispatch) {
        $.ajax({
            url: '/rest/community/' + communityId + '/settings',
            type: 'POST',
            data: values
        }).then(function (data) {
            dispatch(actions.fetchCommunity(communityId));
        });
    };
};
function istrue(v) {
    return v.toString() == 'true';
}
function isfalse(v) {
    return v.toString() == 'false';
}
var CommunitySettingsPane = (function (_super) {
    __extends(CommunitySettingsPane, _super);
    function CommunitySettingsPane() {
        _super.apply(this, arguments);
    }
    CommunitySettingsPane.prototype.render = function () {
        var _a = this.props, params = _a.params, community = _a.community;
        var _b = this.props, _c = _b.fields, name = _c.name, description = _c.description, rules = _c.rules, note_only_admin = _c.note_only_admin, link_only_admin = _c.link_only_admin, article_only_admin = _c.article_only_admin, photo_only_admin = _c.photo_only_admin, poll_only_admin = _c.poll_only_admin, is_closed = _c.is_closed, accept_comment = _c.accept_comment, video_only_admin = _c.video_only_admin, site_address = _c.site_address, handleSubmit = _b.handleSubmit;
        if (typeof note_only_admin.value == 'undefined') {
            return null;
        }
        console.log("settings pane community", note_only_admin);
        return (React.createElement("div", {"className": "pane community_albums community-settings"}, React.createElement("form", {"id": "community_settings", "onSubmit": handleSubmit(submit(community.id))}, React.createElement("div", {"className": "userAc page"}, React.createElement("p", {"className": "info-label"}, "Название"), React.createElement("div", {"className": "form-row"}, React.createElement("input", React.__spread({"id": "id_name"}, name)), React.createElement("div", {"className": "text-error ng-binding"})), React.createElement("p", {"className": "info-label"}, "Описание"), React.createElement("div", {"className": "form-row form-row2"}, React.createElement("textarea", React.__spread({"cols": 40, "id": "id_description", "rows": 10}, description)), React.createElement("div", {"className": "text-error ng-binding"})), React.createElement("p", {"className": "info-label"}, "Правила"), React.createElement("div", {"className": "form-row form-row2"}, React.createElement("textarea", React.__spread({"cols": 40, "id": "id_rules", "rows": 10}, rules)), React.createElement("div", {"className": "text-error ng-binding"})), React.createElement("article", null, React.createElement("div", {"className": "info-box"}, React.createElement("div", {"className": "saved-info"}, React.createElement("div", {"className": "info-line"}, React.createElement("p", {"className": "info-label"}, "Категория"), React.createElement("p", {"className": "info-data"}, community.category)), React.createElement("div", {"className": "info-line"}, React.createElement("p", {"className": "info-label"}, "Субкатегория"), React.createElement("p", {"className": "info-data"}, community.subcategory)), React.createElement("div", {"className": "info-line"}, React.createElement("p", {"className": "info-label"}, "Адрес сайта"), React.createElement("p", {"className": "info-data", "style": { width: '50%' }}, React.createElement("input", React.__spread({}, site_address))))))), React.createElement("div", {"className": "userAc subscription"}, React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность ставить заметки"), React.createElement("ul", {"id": "id_note_only_admin"}, React.createElement("li", null, React.createElement("label", null, React.createElement("input", React.__spread({"type": "radio"}, note_only_admin, {"checked": isfalse(note_only_admin.value), "value": 'false'})), " Всем участникам")), React.createElement("li", null, React.createElement("label", null, React.createElement("input", React.__spread({"type": "radio"}, note_only_admin, {"checked": istrue(note_only_admin.value), "value": 'true'})), " Только администраторам")))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность ставить ссылки"), React.createElement("ul", null, React.createElement("li", null, React.createElement("label", null, React.createElement("input", React.__spread({"type": "radio"}, link_only_admin, {"checked": isfalse(link_only_admin.value), "value": "false"})), " Всем участникам")), React.createElement("li", null, React.createElement("label", null, React.createElement("input", React.__spread({"type": "radio"}, link_only_admin, {"checked": istrue(link_only_admin.value), "value": "true"})), " Только администраторам")))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность ставить статьи"), React.createElement("ul", null, React.createElement("li", null, React.createElement("label", null, React.createElement("input", React.__spread({"type": "radio"}, article_only_admin, {"checked": isfalse(article_only_admin.value), "value": "false"})), " Всем участникам")), React.createElement("li", null, React.createElement("label", null, React.createElement("input", React.__spread({"type": "radio"}, article_only_admin, {"checked": istrue(article_only_admin.value), "value": "true"})), " Только администраторам")))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность ставить фотографии"), React.createElement("ul", {"id": "id_photo_only_admin"}, React.createElement("li", null, React.createElement("label", null, React.createElement("input", React.__spread({"type": "radio"}, photo_only_admin, {"checked": isfalse(photo_only_admin.value), "value": "false"})), " Всем участникам")), React.createElement("li", null, React.createElement("label", null, React.createElement("input", React.__spread({"type": "radio"}, photo_only_admin, {"checked": istrue(photo_only_admin.value), "value": "true"})), " Только администраторам")))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность размещать видео"), React.createElement("ul", null, React.createElement("li", null, React.createElement("label", null, React.createElement("input", React.__spread({"type": "radio"}, video_only_admin, {"checked": isfalse(video_only_admin.value), "value": "false"})), " Всем участникам")), React.createElement("li", null, React.createElement("label", null, React.createElement("input", React.__spread({"type": "radio"}, video_only_admin, {"checked": istrue(video_only_admin.value), "value": "true"})), " Только администраторам")))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность ставить опросы"), React.createElement("ul", {"id": "id_poll_only_admin"}, React.createElement("li", null, React.createElement("label", null, React.createElement("input", React.__spread({"type": "radio"}, poll_only_admin, {"checked": isfalse(poll_only_admin.value), "value": "false"})), " Всем участникам")), React.createElement("li", null, React.createElement("label", null, React.createElement("input", React.__spread({"type": "radio"}, poll_only_admin, {"checked": istrue(poll_only_admin.value), "value": "true"})), " Только администраторам")))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность комментировать"), React.createElement("ul", null, React.createElement("li", null, React.createElement("label", null, React.createElement("input", React.__spread({"type": "radio"}, accept_comment, {"checked": accept_comment.value == 'all', "value": "all"})), " Всем пользователям Гайдпарка")), React.createElement("li", null, React.createElement("label", null, React.createElement("input", React.__spread({"type": "radio"}, accept_comment, {"checked": accept_comment.value == 'members', "value": "members"})), " Только участникам сообщества")), React.createElement("li", null, React.createElement("label", null, React.createElement("input", React.__spread({"type": "radio"}, accept_comment, {"checked": accept_comment.value == 'admin', "value": "admin"})), " Только администраторам")))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Тип сообщества"), React.createElement("ul", {"id": "id_is_closed"}, React.createElement("li", null, React.createElement("label", null, React.createElement("input", React.__spread({"type": "radio"}, is_closed, {"checked": isfalse(is_closed.value), "value": "false"})), " Открытое сообщество")), React.createElement("li", null, React.createElement("label", null, React.createElement("input", React.__spread({"type": "radio"}, is_closed, {"checked": istrue(is_closed.value), "value": "true"})), " Закрытое сообщество"))))), community.user_group_id == constants.COMMUNITY_GROUP_ADMIN ?
            React.createElement("div", {"style": { margin: 'auto', width: '100%', textAlign: 'center' }}, React.createElement("input", {"type": "submit", "className": "btn btn-blue", "value": "Сохранить"})) : ''))));
    };
    CommunitySettingsPane = __decorate([
        redux_form_1.reduxForm({
            form: 'communitySettingsForm',
            fields: ['name', 'description', 'rules', 'site_address',
                'note_only_admin', 'link_only_admin', 'photo_only_admin',
                'poll_only_admin', 'article_only_admin', 'is_closed',
                'accept_comment', 'video_only_admin']
        }, function (state) {
            var community = state.community.community;
            return {
                community: state.community.community,
                initialValues: community
            };
        })
    ], CommunitySettingsPane);
    return CommunitySettingsPane;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommunitySettingsPane;
//# sourceMappingURL=CommunitySettingsPane.js.map