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
var react_redux_1 = require("react-redux");
var actions = require('../../../actions/community');
var CommunityJoinLeave = (function (_super) {
    __extends(CommunityJoinLeave, _super);
    function CommunityJoinLeave() {
        _super.apply(this, arguments);
    }
    CommunityJoinLeave.prototype.join = function (e) {
        e.preventDefault();
        var _a = this.props, community = _a.community, dispatch = _a.dispatch;
        dispatch(actions.asyncJoinCommunity(community.id, request.user.id));
    };
    CommunityJoinLeave.prototype.leave = function (e) {
        e.preventDefault();
        var _a = this.props, community = _a.community, dispatch = _a.dispatch;
        dispatch(actions.asyncLeaveCommunity(community.id, request.user.id));
    };
    CommunityJoinLeave.prototype.render = function () {
        var community = this.props.community;
        if (!request.user.is_authenticated) {
            return null;
        }
        return community.user_group_id ?
            React.createElement("a", {"href": "", "className": "btn btn-grey", "onClick": this.leave.bind(this)}, "Выйти") :
            React.createElement("a", {"href": "", "className": "btn btn-blue", "onClick": this.join.bind(this)}, "Вступить");
    };
    CommunityJoinLeave = __decorate([
        react_redux_1.connect(function (state) { return state.community; })
    ], CommunityJoinLeave);
    return CommunityJoinLeave;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommunityJoinLeave;
//# sourceMappingURL=CommunityJoinLeave.js.map