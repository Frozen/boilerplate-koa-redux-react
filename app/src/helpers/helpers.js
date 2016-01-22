var _ = require('lodash');
function trimSlash(s) {
    if (!_.isString(s)) {
        throw new Error("require string");
    }
    return s.replace(/\//, "");
}
exports.trimSlash = trimSlash;
//# sourceMappingURL=helpers.js.map