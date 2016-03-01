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
var SubTabs_1 = require('../../../common/SubTabs');
var helpers_1 = require('../../../../helpers/helpers');
var react_redux_1 = require('react-redux');
var CommunityContentPane = (function (_super) {
    __extends(CommunityContentPane, _super);
    function CommunityContentPane() {
        _super.apply(this, arguments);
    }
    CommunityContentPane.prototype.handleSubTabClick = function (path) {
        var _a = this.props, history = _a.history, params = _a.params;
        history.push("/community/" + params.id + "/" + this.getCurrentTab() + "/" + path);
    };
    CommunityContentPane.prototype.getCurrentTab = function () {
        var params = this.props.params;
        if (!params.tab) {
            return "wall";
        }
        return helpers_1.trimSlash(params.tab);
    };
    //_getSubTab(props: IProp): string {
    //    const {params} = props;
    //    if (!params.subtab) {
    //        return ""
    //    }
    //    return trimSlash(params.subtab);
    //}
    //getCurrentSubTab(): string {
    //    return this._getSubTab(this.props);
    //}
    CommunityContentPane.prototype.getSubTabs = function () {
        return [
            ["all", "Всё"],
            ["article", "Статьи"],
            ["note", "Заметки"],
            ["photo", "Фото"],
            ["video", "Видео"],
            ["poll", "Опросы"],
        ];
    };
    CommunityContentPane.prototype.render = function () {
        var location = this.props.location;
        return (React.createElement("div", {"className": "pane"}, React.createElement(SubTabs_1.default, {"tabs": this.getSubTabs(), "location": location, "handleClick": this.handleSubTabClick.bind(this)}), this.props.children));
    };
    CommunityContentPane = __decorate([
        react_redux_1.connect()
    ], CommunityContentPane);
    return CommunityContentPane;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommunityContentPane;
//# sourceMappingURL=CommunityContentPane.js.map