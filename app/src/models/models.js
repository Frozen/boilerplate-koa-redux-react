var User = (function () {
    function User(userObj) {
        this.userObj = userObj;
    }
    User.prototype.getFioOrUsernameOrId = function () {
        if (this.userObj.first_name && this.userObj.last_name) {
            return this.userObj.first_name + " " + this.userObj.last_name;
        }
        if (this.userObj.first_name) {
            return this.userObj.first_name;
        }
        if (this.userObj.last_name) {
            return this.userObj.last_name;
        }
        if (this.userObj.username) {
            return this.userObj.username;
        }
        return "" + this.userObj.id;
    };
    return User;
})();
exports.User = User;
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