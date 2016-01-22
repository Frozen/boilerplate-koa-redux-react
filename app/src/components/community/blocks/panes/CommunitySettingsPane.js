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
var react_redux_1 = require('react-redux');
var CommunitySettingsPane = (function (_super) {
    __extends(CommunitySettingsPane, _super);
    function CommunitySettingsPane() {
        _super.apply(this, arguments);
        this.state = {
            form: {
                name: 'aaaa',
                rules: '',
                description: '',
                url: ''
            }
        };
    }
    CommunitySettingsPane.prototype.componentWillMount = function () {
    };
    CommunitySettingsPane.prototype.handleSubmit = function (e) {
        e.preventDefault();
    };
    CommunitySettingsPane.prototype.bind = function (name) {
        var _this = this;
        return function (e) {
            var x = {};
            x[name] = e.target.value;
            _this.setState(x);
        };
    };
    CommunitySettingsPane.prototype.render = function () {
        var params = this.props.params;
        var form = this.state.form;
        console.log("settings pane props", this.props);
        return (React.createElement("div", {"className": "pane community_albums community-settings"}, React.createElement("form", {"id": "community_settings", "className": "ng-pristine ng-valid"}, React.createElement("div", {"className": "userAc page"}, React.createElement("p", {"className": "info-label"}, "Название"), React.createElement("div", {"className": "form-row"}, React.createElement("input", {"id": "id_name", "name": "name", "value": form.name, "onChange": this.bind("name")}), React.createElement("div", {"className": "text-error ng-binding"})), React.createElement("p", {"className": "info-label"}, "Описание"), React.createElement("div", {"className": "form-row form-row2"}, React.createElement("textarea", {"cols": 40, "id": "id_description", "name": "description", "rows": 10, "value": form.description, "onChange": this.bind("description")}), React.createElement("div", {"className": "text-error ng-binding"})), React.createElement("p", {"className": "info-label"}, "Правила"), React.createElement("div", {"className": "form-row form-row2"}, React.createElement("textarea", {"cols": 40, "id": "id_rules", "name": "rules", "rows": 10, "value": form.rules, "onChange": this.bind("rules")}), React.createElement("div", {"className": "text-error ng-binding"})), React.createElement("article", null, React.createElement("div", {"className": "info-box"}, React.createElement("div", {"className": "saved-info"}, React.createElement("div", {"className": "info-line"}, React.createElement("p", {"className": "info-label"}, "Категория"), React.createElement("p", {"className": "info-data"}, "Общество")), React.createElement("div", {"className": "info-line"}, React.createElement("p", {"className": "info-label"}, "Субкатегория"), React.createElement("p", {"className": "info-data"}, "Войны и конфликты")), React.createElement("div", {"className": "info-line"}, React.createElement("p", {"className": "info-label"}, "Адрес сайта"), React.createElement("p", {"className": "info-data", "style": { width: '50%' }}, React.createElement("input", {"id": "id_url", "maxLength": 256, "name": "url", "type": "text", "value": form.url, "onChange": this.bind("url")})))))), React.createElement("div", {"className": "userAc subscription"}, React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность ставить заметки"), React.createElement("ul", {"id": "id_note_only_admin"}, React.createElement("li", null, React.createElement("label", {"htmlFor": "id_note_only_admin_0"}, React.createElement("input", {"checked": true, "id": "id_note_only_admin_0", "name": "note_only_admin", "type": "radio", "value": "False"}), " Всем участникам")), React.createElement("li", null, React.createElement("label", {"htmlFor": "id_note_only_admin_1"}, React.createElement("input", {"id": "id_note_only_admin_1", "name": "note_only_admin", "type": "radio", "value": "True"}), " Только администраторам")))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность ставить ссылки"), React.createElement("ul", {"id": "id_link_only_admin"}, React.createElement("li", null, React.createElement("label", {"htmlFor": "id_link_only_admin_0"}, React.createElement("input", {"checked": true, "id": "id_link_only_admin_0", "name": "link_only_admin", "type": "radio", "value": "False"}), " Всем участникам")), React.createElement("li", null, React.createElement("label", {"htmlFor": "id_link_only_admin_1"}, React.createElement("input", {"id": "id_link_only_admin_1", "name": "link_only_admin", "type": "radio", "value": "True"}), " Только администраторам")))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность ставить статьи"), React.createElement("ul", {"id": "id_article_only_admin"}, React.createElement("li", null, React.createElement("label", {"htmlFor": "id_article_only_admin_0"}, React.createElement("input", {"checked": true, "id": "id_article_only_admin_0", "name": "article_only_admin", "type": "radio", "value": "False"}), " Всем участникам")), React.createElement("li", null, React.createElement("label", {"htmlFor": "id_article_only_admin_1"}, React.createElement("input", {"id": "id_article_only_admin_1", "name": "article_only_admin", "type": "radio", "value": "True"}), " Только администраторам")))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность ставить фотографии"), React.createElement("ul", {"id": "id_photo_only_admin"}, React.createElement("li", null, React.createElement("label", {"htmlFor": "id_photo_only_admin_0"}, React.createElement("input", {"checked": true, "id": "id_photo_only_admin_0", "name": "photo_only_admin", "type": "radio", "value": "False"}), " Всем участникам")), React.createElement("li", null, React.createElement("label", {"htmlFor": "id_photo_only_admin_1"}, React.createElement("input", {"id": "id_photo_only_admin_1", "name": "photo_only_admin", "type": "radio", "value": "True"}), " Только администраторам")))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность размещать видео"), React.createElement("ul", {"id": "id_video_only_admin"}, React.createElement("li", null, React.createElement("label", {"htmlFor": "id_video_only_admin_0"}, React.createElement("input", {"checked": true, "id": "id_video_only_admin_0", "name": "video_only_admin", "type": "radio", "value": "False"}), " Всем участникам")), React.createElement("li", null, React.createElement("label", {"htmlFor": "id_video_only_admin_1"}, React.createElement("input", {"id": "id_video_only_admin_1", "name": "video_only_admin", "type": "radio", "value": "True"}), " Только администраторам")))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность ставить опросы"), React.createElement("ul", {"id": "id_poll_only_admin"}, React.createElement("li", null, React.createElement("label", {"htmlFor": "id_poll_only_admin_0"}, React.createElement("input", {"checked": true, "id": "id_poll_only_admin_0", "name": "poll_only_admin", "type": "radio", "value": "False"}), " Всем участникам")), React.createElement("li", null, React.createElement("label", {"htmlFor": "id_poll_only_admin_1"}, React.createElement("input", {"id": "id_poll_only_admin_1", "name": "poll_only_admin", "type": "radio", "value": "True"}), " Только администраторам")))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Возможность комментировать"), React.createElement("div", {"className": "subscr-line"}, React.createElement("input", {"type": "checkbox", "checked": true, "ng-disabled": "!is_admin"}), React.createElement("p", null, "Всем пользователям Гайдпарка")), React.createElement("div", {"className": "subscr-line"}, React.createElement("input", {"type": "checkbox", "ng-disabled": "!is_admin"}), React.createElement("p", null, "Только участникам сообщества")), React.createElement("div", {"className": "subscr-line"}, React.createElement("input", {"type": "checkbox", "ng-disabled": "!is_admin"}), React.createElement("p", null, "Только администраторам"))), React.createElement("article", null, React.createElement("p", {"className": "subscr-title"}, "Тип сообщества"), React.createElement("ul", {"id": "id_is_closed"}, React.createElement("li", null, React.createElement("label", {"htmlFor": "id_is_closed_0"}, React.createElement("input", {"checked": true, "id": "id_is_closed_0", "name": "is_closed", "type": "radio", "value": "False"}), " Открытое сообщество")), React.createElement("li", null, React.createElement("label", {"htmlFor": "id_is_closed_1"}, React.createElement("input", {"id": "id_is_closed_1", "name": "is_closed", "type": "radio", "value": "True"}), " Закрытое сообщество"))))), React.createElement("div", {"style": { margin: 'auto', width: '100%', textAlign: 'center' }}, React.createElement("input", {"ng-show": "is_admin", "type": "submit", "className": "btn btn-blue", "value": "Сохранить", "ng-disabled": "inProgress", "ng-className": "{'btn-grey': inProgress}"}))))));
    };
    CommunitySettingsPane = __decorate([
        react_redux_1.connect()
    ], CommunitySettingsPane);
    return CommunitySettingsPane;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommunitySettingsPane;
//# sourceMappingURL=CommunitySettingsPane.js.map