//export default {Content, User};
var Content = (function () {
    function Content(obj) {
        this.obj = obj;
    }
    return Content;
})();
exports.Content = Content;
var Community = (function () {
    function Community() {
    }
    Community.prototype.getId = function () {
        return this.id;
    };
    return Community;
})();
exports.Community = Community;
//# sourceMappingURL=models.js.map