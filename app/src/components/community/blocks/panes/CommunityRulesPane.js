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
var CommunityRulesPane = (function (_super) {
    __extends(CommunityRulesPane, _super);
    function CommunityRulesPane() {
        _super.apply(this, arguments);
    }
    CommunityRulesPane.prototype.render = function () {
        var community = this.props.community;
        console.log("CommunityRulesPane", community);
        if (!community) {
            return React.createElement("i", null);
        }
        //community = community || {};
        return (React.createElement("div", {"className": "pane"}, React.createElement("div", {"className": "userAc"}, React.createElement("h3", null, "Правила поведения в сообществе."), React.createElement("p", null, community.rules))));
    };
    CommunityRulesPane = __decorate([
        react_redux_1.connect(function (state) { return state.community; })
    ], CommunityRulesPane);
    return CommunityRulesPane;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommunityRulesPane;
//# sourceMappingURL=CommunityRulesPane.js.map