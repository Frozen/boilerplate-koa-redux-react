/**
 * Created by kot on 16.01.16.
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = User;
//# sourceMappingURL=User.js.map