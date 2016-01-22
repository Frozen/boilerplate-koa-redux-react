var types = require('../../../types/community');
exports.reducer = function (state, action) {
    if (state === void 0) { state = {}; }
    if (action.type == types.TEST_BLOCK_DISPATCH) {
        console.log("types.TEST_BLOCK_DISPATCH ", types.TEST_BLOCK_DISPATCH);
        return state;
    }
    console.log("tab reducer!!!!!!!", state, action);
    return state;
};
//# sourceMappingURL=tabreducer.js.map