var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var TestBlock = (function (_super) {
    __extends(TestBlock, _super);
    function TestBlock() {
        _super.apply(this, arguments);
    }
    TestBlock.prototype.render = function () {
        console.log("Test block props", this.props);
        var dispatch = this.props.dispatch;
        dispatch({
            type: 'TEST_BLOCK_DISPATCH',
            value: 'ahaahahah'
        });
        return (React.createElement("div", {"className": "Bla-bla"}, React.createElement("a", {"href": "#", "onClick": dispatch({
            type: 'TEST BLOCK DISPATCH',
            value: 'bbbbbbbbbx'
        })}, "aaaaaaaaaaaaaaaaaaaa")));
    };
    return TestBlock;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TestBlock;
//# sourceMappingURL=TestBlock.js.map